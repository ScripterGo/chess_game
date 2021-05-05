
import connection_class from "./connection.js";

export default class event_class{
    constructor(identifier){
        this.event_connections = [];
        this.identifier = identifier;
    }

    disconnect_connection(connection_obj){
        for(let i = 0; i < this.event_connections.length; i++){
            if(this.event_connections[i] == connection_obj){
                this.event_connections.splice(i, 1); break;
            }
        }
    }

    connect(func){
        let new_connection = new connection_class(func, this);
        this.event_connections.push(new_connection);
        return new_connection;
    }

    fire(...args){
        for(let i = 0; i < this.event_connections.length; i++){
            this.event_connections[i].fire(args);
        }
    }

}
