import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import  { Button, Form as SemForm, Menu, Select, Container } from "semantic-ui-react";
import * as Yup from "yup";

import SemField from "../helpers/SemField";
import { makeEvent } from "../../actions";
import history from "../../history";

const categoryOptions = [
  { value: "parties", text: "Parties" },
  { value: "sports", text: "Sports" },
  { value: "professional", text: "Professional" },
  { value: "promotion", text: "Promotion" },
  { value: "gaming", text: "Gaming" },
  { value: "entertainment", text: "Entertainment" },
  { value: "food", text: "Food" },
  { value: "social", text: "Social" }
];

class FeedForm extends Component {

  componentDidMount() {
    if (!this.props.isSignedIn) {
      history.push("/");
    }
  }

  state = { disableButton: false };

  onSubmit = (values, actions) => {
    this.setState({ disableButton: true });
    const { eventdatestart, hourstart, minutestart, eventdateend, hourend, minuteend } = values;
    values = { ...values, eventdatestart: `${eventdatestart} ${hourstart}:${minutestart}:00`, eventdateend: `${eventdateend} ${hourend}:${minuteend}:00` };
    console.log(values);
    this.props.makeEvent(values, () => this.setState({ disableButton: false }, () => history.push("/")));
    actions.setSubmitting(false);
  }

  validateSchema = () => (
    Yup.object().shape({ 
      name: Yup.string().min(2, "Too short!").required("You must enter an event name"),
      location: Yup.string().min(2, "Too short!").required("You must enter an address"),
      description: Yup.string().min(2, "Too short!").required("You must enter a description"),
      category: Yup.string().required("You must enter a category"),
      eventdatestart: Yup.string().required("Please specify a date!"),
      hourstart: Yup.number().min(0, "Minimum hour is 0.").max(23, "Maximum hour is 23.").integer("Must be an integer.").required("Please specify hour!"),
      minutestart: Yup.number().min(0, "Minimum minute is 0.").max(59, "Maximum minute is 59.").integer("Must be an integer.").required("Please specify minute!"),
      eventdateend: Yup.string().required("Please specify a date!"),
      hourend: Yup.number().min(0, "Minimum hour is 0.").max(23, "Maximum hour is 23.").integer("Must be an integer.").required("Please specify hour!"),
      minuteend: Yup.number().min(0, "Minimum minute is 0.").max(59, "Maximum minute is 59.").integer("Must be an integer.").required("Please specify minute!")
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
          <Menu.Header>Category</Menu.Header>
          <SemForm.Group>
            <SemField fluid component={Select} name="category" placeholder="Select a category" options={categoryOptions} />
            <ErrorMessage name="category" component={this.renderError} />
          </SemForm.Group>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Event start date and time</Menu.Header>
          <SemForm.Group>
            <SemField type="date" fluid component={SemForm.Input} name="eventdatestart" />
            <ErrorMessage name="eventdatestart" component={this.renderError} />
            <SemField type="number" component={SemForm.Input} name="hourstart" placeholder="Hour (24h format)" />
            <SemField type="number" component={SemForm.Input} name="minutestart" placeholder="Minute" />
            <ErrorMessage name="hourstart" component={this.renderError} />
            <ErrorMessage name="minutestart" component={this.renderError} />
            
          </SemForm.Group>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Event end date and time</Menu.Header>
          <SemForm.Group>
            <SemField type="date" fluid component={SemForm.Input} name="eventdateend" />
            <ErrorMessage name="eventdateend" component={this.renderError} />
            <SemField type="number" component={SemForm.Input} name="hourend" placeholder="Hour (24h format)" />
            <SemField type="number" component={SemForm.Input} name="minuteend" placeholder="Minute" />
            <ErrorMessage name="hourend" component={this.renderError} />
            <ErrorMessage name="minuteend" component={this.renderError} />
            
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
      <Container>
        <Menu vertical fluid>
          <Formik
            validationSchema={this.validateSchema()}
            validate={this.validateForm}
            initialValues={{ 
              name: "",
              location: "",
              description: "", 
              category: "", 
              eventdatestart: "",
              hourstart: "",
              minutestart: "",
              eventdateend: "",
              hourend: "",
              minuteend: ""
            }}
            onSubmit={this.onSubmit}
            render={this.renderForm} 
          />
        </Menu>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { makeEvent })(FeedForm);