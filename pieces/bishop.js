import vector2 from "../math/vector.js";

export default class bishop{
    constructor(){
        
    }

    get_threathened_cells(){
        let li = [];
        let dir_s = [
            new vector2(1, 1),
            new vector2(-1, 1),
            new vector2(1,-1),
            new vector2(-1, -1)
        ];
        
        for(let i = 0; i < dir_s.length; i++){
            let curr_pos = this.position;
            curr_pos.add(dir_s[i]);
            while(curr_pos.x <= 7 && curr_pos.x >= 0 && curr_pos.y <= 7 && curr_pos.y >= 7){
                li.push(new vector2(curr_pos.x, curr_pos.y));
                curr_pos.add(dir_s[i]);
                if(this.chess_board.grid[curr_pos.y][curr_pos.x] != null){break};
            }
        }
        return li;
    }
}


