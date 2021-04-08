import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';

import reportWebVitals from './reportWebVitals';


// Declare a new state variable, which we'll call "count"
// const [files, setFiles] = useState([]);

ReactDOM.render(
  <React.StrictMode>
    <App className="viewport" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
