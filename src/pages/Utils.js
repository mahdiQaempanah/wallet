export const EnglishDigitsToFarsi = function(num) {
    function convertor(num) {
      let str = num.toString();
      var e2f = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹'
      };
      return str.replace(/[0-9]/g, function (match) { return e2f[match]; });
    }

    if (num >= 0)
      return convertor(num) + '+'
    else
      return convertor(-num) + '-'
  }

export default EnglishDigitsToFarsi;