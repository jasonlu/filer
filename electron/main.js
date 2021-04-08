const { app, BrowserWindow } = require('electron');
const { Book}  = require('./models/book.js');
const { ipcMain } = require('electron');
const { Zip } = require('./models/zip.js');
const fs = require('fs-extra');
const homedir = require('os').homedir();
const path = require('path');
const url = require('url');

let mainWindow;

const userPreference = {
  outputPath: homedir
}

function updateProgress (progress) {
  mainWindow.webContents.send('updateProgress', progress);
}

function readBookContent(book) {
  const files = fs.readdirSync(book.path, { withFileTypes: true });
  // book.addAsset(file);
  book.addAssets(files);
}

function getDirContents(dirPath) {
  // TODO throw error if path is not a dir
  const fullPaths = [];
  fs.readdirSync(dirPath).forEach(filename => {
    fullPaths.push(path.resolve(dirPath, filename))
  });
  return fullPaths;
}

ipcMain.on('processFiles', (event, directories) => {
  // arg: Array<string> the array of files paths
  console.log(directories); // prints "ping"
  event.returnValue = 'pong';
  const books = [];
  directories.forEach(directory => {
    const fileName = path.basename(directory);
    const dirName = path.dirname(directory);
    const book = new Book(dirName, fileName);
    books.push(book);
  });
  
  let i = 0;
  const buffer = [];
  books.forEach(book => {
      //console.clear();

      i++;
      const progress = {
        currentIndex: i,
        count: books.length,
        processingTitle: book.name
      }
      console.info(`Processing ${i} of ${books.length} folders...`);
      updateProgress(progress);
      readBookContent(book);
      const fileName = book.name;

      const outputPath = path.resolve(userPreference.outputPath, `${fileName}.cbz`);
      if (buffer.length > 0) {
          buffer.forEach(line => { console.warn(line); });
      }

      const fileExists = fs.existsSync(outputPath);
      if (fileExists) {
          buffer.push(`file: ${fileName} exsited in ${outputPath}, skipping.`);
          return;
      }

      const zip = new Zip();
      const files = getDirContents(book.path);

      zip.addFiles(files);
      // zip.save(outputPath);
      console.info(outputPath);
  });
  const progress = {
    currentIndex: i,
    count: books.length,
    processingTitle: null
  };
  updateProgress(progress);
});

ipcMain.on('setOutputPath', (event, arg) => {
  console.log(arg);
});

// ipcMain.send('restoreUserPreference', userPreference);


const createWindow = () => {
  mainWindow = new BrowserWindow({ width: 1600, height: 600, show: true, webPreferences: {
    backgroundColor: '#FFF', // Add this new line
    nodeIntegration: true,
    contextIsolation: false,
  }});
  mainWindow.loadURL(
    !app.isPackaged
      ? process.env.ELECTRON_START_URL
      : url.format({
          pathname: path.join(__dirname, '../index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.send('restoreUserPreference', userPreference);
  });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});