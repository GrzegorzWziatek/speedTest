'use strict';
function _rnd(max) {
    return Math.floor(Math.random() * max);
}
const colors = ['green', 'blue', 'red', 'yellow', 'pink', 'purple', 'white', 'black', 'green', 'orange'];
const things = ['book', 'shoe', 'chair', 'pillow', 'car', 'shirt', 'trousers', 'headphones', 'bag'];
const adjectives = ['big', 'small', 'interesting', 'boring', 'funny', 'angry', 'crazy', 'fabulous'];

class Data {
    constructor() {
        this.data = [];
        this.id = 1;
    }

    getColor() {
        return colors[_rnd(colors.length)];
    }

    getThing() {
        return things[_rnd(things.length)];
    }

    getAdjective() {
        return adjectives[_rnd(adjectives.length)];
    }

    generate(max = 5000) {
        var data = [];
        for (var i = 0; i < max; i++)
            data.push({
                id: this.id++,
                color: this.getColor(),
                thing: this.getThing(),
                adjective: this.getAdjective()
            });
        this.data = data;
        return data;
    }
    get() {
        return this.data
    }
}

export default Data;