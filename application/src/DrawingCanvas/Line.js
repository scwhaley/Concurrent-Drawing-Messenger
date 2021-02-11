class Line {
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;

    constructor (x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    // toJSON(){
    //     return {
    //         x1: this.x1,
    //         y1: this.y1,
    //         x2: this.x2,
    //         y2: this.y2
    //     }
    // }
}

export default Line