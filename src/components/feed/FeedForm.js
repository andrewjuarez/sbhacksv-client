import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import  { Button, Form as SemForm, Menu } from "semantic-ui-react";
import * as Yup from "yup";

import SemField from "../helpers/SemField";
import { makeEvent } from "../../actions";
import history from "../../history";

class FeedForm extends Component {

  state = { disableButton: false };

  onSubmit = (values, actions) => {
    this.setState({ disableButton: true });
    const { day, month, year, time } = values;
    values = { ...values, date: `${day} ${month} ${year} ${time}` };
    console.log(values);
    this.props.makeEvent(values, () => this.setState({ disableButton: false }, () => history.push("/")));
    actions.setSubmitting(false);
  }

  validateSchema = () => (
    Yup.object().shape({ 
      name: Yup.string().min(2, "Too short!").required("You must enter an event name"),
      location: Yup.string().min(2, "Too short!").required("You must enter an address"),
      day: Yup.string().min(2, "Too short!").required("You must enter a day"),
      month: Yup.string().min(2, "Too short!").required("You must enter a month"),
      year: Yup.string().min(2, "Too short!").required("You must enter a year"),
      time: Yup.string().min(2, "Too short!").required("You must enter a time"),
      description: Yup.string().min(2, "Too short!").required("You must enter a description"),
    })
  );

  validateForm = (values) => {
    const errors = {};

    return errors;
  }

  renderError = props => {
    // console.log(props);
    return <div style={{ color: "red" }}>{props.children}</div>;
  }

  renderForm = ({ errors, status, touched, isSubmitting }) => {
    return (
      <Form autoComplete="off" >

        <Menu.Item>
          <Menu.Header>Event Name</Menu.Header>
          <SemForm.Group>
            <SemField type="text" fluid component={SemForm.Input} name="name" placeholder="Christmas Party" />
            <ErrorMessage name="name" component={this.renderError} />
          </SemForm.Group>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Event Location</Menu.Header>
          <SemForm.Group>
            <SemField type="text" fluid component={SemForm.Input} name="location" placeholder="A, 311 W Peltason Dr, Irvine, CA 92697" />
            <ErrorMessage name="location" component={this.renderError} />
          </SemForm.Group>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Desc</Menu.Header>
          <SemForm.Group>
            <SemField type="text" fluid component={SemForm.Input} name="description" placeholder="This will be a fun xmas party!" />
            <ErrorMessage name="description" component={this.renderError} />
          </SemForm.Group>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Day/Month/Year</Menu.Header>
          <SemForm.Group>
            <SemField type="text" component={SemForm.Input} name="day" placeholder="06" />
            <SemField type="text" component={SemForm.Input} name="month" placeholder="July" />
            <SemField type="text" component={SemForm.Input} name="year" placeholder="2019" />
            <SemField type="text" component={SemForm.Input} name="time" placeholder="13:30:00" />
            <ErrorMessage name="day" component={this.renderError} />
            <ErrorMessage name="month" component={this.renderError} />
            <ErrorMessage name="year" component={this.renderError} />
            <ErrorMessage name="time" component={this.renderError} />
          </SemForm.Group>
        </Menu.Item>

        <Menu.Item>
          <Button type="submit" disabled={isSubmitting || this.state.disableButton} loading={this.state.disableButton} >
            Submit
          </Button>
        </Menu.Item>

      </Form>
    );
  }


  render () {
    return(
      <Menu vertical fluid>
        <Formik
          validationSchema={this.validateSchema()}
          validate={this.validateForm}
          initialValues={{ 
            name: "",
            location: "",
            day: "",
            month: "",
            year: "", time: "", description: ""
          }}
          onSubmit={this.onSubmit}
          render={this.renderForm} 
        />
      </Menu>
    );
  }
}

export default connect(null, { makeEvent })(FeedForm);