import React, { Component } from 'react';
import RenderCanvas from '../renderCanvas';

const App = class App extends Component {
  state = {}
  render() {
    return (
      <div>
        <RenderCanvas />
      </div>
    );
  }
};

export default App;
