import React, { Component } from 'react';
import './App.css';
import CatchButton from './components/catchButton';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      started:false
    }
  }
  startGame = () => {
    this.setState({
      started:true
    })
  }
  render() {
    if(this.state.started){
      return (
        <div className="App">
        <CatchButton />
        </div>
      );
    }else{
      return (
        <div className="App">
         <h2>Welcome to the</h2>
         <h1>5 SECONDS RULE!</h1>
        <button className="letsGo" onClick={this.startGame}>Let's GO!</button>
        <h4>Once you press AND Hold the button you will be displayed your theme and the timer starts</h4>
          <h3>Name 3 things + release the button = YOU WIN!</h3>
          <h3>Fail to name + Hold The button = YOU LOSE!</h3>
        </div>
      );
    }

  }
}

export default App;