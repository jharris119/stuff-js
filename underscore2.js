/**
 * Some additional functions I think would be nice to add to underscore.js.
 */

_.mixin({
  /**
   * Keep calling func until it returns a non-undefined, non-null value.
   *
   * @param {function} func - the function to call
   * @param {object} context - the "this" object
   * @param {...*} args - arguments to func
   */
  tryAgain: function(func, context, args) {
    var res;
    while (res === undefined || res === null) {
      res = func.apply(context, Array.prototype.slice.call(arguments, 2));
    }
    return res;
  },

  /**
   * A better typeof operator-function thing.
   *
   * @param {object} mystery object
   * @return {string} the name of the object's constructor
   */
  typeof: function(obj) {
  	var regexMatch;

  	if (obj === null) { return 'null'; }
  	if (obj === undefined) { return 'undefined' };

  	if (regexMatch = obj.constructor.toString().match(/function (\w+)\(.*/)) {
  		return regexMatch[1];
  	}
  	else {
  		return "anonymous function";
  },
});
