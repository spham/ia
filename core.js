define(function () {

  return {

    redirectConsole: function (div_id) {
      if (typeof console != "undefined")
        if (typeof console.log != 'undefined')
          console.olog = console.log;
        else
          console.olog = function () {
          };
      console.log = function (message) {
        console.olog(message);
        $(div_id).append('<p>' + message + '</p>');
      };
      console.error = console.debug = console.info = console.log
    },

    clone: function (obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    }

  };

});