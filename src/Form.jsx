import React from 'react';
import FormField from './FormField.jsx'; //functional component for each form field
import Button from '@material-ui/core/Button';

class Form extends React.Component {
    constructor(props) {
        super(props); //the form field data should be handed down as props from App.jsx
        
        //creates an object 'formFieldObj' with all form field names as keys, and corresponding values undefined
        const formFieldObj = this.props.data.reduce((obj, element) => ({...obj,[element.name]: undefined}),{});

        //copy formFieldObj onto state, so that the component's state has a key for every field in the form
        this.state = {
            ...formFieldObj,
            submitted:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    //need a separate method for this due to the format of the event target object produced by the Material UI component.
    handleCheckboxChange(event) {
        this.setState({[event.target.name]: event.target.checked})
    }

    //this form doesn't require parental consent to be checked 'true' in order to submit. 
    //I thought about it but the point of the app is to create a generic form generator and it may not always be necessary for the checkbox to be checked in order to submit.
    //For more use cases it would be good to create an option or a prop to specify whether the checkbox is required to be checked. 
    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true}, ()=> {
            console.log(this.state); //you can read the returned object in your console upon submitting.
        })
        
        return this.state;
    }

    render() {
        const formFields = this.props.data;

        return (
        <div>
        {!this.state.submitted ? //if the form hasn't yet been submitted, it will render.
            <form onSubmit={this.handleSubmit}>
                { formFields.length ?
                    formFields.map(
                        formField => 
                            <div key={formField.name}> 
                                {formField.conditional && formField.conditional.show_if(this.state[formField.conditional.name])? //conditionally render formField if there is a condition
                                    <FormField {...formField} handleChange={this.handleChange} handleCheckboxChange={this.handleCheckboxChange} />
                                : null  
                                }
                                {!formField.conditional? //always render formField if there's no condition
                                    <FormField {...formField} handleChange={this.handleChange} handleCheckboxChange={this.handleCheckboxChange} />
                                : null    
                            }
                            </div>
                    )
                    :
                    <h3>No form fields to display.</h3>
                }
                <Button type="submit" variant="contained" color="primary" className="submit_button" style={buttonStyle}>
                    Submit Form
                </Button>
            </form>
        :
        <div>
            <h2>Thank you. Your form has been submitted.</h2>
            <h4>(Inspect your console for a copy of the submitted object.)</h4>
        </div>
        }
        </div>
        );
    }
}

//inline button styling to override some Material UI defaults. This is a quick fix but obviously better to do this in a separate
//stylesheet for a longer-term project.
const buttonStyle = {
    margin: '1.5em 1em 3em',
    width: 300,
    'fontFamily': 'helvetica',
    'fontWeight': 'bolder'
}

export default Form;
