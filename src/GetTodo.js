import React, {Component} from 'react';

class GetTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    handleChange(e) {
        this.setState({
            taskName: e.target.value
        })
    }

    handleKeypress(key) {
        if (key.keyCode === 13) {
            this.props.addItem(this.state.taskName);
            this.setState({
                taskName: ''
            });
        }
    }

    render() {
        return (
            <div>
                <section className={"main"}>
                    <input id={"toggle-all"} className={"toggle-all"} type={"checkbox"} onClick={this.props.toggleAll}/>
                    <label htmlFor={"toggle-all"}>
                    </label>
                </section>
                <input className={"new-todo"}
                       value={this.state.taskName}
                       type={"text"}
                       placeholder={"what needs to be done?"}
                       onChange={this.handleChange}
                       onKeyDown={this.handleKeypress}/>
            </div>
        )
    }

}

export default GetTodo;