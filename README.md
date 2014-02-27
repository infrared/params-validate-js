
**Synopsis:**
    
    var paramsValidate = require('params-validate');
    
    var errors = paramsValidate(data,test);
    if (errors) { ... }
    
    //or with a callback:
    
    paramsValidate(data,test,function(err,res) {
        if (err) {
            console.log(err);
        } else {
            console.log('passed!');
        }
    });



**Example:**
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
**Currently supported tests**
 * string - test if given data is a string
 * number - test if given data is a number
 * function - supply a function to validate the data

*Using a function*

To pass the test, the function must return true. To fail the test, just return a string
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

Optional constituents can be added for each key for granular validation.

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
