import React from 'react';

class Executed extends React.Component
{
    taskTransferTaskList = () => {
        this.props.renderList("executed");
    };


    render(){
        let countList = this.props.countCompleteTask > 0 ? this.props.countCompleteTask : '';
        return  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="well">
                            <label htmlFor="executed">
                                <a id="executed" className="cursor-pointer" onClick={this.taskTransferTaskList}>
                                    Выполненные задачи <span>{countList}</span>
                                </a>
                            </label>
                        </div>
                    </div>
                </div>
    }
}

Executed.defaultProps = {
    renderList: () => {},
};


export default Executed;