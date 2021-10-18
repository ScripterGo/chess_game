
import _king from "../pieces/king.js";
import _queen from "../pieces/queen.js";
import _bishop from "../pieces/bishop.js";
import _rook from "../pieces/rook.js";
import _knight from "../pieces/knight.js";
import _pawn from "../pieces/pawn.js";

export default function create_piece(type, color, chess_board){
    if(type == "king"){
        return new _king(type, color, chess_board);
    }else if(type == "queen"){
        return new _queen(type, color, chess_board);
    }else if(type == "bishop"){
        return new _bishop(type, color, chess_board);
    }else if(type == "rook"){
        return new _rook(type, color, chess_board);
    }else if(type == "knight"){
        return new _knight(type, color, chess_board);
    }else if(type == "pawn"){
        return new _pawn(type, color, chess_board);
    }else{
        console.error("Tried to instantiate invalid piece : " + type);
    }
}
