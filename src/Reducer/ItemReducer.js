export const itemReducer = (state={item:{}},action)=>{
    switch(action.type){
        case "Add_Item":
            state={
                ...state,
                item : {...action.payload}
            }
    }
    return state;
}