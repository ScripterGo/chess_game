
import chess_board from "./chess_board.js";
import vector2 from "./math/vector.js";
import piece from "./pieces/queen.js";
import event from "./misc/event.js";

export default class graphic_handler{
    constructor(chess_board){
        this.chess_board = chess_board;
        this.currently_marked = [];
        this.piece_imgs = [];
        this.board_img = "url(./misc_imgs/board.png)";
        this.on_click_event = new event("on_click");
        this.new_turn_event = new event("on_new_turn");

        this.last_clicked_piece = null;
        this.canvas = null;
        this.position = null;
        this.size = null;
    }

    create_canvas(size_x, size_y, pos_x, pos_y){
        let new_canvas = document.createElement("canvas");
        new_canvas.setAttribute("id", "graphic_container");
        new_canvas.style.width = size_x;
        new_canvas.style.height = size_y;
        new_canvas.style.position = "absolute";
        new_canvas.style.left = pos_x;
        new_canvas.style.top = pos_y;
        
        new_canvas.style.backgroundSize = size_x + "px" + " " + size_y + "px";
        new_canvas.style.backgroundImage = this.board_img;
        document.body.appendChild(new_canvas);

        this.canvas = new_canvas;
        this.position = new vector2(pos_x, pos_y);
        this.size = new vector2(size_x, size_y);
    }

    create_marker(abs_position){
        let img_width = this.size.x/8;
        let img_height = this.size.y/8;
        let img_marker = document.createElement("div");
        img_marker.style.width = img_width;
        img_marker.style.height = img_height;
        img_marker.style.position = "absolute";
        img_marker.style.left = abs_position.x;
        img_marker.style.top = abs_position.y;
        
        img_marker.style.backgroundColor = "red";
        img_marker.style.opacity = 0.3;

        return img_marker;
    }

    cell_to_pos(cell_vec2){
        return new vector2(this.size.x/8 * cell_vec2.x, this.size.y/8 * cell_vec2.y);
    }

    pos_to_cell(pos_vec2){
        let cell_size = this.size.scalar_multiply(1/8);
        let snapped = new vector2(Math.floor(pos_vec2.x/cell_size.x), Math.floor(pos_vec2.y/cell_size.y));
        return snapped;
    }

    place(cell_vec2, piece){
        let img_width = this.size.x/8;
        let img_height = this.size.y/8;
        piece.create_img_element(new vector2(img_width, img_height));
        piece.move(cell_vec2);
        piece.spawn();
    }

    move(cell_vec2, piece){
        piece.move(cell_vec2);
    }

    is_marker_at(cell_vec_2){
        for(let i = 0; i < this.currently_marked.length; i++){
            let other_vec = this.currently_marked[i].cell_pos;
            if(cell_vec_2.is_equal(other_vec)){
                return this.currently_marked[i];
            }
        }
        return false;
    }

    toggle_threatened_cells(piece){
        let cells = piece.can_move_to_list();
        let to_remove = [];
        for(let i = 0; i < cells.length; i++){
            let is_at = this.is_marker_at(cells[i])

            if(is_at == false){
                console.log("creating new marker", this.currently_marked.length)
                let new_marker = this.create_marker(this.cell_to_pos(cells[i]));
                let pair_obj = {
                    img_obj : new_marker,
                    cell_pos : cells[i]
                }
                this.currently_marked.push(pair_obj);
                document.body.appendChild(new_marker);
            }else{
                to_remove.push(is_at);
            }
        }
        for(let i = 0; i < to_remove.length; i++){
            document.body.removeChild(to_remove[i].img_obj);
            this.currently_marked.splice(this.currently_marked.indexOf(to_remove[i]),1);
        }
    }
    
    on_click_main(rel_mouse_x, rel_mouse_y, handler, cell_vec_2){
        //if(handler.chess_board.game_obj.turn != handler.chess_board.game_obj.player_color) return;
        let piece = handler.chess_board.grid[cell_vec_2.y][cell_vec_2.x];
        //if(handler.last_clicked_piece != null && handler.chess_board.game_obj.turn != handler.last_clicked_piece.color) return;
        if(handler.last_clicked_piece != null){
            let can_move_to = handler.last_clicked_piece.is_valid_move(cell_vec_2);
            if(piece == null){
                if(!can_move_to) return;
                handler.toggle_threatened_cells(handler.last_clicked_piece);
                handler.chess_board.move(cell_vec_2, handler.last_clicked_piece);
                handler.toggle_threatened_cells(handler.last_clicked_piece);
                handler.new_turn_event.fire();
                
            }else if(handler.last_clicked_piece.color == piece.color){
                handler.toggle_threatened_cells(handler.last_clicked_piece);
                handler.last_clicked_piece = piece;
                handler.toggle_threatened_cells(handler.last_clicked_piece);
            }else if(can_move_to){
                //Capture
                handler.toggle_threatened_cells(handler.last_clicked_piece);
                document.body.removeChild(piece.img_element);
                handler.chess_board.move(cell_vec_2, handler.last_clicked_piece);
                handler.toggle_threatened_cells(handler.last_clicked_piece);
                handler.new_turn_event.fire();
            }else{
                handler.toggle_threatened_cells(handler.last_clicked_piece);
                handler.last_clicked_piece = piece;
                handler.toggle_threatened_cells(handler.last_clicked_piece);

            }
        }else{
            handler.last_clicked_piece = piece;
            handler.toggle_threatened_cells(handler.last_clicked_piece);
        }
    }

    initiate_events(){
        let board_x = this.position.x;
        let board_y = this.position.y;
        let board_x_2 = this.position.x + this.size.x;
        let board_y_2 = this.position.y + this.size.y;
        let handler = this;
        document.body.onclick = function(event){ //will throw error if mouse is not onscreen
            console.log("clicked");
            let mouse_x = event.clientX;
            let mouse_y = event.clientY;
            if(mouse_x >= board_x && mouse_x <= board_x_2 && mouse_y >= board_y && mouse_y <= board_y_2){
                let rel_mouse_x = mouse_x - board_x;
                let rel_mouse_y = mouse_y - board_y;
                let cell_vec_2 = handler.pos_to_cell(new vector2(rel_mouse_x, rel_mouse_y));
                handler.on_click_event.fire(rel_mouse_x, rel_mouse_y, handler, cell_vec_2);
            }
        }
    }

    make_connections(){
        this.on_click_event.connect(this.on_click_main);
    }

}