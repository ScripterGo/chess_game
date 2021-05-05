
export default class connection{
    constructor(func, event){
        this.func = func;
        this.event = event;
    }

    fire(args){
        console.log(args);
        this.func(...args);
    }

    disconnect_connection(){
        this.event.disconnect_connection(this);
    }

}
