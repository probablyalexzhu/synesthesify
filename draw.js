var image = document.querySelector("img");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
let songsFile = require('./data.json');
var songs = [];


function copyImageToCanvas() {
    
}

function location(){

}
// where arr is an array containing all the yet to use songs
function remaining(arr){
    const coordarray = getSectionCoordinates(arr.length);
    for (var i = 0; i<=arr.length; i++){
        draw(arr[i], coordarray[i]);
    }
}
function draw(song, coords){

}

const canvasSize = 500;

function randomNumber(size){
    const h = Math.random()*size+1;
    return Math.floor(h);
}
class coordinate{
    constructor(x,y){
        this.x=x; this.y=y;
    }
}

class rectangle{
    //tl is top left, br = bottom right
    constructor (a,b,c,d){
        this.tl = new coordinate(a,b);
        this.br = new coordinate(c,d);
    }
}
function getSectionCoordinates(numberOfSongs){
    const sqr = Math.floor(Math.sqrt(numberOfSongs))
    const size = Math.floor(canvasSize/sqr);
    const leftover = numberOfSongs - (sqr*sqr)
    arr = [];
    for(i=0;i+size<=canvasSize;i+=size){
        for(j=0;j+size<=canvasSize;j+=size){
            arr.push(new rectangle(i,j,i+size,j+size))
        }
    }
    for(i=0;i<leftover;i++){
        let randomx = randomNumber(canvasSize-size)-1;
        let randomy = randomNumber(canvasSize-size)-1;
        arr.push(new rectangle(randomx,randomy,randomx+size,randomy=size));
    }
    console.log(arr);
}
getSectionCoordinates(18)
