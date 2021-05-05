import vector2 from "../math/vector.js";


export default class piece{
    constructor(color){
        this.y_dir = color == "white" ? 1 : -1;
        this.type = "pawn";
    }

    get_threatened_cells(){
        let y_dir = this.y_dir;
        let li = [
            new vector2(0, y_dir),
            new vector2(1, y_dir),
            new vector2(-1, y_dir)
        ];
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let curr_pos = this.position.add(li[i])
            if(curr_pos.x >= 0 && curr_pos.x <= 7 && curr_pos.y >= 0 && curr_pos.y <= 7){
                finalized.push(new vector2(curr_pos.x, curr_pos.y));
            }
        }
        return finalized;
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

