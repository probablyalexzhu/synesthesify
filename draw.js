var image = document.querySelector("img");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

function copyImageToCanvas() {
    
}

function location(){

}
// where arr is an array containing all the yet to use songs
function remaining(arr){
    for (var i = 0; i<=arr.length; i++){
        let x = Math.floor(Math.random()*800);
        let y = Math.floor(Math.random()*800);
        draw(arr[i], x, y);
    }
}
function draw(song, x, y){

}
