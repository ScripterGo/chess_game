
import vector2 from "../math/vector.js"
import utility from "../misc/utility.js"

export default class bot{ //The bot should minimize and the player should maximize
    constructor(chess_board, color){
        this.chess_board = chess_board;
        this.color = color;
    }

    evaluate_board(){
        let player_piece_count = 0;
        let bot_piece_count = 0;
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                let at = this.chess_board.grid[i][j];
                if(at == null) continue;
                if(at.color == this.color){
                    bot_piece_count ++;
                }else{
                    player_piece_count ++;
                }
            }
        }
        return player_piece_count - bot_piece_count;
    }

    search(d = 3, color){
        if(d == 0) return [this.evaluate_board()];

        let best = 100000;
        if(color != this.color) best = -10000;
        let best_move = [];
        let grid = this.chess_board.grid;

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                let at = grid[i][j];
                if(at == null) continue;
                if(at.color != color) continue;
                let move_list = at.can_move_to_list();
                let start_pos = at.position;
                let start_has_moved = at.has_moved;

                for(let k = 0; k < move_list.length; k++){
                    let t_pos = move_list[k];
                    let at_t_pos = grid[t_pos.y][t_pos.x];
                    this.chess_board.move_no_graphics(t_pos, at);
                    
                    let res = this.search(d-1, utility.other_color(color))[0];
                    this.chess_board.move_no_graphics(start_pos, at);
                    grid[t_pos.y][t_pos.x] = at_t_pos;
                    at.has_moved = start_has_moved;

                    if((color != this.color && res > best) || (color == this.color && res < best)){
                        best = res;
                        best_move = [at, t_pos];
                    }
                }
            }
        }
        return [best, best_move];
    }

    make_move(){
        let res = this.search(2, this.color);
        let board_score = res[0];
        let move = res[1];
        let piece = move[0];
        let t_pos = move[1];

        this.chess_board.move(t_pos, piece);
        this.chess_board.graphic_handler.new_turn_event.fire();
    }
}


