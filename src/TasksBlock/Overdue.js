import React from 'react';

class Overdue extends React.Component {
    taskTransferTaskList = () => {
        this.props.renderList("overdue");
    };

    countElementOverdueTasks() {
        let tasks = this.props.tasks;
        let current = [];
        for (let index in tasks) {
            let date = new Date(tasks[index].date);
            let currentDay = new Date();
            if (date < new Date(currentDay.setHours(0, 0, 0, 0))
                && tasks[index].complete === 0) {
                current.push(tasks[index]);
            }
        }

        return current;
    }

    render() {
        let countOverdue = this.countElementOverdueTasks().length > 0 ? this.countElementOverdueTasks().length : '';
        return <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="well">
                    <a className="cursor-pointer" onClick={this.taskTransferTaskList}>
                        Просроченные задачи <span>{countOverdue}</span>
                    </a>
                </div>
            </div>
        </div>;
    }
}

Overdue.defaultProps = {
    renderList: () => {
    },
};

export default Overdue;