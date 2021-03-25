
import vector2 from "./math/vector.js";

function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;                             
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

export default class graphic_handler{
    constructor(chess_board){
        this.chess_board = chess_board;
        this.currently_marked = [];
        this.board_img = "url(./misc_imgs/board.png)";
        
        this.canvas = null;
        this.position = null;
        this.size = null;
    }

    create_canvas(size_x, size_y, pos_x, pos_y){
        let new_canvas = document.createElement("canvas");
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

    cell_to_pos(cell_vec2){
        return new vector2(this.size.x/8 * cell_vec2.x, this.size.y/8 * cell_vec2.y);
    }

    pos_to_cell(pos_vec2){
        cell_size = this.size.scalar_multiply(1/8);
        snapped = new vector2(Math.floor(pos_vec2.x/cell_size.x), Math.floor(pos_vec2.y/cell_size.y));
        return snapped;
    }

    place(cell_vec2, piece){
        let ctx = this.canvas.getContext("2d");
        let relative_pos = this.cell_to_pos(cell_vec2);
        let img_width = 100;
        let img_height = 100;
        let new_img_element = new Image(100,100);
        document.body.appendChild(new_img_element);
        
        new_img_element.onload = function(){
            console.log(img_width, img_height);
            ctx.drawImage(new_img_element, relative_pos.x,relative_pos.y,img_width, img_height);
        }
        new_img_element.src = piece.img;
    }

}