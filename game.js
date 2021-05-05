
import graphics from "./graphic_handler.js";
import piece from "./pieces/piece.js";
import vector2 from "./math/vector.js";
import chess_board from "./chess_board.js";

class game{
    constructor(){
        this.chess_board = new chess_board();
        this.turn = "white";
        this.turn_count = 0;
        this.player_color = null;
    }
}

window.onload = function(){
    let new_game = new game();
    new_game.chess_board.graphic_handler.create_canvas(500, 500, 0, 0);
    new_game.chess_board.setup_white();
    new_game.chess_board.setup_black();

    new_game.chess_board.graphic_handler.make_connections();
    let connection = new_game.chess_board.graphic_handler.on_click_event.connect(function(rel_mouse_x, rel_mouse_y, handler, cell_vec_2){
        let at_pos = new_game.chess_board.grid[cell_vec_2.y][cell_vec_2.x];
        if(at_pos != null) new_game.player_color = at_pos.color;
        handler.on_click_event.disconnect_connection(connection);
        console.log(handler.on_click_event.event_connections.length);
    })
    new_game.chess_board.graphic_handler.initiate_events();

}

