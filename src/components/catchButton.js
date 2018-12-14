import React, { Component } from 'react';
import { progressSounds, winSounds, lostSounds } from './sounds';

class CatchButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            phrases:[
             "Car Brands", "Clothing Brands", "Tech Brands","Fast Food Brands","Alcohol Brands","Fashion Brands","Cosmetics Brands",
             "Bald Celebrities", "Tall People","Tall Celebrities", "Short Celebrities","Actors","Rappers","American Presidents","Moldovan Presidents","Bad Actors","TV Shows","Musicians","Metal Bands","Famous Painters","Famous Inventors","Famous Youtubers","Celebrity Crushes","Celebrity Blondes","Sport Teams",
             "PornStars","Curse Words","Funny Sounds","Sad Sounds","Weird Sounds","Fart Sounds","Creepy Sounds","Funny Words","Types of Laughter",
             "Girl Names","Boy Names","Dog Names","Cat Names","Russian Names","American Names","Romanian Names",
             "Antonyms of 'Good'", "Antonyms of 'Pretty'","Antonyms of 'Funny'","Antonyms of 'Slow'","Antonyms of 'Sad'",
             "Synonyms of 'Butt'","Synonyms of 'Stupid'", "Synonyms of 'Funny'","Synonyms of 'Lazy'", "Synonyms of 'Hard'",
             "Things that are 'HEAVY'","Things that are 'BORING'","Things that are 'HARD'","Things that are 'SOFT'", "Things that are 'FUN'","Things that 'SMELL BAD'",
             "That rhyme with 'SNOW'","That rhyme with 'CAR'","That rhyme with 'SPORT'","That rhyme with 'FLY'","That rhyme with 'POOP'","That rhyme with 'BOX'","That rhyme with 'DOG'","That rhyme with 'DOOR'","That rhyme with 'CARE'","That rhyme with 'BUG'","That rhyme with 'STAY'","That rhyme with 'BOOK'","That rhyme with 'WAVE'","That rhyme with 'SLIME'","That rhyme with 'CUTE'",
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
            backUp:[],
            placeHolder:["🐛","👽","⛄","👾","🐵","🐲","🦄","😼","😸", "🐱", "👤","🐱","🐭","🐹","🐰","🐊","🐍","🐳","🕊","🐝","🐦","🐣"],
            phrase:"🗣",
            timer:'5',
            message:"Press and hold to start game",
            gameStatus : true,
            pressure:"hsl(100, 100%, 50%)"
        }
    }
touchStartHandler = () => {

     let random = this.getRandom();
     let randomPhrase = this.state.phrases[random]
     let addBackUp = [...this.state.backUp,randomPhrase];
     let updatedPhrases = this.state.phrases;
     updatedPhrases.splice(random,1);
    this.setState({
        timer:5,
        phrase:randomPhrase,
        backUp:addBackUp,
        phrases:updatedPhrases
    })
    if(this.state.phrases.length===0){
    this.setState({phrases:[...this.state.backUp,randomPhrase],backUp:[]});
    }
    var intervalId = setInterval(this.countTime, 1000);
    this.setState({intervalId: intervalId});

}

touchEndHandler = () => {
    
    if(this.state.gameStatus){
       this.youWon();
}else{
      this.setState({
        timer:'5',
        message:'Press and hold to get new quote',
        gameStatus:true,
        pressure:"hsl(100, 100%, 50%)",
        phrase:this.state.placeHolder[Math.floor(this.state.placeHolder.length*Math.random())]
      })
   }
}
youWon = () => {
    clearInterval(this.state.intervalId);
    winSounds();
    window.navigator.vibrate([300, 300, 300]);
    this.setState({
        timer:5,
        message:"GOOD JOB",
        pressure:"hsl(100, 100%, 50%)",
        phrase:this.state.placeHolder[Math.floor(this.state.placeHolder.length*Math.random())]
    })
}
youLost = () => {
    clearInterval(this.state.intervalId);
    lostSounds();
    window.navigator.vibrate(600);
    this.setState({
        phrase:"❌",
        timer:'❌',
        message:"YOU LOST",
        gameStatus:false
    });
}
countTime = () => {   
this.setState({
    timer:this.state.timer-1
});
this.checkTheTime();
}

checkTheTime = () => {
if(this.state.timer ===0){
    this.youLost();
}else{
    progressSounds(); 
    this.pressure();  
    }
}

pressure(){
    this.setState({pressure:"hsl("+this.state.timer*20+", 100%, 50%)"});
}
getRandom = function(){
        return Math.floor(Math.random()*this.state.phrases.length)
}
  render() {
    return (
      <div className="game">
          <h1 className="appName">
          <h1 className="timer">
          {this.state.timer}
          </h1> SECONDS RULE!</h1>
          <h1 className="screen">{this.state.phrase} </h1>
          <button 
             id="mainBtn"  
             onTouchStart={this.touchStartHandler} 
             onMouseDown={this.touchStartHandler} 
             onTouchEnd={this.touchEndHandler} 
             onMouseUp={this.touchEndHandler} 
             style={{'background':this.state.pressure}}>
             <h2>{this.state.message}</h2>
             </button>
      </div>
    )
  }
}

export default CatchButton;
