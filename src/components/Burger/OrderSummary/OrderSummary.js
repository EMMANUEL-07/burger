import React, {Component} from 'react'
import Auxillary from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'


class OrderSummary extends Component {


   render(){

      const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
               return <li key= {igKey}>
                        <span style={{textTransform: 'capitalize' }} >{igKey}</span>: {this.props.ingredients[igKey]}
                      </li>
      })

      return (
         <Auxillary>
            <h3>Your Order</h3>
            <p>Delicious Burger with the following ingredients: </p>
            <ul>
               {ingredientSummary}
            </ul>
            <p><b>Total Price: {this.props.price.toFixed(2)} </b></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancel} >CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue} >CONTINUE</Button>
         </Auxillary>
      )
   }
}

export default OrderSummary;
