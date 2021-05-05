
import graphics from "./graphic_handler.js";
import vector2 from "./math/vector.js";
import piece from "./pieces/piece.js";

export default class chess_board{
    constructor(game_obj){
        this.graphic_handler = new graphics(this);
        this.game_obj = game_obj;
        this.grid = [];
        for(let i=0; i < 8; i++){
            this.grid.push([null, null, null, null, null, null, null, null]);
        }
    }

    move(cell_vec_2, piece){
        let piece_pos = piece.position;
        if(piece_pos != null && this.grid[piece_pos.y][piece_pos.x] == piece){
            this.grid[piece_pos.y][piece_pos.x] = null;
        }
        this.grid[cell_vec_2.y][cell_vec_2.x] = piece;
        this.graphic_handler.move(cell_vec_2, piece);
        console.log("moving");
    }

    is_cell_threatened(cell_vec_2, player_color){
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
            new piece("rook", color, this),
            new piece("knight", color, this),
            new piece("bishop", color, this),
            new piece("king", color, this),
            new piece("queen", color, this),
            new piece("bishop", color, this),
            new piece("knight", color, this),
            new piece("rook", color, this)
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
            this.grid[start_row][i] = new piece("pawn", color, this);
            this.graphic_handler.place(new vector2(i, start_row), this.grid[start_row][i])
        }
    }

    setup_white(){this.setup(0, "white");}
    setup_black(){this.setup(7,"black");}

}
