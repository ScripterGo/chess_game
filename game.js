
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

window.onload = function(){
    let new_game = new game();
    new_game.chess_board.graphic_handler.create_canvas(500, 500, 0, 0);
    let test_piece = new piece("queen", "black", new_game.chess_board);
    new_game.chess_board.graphic_handler.place(new vector2(2,3), test_piece);
    new_game.chess_board.setup(0, "white");
    new_game.chess_board.graphic_handler.make_connections();
}

