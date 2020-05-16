import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    state={
        ingredients : null,
        price:0
    }

    componentWillMount = () => {
        const params = new URLSearchParams(this.props.location.search)
        const ingredients = {} 
        let price
        for (let i of params.entries()){
            if(i[0] === "price" ){
                price = +i[1]
            }
            else{
                ingredients[i[0]] = +i[1]
            }
        }
        this.setState({ingredients:ingredients, price: price})
    }

    checkoutCancelled = () => {
        this.props.history.goback()
    }

    checkoutCancelled = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                  checkoutCancelled={this.checkoutCancelled}
                  checkoutContinued={this.checkoutCancelled}
                  ingredients={this.state.ingredients} 
                  />
                <Route path={ this.props.match.path + '/contact-data' } render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>
        )
    }
}

export default Checkout