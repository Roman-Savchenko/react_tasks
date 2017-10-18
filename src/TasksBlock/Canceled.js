import React from 'react';

class Canceled extends React.Component {
    taskTransferTaskList = () => {
        this.props.renderList("canceled");
    };

    render() {
        let countList = this.props.countCurrentTask > 0 ? this.props.countCurrentTask : '';
        return <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="well">
                    <a className="cursor-pointer" onClick={this.taskTransferTaskList}>
                        Отменненные задачи <span>{countList}</span>
                    </a>
                </div>
            </div>
        </div>
    }
}

Canceled.defaultProps = {
    renderList: () => {
    },
};

export default Canceled;