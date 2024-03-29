
import vector2 from "../math/vector.js";

export default class piece{
    constructor(){
        this.type = "queen";
    }

    get_threatened_cells(){
        let li = [];
        let dir_s = [
            new vector2(1, 1),
            new vector2(-1, 1),
            new vector2(1,-1),
            new vector2(-1, -1),
            new vector2(0, 1),
            new vector2(1, 0),
            new vector2(0,-1),
            new vector2(-1,0)
        ];

        for(let i = 0; i < dir_s.length; i++){
            let curr_pos = this.position.add(dir_s[i]);
            while(curr_pos.x >= 0 && curr_pos.x <= 7 && curr_pos.y >= 0 && curr_pos.y <= 7){
                li.push(curr_pos);
                if(this.chess_board.grid[curr_pos.y][curr_pos.x] != null){break;}
                curr_pos = curr_pos.add(dir_s[i]);
            }
            
        }
        return li;
    }

    can_move_to_list(){
        let cells = this.get_threatened_cells();
        let curr_pos = this.position;
        let finalized = [];
        for(let i = 0; i < cells.length; i++){
            let at_pos = this.chess_board.grid[cells[i].y][cells[i].x];
            if((at_pos == null || at_pos.color != this.color) && this.run_move_checks(cells[i])){
                finalized.push(cells[i]);
            }
        }
        return finalized;
    }

}

