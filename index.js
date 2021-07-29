const express=require("express");
require("dotenv").config()
const app=express();
const fetch=require("node-fetch")
app.set('view engine','ejs')
app.listen(3000);

app.get('/',async (req,res)=>{
   //res.send('<p>ererere</p>')
   const url=`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.API_KEY}`;
   const data=await fetch(url);
   const news =await data.json();
   const arr=[];
   const a2=[];
   const t=[]
   const arts=[];
   const esaki=[]
    news.results.map(pieces=>{
  //    console.log(process.env.API_KEY)
      console.log(pieces.title)
      arr.push(pieces.title)
      t.push(pieces.url)
      a2.push(pieces.multimedia[1].url)
    })
    res.render("home",{arr,a2,t})
    console.log("hello")
  //console.log(news)
  });
  
