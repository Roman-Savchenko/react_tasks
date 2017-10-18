import React from 'react';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', comment: '', description: '', date: new Date(), options: false};

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onOptionsSuccess = this.onOptionsSuccess.bind(this);
        this.onHideForm = this.onHideForm.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.changeForm = this.changeForm.bind(this);
    }

    getTaskForUpdate() {
        let hash = this.props.currentHash;
        let list = this.props.listTasks;
        let task = null;
        for (let index in list) {
            if (list[index].hash === hash) {
                task = list[index];
            }
        }

        return task;
    }

    onSubmitForm(e) {
        e.preventDefault();
        let task = {
            name: this.state.name !== '' ? this.state.name : this.getTaskForUpdate().name,
            date: this.state.date !== new Date() ? this.state.date : new Date(this.getTaskForUpdate().date),
            description:  this.state.description !== '' ? this.state.description : this.getTaskForUpdate().description ,
            comment: this.state.comment !== '' ? this.state.comment : this.getTaskForUpdate().comment,
            hash: this.props.currentHash !== ''? this.props.currentHash : Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            complete: 0
        };
        this.props.onSubmit(task);
    }

    onNameChange(e) {
        this.setState({name: e.target.value})
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value})
    }

    onCommentChange(e) {
        this.setState({comment: e.target.value})
    }

    onDateChange(e) {
        this.setState({date: e.target.value})
    }

    onOptionsSuccess() {
        this.setState({options: false});
    }

    onHideForm() {
       this.props.hideForm();
    }

    changeForm() {
        this.setState({options:true});
    }

    render() {
        let options = null;
        let date = '';
        if (this.getTaskForUpdate() !== null) {
            date = new Date(this.getTaskForUpdate().date);
            date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
        }
        let name  = this.props.currentHash !== '' ? this.getTaskForUpdate().name : '';
        let description = this.props.currentHash !== '' ? this.getTaskForUpdate().description : '';
        let comment = this.props.currentHash !== '' ? this.getTaskForUpdate().comment : '';
        let hash = this.props.currentHash !== ''? this.props.currentHash : Math.floor(Math.random() * (1000 - 1 + 1)) + 1;


        if (this.state.options) {
            options = <div className="product col-sm-7 col-md-7 col-lg-7">
                <div>
                    <label htmlFor="description">
                        <input id="description" className="input-create-task-form" type="text" name="description"
                               defaultValue={description}
                               placeholder="description"
                               onChange={this.onDescriptionChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            className="input-create-task-form"
                            type="text" name="comment"
                            defaultValue={comment}
                            placeholder="comment"
                            onChange={this.onCommentChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            name="date"
                            type="date"
                            defaultValue={date}
                            onChange={this.onDateChange}/>
                    </label>
                </div>
            </div>

        }
        return (
            <form onSubmit={this.onSubmitForm}>
                <div className="row">
                    <div className="product col-sm-7 col-md-7 col-lg-7">
                        <label>
                            <input className="input-create-task-form" type="text" name="name"
                                   defaultValue={name}
                                   placeholder="task name"
                                   onChange={this.onNameChange}
                                   required/>
                        </label>
                    </div>
                    <div>
                        <input className="input-create-task-form" type="hidden" name="hash"
                               value={hash}/>
                    </div>
                    {options}
                </div>
                <div className="row">
                    <div className="product col-sm-7 col-md-7 col-lg-7">
                        <input type="submit" className="btn btn-primary" value="Добавить задачу"/>
                        <input onClick={this.onHideForm} type="reset" value="Отменить"/>
                        <input onClick={this.changeForm} type="reset" value="Настройки"/>
                    </div>
                </div>
            </form>
        );
    }
}

CreateTaskForm.defaultProps = {
    onSubmit: () => {},
    hideForm: () => {},
    onChangeForm: () => {},
};

export default CreateTaskForm;