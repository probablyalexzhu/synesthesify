var hue_S = -1; var abstractness_S=-1; var shape_S = -1;
var texture_S = -1; var brightness_S = -1; var opacity_S = -1;
function updateAbstract(val){
    abstractness_S = val;
    document.getElementById("Abstractness").innerHTML = "Abstractness slider: "+val.toString();
}
function updateShape(val){
    shape_S = val;
    document.getElementById("Shape").innerHTML = "Shape slider: "+val.toString();
}
function updateBright(val){
    brightness_S = val;
    document.getElementById("Brightness").innerHTML = "Brightness slider: "+val.toString();
}
function updateOpacity(val){
    opacity_S = val;
    document.getElementById("Opacity").innerHTML = "Opacity slider: "+val.toString();
}
