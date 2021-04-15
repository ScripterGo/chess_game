import vector2 from "../math/vector.js";


export default class piece{
    constructor(){
        this.y_dir = this.color == "white" ? 1 : -1;
    }

    get_threatened_cells(){
        let curr_pos = this.position;
        let y_dir = this.y_dir;
        let li = [
            new vector2(0, y_dir),
            new vector2(1, y_dir),
            new vector2(-1, y_dir)
        ];
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            curr_pos.add(li[i]);
            if(curr_pos.x >= 0 && curr_pos.x <= 7 && curr_pos.y >= 0 && curr_pos.y <= 7){
                finalized.push(new vector2(curr_pos.x, curr_pos.y));
            }
        }
        return finalized;
    }

    can_move_to_list(){
        let y_dir = this.y_dir;
        let curr_pos = this.position;
        let li = this.get_threathened_cells();
        if(curr_pos.y + y_dir >= 0 && curr_pos.y + y_dir <= 7){
            li.push(new vector2(curr_pos.x, curr_pos.y + y_dir));
        }
        let finalized = [];
        for(let i = 0; i < li.length; i++){
            let cell_vec_2 = li[i];
            let at_pos = this.chess_board.grid[cell_vec_2.y][cell_vec_2.x]
            if(at_pos == null){
                finalized.push(cell_vec_2);
            }else if(at_pos.color != this.color){
                finalized.push(cell_vec_2);
            }
        }
        return finalized;
    }

}

