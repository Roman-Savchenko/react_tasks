import React from 'react';

class Overdue extends React.Component
{
    taskTransferTaskList = () => {
        this.props.renderList("overdue");
    };

    render() {
        let countList = this.props.countOverdueTask > 0 ? this.props.countOverdueTask : '';
        return  <div className="row">
                 <div className="col-sm-12 col-md-12 col-lg-12">
                     <div className="well">
                         <label for="overdue">
                             <a id="overdue" className="cursor-pointer" onClick={this.taskTransferTaskList}>
                                 Просроченные задачи <span>{countList}</span>
                             </a>
                         </label>
                     </div>
                 </div>
                </div>;
    }
}

Overdue.defaultProps = {
    renderList: () => {},
};

export default Overdue;