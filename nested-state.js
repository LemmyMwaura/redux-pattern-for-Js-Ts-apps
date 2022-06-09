const{ createStore } =  require("redux")
const produce = require('immer').produce

const initialState = {
  name: "Lemmy",
  address: {
    street: "123 Main Street",
    city: "Boston",
    state: "MA",
  },
}

const STREET_UPDATED = "STREET_UPDATED"
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: {
      street,
    },
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: { ...state.address, street: action.payload.street },
      // }

      // Using immer to update nested state
      return produce(state, (draft) => {
        draft.address.street = action.payload.street
      })
    default:
      return state
  }
}

const store = createStore(reducer)
console.log('Initial State', store.getState())

const unsubscribe = store.subscribe(() => 
  console.log('updated state', store.getState())
)

store.dispatch(updateStreet('25 Limuru'))
unsubscribe()
