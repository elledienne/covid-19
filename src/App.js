import React from 'react';
import './App.css';

import GetCountries from "./Components/GetCountries";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Corona Data
        </p>
      </header>
      <GetCountries />
    </div>
  );
}

export default App;
