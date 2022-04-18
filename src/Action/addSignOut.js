import vault from "../Redux/vault";

const addSignOut = (data) => {
    console.log(data)
    vault.dispatch({
        type:"Add_SignOut",
        payload:data,
    })
}

export default addSignOut;