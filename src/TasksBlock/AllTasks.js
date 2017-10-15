import React from 'react';

class AllTasks extends React.Component
{
    taskTransferTaskList = () => {
        this.props.renderList("all");
    };

    render() {
        let countList = this.props.countCurrentTask > 0 ? this.props.countCurrentTask : '';
        return   <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="well">
                    <label htmlFor="count-list">
                        <a id="count-list" className="cursor-pointer" onClick={this.taskTransferTaskList}>
                            Текущие задачи <span>{countList}</span>
                        </a>
                    </label>
                </div>
            </div>
        </div>
    }
}

AllTasks.defaultProps = {
    renderList: () => {},
};

export default AllTasks;