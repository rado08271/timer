import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Timer} from "./timer/timer";

function App() {
  return (
    <Timer countdown={20}/>
  );
}

export default App;
