const fs = require('fs-extra');
const { Zip } = require('./models/zip.js');
const path = require('path');
const { Book}  = require('./models/book.js');

// const regx = /^\[.*\]\ /;
const regx = /^.*/;

// const cwd = path.resolve(process.cwd());
const cwd = 'C:/Users/Jason/Downloads/_sample';
const output = 'C:/Users/Jason/Downloads/_output';

function getDirContents(dirPath) {
    // TODO throw error if path is not a dir
    const fullPathes = [];
    fs.readdirSync(dirPath).forEach(filename => {
        fullPathes.push(path.resolve(dirPath, filename))
    });
    return fullPathes;
}

function readBookContent(book) {

    const fileName = book.name;

    const files = fs.readdirSync(book.path, { withFileTypes: true });
    // book.addAsset(file);
    book.addAssets(files);
}

class App {

    static main() {
        console.log('Welcome to Bookie');
        const books = [];
        const directory = cwd;
        fs.readdirSync(directory, { withFileTypes: true })
            .forEach(
                file => {
                    const found = file.name.match(regx);
                    if (file.isDirectory && found) {
                        const book = new Book(directory, file.name);
                        // const fullPath = file.name;
                        // const fullPath = getAbsolutePath(file.name);
                        books.push(book);
                    }
                }
            );

        let i = 0;
        const buffer = [];
        books.forEach(book => {
            //console.clear();

            i++;
            console.info(`Processing ${i} of ${books.length} folders...`);
            readBookContent(book);
            const fileName = book.name;

            const outputPath = path.resolve(output, `${fileName}.cbz`);
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
            zip.save(outputPath);
            console.info(outputPath);
        });
    }
}

App.main();
