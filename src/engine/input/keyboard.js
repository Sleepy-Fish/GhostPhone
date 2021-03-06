class Keyboard {
    constructor() {
        this._active = true;
        this._subscriptions = {
            press:[],
            release:[],
            during:[]
        };
        this._keys = [];

        window.addEventListener("keydown", event=>{
            if(!this._keys[event.keyCode]){
                this._keys[event.keyCode]=true;
                this._process_event(event.keyCode, 'press');
            }
            if(this._active){event.preventDefault();}
        });
        window.addEventListener("keyup", event=>{
            this._keys[event.keyCode]=false;
            this._process_event(event.keyCode, 'release');
            event.preventDefault();
        });

    }

    tick(){
        if(this._active){
            for(let index in this._subscriptions.during){
                if(this._keys[index]){
                    this._process_event(index, 'during');
                }
            }
        }
    }

    _process_event(key, action){
        if(this._active){
            var subscribed_events = this._subscriptions[action][key];
            if(Array.isArray(subscribed_events)){
                for(let subscribed_event of subscribed_events){
                    if (typeof subscribed_event === "function") {
                        subscribed_event();
                    }
                }
            }
        }
    }

    subscribe(key, action, fn){
        this._keys[key] = false;
        if(!Array.isArray(this._subscriptions[action][key]))this._subscriptions[action][key] = [];
        return this._subscriptions[action][key].push(fn)-1;
    }
    unsubscribe(key, action, id){
        if(id!==undefined){
            this._subscriptions[action][key][id] = undefined;
        }
    }

    activate(){
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }
}

module.exports = (...args)=>{
    //do arguements control here
    return new Keyboard(...args);
}