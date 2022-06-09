const{ createStore, bindActionCreators,
  combineReducers, applyMiddleware } =  require("redux")


const { createLogger } = require('redux-logger')
const logger = createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_RESTOCKED = ' ICE_CREAM_RESTOCKED'

function orderCake(){
  return ({
    type: CAKE_ORDERED,
    quantity: 1,
  })
}

function restockCake(quantity){
  return ({
    type: CAKE_RESTOCKED,
    payload : {
      quantity,
    }
  })
}

function orderIceCream(){
  return ({
    type: ICE_CREAM_ORDERED,
    quantity: 1,
  })
}

function restockIceCream(quantity){
  return ({
    type: ICE_CREAM_RESTOCKED,
    payload : {
      quantity,
    }
  })
}

const initialCakeState ={
  numOfCakes: 10,
}

const initialCreamState ={
  numOfIceCreams: 20
}

const iceCreamReducer = (state = initialCreamState, action) => {
  switch(action.type){
    case ICE_CREAM_ORDERED:
      return {...state, numOfIceCreams: state.numOfIceCreams - 1}
    case ICE_CREAM_RESTOCKED:
      return {...state, numOfIceCreams: state.numOfIceCreams + action.payload.quantity}
    default:
      return state
  }
}

const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type){
    case CAKE_ORDERED:
      return {...state, numOfCakes: state.numOfCakes - 1}
    case CAKE_RESTOCKED:
      return {...state, numOfCakes: state.numOfCakes + action.payload.quantity}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => {})


// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)

// actions.orderCake()
// actions.orderCake()
// actions.orderCake()
// actions.restockCake(3)

actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(3)

unsubscribe()
