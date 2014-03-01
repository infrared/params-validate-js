

var pv = require('./lib/index.js');



var data = {
  username: "foo",
  firstname: "Foo",
  lastname: "shit",
    age: ["shit", "face"],
  role: "fart"
};

var test = {
  username: "string",
  firstname: "string",
  lastname: "string",
  age: "array",
  role: {
    isin: ["fart"]
  }
};
pv(data,test,function(err,res) {
  console.log(err);
  console.log(res);
});
