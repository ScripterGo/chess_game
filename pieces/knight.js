import vector2 from "../math/vector.js";
import common from "./piece.js";


//type "knight"
export default class knight extends common{
    constructor(type, color, chess_board){
        super(type, color, chess_board);
    }

    get_threatened_cells(){
        let curr_pos = this.position;
        let li = [
            new vector2(-2, 1),
            new vector2(-1, 2),
            new vector2(1, 2),
            new vector2(2, 1),
            new vector2(2, -1),
            new vector2(1, -2),
            new vector2(-1, -2),
            new vector2(-2, -1)
        ]
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            curr_pos = curr_pos.add(li[i]);
            if(curr_pos.x >= 0 && curr_pos.x <= 7 && curr_pos.y >= 0 && curr_pos.y <= 7){
                finalized.push(new vector2(curr_pos.x, curr_pos.y));
            }
            curr_pos = curr_pos.subtract(li[i]);
        }
        return finalized;
    }

    can_move_to_list(){
        let li = this.get_threatened_cells();
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let this_pos = li[i];
            let at_pos = this.chess_board.grid[this_pos.y][this_pos.x]
            if((at_pos == null || (at_pos != null && at_pos.color != this.color)) && this.run_move_checks(this_pos)){
                finalized.push(this_pos);
            }
        }
        return finalized;
    }

}









