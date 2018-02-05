class Manifest {
    constructor(e) {
        this._engine = e;
        this._player = require('./player')(this, 'blob', 10, 10).create();
    }

    tick() {
        this._player.tick();
    }
    add(sprite){
        this._engine._renderer._stage.addChild(sprite);
    }
    remove(sprite){
        this._engine._renderer._stage.removeChild(sprite);
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Manifest(...args);
}
