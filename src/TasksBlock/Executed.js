import React from 'react';

class Executed extends React.Component {
    taskTransferTaskList = () => {
        this.props.renderList("executed");
    };

    countElementExecutedTasks() {
        let tasks = this.props.tasks;
        let current = [];
        for (let index in tasks) {
            if (tasks[index].complete === 1) {
                current.push(tasks[index]);
            }
        }

        return current;
    }


    render() {
        let countExecuted = this.countElementExecutedTasks().length > 0 ? this.countElementExecutedTasks().length : '';
        return <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="well">
                    <a className="cursor-pointer" onClick={this.taskTransferTaskList}>
                        Выполненные задачи <span>{countExecuted}</span>
                    </a>
                </div>
            </div>
        </div>
    }
}

Executed.defaultProps = {
    renderList: () => {
    },
};


export default Executed;