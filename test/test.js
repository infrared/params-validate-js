

var pv = require('../lib/index.js');




exports.test1 = function(test) {
    
    var data = {
        username: "foobar"
    };
    var valid = {
        username: "string"
    };
    pv(data,valid,function(errors,pass) {
        test.ok(pass,"Did not return a true value");
        test.done();
    });
}

exports.test2 = function(test) {
    var data = {
        username: "foobar",
        country: "whoknows"
    };
    
    var valid = {
        username: "w+"
    };
    
    pv(data,valid,function(errors,pass) {
        test.ok( ( errors[0].country === "invalid key"));
        test.done();
    });
}

exports.test3 = function(test) {
    var data = {
        username: 5
    };
    var valid = {
        username: "string"
    };
    pv(data,valid,function(errors,pass) {
        test.ok( ( errors[0].username === "must be a string"));
        test.done();
    });
}

exports.test4 = function(test) {
    var data = {
        username: "foobar"
    };
    var valid = {
        username: function(x) { 
            if (x !== "bizbaz") {
                return "not bizbaz!";
            } else return true;
        }
    };
    pv(data,valid,function(errors,pass) {
        test.ok( ( errors[0].foobar === "not bizbaz!"));
        test.done();
    });
}

exports.test5 = function(test) {
    var data = {
        username: "foo bar"
    };
    var valid = {
        username: "S+"
    };
    pv(data,valid,function(errors,pass) {
        test.ok( ( errors[0].username === "must not contain spaces"));
        test.done();
    });
}


