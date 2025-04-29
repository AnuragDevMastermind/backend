export function calculateBudgetAdherence(breakdown: any[]):number{
  const totalAdherence = breakdown.reduce((sum, item) => {
    const budget = item.budgetedAmount;
    const expenses = item.expenseAmount;
    const moneySaved = budget - expenses;

    const itemAdherence = moneySaved >= 0
      ? 100
      : Math.max(0, 100 + (moneySaved / budget) * 100);

    return sum + itemAdherence;
  }, 0);
  
  const adherence = totalAdherence / breakdown.length;
  return adherence
}

export function calculateUsageFrequency(activeDays: number,tDays:number): number {
  const daysActiveThisMonth = activeDays;
  const totalDays = tDays;

  const frequency = (daysActiveThisMonth / totalDays) * 100;
  return frequency;
}

export function getDaysInMonth(month: number, year: number): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();

  if (month === currentMonth && year === currentYear) {
    return currentDay;
  }

  return new Date(year, month + 1, 0).getDate();
}