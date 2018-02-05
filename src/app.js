require('pixi.js');
window.Game = require('./game-constants');
require('./loader')(setup, progress);



function progress(loader, resource){
    document.querySelector('#'+Game.Window.loader+' > ul').innerHTML += '<li>'+loader.progress+"%: "+resource.url+'</li>';
}

function setup(loader, res){
    document.getElementById(Game.Window.loader).style.display = 'none';
    Game.Engine = require('./engine')();
    Game.Engine.start();
}