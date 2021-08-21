//important 
var image = document.querySelector("img");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
const canvasSize = 500; //500x500 pixel size
let songsFile = require('./data.json');
var songs = [];

//classes
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
class songData{
    constructor(a,b,c,d, e, f){
        //tempo
        this.hue = a; //(string of form(rgb(x,y,z))) 0<=x,y,z<=255
        //speechiness
        this.abstractness=b; //0-only image,1-image+shapes,2-a few shapes, no image, 3- lots of shapes
        //energy
        this.shape = c; //1-square,2-rectangle,3-circle
        //acousticness
        this.texture=d; //level of gradient
        //valence
        this.brightness = e; //constant sum added to all rgb values
        //danceability
        this.opacity = f; //level of opacity
    }
}
class rgb{
    constructor(r,b,g){
        this.r=r; this.b=b; this.g=g;
    }
}


//methods
function randomNumber(size){
    const h = Math.random()*size+1;
    return Math.floor(h);
}


function getSongArray(){
    for(let i= 0;i<songFeaturesArray.length;i++){

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
    return arr;
}

// where arr is an array containing all the yet to use songs
function drawFromArray(){
    const coordarray = getSectionCoordinates(songs.length);
    for (var i = 0; i<=songs.length; i++){
        draw(songs[i], coordarray[i]);
    }
}
function draw(song, coords){
    
}
function copyImageToCanvas() {
    
}
