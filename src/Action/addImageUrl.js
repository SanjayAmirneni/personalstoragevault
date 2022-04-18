import vault from "../Redux/vault";

const addImageUrl = (data) => {
    vault.dispatch({
        type:"Add_ImageUrl",
        payload:data,
    })
}

export default addImageUrl;