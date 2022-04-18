export const signoutReducer = (state={signout:{}},action)=>{
    switch(action.type){
        case "Add_SignOut":
            console.log(action)
            state={
                ...state,
                signout : action.payload
            }
            console.log(state)
    }
    return state;
}