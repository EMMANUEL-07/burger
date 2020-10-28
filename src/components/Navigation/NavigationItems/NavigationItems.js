import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = (props) => (
   
   <ul className={classes.NavigationItems}>
      <NavigationItem link="/"  exact active > Burger Builder </NavigationItem>
      {props.isAuth ?   <NavigationItem link="/orders">Orders</NavigationItem> : null}
      {props.isAuth ? <NavigationItem link="/logout">LogOut</NavigationItem> : <NavigationItem link="/auth">Authenticate</NavigationItem>}

   </ul>

)


export default NavigationItems;