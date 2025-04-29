type OverspentCategories = {
  category: string;
  expenseAmount: number;
  budgetedAmount: number;
}
export type OverspentUser = {
  _id: string;
  name: string;
  number: string;
  overspentCategories: Array<OverspentCategories>;
}

export type InActiveSpender = {
  _id: string;
  name: string;
  number: string;
}