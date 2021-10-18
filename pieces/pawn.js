import vector2 from "../math/vector.js";


export default class piece{
    constructor(color){
        this.y_dir = color == "white" ? 1 : -1;
        this.type = "pawn";
        this.has_moved = false;
    }

    get_threatened_cells(){
        let li = [];
        let curr_pos = this.position;
        let res_y = curr_pos.y + this.y_dir;
        if(res_y >= 0 && res_y <= 7){
            if(curr_pos.x + 1 <= 7){
                li.push(new vector2(curr_pos.x + 1, res_y));
            }
            if(curr_pos.x - 1 >= 0){
                li.push(new vector2(curr_pos.x - 1, res_y));
            }
        }
        return li;
    }

    can_move_to_list(){
        let y_dir = this.y_dir;
        let curr_pos = this.position;
        let li = this.get_threatened_cells();
        if(curr_pos.y + y_dir >= 0 && curr_pos.y + y_dir <= 7){
            li.push(new vector2(curr_pos.x, curr_pos.y + y_dir));
        }
        if(this.has_moved == false && curr_pos.y + y_dir*2 >= 0 && curr_pos.y + y_dir*2 <= 7){
            li.push(new vector2(curr_pos.x, curr_pos.y + y_dir*2));
        }

        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let cell_pos = li[i];
            let at_pos = this.chess_board.grid[cell_pos.y][cell_pos.x];
            let x_diff = cell_pos.subtract(curr_pos).x;
            if((at_pos != null && at_pos.color != this.color && x_diff != 0) || (at_pos == null && x_diff == 0)){
                if(!this.run_move_checks(cell_pos)) continue;
                finalized.push(li[i]);
            }
        }
        return finalized;
    }
}

