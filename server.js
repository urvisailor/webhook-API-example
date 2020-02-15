const express=require('express');
const bodyparser=require('body-parser');
const mongoclient=require("./database/connection");
const app=express();
const webhookmodel=require("./database/webhook.model");

mongoclient().then(()=>{
    console.log("connected")
}).catch(console.log)

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.get("/",(req,res)=>{
    res.send("welcome user");
});
app.get("/api/webhook",(req,res)=>{
    webhookmodel.find().then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfull"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.post("/api/webhook",(req,res)=>{
    let body=req.body;
    webhookmodel.create(body).then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfull created"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})

app.put("/api/webhook/:id",(req,res)=>{
    let body=req.body;
    webhookmodel.findByIdAndUpdate(req.params.id,body).then((wh)=>{
        res.json({
            flag:true,
            data:wh,
            message:"successfull created"
        });
    }).catch(e=>{
        res.json({
            flag:false,
            data:null,
            message:e.message
        });
    })
})



app.delete("/api/webhook/:id",(req,res)=>{
    webhookmodel.findByIdAndUpdate(req.params.id,function(err,wh){
        if(err){
        res.json({
            flag:flase,
            data:null,
            message:err.message
        });
    }else{
        res.json({
            flag:false,
            data:wh,
            message:"delete successfully"
        });
    }
    })
});

app.listen(3000);