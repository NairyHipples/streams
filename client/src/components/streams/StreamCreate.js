import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className={'ui error message'}>
          <div className={'header'}>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div className={'field'}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className={'ui form error'}
      >
        <Field
          name={'title'}
          label={'Enter title'}
          component={this.renderInput}
        />
        <Field
          name={'description'}
          label={'Enter description'}
          component={this.renderInput}
        />
        <button className={'ui primary button'}>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

const formWrapper = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(
  null,
  { createStream }
)(formWrapper);
