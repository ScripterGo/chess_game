
import graphics from "./graphic_handler.js"

export default class chess_board{
    constructor(){
        this.test_board = 5;
        this.graphic_board = new graphics(this);
    }
}
