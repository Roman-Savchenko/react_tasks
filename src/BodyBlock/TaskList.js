import React from 'react';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.updateTaskData = this.updateTaskData.bind(this);
    }

    onDelete(e) {
        e.preventDefault();
        let hash = e.target.value;
        this.sendCompleteTask(hash);
    }

    sendCompleteTask = (hash) => {
       this.props.callbackFromParent(hash) ;
    };

    updateTaskData(e) {
        e.preventDefault();
        let hash = e.target.className;
        let list = this.props.listCurrentTask;
        let task = {};
        for (let value in list) {
            if (list[value].hash === parseInt(hash, 10)) {
                task = list[value];
                break;
            }
        }
        this.sendUpdateTask(task);

    }

    sendUpdateTask = (task) => {
        this.props.updateTask(task);
    };


    render() {
        return <div id="tasks-list">
            {this.props.listCurrentTask.map(task => {
                return <div key={task.hash} className="product col-sm-7 col-md-7 col-lg-7 ">
                    <input className="render-list"
                           onClick={this.onDelete}
                           type="checkbox" id={task.hash}
                           name="contact"
                           value={task.hash}/>
                    <a onClick={this.updateTaskData} className={task.hash}> {task.name}</a>
                </div>;
            })}
        </div>
    }
}


export default TaskList;