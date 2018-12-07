import React, {Component} from 'react';
import TodoItem from "./TodoItem";

class Footer extends Component {
    render() {
        return (
            <footer className={"footer"}>
                <span className={"todo-count"}>{this.props.items.length}
                    <span> items</span>
                <span> left</span>
                </span>
                <ul className={"filters"}>
                    <li>
                        <a className={"selected"} href={"#/"} onClick={this.props.displayAll}>All</a>
                    </li>
                    <span> </span>
                    <li>
                        <a className={""} href={"#/active"} onClick={this.props.displayActive}>Active</a>
                    </li>
                    <li>
                        <a className={""} href={"#/completed"} onClick={this.props.displayCompleted}>Completed</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={this.props.clearCompleted}>Clear completed</button>
            </footer>
        );
    }
}

export default Footer;