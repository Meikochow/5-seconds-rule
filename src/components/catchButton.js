import React, { Component } from 'react'
const progressSound = require('../progress.mp3');
const winSound = require('../win.mp3')
const lostSound = require('../lost.mp3')

class CatchButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            phrases:[
             "Car Brands", "Clothing Brands", "Tech Brands",
             "Bald Celebrities", "Tall People", "Short Celebrities","Actors","Rappers",
             "Sex Positions","Synonims of butt","Curse Words", "Antonyms of Good",
             "Colors", "Furniture Pieces", "Liquids", "Gasses",
             "Tree Species", "Animals", "Drugs", "Sweets",
             "Book Names", "Good Movies", "Tasty Snacks", "Exotic Food"
            ],
            phrase:"----------",
            visibility:"invisible",
            timer:'Press and hold to start game',
            gameStatus : true,
            buttonClass:"unclicked"
        }
    }

touchStartHandler = () => {
    this.setState({
        timer:5,
        visibility:"visible",
        phrase:this.state.phrases[Math.round(this.state.phrases.length*Math.random())],
        buttonClass:'clicked'
    })
    var intervalId = setInterval(this.countTime, 1000);
    this.setState({intervalId: intervalId});
}

touchEndHandler = () => {
    clearInterval(this.state.intervalId);

    if(this.state.gameStatus){
    this.winSound();
    this.setState({
        timer:'!GOOD JOB!',
        buttonClass:'won'
    })
    setTimeout(()=>{    this.setState({
        timer:'Press and hold to get new quote',
        visibility:"invisible",
        buttonClass:"unclicked"
    })},1000)
}else{
      this.setState({
        timer:'Press and hold to get new quote',
        gameStatus:true,
        visibility:"invisible",
        buttonClass:"unclicked"
      })
}

}
countTime = () => {     
this.setState({
    timer:this.state.timer-1
});
this.checkTheTime();
}

checkTheTime = () => {
if(this.state.timer ===0){
    clearInterval(this.state.intervalId);
    this.lostSound();
    this.setState({
        timer:'!YOU LOST!',
        gameStatus:false,
        buttonClass:'lost'
    });
    window.navigator.vibrate(500);
    
    setTimeout(()=>{this.setState({ timer:'Release and try again'});},1000)
}
else{
    this.progressSound(); 
}
}
progressSound = () => {
    const audio = new Audio(progressSound);
    audio.play();
}
winSound = () => {
    const audio = new Audio(winSound);
    audio.play();
}
lostSound = () => {
    const audio = new Audio(lostSound);
    audio.play();
}

  render() {
    return (
      <div className="game">
          <h1 className="text1">In 5 SECONDS!</h1>
          <h1 className="text2">Name 3</h1>
          <h1 className={this.state.visibility }>{this.state.phrase} </h1>
          <button className={this.state.buttonClass} onTouchStart={this.touchStartHandler} onTouchEnd={this.touchEndHandler}><h2>{this.state.timer}</h2></button>
      </div>
    )
  }
}

export default CatchButton;
