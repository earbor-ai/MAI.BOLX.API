const orderActions = {
    addTodo(data) {
      return {
        type: 'ADD_ORDER',
        data,
      };
    },
    completeTodo(id) {
      return {
        type: 'COMPLETE_ORDER',
        id,
      };
    },
    deleteTodo(id) {
      return {
        type: 'CANCEL_TODO',
        id,
      };
    }
  };
  export default orderActions;