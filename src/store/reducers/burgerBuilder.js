import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
   ingredients: null,
   totalPrice: 4,
   error: false,
   building: false
}

const INGREDIENTS_PRICES = {
   salad: 0.5,
   bacon: 0.7,
   cheese: 0.4,
   meat: 1.3 
}


const addIngredient = (state, action) => {
   const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
   const updatedIngredients = updateObject(state.ingredients, updatedIngredient )
   const updatedState = { ingredients: updatedIngredients, totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],  building: true }
   return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
   const updatedIngr = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
   const updatedIngrs = updateObject(state.ingredients, updatedIngr )
   const updatedStater = { ingredients: updatedIngrs, totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName], building: true }
   return updateObject(state, updatedStater)
}



const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_INGREDIENT:  return addIngredient(state, action);
         
      case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
         
      case actionTypes.SET_INGREDIENT: 
         const updatedStates = { ingredients: action.ingredients, error: false, totalPrice: 4, building: false}
         return updateObject(state, updatedStates)   
   
      case actionTypes.FETCH_INGREDIENT_FAILED: return updateObject (state, {error: true  } )

      default:
         return state;
   }  

}

export default reducer