

var pv = require('./lib/index.js');



var data = {
  username: "foo",
  firstname: "Foo",
  lastname: "shit",
  age: ["shit", "face"],
  role: "fart", 
  cost: -5.0
};

var test = {
  username: "string",
  firstname: "string",
  lastname: "string",
  age: "array",
  role: {
    isin: ["fart"]
  },
 cost: "posNumber"
};
pv(data,test,function(err,res) {
  console.log(err);
  console.log(res);
});
