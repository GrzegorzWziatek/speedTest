import Data from './generate.js';

const tbody = document.querySelector('tbody');
const loadEnd = new Date().getTime();

let iteration = localStorage.getItem('iteration:angularjs') || 0;
const testData = JSON.parse(localStorage.getItem('test:angularjs') || '[]');


angular.module('testApp', [])
    .controller('TestController', function TestController($scope, $timeout) {

        this.generate = () => {
            $scope.data = new Data().generate();

            $timeout(() => {
                $scope.generateEnd = new Date().getTime();


                testData.push({
                    loadTime: loadEnd - loadStart,
                    generationTime: $scope.generateEnd - $scope.generateStart,
                    iteration: iteration
                });

                $timeout(() => {
                    this.regenerate();
                }, 3000);
            }, 0);
        };

        this.regenerate = () => {
            let data = new Data().generate();
            $scope.generateStart = new Date().getTime();
            $scope.data = data;

            $timeout(() => {
                $scope.generateEnd = new Date().getTime();

                testData[iteration].regenerate = $scope.generateEnd - $scope.generateStart;
                iteration++;
                localStorage.setItem('iteration:angularjs', iteration);
                localStorage.setItem('test:angularjs', JSON.stringify(testData));

                if (!window.stopMeasure) {
                    $timeout(() => {
                        window.location.reload();
                    }, 5000);
                }

            }, 0);

        };

        $timeout(() => {
            $scope.generateStart = new Date().getTime();
            this.generate();
        }, 3000);

    });