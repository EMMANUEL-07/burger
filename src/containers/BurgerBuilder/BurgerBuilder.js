import React, {Component}  from 'react'
import Auxillary  from '../../hoc/Auxillary';
import withErrorHandler  from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import classes from './BurgerBuilder.module.css'




export class BurgerBuilder extends Component {

   // constructor(props) {
   //    super(props);
   //    this.state = { ...}
   // }


   state = {
      purchasing: false,
      loading: false,
      error: false
   }

   componentDidMount() {
      this.props.onInitIngredients();
     /*  axios.get('/ingredients.json')
      .then(response => this.setState({ingredients: response.data }))
      .catch(error => this.setState({error: true})) */
   }

   updatePurchaseState(ingredients) {
      
      const sum = Object.keys(ingredients)
            .map(igKey => {
               return ingredients[igKey]
            }).reduce((sum, el) => {
               return sum + el
            },0)
      return sum > 0 
   }

  /* CURRENTLY BEING HANDDLED IN REDUCER  
   addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;
      
      const priceAddition = INGREDIENTS_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
      this.updatePurchaseState(updatedIngredients)

   }

   removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if(oldCount<=0){
         return
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;
      
      const priceDeduction = INGREDIENTS_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
      this.updatePurchaseState(updatedIngredients)

   } */

   purchaseHandler = () => {
      if(this.props.isAuth) {
         this.setState({purchasing: true})
      }else {
         //this.props.onSetAuthRedirectPath('/checkout');
         this.props.history.push('/auth')
      }

      
   }

   purchaseCancelHandler = () => {
      this.setState({purchasing: false})
   }

   purchaseContinueHandler = () => {
      //alert('You Continued')
      /* this.setState({loading: true})
      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer: {
            name: 'Emmanuel',
            address: {
               street: 'TestStreet',
               zipCode: '6153',
               country: 'Nigeria'
            },
            email: 'test@test.com'
         },
         deliveryMethod: 'fastest'

      }
      axios.post('/orders.json', order)
      .then(response => this.setState({loading: false, purchasing: false}))
      .catch(error => this.setState({loading: false, purchasing: false})) 
      const queryParams =[]
      for (let i in this.state.ingredients) {
         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) )
      }
      queryParams.push('price=' + this.props.price)
      const queryString = queryParams.join('&')*/
      this.props.onInitPurchase()
      this.props.history.push({pathname: '/checkout'})

   } 

   render() {

      const disabledInfo = { ...this.props.ings }
      
      for(let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <=  0
      } 
      
      let orderSummary = null

      if(this.props.ings) {
          orderSummary = <Spinner />
      }

      let burger = this.props.error ? <p>ingredients cant be loaded!</p> : <Spinner />

      if (this.props.ings) {
         burger = (
            <div className={classes.flexer}>
               <div><Burger ingredients={this.props.ings} /></div>
               
               <div>
                  <BuildControls 
                  ingredientAdded={this.props.onIngredientAdded} 
                  ingredientRemoved={this.props.onIngredientRemoved} 
                  disabled = {disabledInfo} 
                  price={this.props.price} 
                  purchasable={this.updatePurchaseState(this.props.ings)} 
                  ordered={this.purchaseHandler}
                  isAuth={this.props.isAuth}
                  />
               </div>
            </div>
         )
         orderSummary = <OrderSummary ingredients={this.props.ings} purchaseCancel={this.purchaseCancelHandler} 
         purchaseContinue={this.purchaseContinueHandler} price={this.props.price} />            
      }
      

      return (
         <Auxillary>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >  
               {orderSummary}
            </Modal>
            {burger}
         </Auxillary>
            
         
      );
   }
}

const mapStateToProps = state => {
   return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuth: state.auth.token !== null
      
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
   }
}




export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))