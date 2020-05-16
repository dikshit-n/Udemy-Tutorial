import React, { Component } from 'react'

import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Id'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliverymethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {}, // to fix the "Cannot read property 'required' of undefined" (Method 1)
                isValid: true
            }
        },
        loading: false,
        formValid: false
    }

    checkValidity(value, rules){
        let isValid = true
        // Method 2
        if(!rules){
            return true
        }
        //...
        if(rules.required){
            isValid = value.trim() !== "" && isValid
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading:true})
        // alert('You continue!');
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
            
        axios.post('/orders.json',order)
        .then(res => {
            console.log(res)
            this.setState({loading:false })
            this.props.history.push('/')
        })
        .catch(error => {
            console.log(error)
            this.setState({loading:false })
        })
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const  updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.isValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formValid = true

        for(let inputIdentifier in updatedOrderForm) {
            formValid = updatedOrderForm[inputIdentifier].isValid && formValid
        }
        this.setState({orderForm: updatedOrderForm, formValid: formValid})
    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid = {!formElement.config.isValid}
                        touched={formElement.config.touched}
                        shouldValid={formElement.config.validation}
                        changed = {(event) => this.inputChangedHandler(event, formElement.id) }
                    />
                ))}
                <Button disabled={!this.state.formValid} btnType="Success" >ORDER</Button>
            </form>
        )
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData} >
                <h4>Contact Details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData