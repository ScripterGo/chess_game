import vector2 from "../math/vector.js";

export default class bishop{
    constructor(){
        this.type = "bishop";
    }

    get_threatened_cells(){
        let li = [];
        let dir_s = [
            new vector2(1, 1),
            new vector2(-1, 1),
            new vector2(1,-1),
            new vector2(-1, -1)
        ];
        
        for(let i = 0; i < dir_s.length; i++){
            let curr_pos = this.position.add(dir_s[i]);
            while(curr_pos.x <= 7 && curr_pos.x >= 0 && curr_pos.y <= 7 && curr_pos.y >= 0){
                li.push(new vector2(curr_pos.x, curr_pos.y));
                if(this.chess_board.grid[curr_pos.y][curr_pos.x] != null){break};
                curr_pos = curr_pos.add(dir_s[i]);
            }
        }
        return li;
    }

    can_move_to_list(){
        let li = this.get_threatened_cells();
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let at = this.chess_board.grid[li[i].y][li[i].x];
            if((at == null || at.color != this.color) && this.run_move_checks(li[i])){
                finalized.push(li[i]);
            }
        }
        return finalized;
    }

}


