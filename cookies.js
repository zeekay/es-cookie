var Cookies = (function () {
'use strict';

// node_modules/es-object-assign/lib/es-object-assign.mjs
// src/index.coffee
var getOwnSymbols;
var objectAssign;
var shouldUseNative;
var toObject;
var slice = [].slice;

getOwnSymbols = Object.getOwnPropertySymbols;

toObject = function(val) {
  if (val === null || val === void 0) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }
  return Object(val);
};

shouldUseNative = function() {
  var err, i, j, k, len, letter, order2, ref, test1, test2, test3;
  try {
    if (!Object.assign) {
      return false;
    }
    test1 = new String('abc');
    test1[5] = 'de';
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    }
    test2 = {};
    for (i = j = 0; j <= 9; i = ++j) {
      test2['_' + String.fromCharCode(i)] = i;
    }
    order2 = Object.getOwnPropertyNames(test2).map(function(n) {
      return test2[n];
    });
    if (order2.join('') !== '0123456789') {
      return false;
    }
    test3 = {};
    ref = 'abcdefghijklmnopqrst'.split('');
    for (k = 0, len = ref.length; k < len; k++) {
      letter = ref[k];
      test3[letter] = letter;
    }
    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }
    return true;
  } catch (error) {
    err = error;
    return false;
  }
};

var index$1 = objectAssign = (function() {
  if (shouldUseNative()) {
    return Object.assign;
  }
  return function() {
    var from, j, k, key, len, len1, ref, source, sources, symbol, target, to;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    to = toObject(target);
    for (j = 0, len = sources.length; j < len; j++) {
      source = sources[j];
      from = Object(source);
      for (key in from) {
        if (Object.prototype.hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnSymbols) {
        ref = getOwnSymbols(from);
        for (k = 0, len1 = ref.length; k < len1; k++) {
          symbol = ref[k];
          if (Object.prototype.propIsEnumerable.call(from, symbol)) {
            to[symbol] = from[symbol];
          }
        }
      }
    }
    return to;
  };
})();

// node_modules/es-is/lib/es-is.mjs
// src/is/type.coffee
var isType;

var type = isType = function(value, type) {
  return typeof value === type;
};

// src/is/defined.coffee
var isDefined;

var defined = isDefined = function(value) {
  return typeof value !== 'undefined';
};

// src/utils.coffee
var objProto = Object.prototype;

var owns = objProto.hasOwnProperty;

var toStr = objProto.toString;

var symbolValueOf = typeof Symbol === 'function' ? Symbol.prototype.valueOf : void 0;

var isActualNaN = function(value) {
  return value !== value;
};

// src/is/empty.coffee
var isEmpty;

var empty = isEmpty = function(value) {
  var key, type;
  type = toStr.call(value);
  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }
  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  return !value;
};

// src/is/array.coffee
var isArray;

var isArray$1 = isArray = Array.isArray || function(value) {
  return toStr.call(value) === '[object Array]';
};

// src/is/bool.coffee
var isBool;

var isBool$1 = isBool = function(value) {
  return toStr.call(value) === '[object Boolean]';
};

// src/is/infinite.coffee
var isInfinite;

var isInfinite$1 = isInfinite = function(value) {
  return value === 2e308 || value === -2e308;
};

// src/is/number.coffee
var isNumber;

var isNumber$1 = isNumber = function(value) {
  return toStr.call(value) === '[object Number]';
};

// src/is/array-like.coffee
var isArrayLike;

var isArrayLike$1 = isArrayLike = function(value) {
  return !!value && !isBool$1(value) && owns.call(value, 'length') && isFinite(value.length) && isNumber$1(value.length) && value.length >= 0;
};

// src/is/function.coffee
var isFunction;

