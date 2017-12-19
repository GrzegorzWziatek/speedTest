import Data from './generate.js';
let iteration = localStorage.getItem('iteration:vue') || 0;
const testData = JSON.parse(localStorage.getItem('test:vue') || '[]');
let generateStart, generateEnd;
var app = new Vue({
    el: '#main',
    data: {
        data: []
    },
    created: function () {
        console.log('created');
        window['loadEnd'] = new Date().getTime();
        this.generate();

    },
    methods: {
        generate: function () {
            generateStart = new Date().getTime();
            this.data = new Data().generate();
            let _this = this;
            setTimeout(() => {
                generateEnd = new Date().getTime();
                testData.push({
                    loadTime: window['loadEnd'] - window['loadStart'],
                    generationTime: generateEnd - generateStart,
                    iteration: iteration
                });

                setTimeout(() => {
                    _this.regenerate();
                }, 3000)
            }, 0);

        },
        regenerate: function () {
            generateStart = new Date().getTime();
            this.data = new Data().generate();

            setTimeout(() => {
                generateEnd = new Date().getTime();

                testData[iteration].regenerate = generateEnd - generateStart;
                iteration++;
                localStorage.setItem('iteration:vue', iteration);
                localStorage.setItem('test:vue', JSON.stringify(testData));

                if (!window['stopMeasure']) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000)
                }
            }, 0);

        }
    }
});