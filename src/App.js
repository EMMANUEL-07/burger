import React, {Component}  from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from  './containers/BurgerBuilder/BurgerBuilder'
import {Route, Switch, Redirect} from 'react-router-dom'
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout  = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})
const asyncOrders  = asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  
  render() {

    let  routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>

    )
    
    if (this.props.isAuth){
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          <Switch>
           {routes}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps= state => {
  return  {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp :  () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
