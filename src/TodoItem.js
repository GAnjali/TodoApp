import React,{Component} from 'react';

class TodoItem extends Component{
    render(){
        console.log(this.props.id);
        return(
            <li>
                <div className={"view"}>
                <input className={"toggle"} checked={this.props.completed} type={"checkbox"} onChange={() => this.props.handleToggle(this.props.id,this.props.completed)}/>
                <label>{this.props.taskName}</label>
                <button onClick={() => this.props.deleteItem(this.props.id)} className={"destroy"}></button>
                </div>
            </li>
        )
    }
}

export default TodoItem;