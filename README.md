##Description##
Validate parameters 

##Installation##

```bash
npm install params-validate
```
or in the browser:
```html
<script src="https://raw.github.com/infrared/params-validate-js/development/lib/index.js"></script>
```
##Usage##
    
    var paramsValidate = require('params-validate');
    
    var errors = paramsValidate(data,test);
    if (errors) { ... }
    
    //or with a callback:
    
    paramsValidate(data,test,function(errors,res) {
        if (errors) {
            console.log(errors);
        } else {
            //res is true
            console.log('passed!');
        }
    });




##Examples##
```javascript
    var data = {
      username: "foo",
      firstname: "Foo",
      age: 89
    };

    var test = {
        username: "string",
        firstname: "string",
        lastname: "string",
        age: "number"
    };
    
    paramsValidate(data,test)
    
    Returns:
    [ { lastname: 'required' } ]
```

** string - test if param is a string**
          
```javascript
    var data = {
        foo: "bar"
    }
    var test = {
        foo: "string"
    }
    //passes
```
** number - test if param is a number**

```javascript
    var data = {
        foo: 5
    }
    var test = {
        foo: "number"
    }
    //passes
```
**either - test if param is either string or number**
```javascript
    var data = {
        foo: "oh hi"
    }
    var test = {
        foo: "either"
    }
    //passes
```
** object - test if param is a key/value object**
```javascript
    var data = {
        foo: { bar: "baz"}
    }
    var test = {
        foo: "object"
    }
    //passes
```
** array  - test if param is an array**
```javascript
    var data = {
        foo: [ "bar", "baz" ]
    }
    var test = {
        foo: "array"
    }
    //passes
```
** function - supply a function to validate the data**

To pass the test with a function, the function must return true. To fail the test, just return a string
```javascript
    // passes
    var test = {
        lastname: function(x) { return true }
    }
    //fails
    var test { 
        lastname: function(x) { return "foo" }
    }
```
  

**Constituents**

Optional constituents can be added for granular validation.

```javascript
    var test = {
        username: {
            regex: "\\w+"
        },
        lastname: "string",
        age: "number",
        role: {
            isin: ["user", "admin"]
        }
    }
```

**Currently supported constituents**

* regex - test data against a supplied regex
* isin - test if given value is in an array


**License**

MIT
