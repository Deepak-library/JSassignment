const express = require('express')
const app = express()
var https = require('https');
app.use(express.json())

app.get("/data", async (req, res) => {
    //const rows = await readTodos();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({para:'A computer is a machine that can be programmed to carry out sequences of arithmetic or logical operations automatically. Modern computers can perform generic sets of operations known as programs. These programs enable computers to perform a wide range of tasks. A computer system is a "complete" computer that includes the hardware, operating system (main software), and peripheral equipment needed and used for "full" operation. This term may also refer to a group of computers that are linked and function together, such as a computer network or computer cluster. A broad range of industrial and consumer products use computers as control systems. Simple special-purpose devices like microwave ovens and remote controls are included, as are factory devices like industrial robots and computer-aided design, as well as general-purpose devices like personal computers and mobile devices like smartphones. Computers power the Internet, which links hundreds of millions of other computers and users.'}))
});


app.post("/change", async (req, res) => {
    //const rows = await readTodos();
    var a=req.body;
   var result=-1;
convertCurrency(a.amount,a.cfrom,a.cTo, function(err, amount) {
  console.log(amount);
  result=amount;
  console.log(err);
});
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify({value:result}))
});


function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  var apiKey = "b4389b6ea336b5d804b7";

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://api.currconv.com/api/v7/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err+" one");
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);
  });
}

// convertCurrency(10, 'USD', 'PHP', function(err, amount) {
//   console.log(amount);
//   console.log(err);
// });

 app.listen(8000)