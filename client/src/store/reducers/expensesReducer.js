const initialState = {
  expenses: [],
  showPremiumButton: false,
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EXPENSES":
      const expenses = action.payload;
      return {
        ...state,
        expenses,
        showPremiumButton:
          expenses.reduce((sum, exp) => sum + exp.amount, 0) > 10000,
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    default:
      return state;
  }
};
