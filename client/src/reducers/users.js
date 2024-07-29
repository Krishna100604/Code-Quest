const userReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_USERS":
            return action.payload;
        default:
            return state;
    }
};

export default userReducer;
