import vector2 from "../math/vector.js";


export default class king{
    constructor(){
        this.type = "king";
    }

    get_threatened_cells(){ //does not bother to check if same colored pieced are on threat cells
        let pos_vec2 = this.position;
        let li = [
            new vector2(0,1),
            new vector2(-1,0),
            new vector2(0,-1),
            new vector2(1,0),
            new vector2(1,1),
            new vector2(1,-1),
            new vector2(-1,1),
            new vector2(-1,-1)
        ];
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let result = pos_vec2.add(li[i]);
            if(result.x >= 0 && result.x <= 7 && result.y >= 0 && result.y <= 7){
                finalized.push(result);
            }
        }
        return finalized;
    }

    can_move_to_list(){
        let li = this.get_threatened_cells();
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let at = this.chess_board.grid[li[i].y][li[i].x];
            if((at == null || at.color != this.color) && this.chess_board.is_cell_threatened(li[i], this.color, true) == false && this.run_move_checks(li[i])){
                finalized.push(li[i]);
            }
        }
        return finalized;
    }


}

