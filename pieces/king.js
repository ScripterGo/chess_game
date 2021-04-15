import vector2 from "../math/vector.js";


export default class king{
    constructor(){
        
    }

    get_threathened_cells(){ //does not bother to check if same colored pieced are on threat cells
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

}