var isFunction$1 = isFunction = function(value) {
  var str;
  if (typeof window !== 'undefined' && value === window.alert) {
    return true;
  }
  str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

// src/is/object.coffee
var isObject;

var isObject$1 = isObject = function(value) {
  return toStr.call(value) === '[object Object]';
};

// src/is/arguments.coffee
var isArguments;

var isArguments$1 = isArguments = function(value) {
  var isOldArguments, isStandardArguments;
  isStandardArguments = toStr.call(value) === '[object Arguments]';
  isOldArguments = !isArray$1(value) && isArrayLike$1(value) && isObject$1(value) && isFunction$1(value.callee);
  return isStandardArguments || isOldArguments;
};

// src/is/empty-arguments.coffee
var isEmptyArguments;

var emptyArguments = isEmptyArguments = function(value) {
  return isArguments$1(value) && value.length === 0;
};

// src/is/empty-array.coffee
var isEmptyArray;

var emptyArray = isEmptyArray = function(value) {
  return isArray$1(value) && value.length === 0;
};

// src/is/equal.coffee
var isEqual;

var equal = isEqual = function(value, other) {
  var key, type;
  if (value === other) {
    return true;
  }
  type = toStr.call(value);
  if (type !== toStr.call(other)) {
    return false;
  }
  if (type === '[object Object]') {
    for (key in value) {
      if (!isEqual(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!isEqual(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }
  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (key--) {
      if (!isEqual(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }
  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }
  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }
  return false;
};

// src/is/hosted.coffee
var NON_HOST_TYPES;
var isHosted;

NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var hosted = isHosted = function(value, host) {
  var type;
  type = typeof host[value];
  if (type === 'object') {
    return !!host[value];
  } else {
    return !NON_HOST_TYPES[type];
  }
};

// src/is/instanceof.coffee
var isInstanceOf;

var _instanceof = isInstanceOf = function(value, constructor) {
  return value instanceof constructor;
};

// src/is/null.coffee
var isNull;

var _null = isNull = function(value) {
  return value === null;
};

// src/is/undefined.coffee
var isUndefined;

var _undefined = isUndefined = function(value) {
  return typeof value === 'undefined';
};

// src/is/false.coffee
var isFalse;

var _false = isFalse = function(value) {
  return isBool$1(value) && Boolean(Number(value)) === false;
};

// src/is/true.coffee
var isTrue;

var _true = isTrue = function(value) {
  return isBool$1(value) && Boolean(Number(value)) === true;
};

// src/is/date.coffee
var isDate;

var isDate$1 = isDate = function(value) {
  return toStr.call(value) === '[object Date]';
};

// src/is/valid-date.coffee
var isValidDate;

var validDate = isValidDate = function(value) {
  return isDate$1(value) && !isNaN(Number(value));
};

// src/is/element.coffee
var isElement;

var element = isElement = function(value) {
  return value !== void 0 && typeof HTMLElement !== 'undefined' && value instanceof HTMLElement && value.nodeType === 1;
};

// src/is/error.coffee
var isError;

var error$1 = isError = function(value) {
  return toStr.call(value) === '[object Error]';
};

// src/is/decimal.coffee
var isDecimal;

var decimal = isDecimal = function(value) {
  return isNumber$1(value) && !isActualNaN(value) && !isInfinite$1(value) && value % 1 !== 0;
};

// src/is/divisible-by.coffee
var isDivisibleBy;

var divisibleBy = isDivisibleBy = function(value, n) {
  var isDividendInfinite, isDivisorInfinite, isNonZeroNumber;
  isDividendInfinite = isInfinite$1(value);
  isDivisorInfinite = isInfinite$1(n);
  isNonZeroNumber = isNumber$1(value) && !isActualNaN(value) && isNumber$1(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || isNonZeroNumber && value % n === 0;
};

// src/is/integer.coffee
var isInteger;

var integer = isInteger = function(value) {
  return isNumber$1(value) && !isActualNaN(value) && value % 1 === 0;
};

// src/is/max.coffee
var isMax;

var max = isMax = function(value, others) {
  var len;
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!isArrayLike$1(others)) {
    throw new TypeError('second argument must be array-like');
  }
  len = others.length;
  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }
  return true;
};

// src/is/min.coffee
var isMin;

var min = isMin = function(value, others) {
  var len;
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!isArrayLike$1(others)) {
    throw new TypeError('second argument must be array-like');
  }
  len = others.length;
  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }
  return true;
};

// src/is/nan.coffee
var isNaN$1;

var nan = isNaN$1 = function(value) {
  return !isNumber$1(value) || value !== value;
};

// src/is/even.coffee
var isEven;

var even = isEven = function(value) {
  return isInfinite$1(value) || isNumber$1(value) && value === value && value % 2 === 0;
};

// src/is/odd.coffee
var isOdd;

var odd = isOdd = function(value) {
  return isInfinite$1(value) || isNumber$1(value) && value === value && value % 2 !== 0;
};

// src/is/ge.coffee
var isGe;

var ge = isGe = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite$1(value) && !isInfinite$1(other) && value >= other;
};

// src/is/gt.coffee
var isGt;

var gt = isGt = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite$1(value) && !isInfinite$1(other) && value > other;
};

// src/is/le.coffee
var isLe;

var le = isLe = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite$1(value) && !isInfinite$1(other) && value <= other;
};

// src/is/lt.coffee
var isLt;

var lt = isLt = function(value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !isInfinite$1(value) && !isInfinite$1(other) && value < other;
};

// src/is/within.coffee
var isWithin;

