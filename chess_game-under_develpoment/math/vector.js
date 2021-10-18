
export default class vector2{
    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
    }

    is_equal(other_vec_2){
        if(!(other_vec_2 instanceof vector2)){console.error("tried to compare vector2 with non vector2");}
        return this.x == other_vec_2.x && this.y == other_vec_2.y;
    }

    add(other_vec_2){
        if(!(other_vec_2 instanceof vector2)){console.error("tried to add vector2 to non vector2");}
        return new vector2(this.x + other_vec_2.x, this.y + other_vec_2.y);
    }
    subtract(other_vec_2){
        if(!(other_vec_2 instanceof vector2)){console.error("tried to subtract a non vector2 from a vector2");}
        return new vector2(this.x - other_vec_2.x, this.y - other_vec_2.y);
    }
    multiply(other_vec_2){
        if(!(other_vec_2 instanceof vector2)){console.error("tried to multiply a non vector2 with a vector2");}
        return new vector2(this.x * other_vec_2.x, this.y * other_vec_2.y);
    }
    scalar_multiply(a){
        return new vector2(this.x * a, this.y * a);
    }   
    magnitude(){
        return Math.sqrt(Math.pow(this.x, 2), Math.pow(this.y, 2));
    }
    unit(){
        d = this.magnitude();
        return this.scalar_multiply(1/d);
    }
}

