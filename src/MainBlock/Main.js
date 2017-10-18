import React from 'react';
import AllTasks from './../TasksBlock/AllTasks';
import Overdue from './../TasksBlock/Overdue';
import Executed from './../TasksBlock/Executed';
import Canceled from './../TasksBlock/Canceled';
import CreateTaskForm from '../BodyBlock/CreateTaskForm';
import TaskList from "../BodyBlock/TaskList";
import db, {
    addNewTasksOrUpdate,
    modifyTask,
    modifyExecutedTask,
    getAllTasks
} from './../ConnectionDB';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false,
            showForm: false,
            newTaskPrint: false,
            currentHash: '',
            tasks: '',
            filter: ''
        };
        this.renderForm = this.renderForm.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onRenderList = this.onRenderList.bind(this);
        this.pushHideForm = this.pushHideForm.bind(this);
    }

    componentDidMount() {
        getAllTasks(db).toArray((value) => {
            this.setState({tasks: value})
        });
    }

    onRenderList = (value) => {
        this.setState({showList: true, filter: value, showForm: false});
    };

    renderForm() {
        this.setState({showForm: true, currentHash: ''});
    }

    onAddTask(task) {
        addNewTasksOrUpdate(db, task);
        let newTask = this.state.tasks.concat(task);
        this.setState({showForm: false, showList: true, tasks: newTask});
    }

    createNewTask = (hash) => {
        if (this.state.filter === 'executed') {
            modifyExecutedTask(db, hash);

        } else {
            modifyTask(db, hash);
        }

    };

    onUpdateTask = (hash) => {
        this.setState({showForm: true, currentHash: hash});
    };

    pushHideForm() {
        this.setState({showForm: false});
    }

    getListForCurrentFilter() {
        let list = [];
        let tasks = this.state.tasks;
        for (let index in tasks) {
            let currentDay = new Date();
            let date = new Date(tasks[index].date);
            if (this.state.filter === 'all') {
                if (date > new Date(currentDay.setHours(0, 0, 0, 0))
                    && date < new Date(currentDay.setDate(currentDay.getDate() + 1))
                    && tasks[index].complete === 0) {
                    list.push(tasks[index]);
                }
            } else if (this.state.filter === 'overdue') {
                if (date < new Date(currentDay.setHours(0, 0, 0, 0))
                    && tasks[index].complete === 0) {
                    list.push(tasks[index]);
                }
            } else if (this.state.filter === 'executed') {
                if (tasks[index].complete === 1) {
                    list.push(tasks[index]);
                }
            }
        }

        return list;
    }

    render() {
        let create = null;
        let printNewCreateTask = null;
        if (this.state.showList) {
            printNewCreateTask = <TaskList
                listCurrentTask={this.getListForCurrentFilter()}
                newTaskPrint={this.state.newTaskPrint}
                callbackFromParent={this.createNewTask}
                updateTask={this.onUpdateTask}/>;
        }

        if (this.state.showForm) {
            create = <CreateTaskForm
                onSubmit={this.onAddTask}
                currentHash={this.state.currentHash}
                hideForm={this.pushHideForm}
                listTasks={this.state.tasks}/>
        }
        let button = null;
        if (this.state.filter === 'all' || this.state.filter === '') {
            button = <div className="product col-sm-8 col-md-8 col-lg-8">
                <a onClick={this.renderForm}>+ Добавить новую задачу</a>
            </div>
        }
        return <div id="category" className="row parent">
            <div id="featured" className="col-md-3 child">
                <AllTasks tasks={this.state.tasks} renderList={this.onRenderList}/>
                <Overdue tasks={this.state.tasks} renderList={this.onRenderList}/>
                <Executed tasks={this.state.tasks} renderList={this.onRenderList}/>
                <Canceled tasks={this.state.tasks} renderList={this.onRenderList}/>
            </div>
            <div id="sidebar" className="col-md-9 sidebar child">
                {printNewCreateTask}
                {create}
                {button}
            </div>
        </div>
    }
}

Main.defaultProps = {
    currentHash: '',

};

export default Main;