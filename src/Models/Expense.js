export default class Expense {
    constructor(id, name, date, category, amount, currency, group, convertedAmount) {
        this.Id = id;
        this.Name = name;
        this.Date = date;
        this.Category = category;
        this.Amount = amount;
        this.Currency = currency;
        this.Group = group;
        this.ConvertedAmount = convertedAmount;
    }
}