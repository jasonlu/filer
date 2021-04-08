import "./App.css";

import { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DropOverlay from "@components/drop-overlay/drop-overlay";
import List from "@components/list/list";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import logo from "@images/logo.svg";
import styled from "styled-components";

// In renderer process (web page).
import { ipcRenderer } from "electron";
import TextField from '@material-ui/core/TextField'

const ActionSection = styled.section`
  margin: 30px 0;
  width: 100%;
`;

function App() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const [processing, setProcessing] = useState(false);
  const [outputPath, setOutputPath] = useState('');
  

  function fileDrop(event) {
    console.log(event);
    setDragging(false);

    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setFiles(files);
  }

  // effects hooks triggers every time observing object changes
  // It triggers at lease once during initialization phase
  useEffect(() => {
    document.addEventListener("drop", fileDrop);
    document.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    document.addEventListener("dragenter", (event) => {
      console.log("drag enter");
      event.preventDefault();
      event.stopPropagation();
      setDragging(true);
    }, true);
    document.addEventListener("dragleave", (event) => {
      console.log("drag leave");
      event.preventDefault();
      setDragging(false);
    });
  }, []);

  useEffect(() => {
    console.log(selectedFiles);
  });

  ipcRenderer.on('restoreUserPreference', (event, userPreference) => {
    setOutputPath(userPreference.outputPath);
  });

  ipcRenderer.on('updateProgress', (event, progress) => {
    console.log(progress);
  });

  function setOutputPathOnElectron (theOutputPath) {
    ipcRenderer.send('setOutputPath', theOutputPath);
  }

  function listItemSelectedChange(file, checked) {
    if (checked) {
      selectedFiles.add(file);
    } else {
      selectedFiles.delete(file);
    }
    // console.log(selectedFiles);
  }

  function clearButtonClick (event) {
    setSelectedFiles(new Set());
  }

  function resetButtonClick (event) {
    setFiles([]);
    setSelectedFiles(new Set());
  }

  function startButtonClick (event) {
    const filesArray = [];
    selectedFiles.forEach(f => filesArray.push(f.path) );
    // const payload = JSON.stringify(filesArray);
    ipcRenderer.send('processFiles', filesArray);
    setProcessing(true);
  }

  function isStartButtonDisabled () {
    return selectedFiles.size === 0 || processing;
  }

  function outputPathChange (event) {
    const newValue = event.target.value;
    setOutputPath(newValue);
    console.log(newValue);
    setOutputPathOnElectron(newValue);
  }

  return (
    <div className={`App viewport ${dragging ? "dragging" : ""}`}>
      <DropOverlay dragging={dragging}/>
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section>
          <h1>Filer</h1>
          <TextField
            id="outputPath"
            label="Output path"
            variant="standard"
            value={outputPath}
            onChange={outputPathChange}
            
          />
          <List
            files={files}
            selectedFiles={selectedFiles}
            onSelectedChange={listItemSelectedChange}
          />
        </section>
        <ActionSection>
          <Button
            variant="contained"
            color="primary"
            // disabled={isStartButtonDisabled()}
            startIcon={<PlayArrowOutlinedIcon />}
            onClick={startButtonClick}
          >
            Start
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<RotateLeftOutlinedIcon />}
            onClick={clearButtonClick}
          >
            Clear
          </Button>

          <Button
            variant="contained"
            color="default"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={resetButtonClick}
          >
            Reset
          </Button>
        </ActionSection>
      </>
    </div>
  );
}

export default App;
