
import graphics from "./graphic_handler.js";
import vector2 from "./math/vector.js";
import create_piece from "./game_util/create_piece.js";
import _event from "./misc/event.js";

export default class chess_board{
    constructor(game_obj){
        this.graphic_handler = new graphics(this);
        this.on_capture = new _event("on_capture");
        this.game_obj = game_obj;
        this.grid = [];
        for(let i=0; i < 8; i++){
            this.grid.push([null, null, null, null, null, null, null, null]);
        }
    }
    
    capture_check(cell_vec_2){
        if(this.grid[cell_vec_2.y][cell_vec_2.x] != null){
            this.on_capture.fire(cell_vec_2);
        }
    }

    move(cell_vec_2, piece){
        let piece_pos = piece.position;
        if(piece_pos != null && this.grid[piece_pos.y][piece_pos.x] == piece){
            this.grid[piece_pos.y][piece_pos.x] = null;
        }
        let at = this.grid[cell_vec_2.y][cell_vec_2.x];
        if(at != null){
            document.body.removeChild(at.img_element);
        }
        this.capture_check(cell_vec_2);
        this.grid[cell_vec_2.y][cell_vec_2.x] = piece;
        this.graphic_handler.move(cell_vec_2, piece);
        //console.log("moving");
    }

    move_no_graphics(cell_vec_2, piece){ //Used for backtracking
        let piece_pos = piece.position;
        if(piece_pos != null && this.grid[piece_pos.y][piece_pos.x] == piece){
            this.grid[piece_pos.y][piece_pos.x] = null;
        }
        this.capture_check(cell_vec_2);
        this.grid[cell_vec_2.y][cell_vec_2.x] = piece;
        piece.move_no_graphics(cell_vec_2);
    }

    is_cell_threatened(cell_vec_2, player_color, for_king = false){
        for(let i = 0; i <= 7; i++){
            for(let j = 0; j <= 7; j++){
                let at = this.grid[i][j];
                if(at == null) continue;
                if(at.color == player_color) continue;
                if(at.is_threat_to_cell(cell_vec_2)){
                    return true;
                }
            }
        }
        return false;
    }

    setup(start_row=0, color){
        let first_row = [
            create_piece("rook", color, this),
            create_piece("knight", color, this),
            create_piece("bishop", color, this),
            create_piece("king", color, this),
            create_piece("queen", color, this),
            create_piece("bishop", color, this),
            create_piece("knight", color, this),
            create_piece("rook", color, this)
        ]
        for(let i=0; i < 8; i++){
            this.grid[start_row][i] = first_row[i];
            this.graphic_handler.place(new vector2(i, start_row), first_row[i]);
        }
        if(color == "black"){
            start_row -= 1;
        }else{
            start_row += 1;
        }
        for(let i=0; i < 8; i++){
            this.grid[start_row][i] = create_piece("pawn", color, this);
            this.graphic_handler.place(new vector2(i, start_row), this.grid[start_row][i])
        }
    }
    setup_white(){this.setup(0, "white");}
    setup_black(){this.setup(7,"black");}

    print_out(){
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                console.log(this.grid[i][j]);
            }
            console.log("\n");
        }
    }


}
