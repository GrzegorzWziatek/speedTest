import React, {Component} from 'react';
import Data from './generate';

class App extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            generateStart: null,
            generateEnd: null,
            testData: JSON.parse(localStorage.getItem('test:react') || '[]'),
            loadStart: window['loadStart'],
            loadEnd: null,
            iteration: parseInt(localStorage.getItem('iteration:react'), 10) || 0
        }
    }

    componentWillReceiveProps(state, data) {
        console.log(state);
        console.log(data);
    }

    generate() {
        let data = new Data().generate();
        this.setState({
            generateStart: new Date().getTime(),
            data: data
        });

        setTimeout(() => {
            this.setState({
                generateEnd: new Date().getTime()
            });

            const newData = [...this.state.testData, {
                loadTime: window['loadEnd'] - window['loadStart'],
                generationTime: this.state.generateEnd - this.state.generateStart,
                iteration: this.state.iteration
            }];


            this.setState({testData: newData});

            setTimeout(() => {
                this.regenerate();
            }, 3000);
        }, 0);
    };

    regenerate = () => {
        let data = new Data().generate();
        this.setState({
            generateStart: new Date().getTime(),
            data: data
        });

        setTimeout(() => {
            this.setState({
                generateEnd: new Date().getTime()
            });

            this.state.testData[this.state.iteration].regenerate = this.state.generateEnd - this.state.generateStart;
            this.setState({
                iteration: ++this.state.iteration
            });
            localStorage.setItem('iteration:react', this.state.iteration);
            localStorage.setItem('test:react', JSON.stringify(this.state.testData));

            if (!window['stopMeasure']) {
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }

        }, 0);

    };

    render() {
        return (
            <div className="container">
                <table className="table table-striped" id="generated">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Adjective</th>
                        <th>Color</th>
                        <th>Thing</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(object => {
                        return (
                            <tr key={object.id}>
                                <td>{object.id}</td>
                                <td>{object.adjective}</td>
                                <td>{object.color}</td>
                                <td>{object.thing}</td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            loadEnd: new Date().getTime()
        });
        window['loadEnd'] = new Date().getTime();
        setTimeout(() => {
            this.generate();
        }, 200);
    }
}

export default App;
