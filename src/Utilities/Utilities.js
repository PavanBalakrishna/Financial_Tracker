const Utilities = {
    SetCookie(cname, cvalue, exdays = 365) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    GetCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    ConvertToYen: function (amount, currency) {
        switch (currency) {
            case "JPY":
                return amount;
            case "USD":
                return amount * 110;
            case "EUR":
                return amount * 130;
            case "GBP":
                return amount * 150;
            case "AUD":
                return amount * 80;
            case "INR":
                return amount * 1.5;
            case "CAD":
                return amount * 85;
            case "CHF":
                return amount * 120;
            case "CNY":
                return amount * 15;
            case "HKD":
                return amount * 14;
            case "NZD":
                return amount * 75;
            case "SGD":
                return amount * 80;
            case "ZAR":
                return amount * 7;
            case "SEK":
                return amount * 12;
            case "THB":
                return amount * 3.5;
            case "KRW":
                return amount * 0.1;
            case "SKK":
                return amount * 5;
            default:
                return amount;
        }
    },
    SortByDates: function (a, b) {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return dateB - dateA;
    },
    GroupDatesByPeriod: function(expenses) {
        const groups = {};
        
        // Loop through each date in the array
        for (const expense of expenses) {
            var expenseDate = new Date(expense.Date);
          // Get the year and month of the date
          let fromyear = expenseDate.getFullYear();
          let frommonth = expenseDate.getMonth();
          let date = expenseDate.getDate();
          let toyear = expenseDate.getFullYear();
          let tomonth = expenseDate.getMonth();

          if(date < 25){
            frommonth = expenseDate.getMonth() - 1;
            if(frommonth < 0){
                frommonth = 11;
                fromyear = expenseDate.getFullYear() - 1;
            }
          }
            else{
                tomonth = expenseDate.getMonth() + 1;
                if(tomonth > 11){
                    tomonth = 0;
                    toyear = expenseDate.getFullYear() + 1;
                }
            }
            // Create a new date object with the year and month of the date
            const startDate = new Date(fromyear, frommonth, 25);
            const endDate = new Date(toyear, tomonth, 25);              
          
          // Add the date to the corresponding group based on the grouping period
          const groupKey = `${startDate.toLocaleDateString("fr-CA")} to ${endDate.toLocaleDateString("fr-CA")}`;
          if (groups[groupKey]) {
            groups[groupKey].push(expense);
          } else {
            groups[groupKey] = [expense];
          }
        }
        
        return groups;
      },
      GetCurrent25DateRange: function(){
        var today = new Date().toLocaleDateString("fr-CA");
        today = new Date(today);
        var fromMonth = today.getMonth();
        var fromYear = today.getFullYear();
        var toMonth = today.getMonth();
        var toYear = today.getFullYear();
        if(today.getDate() < 25){
            fromMonth = today.getMonth() - 1;
            if(fromMonth < 0){
                fromMonth = 11;
                fromYear = today.getFullYear() - 1;
            }
        }
        else{
            toMonth = today.getMonth() + 1;
            if(toMonth > 11){
                toMonth = 0;
                toYear = today.getFullYear() + 1;
            }
        }
        const startDate = new Date(fromYear, fromMonth, 25);
        const endDate = new Date(toYear, toMonth, 25);
        
        return `${startDate.toLocaleDateString("fr-CA")} to ${endDate.toLocaleDateString("fr-CA")}`;
      }

}

export default Utilities;