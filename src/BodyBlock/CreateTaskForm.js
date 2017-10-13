import React from 'react';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {options: true, task: '', name: '', description: '', comment: '', date: new Date()};

        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onOptionsSuccess = this.onOptionsSuccess.bind(this);
        this.onHideForm = this.onHideForm.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    onSubmitForm(e) {
        e.preventDefault();
        let task = {
            name: this.state.name !== '' ? this.state.name : this.props.dataForForm.name,
            date: this.state.date !== '' ? new Date(this.state.date) : new Date(this.props.dataForForm.date),
            description: this.state.description !== '' ? this.state.description : this.props.dataForForm.description,
            comment: this.state.comment !== '' ? this.state.comment : this.props.dataForForm.comment,
            hash: this.props.dataForForm.hash !== ''? this.props.dataForForm.hash : Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
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

    render() {
        let options = null;
        let date = this.props.dataForForm.date;
        if (date !== '') {

            date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)

        }
        if (this.state.options) {
            options = <div className="product col-sm-7 col-md-7 col-lg-7">
                <div>
                    <label for="description">
                        <input id="description" className="input-create-task-form" type="text" name="description"
                               defaultValue={this.props.dataForForm.description}
                               placeholder="description"
                               onChange={this.onDescriptionChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            className="input-create-task-form"
                            type="text" name="comment"
                            defaultValue={this.props.dataForForm.comment}
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
                                   defaultValue={this.props.dataForForm.name}
                                   placeholder="task name"
                                   onChange={this.onNameChange}/>
                        </label>
                    </div>
                    <div>
                        <input className="input-create-task-form" type="hidden" name="hash"
                               value={this.props.dataForForm.hash}/>
                    </div>
                    {options}
                </div>
                <div className="row">
                    <div className="product col-sm-7 col-md-7 col-lg-7">
                        <input type="submit" value="Добавить задачу"/>
                        <input onClick={this.onHideForm} type="reset" value="Отменить"/>
                    </div>
                </div>
            </form>
        );
    }
}

CreateTaskForm.defaultProps = {
    onSubmit: () => {},
    hideForm: () => {},
};

export default CreateTaskForm;