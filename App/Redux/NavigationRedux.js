// import { NavigationActions, StackActions } from 'react-navigation'
// import AppNavigation from '../Navigation/AppNavigation'
//
// const { navigate } = NavigationActions
// const { reset } = StackActions
// const { getStateForAction } = AppNavigation.router
//
// const INITIAL_STATE = getStateForAction(
//   navigate({ routeName: 'AuthLoadingScreen' })
// )
// const NOT_LOGGED_IN_STATE = getStateForAction(
//   reset({
//     index: 0,
//     actions: [navigate({ routeName: 'AuthNavigator' })]
//   })
// )
// const LOGGED_IN_STATE = getStateForAction(
//   reset({
//     index: 0,
//     actions: [navigate({ routeName: 'AppNavigator' })]
//   })
// )
// /**
//  * Creates an navigation action for dispatching to Redux.
//  *
//  * @param {string} routeName The name of the route to go to.
//  */
// // const navigateTo = routeName => () => navigate({ routeName })
//
// export const reducer = (state = INITIAL_STATE, action) => {
//   let nextState
//   switch (action.type) {
//     case 'SET_REHYDRATION_COMPLETE':
//       return NOT_LOGGED_IN_STATE
//     case 'LOGOUT':
//       return NOT_LOGGED_IN_STATE
//     case 'LOGIN_SUCCESS':
//       return LOGGED_IN_STATE
//     case 'AUTO_LOGIN':
//       return LOGGED_IN_STATE
//   }
//   nextState = getStateForAction(action, state)
//   return nextState || state
// }

import AppNavigation from '../Navigation/AppNavigation'

export const reducer = (state, action) => {
  // don't allow back from 'EditReport'
  const newState = AppNavigation.router.getStateForAction(action, state)

  if (action.type === 'Navigation/BACK' && state && state.routes[state.index]) {
    if (
      state.routes[state.index].routes[state.routes[state.index].index]
        .routeName === 'ImageUpload' ||
      state.routes[state.index].routes[state.routes[state.index].index]
        .routeName === 'VerifyEmail'
    ) {
      return state
    } else {
      return newState || state
    }
    // additional logic here to save draft data
    // used this.props.navigation.setParams in the Screen
    // and state.routes[state.index].params here
  } else {
    return newState || state
  }
}
