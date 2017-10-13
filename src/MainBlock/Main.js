import React from 'react';
import AllTasks from './../TasksBlock/AllTasks';
import Overdue from './../TasksBlock/Overdue';
import Executed from './../TasksBlock/Executed';
import Canceled from './../TasksBlock/Canceled';
import CreateTaskForm from '../BodyBlock/CreateTaskForm';
import TaskList from "../BodyBlock/TaskList";
import db, {
    getAllCurrentTask,
    getAllCompleteTask,
    getAllOverdueTask,
    addNewTasksOrUpdate,
    modifyTask,
    modifyExecutedTask
} from './../ConnectionDB';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCurrentTask: [],
            showList: false,
            newTask: '+  Добавить новую задачу',
            showForm: false,
            create: '',
            newTaskPrint: false,
            taskContent: '',
            currentTasks: '',
            countCurrentTask: null,
            countCompleteTask: null,
            countOverdueTask: null,
            listOverdueTask: [],
            listName: '',
            listExecutedTask: [],
            listNewTask: [],
            updateTask: {comment: '', date: '', description: '', name: '', hash: ''}
        };
        this.renderForm = this.renderForm.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onRenderList = this.onRenderList.bind(this);
        this.pushHideForm = this.pushHideForm.bind(this);
    }

    componentDidMount() {
        getAllCurrentTask(db, new Date()).count((value) => {
            this.setState({countCurrentTask: value})
        });
        getAllCurrentTask(db, new Date()).toArray((result) => {
            this.setState({listCurrentTask: result})
        });
        getAllCompleteTask(db, new Date()).count((value) => {
            this.setState({countCompleteTask: value})
        });

        getAllCompleteTask(db, new Date()).toArray((value) => {
            this.setState({listExecutedTask: value})
        });

        getAllOverdueTask(db, new Date()).count((value) => {
            this.setState({countOverdueTask: value})
        });

        getAllOverdueTask(db, new Date()).toArray((value) => {
            this.setState({listOverdueTask: value})
        });

    }

    onRenderList = (value) => {
        this.setState({showList: true});
        this.setState({listName: value});

    };

    renderForm() {
        this.setState({showForm: true});
    }

    onAddTask(task) {
        let date = new Date();
        this.setState({showForm: false});
        this.setState({showList: true});
        addNewTasksOrUpdate(db, task);
        if (this.state.listName === '') {
            let array = this.state.listNewTask;
            this.renderAfterUpdate(array, task);
        }
        if (this.state.listName === 'all' && task.date.getDate() === date.getDate()) {
            let array = this.state.listCurrentTask;
            this.renderAfterUpdate(array, task);
        } else if (this.state.listName === 'overdue') {
            let array = this.state.listOverdueTask;
            this.renderAfterUpdate(array, task);
        } else if (this.state.listName === 'executed') {
            let array = this.state.listExecutedTask;
            this.renderAfterUpdate(array, task);
        }
    }


    renderAfterUpdate(array, task) {
        if (this.state.updateTask.name === '') {
            array.push(task);
            this.setListTaskForListName(array);
        }
        array = this.updateProps(task, array);
        this.setListTaskForListName(array);
    }

    setListTaskForListName(array) {
        if (this.state.listName === 'all') {
            this.setState({listCurrentTask: array});
        } else if (this.state.listName === 'overdue') {
            this.setState({listOverdueTask: array});
        } else if (this.state.listName === 'executed') {
            this.setState({listExecutedTask: array});
        } else {
            this.setState({listNewTask: array});
        }
    }

    updateProps (nextProps, list) {
       for (let value in list) {
           if (list[value].hash === nextProps.hash) {
               list[value] = nextProps;
               break;
           }
       }

       return list;
    }

    createNewTask = (hash) => {
        let currentList = null;
        let completeList = this.state.listExecutedTask;
        if (this.state.listName === 'all') {
            modifyTask(db, hash);
            currentList = this.state.listCurrentTask;
            this.modifyListTaskAndCountElement(currentList, hash, completeList);
            this.setState({countCurrentTask: this.state.countCurrentTask - 1});
        } else if (this.state.listName === 'overdue') {
            modifyTask(db, hash);
            currentList = this.state.listOverdueTask;
            this.modifyListTaskAndCountElement(currentList, hash, completeList);
            this.setState({countOverdueTask: this.state.countOverdueTask - 1});
        } else if (this.state.listName === 'executed') {
            modifyExecutedTask(db, hash);
            this.setState({listExecutedTask: this.spliceElement(completeList, hash)});
            this.setState({countCompleteTask: this.state.countCompleteTask - 1});
        } else {
            modifyTask(db, hash);
            currentList = this.state.listNewTask;
            this.modifyListTaskAndCountElement(currentList, hash);
        }

    };

    modifyListTaskAndCountElement(currentList, hash, completeList) {
        this.setState({countCompleteTask: this.state.countCompleteTask + 1});
        this.setState({listExecutedTask: this.pushElement(currentList, hash, completeList)});
        this.setListTaskForListName(this.spliceElement(currentList, hash));
    }

    spliceElement(currentList, hash) {
        for (let value in currentList) {
            if (currentList[value].hash === parseInt(hash, 10)) {
                currentList.splice(value, 1);
                break;
            }
        }

        return currentList;
    }

    pushElement (currentList, hash, completeList) {
        for (let value in currentList) {
            if (currentList[value].hash === parseInt(hash, 10)) {
                let pushed = currentList[value];
                completeList.push(pushed);
                break;
            }
        }

        return completeList;
    }

    onUpdateTask = (task) => {
        this.setState({showForm: true});
        this.setState({updateTask: task});
    };

    pushHideForm() {
       this.setState({showForm: false});
    }

    render() {
        let create = null;
        let printNewCreateTask = null;
        let listTasks = null;
        if (this.state.listName === "overdue") {
            listTasks = this.state.listOverdueTask
        } else if (this.state.listName === "all") {
            listTasks = this.state.listCurrentTask
        } else if (this.state.listName === "executed") {
            listTasks = this.state.listExecutedTask
        } else {
            listTasks = this.state.listNewTask;
        }
        if (this.state.showList) {
            printNewCreateTask = <TaskList
                listCurrentTask={listTasks}
                newTaskPrint={this.state.newTaskPrint}
                callbackFromParent={this.createNewTask}
                updateTask={this.onUpdateTask}/>;
        }

        if (this.state.showForm) {
            create = <CreateTaskForm
                onSubmit={this.onAddTask}
                dataForForm = {this.state.updateTask}
                hideForm = {this.pushHideForm}/>
        }
        let button = null;
        if (this.state.listName === 'all' || this.state.listName === '') {
            button = <div className="product col-sm-8 col-md-8 col-lg-8">
                <a onClick={this.renderForm}>{this.state.newTask}</a>
            </div>
        }
        return <div id="category" className="row parent">
            <div id="featured" className="col-md-3 child">
                <AllTasks countCurrentTask={this.state.countCurrentTask} renderList={this.onRenderList}/>
                <Overdue countOverdueTask={this.state.countOverdueTask} renderList={this.onRenderList}/>
                <Executed countCompleteTask={this.state.countCompleteTask} renderList={this.onRenderList}/>
                <Canceled/>
            </div>
            <div id="sidebar" className="col-md-9 sidebar child">
                {printNewCreateTask}
                {create}
                {button}
            </div>
        </div>
    }
}

export default Main;