

**Synopsis:**
    
    paramsValidate(data,test); //returns true if passed, or a list of errors if it doesn't
    
    or with a callback
    
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
**Constituents**

Optional constituents can be added for each key for granular validation.

```javascript
    var test = {
        username: {
            regex: "\\w+"
        },
        lastname: "string",
        age: "number"
    }
```


**License**

MIT
