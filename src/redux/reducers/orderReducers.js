
const initialState={
    ordersList:[{
        orderId:1122,
        name: "Manoj Gokina"
    }],
    loading:true,
}

const ordersReducer = (state = initialState, action) => {
    const newState = {...state};
    

    return newState;
};

export default ordersReducer;