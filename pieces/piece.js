import vector2 from "../math/vector.js";

export default class piece{
    constructor(type, color, chess_board){
        this.color = color;
        this.type = type;

        this.img = "./chess_piece_images/" + color + "/" + type + ".png";
        this.position = null;
        this.chess_board = chess_board;
        this.img_element = null;
        this.has_moved = false;
    };

    create_img_element(size){
        let new_img_element = new Image(size.x, size.y);
        new_img_element.style.position = "absolute";
        new_img_element.src = this.img;
        this.img_element = new_img_element;
    };

    //Check if our move make our king in chess
    run_move_checks(new_pos){ //true if passed
        let grid = this.chess_board.grid;
        let old_pos = new vector2(this.position.x, this.position.y);
        let has_moved_old = this.has_moved;
        let at_new = grid[new_pos.y][new_pos.x];
        let king_piece = this.chess_board.game_obj.find_king_piece(this.color);
        let flag = true;
        
        //console.log(this.has_moved);

        this.chess_board.move_no_graphics(new_pos, this);
        flag = !this.chess_board.game_obj.is_king_threatened(king_piece);
        this.chess_board.move_no_graphics(old_pos, this);
        this.has_moved = has_moved_old;

        //console.log(this.has_moved);

        grid[new_pos.y][new_pos.x] = at_new;
        return flag;
    }


    is_valid_move(cell_vec2){
        let valid_moves = this.can_move_to_list();
        for(let i = 0; i < valid_moves.length; i++){
            if(valid_moves[i].is_equal(cell_vec2)){
                return true;
            }
        }
        return false;
    };

    is_threat_to_cell(cell_vec_2){
        let li = this.get_threatened_cells();
        for(let i = 0; i < li.length; i++){
            if(li[i].is_equal(cell_vec_2)){
                return true;
            }
        }
        return false;
    }

    move(cell_vec2){
        let graphic_handler = this.chess_board.graphic_handler;
        let relative_pos = graphic_handler.cell_to_pos(cell_vec2);
        this.has_moved = true;

        this.img_element.style.top = relative_pos.y + graphic_handler.position.y;
        this.img_element.style.left = relative_pos.x + graphic_handler.position.x;
        this.position = cell_vec2;
    }

    move_no_graphics(cell_vec2){
        this.has_moved = true;
        this.position = cell_vec2;
    }
    
    spawn(){
        if(this.img_element == null){
            console.error("You have to create the img element first")
        }else if(this.img_element.parentElement == document.body){
            console.error("This piece had already been spawned");
        }
        this.has_moved = false; //Because pieces are moved when they spawn
        document.body.appendChild(this.img_element);
    }
}

