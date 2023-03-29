export default class Investment{
 
    constructor(id, amount, source,  currency, isSIP, location, owner, type ){
        this.Id = id;
        this.Amount = amount;
        this.Currency = currency;
        this.Source = source;
        this.IsSIP = isSIP;
        this.Location = location;
        this.Owner = owner;
        this.Type = type;
    }
}