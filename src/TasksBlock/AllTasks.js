import React from 'react';

class AllTasks extends React.Component {
    taskTransferTaskList = () => {
        this.props.renderList("all");
    };

    countElementCurrentTasks() {
        let tasks = this.props.tasks;
        let current = [];
        for (let index in tasks) {
            let date = new Date(tasks[index].date);
            let currentDay = new Date();
            if (date > new Date(currentDay.setHours(0, 0, 0, 0))
                && date < new Date(currentDay.setDate(currentDay.getDate() + 1))
                && tasks[index].complete === 0) {
                current.push(tasks[index]);
            }
        }

        return current;
    }

    render() {
        let countTasks = this.countElementCurrentTasks().length > 0 ? this.countElementCurrentTasks().length : '';
        return <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="well">
                    <a className="cursor-pointer" onClick={this.taskTransferTaskList}>
                        Текущие задачи <span>{countTasks}</span>
                    </a>
                </div>
            </div>
        </div>
    }
}

AllTasks.defaultProps = {
    renderList: () => {
    },
};

export default AllTasks;