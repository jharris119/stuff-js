/**
 * @author Jay Harris
 */

(function() {
    var _format = function() {
        var _args = arguments;
        return this.replace(/\{(\d+)\}/, function(match, $1) {
           try {
               if (_args[$1] !== undefined && _args[$1] !== null) {
                   return _args[$1];
               }
               throw new RangeError("No " + $1 + "-th argument passed to format method.");
           }
           catch(e) {
               if (e instanceof RangeError) {
                   console.warn(e);
                   return String();
               }
               throw e;
           }
        });
    };
    if (String.prototype.format === undefined) {
        String.prototype.format = _format;
    }
}).call(this);
