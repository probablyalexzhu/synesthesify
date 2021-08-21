//important 
//var image = document.querySelector("img");
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
const canvasSize = 500; //500x500 pixel size
let section_size;
//let songsFile = require('./data.json');
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
    constructor(a,b,c,d,e,f){
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
        let obj = songFeaturesArray[i];
        let tempo = obj.tempo;
        let a;
        switch(tempo){
            case tempo >= 160:
                a = new rgb(240, 10 , 10);
                break;

            case tempo >= 150:
                a = new rgb (245, 137, 10);
                break;
            
            case tempo >= 140:
                a = new rgb (245, 245, 10);
                break;
            case tempo >= 130:
                a = new rgb(20, 240, 15);
                break;
            case tempo >= 120:
                a = new rgb(20, 180, 15);
                break;
            case tempo >= 110:
                a = new rgb(15, 210, 220);
                break;
            case tempo >= 100:
                a = new rgb(15, 20, 224);
                break;
            case tempo >= 90:
                a = new rgb(100, 30, 120);
                break;
            default:
                a = new rgb(120, 80, 30);
                break;
        }
        
        let speech = obj.speechiness;
        let b;

        switch(speech){
            case speech>0.35:
                b = 0;
                break;
            case speech>0.25:
                b = 1;
                break;
            case speech > 0.1:
                b = 2
                break;
            default:
                b = 3
        }
        
        let energy = obj.energy;
        let c;

        switch(energy){
            case energy > 0.5:
                c = 3;
                break; 
            case energy > 0.3:
                c = 2;
                break;
            default:
                c = 1;
                break;
        }

        let acou = obj.acousticness;
        let d = Math.floor(acou * 10 + 1);
        
        let bright = obj.valence;
        let e = Math.floor(bright * 10 + 1);

        let dance = obj.danceability;
        let f = 0.4 * (1-dance) + dance;
        
        songs[i] = new songData(a,b,c,d,e,f)
    }
}

function getSectionCoordinates(numberOfSongs){
    const sqr = Math.floor(Math.sqrt(numberOfSongs))
    section_size = Math.floor(canvasSize/sqr);
    let size = section_size;
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
    let abst = song.abstractness;
    let shape_count;
    let tl = coords.tl;
    let br = coords.br;
    switch(abst){

    }
        
    let energy = song.energy;
    switch(energy){
        case 3:
            for (let i = 0; i < shape_count; i++){
                ctx.beginPath();
                let centerx = randomNumber(section_size-2);
                let centery = randomNumber(section_size-2)
                let rad = randomNumber(section_size/2);
                ctx.arc(centerx + tl.x, centery+ tl.y, rad, 0, 2*Math.PI);
                ctx.stroke();
            }
            break;

        case 2:
            for (let i = )
//stuff to do: stroke colour, stroke width 
    }
    
}
function copyImageToCanvas() {
    
}
