const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
	     FNAME: fName,
	     LNAME: lName
     }
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/$list-id/members";
  const options = {
    method:"POST",
    auth:"Saizal:$api-key"
  };

  const request = https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();

});

app.listen(3000, function(){
  console.log("Port is running");
});