var within = isWithin = function(value, start, finish) {
  var isAnyInfinite;
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!isNumber$1(value) || !isNumber$1(start) || !isNumber$1(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  isAnyInfinite = isInfinite$1(value) || isInfinite$1(start) || isInfinite$1(finish);
  return isAnyInfinite || value >= start && value <= finish;
};

// src/is/primitive.coffee
var isPrimitive;

var primitive = isPrimitive = function(value) {
  if (!value) {
    return true;
  }
  if (typeof value === 'object' || isObject$1(value) || isFunction$1(value) || isArray$1(value)) {
    return false;
  }
  return true;
};

// src/is/promise.coffee
var isPromise;

var promise = isPromise = function(value) {
  return !!value && (typeof value === 'object' || typeof value === 'function') && typeof value.then === 'function';
};

// src/is/hash.coffee
var isHash;

var hash = isHash = function(value) {
  return isObject$1(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

// src/is/regexp.coffee
var isRegExp;

var regexp = isRegExp = function(value) {
  return toStr.call(value) === '[object RegExp]';
};

// src/is/string.coffee
var isString;

var isString$1 = isString = function(value) {
  return toStr.call(value) === '[object String]';
};

// src/is/base64.coffee
var base64Regex;
var isBase64;

base64Regex = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}==)$/;

var base64 = isBase64 = function(value) {
  return isString$1(value) && (!value.length || base64Regex.test(value));
};

// src/is/hex.coffee
var hexRegex;
var isHex;

hexRegex = /^[A-Fa-f0-9]+$/;

var hex = isHex = function(value) {
  return isString$1(value) && (!value.length || hexRegex.test(value));
};

// src/is/symbol.coffee
var isSymbol;

var symbol = isSymbol = function(value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};

// src/cookies.coffee
var Cookies;

Cookies = (function() {
  function Cookies(defaults) {
    this.defaults = defaults != null ? defaults : {};
    this.get = (function(_this) {
      return function(key) {
        return _this.read(key);
      };
    })(this);
    this.getJSON = (function(_this) {
      return function(key) {
        var err;
        try {
          return JSON.parse(_this.read(key));
        } catch (error) {
          err = error;
          return {};
        }
      };
    })(this);
    this.remove = (function(_this) {
      return function(key, attrs) {
        return _this.write(key, '', index$1({
          expires: -1
        }, attrs));
      };
    })(this);
    this.set = (function(_this) {
      return function(key, value, attrs) {
        return _this.write(key, value, attrs);
      };
    })(this);
  }

  Cookies.prototype.read = function(key) {
    var cookie, cookies, err, i, kv, len, name, parts, rdecode, result;
    if (!key) {
      result = {};
    }
    cookies = document.cookie ? document.cookie.split('; ') : [];
    rdecode = /(%[0-9A-Z]{2})+/g;
    for (i = 0, len = cookies.length; i < len; i++) {
      kv = cookies[i];
      parts = kv.split('=');
      cookie = parts.slice(1).join('=');
      if (cookie.charAt(0) === '"') {
        cookie = cookie.slice(1, -1);
      }
      try {
        name = parts[0].replace(rdecode, decodeURIComponent);
        cookie = cookie.replace(rdecode, decodeURIComponent);
        if (key === name) {
          return cookie;
        }
        if (!key) {
          result[name] = cookie;
        }
      } catch (error) {
        err = error;
      }
    }
    return result;
  };

  Cookies.prototype.write = function(key, value, attrs) {
    var attr, err, expires, name, result, strAttrs;
    attrs = index$1({
      path: '/'
    }, this.defaults, attrs);
    if (isNumber$1(attrs.expires)) {
      expires = new Date;
      expires.setMilliseconds(expires.getMilliseconds() + attrs.expires * 864e+5);
      attrs.expires = expires;
    }
    attrs.expires = attrs.expires ? attrs.expires.toUTCString() : '';
    try {
      result = JSON.stringify(value);
      if (/^[\{\[]/.test(result)) {
        value = result;
      }
    } catch (error) {
      err = error;
    }
    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
    key = encodeURIComponent(String(key));
    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
    key = key.replace(/[\(\)]/g, escape);
    strAttrs = '';
    for (name in attrs) {
      attr = attrs[name];
      if (!attr) {
        continue;
      }
      strAttrs += '; ' + name;
      if (attr === true) {
        continue;
      }
      strAttrs += '=' + attr;
    }
    return document.cookie = key + '=' + value + strAttrs;
  };

  return Cookies;

})();

var Cookies$1 = Cookies;

// src/index.coffee
var index = new Cookies$1();

return index;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llcy5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIifQ==
