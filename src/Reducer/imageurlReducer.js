export const ImageUrlReducer = (state={item:{}},action)=>{
    switch(action.type){
        case "Add_ImageUrl":
            state={
                ...state,
                image : action.payload
            }
    }
    return state;
}