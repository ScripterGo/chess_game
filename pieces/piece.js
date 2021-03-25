
import queen from "./queen.js";
import king from "./king.js";
import bishop from "./bishop.js";
import rook from "./rook.js";
import knight from "./knight.js";
import pawn from "./pawn.js";
import vector2 from "../math/vector.js";

function create_piece(type){
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
        return new pawn();
    }
    console.error("Not a valid type");
}

export default class piece{
    constructor(type, color, chess_board){
        let new_piece = create_piece(type);
        new_piece.color = color;
        new_piece.img = "./chess_piece_images/" + color + "/" + type + ".png";
        new_piece.position = null;
        new_piece.chess_board = chess_board;
        return new_piece;
    }
}
