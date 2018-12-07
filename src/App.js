import React, {Component} from "react";
import "./App.css";
import database from './config';
import Header from './Header';
import GetTodo from "./GetTodo";
import TodoItem from "./TodoItem";
import Footer from './Footer';

class App extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            displayMode: 'all'
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.displayAll = this.displayAll.bind(this);
        this.getTodoList = this.getTodoList.bind(this);
        this.displayActive = this.displayActive.bind(this);
        this.displayCompleted = this.displayCompleted.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    addItem(taskName) {
        let newTask = {
            taskName: taskName,
            completed: false

        }
        database.ref('tasks').push(newTask);
    }

    toggleAll() {
        database.ref('tasks').on('value', (snapshot) => {
            snapshot.forEach((snap) => {
                snap.ref.update({taskName: snap.val()['taskName'], completed: !snap.val()['completed']})
                // let status=(snap.val()['completed']);
                // console.log("status: ",status)
                // //snap.val()['completed'].setValue(!(snap.val()['completed']));
                // console.log(snap.val()['completed'])
            })
        })
    }

    componentWillMount() {
        const itemsRef = database.ref('tasks');
        itemsRef.on('value', (snapshot) => {
            let newState = [];
            snapshot.forEach(child => {
                let item = child.val();
                item['key'] = child.key;
                newState.push(item);
            });
            this.setState({
                items: newState
            });
            console.log("in componentDidMount state")
        });
    }

    handleToggle(key, completed) {
        let itemsRef = database.ref('tasks');
        itemsRef.child(key).child('completed').set(!completed);
    }

    deleteItem(key) {
        let itemsRef = database.ref('tasks');
        itemsRef.child(key).set(null);
    }

    displayAll() {
        this.setState({
            displayMode: 'all'
        })
    }

    displayActive() {
        this.setState({
            displayMode: 'active'
        })
    }

    displayCompleted() {
        this.setState({
            displayMode: 'completed'
        })
    }

    clearCompleted() {
        this.setState({
            displayMode: 'clearCompleted'
        })
    }

    getTodoList() {
        let filteredItems = []
        if (this.state.displayMode === 'all')
            filteredItems = this.state.items;
        else if (this.state.displayMode === 'active') {
            this.state.items.forEach((item) => {
                if (!item.completed)
                    filteredItems.push(item);
            });
        }
        else if (this.state.displayMode === 'completed') {
            this.state.items.forEach((item) => {
                if (item.completed)
                    filteredItems.push(item);
            });
        }
        else if (this.state.displayMode === 'clearCompleted') {
            console.log("in clearCompleted")
            this.state.items.forEach((item) => {
                if (item.completed) {
                    console.log(item['key']);
                    database.ref('tasks').child(item['key']).set(null);
                }
            });
            filteredItems = this.state.items;
        }
        console.log("Entered");
        let todoList = filteredItems.map((item) =>
            <TodoItem
                key={item.key}
                id={item.key}
                taskName={item.taskName}
                completed={item.completed}
                handleToggle={this.handleToggle}
                deleteItem={this.deleteItem}
            />
        );
        return todoList;
    }

    render() {
        return (
            <div className={"todoapp"}>
                <Header/>
                <GetTodo addItem={this.addItem}
                         toggleAll={this.toggleAll}/>
                <ul className={"todo-list"}>
                    {this.getTodoList()}
                </ul>
                <Footer items={this.state.items}
                        displayMode={this.state.displayMode}
                        displayAll={this.displayAll}
                        displayActive={this.displayActive}
                        displayCompleted={this.displayCompleted}
                        clearCompleted={this.clearCompleted}/>
            </div>
        );
    }
}

export default App;
