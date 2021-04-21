
import chess_board from "./chess_board.js";
import vector2 from "./math/vector.js";
import piece from "./pieces/queen.js";
export default class graphic_handler{
    constructor(chess_board){
        this.chess_board = chess_board;
        this.currently_marked = [];
        this.piece_imgs = [];
        this.board_img = "url(./misc_imgs/board.png)";
        
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
        let cells = piece.get_threatened_cells()
        console.log(cells.length);
        let to_remove = [];
        for(let i = 0; i < cells.length; i++){
            console.log(cells[i], "test");
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


    make_connections(){
        let board_x = this.position.x;
        let board_y = this.position.y;
        let board_x_2 = this.position.x + this.size.x;
        let board_y_2 = this.position.y + this.size.y;
        let handler = this;
        let last_clicked_piece = null;

        document.body.onclick = function(event){ //will throw error if mouse is not onscreen
            console.log("clicked");
            let mouse_x = event.clientX;
            let mouse_y = event.clientY;
            console.log(mouse_x,mouse_y);

            if(mouse_x >= board_x && mouse_x <= board_x_2 && mouse_y >= board_y && mouse_y <= board_y_2){
                let rel_mouse_x = mouse_x - board_x;
                let rel_mouse_y = mouse_y - board_y;
                

                let cell_vec_2 = handler.pos_to_cell(new vector2(rel_mouse_x, rel_mouse_y));
                console.log(cell_vec_2.x, cell_vec_2.y);
                let piece = handler.chess_board.grid[cell_vec_2.y][cell_vec_2.x];
                console.log(piece);
                if(last_clicked_piece != null){
                    if(handler.chess_board.grid[cell_vec_2.y][cell_vec_2.x] == null){
                        handler.toggle_threatened_cells(last_clicked_piece);
                        handler.chess_board.move(cell_vec_2, last_clicked_piece);
                        handler.toggle_threatened_cells(last_clicked_piece);

                    }else if(last_clicked_piece.color == handler.chess_board.grid[cell_vec_2.y][cell_vec_2.x].color){
                        handler.toggle_threatened_cells(last_clicked_piece);
                        last_clicked_piece = handler.chess_board.grid[cell_vec_2.y][cell_vec_2.x];
                        handler.toggle_threatened_cells(last_clicked_piece);
                    }
                }else{
                    last_clicked_piece = piece;
                    handler.toggle_threatened_cells(last_clicked_piece);
                }
            }
        };
    }

}