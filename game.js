
import graphics from "./graphic_handler.js";
import piece from "./pieces/piece.js";
import vector2 from "./math/vector.js";
import chess_board from "./chess_board.js";
import king from "./pieces/king.js";
import ut from "./misc/utility.js";
import bot from "./bot/bot_main.js";
import utility from "./misc/utility.js";

class game{
    constructor(){
        this.chess_board = new chess_board(this);
        this.turn = "white";
        this.turn_count = 0;
        this.player_color = null;
        this.bot = new bot(this.chess_board, "white");
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

    explore_mate_breaks(king_piece){ //Is it possible to get out of the chess?
        let li = [];
        let grid = this.chess_board.grid;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(grid[i][j] == null) continue;
                if(grid[i][j].color != king_piece.color) continue;
                let piece = grid[i][j];
                let can_move_to = piece.can_move_to_list();
                let has_moved_start = piece.has_moved;
                for(let k = 0; k < can_move_to.length; k++){
                    let start_pos = new vector2(piece.position.x, piece.position.y);
                    let cell_pos = can_move_to[k];
                    let at_cell_pos = grid[cell_pos.y][cell_pos.x];

                    this.chess_board.move_no_graphics(cell_pos, piece); //updates piece position
                    if(!this.chess_board.is_cell_threatened(king_piece.position, king_piece.color, true)){
                        console.log([piece, cell_pos], "found!");
                        li.push([piece, cell_pos]);
                    }
                    this.chess_board.move_no_graphics(start_pos, piece);
                    grid[cell_pos.y][cell_pos.x] = at_cell_pos; //To undo any possible overtakes
                    piece.has_moved = has_moved_start;
                }
            }
        }
        return li;
    }

    is_mate(king_piece){
        let can_move = king_piece.can_move_to_list().length > 0;
        let is_threatened = this.chess_board.is_cell_threatened(king_piece.position, king_piece.color);
        if(can_move || !is_threatened){
            return false;
        }else{
            return this.explore_mate_breaks(king_piece).length == 0;
        }
    }

    main_loop(){
        let game_obj = this;
        let chess_board = this.chess_board;
        let graphic_handler = this.chess_board.graphic_handler;

        let connection = this.chess_board.graphic_handler.new_turn_event.connect(function(){
            game_obj.turn = ut.other_color(game_obj.turn);
            graphic_handler.clear_all_threatened_cells();
            graphic_handler.last_clicked_piece = null;
            if(game_obj.turn != game_obj.player_color){
                if(game_obj.is_mate(game_obj.find_king_piece(game_obj.bot.color))){
                    console.log("The bot won!");
                    graphic_handler.new_turn_event.disconnect_connection(connection);
                }else{
                    game_obj.bot.make_move();
                }
            }else{
                if(game_obj.is_mate(game_obj.find_king_piece(game_obj.player_color))){
                    console.log("The player won!");
                    graphic_handler.new_turn_event.disconnect_connection(connection);
                }
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
            new_game.bot.color = utility.other_color(new_game.player_color);
            handler.on_click_event.disconnect_connection(connection);
            console.log(new_game.player_color);
        }
    })
    new_game.chess_board.graphic_handler.initiate_events();
    new_game.main_loop();
}

