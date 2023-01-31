import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";

function App() {
    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'Hello World', isDone: true},
        {id: 2, title: 'I am Happy', isDone: false},
        {id: 3, title: 'Yo', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title="Whats to learn" tasks={tasks1}/>
            <Todolist title="Song" tasks={tasks2}/>
        </div>
    );
}

export default App;
