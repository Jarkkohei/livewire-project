const tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    title: action.title,
                    description: action.description,
                    status: action.status,
                    userId: action.userId
                }
            ];
        default:
            return state;
    }
}

export default tasks;