function hugeApp(){

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
        constructor(r,g,b){
            this.r=r; this.b=b; this.g=g;
        }
    }
    
    
    //helper methods
    function reset(){
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black"
        ctx.clearRect(0,0,500,500)
        songs =[]; 
        console.log(songs)
    }
    function randomNumber(size){
        const h = Math.random()*size+1;
        return Math.floor(h);
    }
    function numsToRGB(r,g,b){
        if(r<0) r=0;
        if(g<0) g=0;
        if(b<0) b=0;
        if(r>255) r=255;
        if(g>255) g=255;
        if(b>255) b=255;
        return "rgb("+r.toString()+","+g.toString()+","+b.toString()+")"
    }
    
    //run functions
    let avg_tempo = 0;
    reset();
    getSongArray();
    drawFromArray();
    //main functions
    
    function getSongArray(){
        for(let i= 0;i<songFeaturesArray.length;i++){
            let obj = songFeaturesArray[i];
            let tempo = obj.tempo;
            avg_tempo += tempo;
            let a;
            switch(true){
                case tempo>= 160:
                    a = new rgb(240, 10 , 10);
                    break;
    
                case tempo >= 150:
                    a = new rgb (245, 137, 10);
                    break;
                
                case tempo >= 141:
                    a = new rgb (245, 245, 10);
                    break;
                case tempo >= 132:
                    a = new rgb(20, 240, 15);
                    break;
                case tempo >= 125:
                    a = new rgb(20, 180, 15);
                    break;
                case tempo >= 112:
                    a = new rgb(15, 210, 220);
                    break;
                case tempo >= 101:
                    a = new rgb(15, 20, 224);
                    break;
                case tempo >= 91:
                    a = new rgb(100, 30, 120);
                    break;
                default:
                    a = new rgb(120, 80, 30);
                    break;
            }
            
            let speech = obj.speechiness;
            let b;
    
            switch(true){
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
    
            switch(true){
                case energy > 0.75:
                    c = 3;
                    break;
                case energy > 0.6:
                    c = 2;
                    break; 
                case energy > 0.5:
                    c = 1;
                    break;
                default:
                    c = 0;
                    break;
            }
    
            let acou = obj.acousticness;
            let d = Math.floor(acou * 10 + 1);
            
            let bright = obj.valence;
            let e = Math.floor(bright * 10 + 1);
    
            let dance = obj.danceability;
            let f = 0.6 * (1-dance) + dance - (Math.random()/3);
            
            songs[i] = new songData(a,b,c,d,e,f)
        }
        avg_tempo/=songFeaturesArray.length;
        console.log(songs);
        songFeaturesArray = [];
    }
    
    function getSectionCoordinates(numberOfSongs){
        const sqr = Math.floor(Math.sqrt(numberOfSongs))
        section_size = Math.floor(canvasSize/sqr);
        let size = section_size;
        const leftover = numberOfSongs - (sqr*sqr)
        arr = [];
        for(i=0;i+size<=canvasSize;i+=size){
            for(j=0;j+size<=canvasSize;j+=size){
                let random123 = randomNumber(size/3);
                let random1234 = randomNumber(size/3);
                arr.push(new rectangle(i,j,i+size+random123,j+size+random1234))
            }
        }
        for(i=0;i<leftover;i++){
            let randomx = randomNumber(canvasSize-size)-1;
            let randomy = randomNumber(canvasSize-size)-1;

            arr.push(new rectangle(randomx,randomy,randomx+size,randomy+size));
        }
        return arr;
    }
    
    // goes through songs[], driver code for all drawing methods
    function drawFromArray(){
        const coordArray = getSectionCoordinates(songs.length);
        console.log(coordArray[0].tl);
        drawBackground(avg_tempo);
        for (var i = 0; i<songs.length; i++){
            draw(songs[i], coordArray[i]);
        }
    }
    function drawBackground(avg_tempo){
        let a;
        switch(true){
            case avg_tempo >= 155:
                a = new rgb(240, 10 , 10);
                break;
            case avg_tempo >= 145:
                a = new rgb (245, 137, 10);
                break;
            case avg_tempo >= 135:
                a = new rgb (245, 245, 10);
                break;
            case avg_tempo >= 125:
                a = new rgb(20, 240, 15);
                break;
            case avg_tempo >= 114:
                a = new rgb(20, 180, 15);
                break;
            case avg_tempo >= 107:
                a = new rgb(15, 210, 220);
                break;
            case avg_tempo >= 100:
                a = new rgb(15, 20, 224);
                break;
            case avg_tempo >= 90:
                a = new rgb(100, 30, 120);
                break;
            default:
                a = new rgb(120, 80, 30);
                break;
        }
        let grd = ctx.createRadialGradient(250,250,0,250,250,350);
        grd.addColorStop(0.6,numsToRGB(a.r,a.g,a.b));
        grd.addColorStop(1,"white");
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,500,500)
    }
    function draw(song, coords){
        let tl = coords.tl;
        let br = coords.br;
        //opacity -- set opacity, change stroke size
        ctx.globalAlpha=song.opacity;
        ctx.lineWidth=song.opacity * 6;
        //hue -- get base color
        let cur_rgb  = song.hue;
        //brightness -- change the hue by certain amount, add randomness
        let bright = song.brightness;
        let r1 = randomNumber(6)-4; let r2 = randomNumber(6)-4; let r3 = randomNumber(6)-4;
        cur_rgb.r+=bright-10+r1;
        cur_rgb.g+=bright-10+r2;
        cur_rgb.b+=bright-10+r3;
        
        //texture -- fill it in with gradient
        let r4 = randomNumber(4);
        switch(r4){
            case 4:
                grad = ctx.createLinearGradient(tl.x,tl.y,br.x,br.y);
                grad.addColorStop(0,numsToRGB(cur_rgb.r-15,cur_rgb.g-15,cur_rgb.b-15));
                grad.addColorStop(1,numsToRGB(cur_rgb.r+15,cur_rgb.g+15,cur_rgb.b+15));
                ctx.fillStyle = grad;
                ctx.fillRect(tl.x,tl.y,br.x,br.y);
                break;
            case 3:
                grad = ctx.createLinearGradient(br.x,br.y,tl.x,tl.y);
                grad.addColorStop(0,numsToRGB(cur_rgb.r-15,cur_rgb.g-15,cur_rgb.b-15));
                grad.addColorStop(1,numsToRGB(cur_rgb.r+15,cur_rgb.g+15,cur_rgb.b+15));
                ctx.fillStyle = grad;
                ctx.fillRect(br.x,br.y,tl.x,tl.y);
                break;
            case 2:
                grad = ctx.createLinearGradient(br.x,tl.y,tl.x,br.y);
                grad.addColorStop(0,numsToRGB(cur_rgb.r-15,cur_rgb.g-15,cur_rgb.b-15));
                grad.addColorStop(1,numsToRGB(cur_rgb.r+15,cur_rgb.g+15,cur_rgb.b+15));
                ctx.fillStyle = grad;
                ctx.fillRect(br.x,tl.y,tl.x,br.y);
                break;
            case 1:
                grad = ctx.createLinearGradient(tl.x,br.y,br.x,tl.y);
                grad.addColorStop(0,numsToRGB(cur_rgb.r-15,cur_rgb.g-15,cur_rgb.b-15));
                grad.addColorStop(1,numsToRGB(cur_rgb.r+15,cur_rgb.g+15,cur_rgb.b+15));
                ctx.fillStyle = grad;
                ctx.fillRect(tl.x,br.y,br.x,tl.y);
                break;
        }
    
        //abstractness -- get shape count and possibly get image
        let abst = song.abstractness;
        let shape_count= 0;
        
        switch(abst){
            case 3:
                shape_count=2;
                break;
            case 2:
                shape_count = 2;
                break;
            case 1:
                shape_count = 1;
                copyImageToCanvas(); break;
            case 0:
                copyImageToCanvas(); break; 
        }
        
        
        //energy -- draw the shapes --circles,rectangles,lines
        let energy = song.shape;
        switch(energy){

            case 3: //triangle
                for (let i = 0; i < shape_count; i++){
                    let point1 = {'x' :randomNumber(section_size-2)+tl.x, 'y': randomNumber(section_size-2)+tl.y};
                    let point2 = {'x' :randomNumber(section_size-2)+tl.x, 'y': randomNumber(section_size-2)+tl.y};
                    let point3 = {'x' :randomNumber(section_size-2)+tl.x, 'y': randomNumber(section_size-2)+tl.y};
                    ctx.beginPath();
                    ctx.moveTo(point1.x, point1.y);
                    ctx.lineTo(point2.x, point2.y);
                    ctx.lineTo(point3.x, point3.y);
                    ctx.closePath();
                    ctx.stroke();

                }
            
            case 2: //circle
                for (let i = 0; i < shape_count; i++){
                    ctx.beginPath();
                    let red_r = randomNumber(200), green_r = randomNumber(200), blue_r = randomNumber(200);
                    if(Math.random()<0.25) ctx.strokeStyle = numsToRGB(red_r,green_r,blue_r);
                    else ctx.strokeStyle = "black";
                    let centerx = randomNumber(section_size-2)+ tl.x;
                    let centery = randomNumber(section_size-2)+ tl.y;
                    let rad = randomNumber(section_size/2);
                    ctx.arc(centerx , centery, rad, 0, 2*Math.PI);
                    ctx.stroke();
                }
                break;
    
            case 1: //rectangle
                for (let i = 0; i < shape_count; i++){
                    let centerx = randomNumber(section_size-2)+tl.x;
                    let centery = randomNumber(section_size-2) + tl.y;
                    let len = randomNumber(section_size-2);
                    let width = randomNumber(section_size-2);
                    let red_r = randomNumber(200), green_r = randomNumber(200), blue_r = randomNumber(200);
                    if(Math.random()<0.3) ctx.strokeStyle = numsToRGB(red_r,green_r,blue_r);
                    else ctx.strokeStyle = "black";
                    ctx.strokeRect(centerx,centery,centerx+len,centery+width);
                }
                break;

            case 0: //line
                for (let i = 0; i < shape_count; i++){
                    let firstx = randomNumber(section_size+300)+tl.x;
                    let firsty = randomNumber(section_size+300) + tl.y;
                    let secondx = randomNumber(section_size+300)+tl.x;
                    let secondy = randomNumber(section_size+300)+tl.y;
                    ctx.beginPath();
                    let red_r = randomNumber(255), green_r = randomNumber(200), blue_r = randomNumber(200);
                    if(Math.random()<0.28) ctx.strokeStyle = numsToRGB(red_r,green_r,blue_r);
                    else ctx.strokeStyle = "black";
                    ctx.moveTo(firstx,firsty);
                    ctx.lineTo(secondx,secondy);
                    ctx.stroke();
                }
                break;
        }//end switch
        
    }
    function copyImageToCanvas() {
        
    }
    
    
    }
