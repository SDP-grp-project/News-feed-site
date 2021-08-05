const express=require("express");
require("dotenv").config()
const app=express();
const fetch=require("node-fetch")
app.set('view engine','ejs')
app.use(express.urlencoded({ extended:true }));
app.listen(3000,()=>{
  console.log("leysgoo")    
});

app.get('/',async (req,res)=>{
   
   const url=`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.API_KEY}`;
   const data=await fetch(url);
   const news =await data.json();
   const arr=[];
   const a2=[];
   const t=[]
   const a3=[]
    news.results.forEach(pieces=>{

      arr.push(pieces.title)
      t.push(pieces.url)
      a2.push(pieces.abstract)
     
    })
    res.render("home",{arr,t,a2})
    console.log("hello")
  
  })
  app.get("/search",(req,res)=>{
    res.render("search")
   
  })
  app.post("/search",async (req,res)=>{
    
     const q=req.body.search_word;
     let p=q.replace(" ","+");
    console.log(p)
    const u2=`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${p}&api-key=${process.env.API_KEY}`
  
    const arts=await fetch(u2);
    const articles=await arts.json();
    const p1=[];
    const p2=[];
    const p3=[];
    articles.response.docs.map(pieces=>{
      p1.push(pieces.headline.main);
       p2.push(pieces.web_url);

      // p3.push(pieces.multimedia[1].url);
    //  console.log(pieces.multimedia[0].url)
    })
res.render("searchresults.ejs",{p1,p2});
//res.send(articles)
console.log("home")
  })
 
  app.get("/india",async (req,res)=>{
    const url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=1879bb8f97de45998697d9357be6f98f`;
    const data=await fetch(url);
    const news =await data.json();
    const titles=[];
    const links=[];
    const imgs=[]
    const abs=[]
   // console.log(news.articles[0].title)
       news.articles.forEach(piece=>{
   //console.log(piece)
       titles.push(piece.title)
         links.push(piece.url)
         imgs.push(piece.urlToImage)
      abs.push(piece.description)
      })
    
    
    res.render("india",{titles,links,imgs,abs})
   
  })