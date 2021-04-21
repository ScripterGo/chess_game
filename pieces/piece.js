
import queen from "./queen.js";
import king from "./king.js";
import bishop from "./bishop.js";
import rook from "./rook.js";
import knight from "./knight.js";
import pawn from "./pawn.js";
import vector2 from "../math/vector.js";

function create_piece(type, color){
    if(type == "queen"){
        return new queen();
    }else if(type == "king"){
        return new king();
    }else if(type == "knight"){
        return new knight();
    }else if(type == "bishop"){
        return new bishop();
    }else if(type == "rook"){
        return new rook();
    }else if(type == "pawn"){
        return new pawn(color);
    }
    console.error("Not a valid type");
}

export default class piece{
    constructor(type, color, chess_board){
        let new_piece = create_piece(type, color);
        new_piece.color = color;
        new_piece.img = "./chess_piece_images/" + color + "/" + type + ".png";
        new_piece.position = null;
        new_piece.chess_board = chess_board;
        new_piece.img_element = null;

        new_piece.create_img_element = function(size){
            let new_img_element = new Image(size.x, size.y);
            new_img_element.style.position = "absolute";
            new_img_element.src = this.img;
            this.img_element = new_img_element;
        };

        new_piece.move = function(cell_vec2){
            let graphic_handler = this.chess_board.graphic_handler;
            let relative_pos = graphic_handler.cell_to_pos(cell_vec2);
            
            this.img_element.style.top = relative_pos.y + graphic_handler.position.y;
            this.img_element.style.left = relative_pos.x + graphic_handler.position.x;
            this.position = cell_vec2;
        }
    
        new_piece.spawn = function(){
            if(this.img_element == null){
                console.error("You have to create the img element first")
            }else if(this.img_element.parentElement == document.body){
                console.error("This piece had already been spawned");
            }
            document.body.appendChild(this.img_element);
        }
        return new_piece;
    }

}
