module.exports = class Entity {
    constructor(m, texture="noimg",
        init_position={ x:0, y:0 },
        init_velocity={ x:0, y:0 }
    ){
        this._manifest = m;
        this._sprite = new PIXI.Sprite(
            PIXI.loader.resources[texture].texture
        );
        this._subscribed_key_actions = {
            press:[],
            release:[],
            during:[]
        };
        this._subscribed_mouse_actions = {
            press:[],
            release:[],
            during:[],
            scroll:[]
        };
        this._sprite.x = init_position.x;
        this._sprite.y = init_position.y;
        this._velocity = init_velocity;
    }

    //coordinate methods
    get x(){
        return this._sprite.x;
    }
    get y(){
        return this._sprite.y;
    }
    move(x, y){
        this._sprite.position.set(x, y)
        return this._sprite.position;
    }
    slide(x, y){
        this._sprite.x += x;
        this._sprite.y += y;
        return this._sprite.position;
    }

    create(){
        this._manifest.add(this._sprite);
        return this;
    }

    destroy(){
        Engine.Manifest.remove(this._sprite);
    }

    setKeyAction(key, action, event){
        if(this._subscribed_key_actions[action][key]===undefined){
            let subscription_id = this._manifest._engine.Input.Keyboard.subscribe(key, action, event);
            this._subscribed_key_actions[action][key] = subscription_id;
        }
    }
    removeKeyAction(key, action){
        let id = this._subscribed_key_actions[action][key];
        this._manifest._engine.Input.Keyboard.unsubscribe(key, action, id);
        this._subscribed_key_actions[action][key] = undefined;
    }

    setMouseAction(button, action, event){
        if(this._subscribed_mouse_actions[action][button]===undefined){
            let subscription_id = this._manifest._engine.Input.Mouse.subscribe(button, action, event);
            this._subscribed_mouse_actions[action][button] = subscription_id;
        }
    }
    removeMouseAction(button, action){
        let id = this._subscribed_mouse_actions[action][button];
        this._manifest._engine.Input.Mouse.unsubscribe(button, action, id);
        this._subscribed_mouse_actions[action][button] = undefined;
    }

    tick(){
        this.slide(this._velocity.x, this._velocity.y);
    }
}

//Abstract Class