import React from 'react'
import classes from './SideDrawer.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Auxillary from '../../../hoc/Auxillary'
import Backdrop from '../../UI/Backdrop/Backdrop'





const SideDrawer = (props) => {

   let attachedClasses = [classes.SideDrawer, classes.Close]
   if(props.open){
      attachedClasses = [classes.SideDrawer, classes.Open]
   }

   return (
      <Auxillary>
         <Backdrop show={props.open}  clicked = {props.closed} />
         <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo} >
               <Logo />
            </div>
            <nav>
               <NavigationItems isAuth={props.isAuth} />
            </nav>
         </div>
      </Auxillary>
      
   )
}

export default SideDrawer;