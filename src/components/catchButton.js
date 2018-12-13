import React, { Component } from 'react';
const progressSound = require('../progress.mp3');
const winSound = require('../win.mp3');
const lostSound = require('../lost.mp3');

class CatchButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            phrases:[
             "Car Brands", "Clothing Brands", "Tech Brands","Fast Food Brands","Alcohol Brands","Fashion Brands","Cosmetics Brands",
             "Bald Celebrities", "Tall People","Tall Celebrities", "Short Celebrities","Actors","Rappers","American Presidents","Moldovan Presidents","Bad Actors","TV Shows","Musicians","Metal Bands","Famous Painters","Famous Inventors","Famous Youtubers","Celebrity Crushes","Celebrity Blondes","Sport Teams",
             "PornStars","Sex Positions","Curse Words","Funny Sounds","Sad Sounds","Weird Sounds","Fart Sounds","Creepy Sounds","Funny Words","Types of Laughter",
             "Girl Names","Boy Names","Dog Names","Cat Names","Russian Names","American Names","Romanian Names",
             "Antonyms of 'Good'", "Antonyms of 'Pretty'","Antonyms of 'Funny'","Antonyms of 'Slow'","Antonyms of 'Sad'",
             "Synonyms of 'Butt'","Synonyms of 'Stupid'", "Synonyms of 'Funny'","Synonyms of 'Lazy'", "Synonyms of 'Hard'",
             "Things that are 'HEAVY'","Things that are 'BORING'","Things that are 'HARD'","Things that are 'SOFT'", "Things that are 'FUN'","Things that 'SMELL BAD'",
             "That rhyme with 'SNOW'","That rhyme with 'CAR'","That rhyme with 'SPORT'","That rhyme with 'FLY'","That rhyme with 'POOP'","That rhyme with 'BOX'","That rhyme with 'DOG'","That rhyme with 'DOOR'","That rhyme with 'CARE'","That rhyme with 'BUG'","That rhyme with 'STAY'","That rhyme with 'BOOK'","That rhyme with 'WAVE'","That rhyme with 'SLIME'",
             "Colors","Liquids", "Gasses","Planets","Stars","Zodiac Signs","Constellations","Oceans","Seas","Days of the week","Countries","Cities in USA","Cities in Europe",
             "Car Parts", "Computer Parts","Human Organs","Bird Organs","Gadgets","Body Parts", "Kitchen Utensils",
             "Vegetables","Green Vegetables","Yellow Fruits","Red Vegetables","Red Fruits","Milk Products",
             "Tree Species", "Green Animals", "Drugs", "Sweets","Blue Animals","Black & White Animals","Brown Animals","Fish Names","Insects","Birds","Reptiles",
             "Books", "Movies","Sci-Fy Movies","Comedies","Drama Movies", "Horror Movies","Good Books","Video Games", "Games","Animes","Anime Characters","Ceremonies",
             "Marvel Characters","DC Characters","Game of Thrones",
             "Snacks", "Exotic Food", "Food", "Cocktails",
             "Eat on Bread","Eat with wine","Eat With Spoon","Eat with Fork","Eat with Hands",
             "Foods you HATE", "Foods you LOVE","Animals you Like","Animals you are afraid of","Beautiful WOMEN","Beautiful MEN"
            ],
            phrase:"----------",
            visibility:"invisible",
            timer:'5',
            message:"Press and hold to start game",
            gameStatus : true,
            buttonClass:"unclicked"
        }
    }
componentWillMount(){
    this.progressSound(0);
    this.lostSound(0);
    this.winSound(0);
    console.log(this.state.phrases.length)
}
touchStartHandler = () => {
    this.setState({
        timer:5,
        visibility:"visible",
        phrase:this.state.phrases[Math.floor(this.state.phrases.length*Math.random())],
        buttonClass:'clicked',
        message:'✔'
    })
    var intervalId = setInterval(this.countTime, 1000);
    this.setState({intervalId: intervalId});
}

touchEndHandler = () => {
    clearInterval(this.state.intervalId);

    if(this.state.gameStatus){
    this.winSound();
    window.navigator.vibrate([200, 200, 200]);
    this.setState({
        timer:'✔',
        message:"!GOOD JOB!",
        buttonClass:'won'
    })
    setTimeout(()=>{    this.setState({
        timer:5,
        message:'Press and hold to get new quote',
        visibility:"invisible",
        buttonClass:"unclicked"
    })},1000)
}else{
      this.setState({
        timer:'5',
        message:'Press and hold to get new quote',
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
        timer:'❌',
        message:"!YOU LOST!",
        gameStatus:false,
        buttonClass:'lost'
    });
    window.navigator.vibrate(600);
    document.getElementById("mainBtn").disabled = true;
    setTimeout(()=>{this.setState({ timer:'5',message:'Release and try again'});document.getElementById("mainBtn").disabled = false;},2000)
}
else{
    this.progressSound(); 
}
}
progressSound = (val=1) => {
    const audio = new Audio(progressSound);
    audio.volume= val;
    audio.play();
}
winSound = (val=1) => {
    const audio = new Audio(winSound);
    audio.volume= val;
    audio.play();
}
lostSound = (val=1) => {
    const audio = new Audio(lostSound);
    audio.volume= val;
    audio.play();
}

  render() {
    return (
      <div className="game">
          
          <h1 className="appName">5 SECONDS RULE!</h1>
          <h1 className="text1">Name 3</h1>
          <h1 className={this.state.visibility }>{this.state.phrase} </h1>
          <h1 className="timer">{this.state.timer}</h1>
          <button id="mainBtn" className={this.state.buttonClass} onTouchStart={this.touchStartHandler} onMouseDown={this.touchStartHandler} onTouchEnd={this.touchEndHandler} onMouseUp={this.touchEndHandler}><h2>{this.state.message}</h2></button>
      </div>
    )
  }
}

export default CatchButton;
