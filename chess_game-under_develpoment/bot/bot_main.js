
import vector2 from "../math/vector.js"
import utility from "../misc/utility.js"

let search_counter = 0;

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


    //bot wants to maximize, the player wants to minimize
    search(d = 4, color){ //Recursive backtracking
        if(d == 0){
            search_counter ++;
            return [this.evaluate_board()];
        }

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

    search_in_space(space){ //where space is an array containing [piece, cell_vec2]
        let curr_best = 1000000;
        let best_move;
        let grid = this.chess_board.grid;
        for(let i = 0; i < space.length; i++){
            let t_pos = space[i][1];
            let piece = space[i][0];
            let s_pos = piece.position;
            let has_moved = piece.has_moved;
            let at_t_pos = grid[t_pos.y][t_pos.x];

            this.chess_board.move_no_graphics(t_pos, piece);
            let score = this.evaluate_board();
            this.chess_board.move_no_graphics(s_pos, piece);
            grid[t_pos.y][t_pos.x] = at_t_pos;
            piece.has_moved = has_moved;

            if(score < curr_best){
                curr_best = score;
                best_move = space[i];
            }
        }
        return [curr_best, best_move];
    }

    make_move(){
        let game_obj = this.chess_board.game_obj;
        let res;
        let king_piece = game_obj.find_king_piece(this.color)
        search_counter = 0;
        if(game_obj.is_king_threatened(king_piece)){
            let possible_moves = game_obj.explore_mate_breaks(king_piece);
            res = this.search_in_space(possible_moves);
        }else{
            res = this.search(4, this.color);
        }

        let board_score = res[0];
        let move = res[1];
        let piece = move[0];
        let t_pos = move[1];
        console.log(res);
        console.log(search_counter);

        this.chess_board.move(t_pos, piece);
        this.chess_board.graphic_handler.new_turn_event.fire();
    }
}


