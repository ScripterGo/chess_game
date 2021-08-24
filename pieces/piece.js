
import queen from "./queen.js";
import king from "./king.js";
import bishop from "./bishop.js";
import rook from "./rook.js";
import knight from "./knight.js";
import pawn from "./pawn.js";
import vector2 from "../math/vector.js";

function create_piece(type, color){
    if(type == "queen"){
        return new queen();
    }else if(type == "king"){
        return new king();
    }else if(type == "knight"){
        return new knight();
    }else if(type == "bishop"){
        return new bishop();
    }else if(type == "rook"){
        return new rook();
    }else if(type == "pawn"){
        return new pawn(color);
    }
    console.error("Not a valid type");
}

export default class piece{
    constructor(type, color, chess_board){
        let new_piece = create_piece(type, color);
        new_piece.color = color;
        new_piece.img = "./chess_piece_images/" + color + "/" + type + ".png";
        new_piece.position = null;
        new_piece.chess_board = chess_board;
        new_piece.img_element = null;

        new_piece.create_img_element = function(size){
            let new_img_element = new Image(size.x, size.y);
            new_img_element.style.position = "absolute";
            new_img_element.src = this.img;
            this.img_element = new_img_element;
        };

        new_piece.run_move_checks = function(new_pos){ //true if passed
            let grid = this.chess_board.grid;
            let old_pos = new vector2(this.position.x, this.position.y);
            let has_moved_old = this.has_moved;
            let at_new = grid[new_pos.y][new_pos.x];
            let king_piece = chess_board.game_obj.find_king_piece(this.color);
            let flag = true;

            new_piece.chess_board.move_no_graphics(new_pos, this);
            flag = !new_piece.chess_board.game_obj.is_king_threatened(king_piece);
            new_piece.chess_board.move_no_graphics(old_pos, this);
            this.has_moved = has_moved_old;
            grid[new_pos.y][new_pos.x] = at_new;
            return flag;
        }

        new_piece.is_valid_move = function(cell_vec2){
            let valid_moves = new_piece.can_move_to_list();
            for(let i = 0; i < valid_moves.length; i++){
                if(valid_moves[i].is_equal(cell_vec2)){
                    return true;
                }
            }
            return false;
        };

        new_piece.is_threat_to_cell = function(cell_vec_2){
            let li = new_piece.get_threatened_cells();
            for(let i = 0; i < li.length; i++){
                if(li[i].is_equal(cell_vec_2)){
                    return true;
                }
            }
            return false;
        }

        new_piece.move = function(cell_vec2){
            let graphic_handler = this.chess_board.graphic_handler;
            let relative_pos = graphic_handler.cell_to_pos(cell_vec2);
            if(new_piece.type == "pawn"){
                new_piece.has_moved = true;
            }

            this.img_element.style.top = relative_pos.y + graphic_handler.position.y;
            this.img_element.style.left = relative_pos.x + graphic_handler.position.x;
            this.position = cell_vec2;
        }

        new_piece.move_no_graphics = function(cell_vec2){
            if(new_piece.type == "pawn"){
                new_piece.has_moved = true;
            }
            this.position = cell_vec2;
        }
        
        new_piece.spawn = function(){
            if(this.img_element == null){
                console.error("You have to create the img element first")
            }else if(this.img_element.parentElement == document.body){
                console.error("This piece had already been spawned");
            }
            if(new_piece.type == "pawn") new_piece.has_moved = false;
            document.body.appendChild(this.img_element);
        }
        return new_piece;
    }

}
