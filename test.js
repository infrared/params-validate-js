

var pv = require('./lib/index.js');



var data = {
  username: "foo",
  firstname: "Foo",
  lastname: "fart",
    age: "twenty",
  role: "fart"
};

var test = {
  username: "string",
  firstname: "string",
  lastname: function(x) { return true },
  age: "number",
  role: {
    isin: ["fart"]
  }
};
pv(data,test,function(err,res) {
  console.log(err);
  console.log(res);
});
