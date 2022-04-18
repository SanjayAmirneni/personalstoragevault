import vault from "../Redux/vault";

const addItem = (data) => {
    vault.dispatch({
        type:"Add_Item",
        payload:data,
    })
}

export default addItem;