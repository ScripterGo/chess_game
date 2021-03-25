
import graphics from "./graphic_handler.js";
import piece from "./pieces/piece.js";
import vector2 from "./math/vector.js";
import chess_board from "./chess_board.js";

class game{
    constructor(){
        this.chess_board = new chess_board();
        this.turn = "white";
        this.turn_count = 0;
    }
}

let new_game = new game();
new_game.chess_board.graphic_board.create_canvas(800, 800, 100, 100);
let test_piece = new piece("queen", "black", new_game.chess_board);
new_game.chess_board.graphic_board.place(new vector2(0,0), test_piece);

