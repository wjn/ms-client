import React, { Component } from 'react';
// NOTE: currently this component does not work, it throws errors
// saying that 'some' is not a function on errors as if the array
// is not getting passed in.

class ErrorsNoFieldAssiged extends Component {
  // Handle cases where there is an error but no field is assigned.
  // e.g., 'email already in use

  render() {
    return (
      <>
        {this.props.errors?.some((err) => !err.field) && (
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            {this.props.errors.map((err) => {
              if (!err.field) {
                return <div key={err.message}>{err.message}</div>;
              }
            })}
          </div>
        )}{' '}
      </>
    );
  }
}

class ErrorsInputField extends Component {
  render() {
    return (
      <>
        {this.props.errors?.some((err) => err.field === this.props.fieldName) && (
          <div className="invalid-feedback">
            {this.props.errors.map((err) => {
              if (err.field === this.props.fieldName) {
                return <div key={err.message}>{err.message}</div>;
              }
            })}
          </div>
        )}{' '}
      </>
    );
  }
}

export { ErrorsNoFieldAssiged, ErrorsInputField };
