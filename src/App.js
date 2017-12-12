import React, { Component } from 'react';
import RenderCanvas from './Components/RenderCanvas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <RenderCanvas />
      </div>
    );
  }
}

export default App;