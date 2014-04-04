(function() {
  

var paramsValidate = function() {
  
  if (arguments.length < 2) {
    throw new Error("at least two paremeters required");
  }
  
  var cb    = false;
  var given = arguments[0];
  var test  = arguments[1];
  
  if (typeof arguments[ arguments.length -1 ] === 'function') {
    cb = arguments[ arguments.length -1 ];
    
  }
  if (Object.prototype.toString.call(given) !== '[object Object]') {
    throw new Error("first parameter must be an object");
  }
  if (Object.prototype.toString.call(test) !== '[object Object]') {
    throw new Error("second parameter must be an object");
  }

  
  var errors = [ ];
  
  /* Make sure the keys given match the test keys */
  
  var givenKeys = Object.keys(given);
  var testKeys = Object.keys(test);
  
  for (var i=0;i<testKeys.length;i++) {
    if (givenKeys.indexOf( testKeys[i]) === -1 ) {
      
      var temp = { };
      temp[ testKeys[i] ] = "required";
      errors.push(temp);
    }
    
  }
  for (var i=0;i<givenKeys.length;i++) {
    if (testKeys.indexOf( givenKeys[i]) === -1 ) {
      
      var temp = { };
      temp[ givenKeys[i] ] = "invalid key";
      errors.push(temp);
    }
    
  }

  
  var types = [ "number", "posNumber", "integer", "string", "either", "object", "array", "price" ];
  
  var constituents = [ "isin", "regex"];
  
  
  
  /* make sure the required has valid types */
  
  for (var key in test) {
    if (typeof given[key] === 'undefined') {
      /* It's in "test", but not in "given".
         It's already marked as an error so let's skip it
         for further testing
      */
      continue;
    }
    if (given[key] === undefined) {
      console.log('undefined');
      continue;
    }
    if (typeof test[key] === "string") {
      if ( types.indexOf( test[key]) === -1) {
        throw new Error("Unknown type " + test[key]);
      }
      var type = test[key];
      switch (type) {
        case "string":
          if (typeof given[key] !== "string") {
            var temp = { };
            temp[key] = "must be a string";
            errors.push(temp);
          }
          break;
        case "number":
          if (Object.prototype.toString.call(given[key] === 'number')) {
            given[key] = given[key].toString();
          }
          if (given[key].match(/^-?\d*\.?\d*$/) === null) {
            var temp = { };
            temp[key] = "must be a number";
            errors.push(temp);
          }
          break;
        case "posNumber":
          if (Object.prototype.toString.call(given[key] === 'number')) {
            given[key] = given[key].toString();
          }
          if (given[key].match(/^\d*\.?\d*$/) === null) {
            var temp = { };
            temp[key] = "must be a positive number";
            errors.push(temp);
          }
          break;
        case "integer":
          if (Object.prototype.toString.call(given[key] === 'number')) {
            given[key] = given[key].toString();
          }
          if (given[key].match(/^\d+$/) === null) {
            var temp = { };
            temp[key] = "must be an integer";
            errors.push(temp);
          }
          break;
        case "either":
          if (! (given[key].match(/^-?\d*\.?\d*$/) !== null) || (typeof given[key] === "string")) {
            var temp = { };
            temp[key] = "must be a number or a string";
            errors.push(temp);
          }
          break;
        case "object":
          if (Object.prototype.toString.call( given[key]) !== '[object Object]') {
            var temp = { };
            temp[key] = "must be a key/value object";
            errors.push(temp);
          }
          break;
        case "array":
          if (Object.prototype.toString.call( given[key]) !== '[object Array]') {
            var temp = { };
            temp[key] = "must be an array";
            errors.push(temp);
          }
          break;
      case "price":
        if (Object.prototype.toString.call(given[key] === 'number')) {
          given[key] = given[key].toString();
        }
          if (given[key].match(/^-?\d{1,}(?:\.\d{1,2})?$/) === null) {
              var temp = { };
              temp[key] = "not a valid price format";
              errors.push(temp);
          }
          break;
      }
    } else if (Object.prototype.toString.call( test[key]) === '[object Object]') {
        for (var con in test[key] ) {
          if (constituents.indexOf( con) === -1 ) {
            throw new Error("unknown constituent " + con);
          }
          switch (con) {
            case "regex":
              var re = new RegExp( test[key][con]);
              if (! re.test( given[key])) {
                var temp =  { };
                temp[key] = "does not pass regex test";
                errors.push(temp);
              }
              break;
            case "isin":
              if (Object.prototype.toString.call( test[key][con]) === '[object Array]') {
                if (test[key][con].indexOf(given[key]) === -1) {
                
                  var temp = { };
                  temp[key] = given[key] + " not a valid option";
                  errors.push(temp);
                }
              } else {
                throw new Error("isin must be an array");
              }
              break;
          }         
        }
      } else if (Object.prototype.toString.call( test[key] === '[object Function]' )) {
          var func = test[key];
          var res = func(given[key]);
          if (res === undefined) {
            throw new Error("function does not return a value");
          }
          if (res !== true) {
            var temp = { };
            temp[given[key]] = res;
            errors.push(temp); 
          }
      }
    }

  if (errors.length) {
    if (cb) {
      cb(errors,false);
    } else {
      return errors;
    }
  } else {
    if (cb) {
      
      cb(null,true);
    } else {
      return false;
    }
  }
  
}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = paramsValidate;
} else {
  window.paramsValidate = paramsValidate;
}
})();

