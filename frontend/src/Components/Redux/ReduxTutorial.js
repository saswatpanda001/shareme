import { createSlice, configureStore } from '@reduxjs/toolkit'

// const redux = require('redux')



const counterSlice = createSlice({
    name:"learn_reduxtools",
    initialState: {board:true,days:0},
    reducers:{
        increment(state,action){
            if(action.payload){
                state.days = state.days+action.payload
            }
            else{state.days+=1}
        },
        decrement(state){state.days-=1},
        toggle(state){state.board=!state.board},
       
}})



const authSlice = createSlice({
    name:"learn_reduxtools1",
    initialState: {login:false,username:"",name:"",user_id:"",image:""},
    reducers:{
        user_auth(state,action){
            state.login=action.payload
        },
        username(state,action){
            state.username = action.payload
        },
        name(state,action){
            state.name = action.payload
        },
        user_id(state,action){
            state.user_id = action.payload
        },
        
       
}})

const ReduxCentralStore = configureStore({
    reducer:{counter:counterSlice.reducer,auth:authSlice.reducer}
});

export const CounterActions = counterSlice.actions
export const AuthActions = authSlice.actions
export default ReduxCentralStore;








