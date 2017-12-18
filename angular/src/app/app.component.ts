import {Component} from '@angular/core';
import {Data} from '../generate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor() {
  }

  data = [];
  generateStart = null;
  generateEnd = null;
  testData = [];
  loadStart = null;
  loadEnd = null;
  iteration = 0;

  generate = () => {
    this.generateStart = new Date().getTime();
    this.data = new Data().generate();

    setTimeout(() => {
      this.generateEnd = new Date().getTime();


      this.testData.push({
        loadTime: this.loadEnd - this.loadStart,
        generationTime: this.generateEnd - this.generateStart,
        iteration: this.iteration
      });

      setTimeout(() => {
        this.regenerate();
      }, 3000);
    }, 0);
  };

  regenerate = () => {
    let data = new Data().generate();
    this.generateStart = new Date().getTime();
    this.data = data;

    setTimeout(() => {
      this.generateEnd = new Date().getTime();

      this.testData[this.iteration].regenerate = this.generateEnd - this.generateStart;
      this.iteration++;
      localStorage.setItem('iteration:angular', this.iteration.toString());
      localStorage.setItem('test:angular', JSON.stringify(this.testData));

      if (!window['stopMeasure']) {
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    }, 0);

  };

  ngOnInit() {
    this.iteration = parseInt(localStorage.getItem('iteration:angular'), 10) || 0;
    this.testData = JSON.parse(localStorage.getItem('test:angular') || '[]');
    this.loadEnd = new Date().getTime();
    this.loadStart = window['loadStart'];
    window['stopMeasure'] = false;

    setTimeout(() => {
      this.generate();
    }, 500);
  }


}
