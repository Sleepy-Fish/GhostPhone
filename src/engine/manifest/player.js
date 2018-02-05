class Player extends require('./entity'){
    constructor(m, texture, x, y) {
        super(m, texture, {x,y}, undefined );

        this._speed = 4;
        this.setKeyAction(87,"press",()=>{
            this._velocity.y-=this._speed;
        });
        
        this.setKeyAction(87,"release",()=>{
            this._velocity.y+=this._speed;
        });

        this.setKeyAction(83,"press",()=>{
            this._velocity.y+=this._speed;
        });
        
        this.setKeyAction(83,"release",()=>{
            this._velocity.y-=this._speed;
        });

        this.setKeyAction(65,"press",()=>{
            this._velocity.x-=this._speed;
        });
        
        this.setKeyAction(65,"release",()=>{
            this._velocity.x+=this._speed;
        });

        this.setKeyAction(68,"press",()=>{
            this._velocity.x+=this._speed;
        });
        
        this.setKeyAction(68,"release",()=>{
            this._velocity.x-=this._speed;
        });
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Player(...args);
}