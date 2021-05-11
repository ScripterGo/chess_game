import vector2 from "../math/vector.js";


export default class piece{
    constructor(color){
        this.y_dir = color == "white" ? 1 : -1;
        this.type = "pawn";
    }

    get_threatened_cells(){
        let li = [];
        let curr_pos = this.position;
        let res_y = curr_pos.y + this.y_dir;
        if(res_y >= 0 && res_y <= 7){
            if(curr_pos.x + 1 <= 7 && this.chess_board.grid[res_y][curr_pos.x+1]){
                li.push(new vector2())
            }
        }

        if(curr_pos.y + this.y_dir > this.chess_board.grid[curr_pos.y][curr_pos.x])
    }

    can_move_to_list(){
        let y_dir = this.y_dir;
        let curr_pos = this.position;
        let li = this.get_threatened_cells();
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let cell_pos = li[i];
            let at_pos = this.chess_board.grid[cell_pos.y][cell_pos.x];
            let x_diff = cell_pos.subtract(curr_pos).x;
            if((at_pos != null && at_pos.color != this.color && x_diff != 0) || (at_pos == null && x_diff == 0)){
                finalized.push(li[i]);
            }
        }
        return finalized;
    }

}

