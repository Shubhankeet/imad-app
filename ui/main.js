console.log('Loaded!');

//Change the text of the main-text div
var element=document.getElementById('main-text');

element.innerHTML='New value';

//Move the image
var img=document.getElementById('Bunty');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft + 5;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var Interval=setInterval(moveRight,50);
};