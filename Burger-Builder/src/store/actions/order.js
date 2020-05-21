import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders'

export const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.SUBMIT_SUCCESS,
        id: id,
        orderData: orderData,
    }
}

export const orderFailue = error => {
    return {
        type: actionTypes.SUBMIT_FAILURE,
    }
}

export const orderSubmitStart = () => {
    return {
        type: actionTypes.SUBMIT_START
    }
}

export const orderSubmit = (order) => {
    return dispatch => {
        dispatch(orderSubmitStart())
        axios.post( '/orders.json', order )
            .then( res => {
                console.log(res.data)
                dispatch( orderSuccess( res.data.name, order) );
                dispatch(orderSubmitStarted())
                // this.props.history.push( '/' );
            } )
            .catch( error => {
                console.log(error)
                dispatch(orderFailue());
            } );
    }
}

export const orderSubmitStarted = () => {
    return{
        type: actionTypes.SUBMIT_STARTED
    }
}

export const fetchOrderInit = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderInit())
        axios.get('/orders.json')
        .then(res => {
            const fetchedOrders = []
            for( let key in res.data ){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
            // this.setState({orders: fetchedOrders, loading: false})
            console.log(res.data)
        })
        .catch(error => {
            dispatch(fetchOrderFail(error))
            this.setState({loading: false})
        })
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
} 