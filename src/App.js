import React, { Component } from 'react';
import './App.css';
import CatchButton from './components/catchButton';
import { progressSounds, winSounds, lostSounds } from './components/sounds';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      started:false
    }
  }
  componentWillMount(){
    progressSounds();
    lostSounds();
    winSounds();
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
         <h2 className="appName">5 SECONDS RULES!</h2>

         <button className="letsGo" onMouseDown={this.startGame} onTouchStart={this.startGame}>GO!</button>
          <h2>It's simple!</h2>
          <h3>Press and Hold</h3>
           <h3>Name 3 things in 5 seconds</h3>
           <h3>Release!</h3>
         {/* <h3>NAME + RELEASE = WIN!</h3>
         <h3>OR</h3>
         <h3>FAIL + HOLD = LOSE!</h3> */}
        </div>
      );
      }
  }
}

export default App;