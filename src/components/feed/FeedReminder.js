import React, { Component } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import  { Button, Form as SemForm } from "semantic-ui-react";
import * as Yup from "yup";

import SemField from "../helpers/SemField";

const validatePhone = (phone) => {
  return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(phone);
}

class FeedReminder extends Component {

  state = { formError: "", disableButton: false };

  onSubmit = (values, actions) => {
    const toSend = { 
      number: `+1${values.phone}`, 
      postId: this.props.eventId, 
      message: `${this.props.eventData.name}: ${this.props.eventData.description}`
    };
    console.log(toSend);
    actions.setSubmitting(false);
  }

  validateSchema = () => (
    Yup.object().shape({ 
      phone: Yup.string().min(2, "Too short!").required("You need a valid phone.")
    })
  );

  validateForm = (values) => {
    const errors = {};
    if (!validatePhone(values.phone))
      errors.phone = "Phone # not valid."

    return errors;
  }

  renderError = props => {
    // console.log(props);
    return <div style={{ color: "red" }}>{props.children}</div>;
  }

  renderForm = ({ errors, status, touched, isSubmitting }) => {
    return (
      <Form autoComplete="off" >

        
          Phone # to text
          <SemForm.Group>
            <SemField type="text" component={SemForm.Input} name="phone" placeholder="1234567890" />
            <ErrorMessage name="phone" component={this.renderError} />
          </SemForm.Group>
      

        
          <Button type="submit" disabled={isSubmitting || this.state.disableButton} loading={this.state.disableButton} >
            Submit
          </Button>
        
        {this.state.formError}

      </Form>
    );
  }


  render () {
    return(
  
        
          <Formik
            validationSchema={this.validateSchema()}
            validate={this.validateForm}
            initialValues={{ 
              phone: ""
              
            }}
            onSubmit={this.onSubmit}
            render={this.renderForm} 
          />
        
      
    );
  }
}


export default (FeedReminder);