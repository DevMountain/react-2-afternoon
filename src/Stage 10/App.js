import React, { Component } from 'react';

import Employee from './models/Employee';

// components
import Header from './components/Header';

class App extends Component {
  // constructor

  // selectEmployee

  // refresh

  render() {
    return (
      <div id="app">
        <Header />
        <div className="main-container">
          // render EmployeeList here
          // render EmployeeEditor here
        </div>
      </div>
    )
  }
}

export default App;
