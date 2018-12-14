const progressSound = require('../progress.mp3');
const winSound = require('../win.mp3');
const lostSound = require('../lost.mp3');

export function progressSounds (val=1) {
    const audio = new Audio(progressSound);
    audio.volume= val;
    audio.autoplay=true;
    audio.play();
}
export function winSounds (val=1) {
    const audio = new Audio(winSound);
    audio.volume= val;
    audio.autoplay=true;
    audio.play();
}
export function lostSounds  (val=1) {
    const audio = new Audio(lostSound);
    audio.volume= val;
    audio.autoplay=true;
    audio.play();
}