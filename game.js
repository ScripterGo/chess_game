
import graphics from "./graphic_handler.js";
import piece from "./pieces/piece.js";
import vector2 from "./math/vector.js";
import chess_board from "./chess_board.js";
import king from "./pieces/king.js";
import ut from "./misc/utility.js";

class game{
    constructor(){
        this.chess_board = new chess_board(this);
        this.turn = "white";
        this.turn_count = 0;
        this.player_color = null;
    }

    find_king_piece(color){
        for(let i = 0; i <= 7; i++){
            for(let j = 0; j <= 7; j++){
                if(this.chess_board.grid[i][j] != null && this.chess_board.grid[i][j].type == "king" && this.chess_board.grid[i][j].color == color){
                    return this.chess_board.grid[i][j];
                }
            }
        }
        return null;
    }

    is_mate(king_piece){
        return king_piece.can_move_to_list().length == 0 && this.chess_board.is_cell_threatened(king_piece.position, king_piece.color);
    }

    main_loop(){
        let game_obj = this;
        this.chess_board.graphic_handler.new_turn_event.connect(function(){
            //game_obj.turn = ut.other_color(game_obj.turn);
            if(game_obj.is_mate(game_obj.find_king_piece("black"))){
                console.log("White won!");
            }else if(game_obj.is_mate(game_obj.find_king_piece("white"))){
                console.log("Black won!");
            }
            
            console.log("new turn!", game_obj.turn);
        })
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
        if(at_pos != null){
            new_game.player_color = at_pos.color;
            handler.on_click_event.disconnect_connection(connection);
            console.log(new_game.player_color);
        }
    })
    new_game.chess_board.graphic_handler.initiate_events();
    new_game.main_loop();
}

