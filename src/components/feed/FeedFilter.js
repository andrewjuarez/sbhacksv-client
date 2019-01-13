import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import  { Button, Form as SemForm, Menu, Select, Message, Icon } from "semantic-ui-react";
import * as Yup from "yup";

import SemField from "../helpers/SemField";
import { fetchEvents } from "../../actions";

const categoryOptions = [
  { value: "all", text: "All Events" },
  { value: "party", text: "Party" },
  { value: "sports", text: "Sports" },
  { value: "professional", text: "Professional" },
  { value: "promotion", text: "Promotion" },
  { value: "gaming", text: "Gaming" },
  { value: "entertainment", text: "Entertainment" },
  { value: "food", text: "Food" },
  { value: "social", text: "Social" }
];

class FeedFilter extends Component {

  state = { formError: "", disableButton: false };

  onSubmit = (values, actions) => {
    console.log(values);
    this.setState({ disableButton: true }, () =>this.props.fetchEvents(values.category, () => this.setState({ disableButton: false })));
    actions.setSubmitting(false);
  }

  validateSchema = () => (
    Yup.object().shape({ 
      category: Yup.string().required("You must enter a category"),
    })
  );

  renderError = props => {
    // console.log(props);
    return <div style={{ color: "red" }}>{props.children}</div>;
  }

  renderServerError = () => {
    return (
      <Menu.Item>
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{this.state.formError}</p>
        </Message>
      </Menu.Item>
    );
  }


  renderForm = ({ errors, status, touched, isSubmitting }) => {
    return (
      <Form autoComplete="off" >
        
          <SemForm.Group>
            <SemField fluid component={Select} name="category" placeholder="Select a category" options={categoryOptions} />
            <ErrorMessage name="category" component={this.renderError} />
          </SemForm.Group>
          <SemForm.Group>
            <Button fluid color="teal" style={{ marginTop: "5px" }} basic type="submit" disabled={isSubmitting || this.state.disableButton} loading={this.state.disableButton} >
              <Icon name="search"></Icon>Filter Events
            </Button>
          </SemForm.Group>
        
        {this.state.formError && this.renderServerError()}
      </Form>
    );
  }


  render () {
    return(
      
        
          <Formik
            validationSchema={this.validateSchema()}
            initialValues={{ 
              category: ""
            }}
            onSubmit={this.onSubmit}
            render={this.renderForm} 
          />
        
  
    );
  }
}

export default connect(null, { fetchEvents })(FeedFilter);