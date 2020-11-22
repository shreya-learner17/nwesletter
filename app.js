const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
const firstName=req.body.fName;
const lastName=req.body.lName;
const email=req.body.email;

const data={
  members:[{
    email_address:email,
    status:"subscribed",
    merge_feilds:{
      FNAME:firstName,
      LNAME:lastName,
    }
  }]

};
const jsonData=JSON.stringify(data);
const url="https://us2.api.mailchimp.com/3.0/lists/51354931a3";
const options={
  method:"POST",
  auth:"shreya:cf5d9736470ff1abbf4b5e0a34f3086d-us2"
}
//console.log(firstName,lastName,email);
const request=https.request(url,options,function(response){
if( response.statusCode==200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
}
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
});
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")
});
app.listen(process.env.PORT ||3000,function(){
  console.log("server is running");
});
//api key
//cf5d9736470ff1abbf4b5e0a34f3086d-us2
//unique id
//
