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
      }
}

export default Utilities;