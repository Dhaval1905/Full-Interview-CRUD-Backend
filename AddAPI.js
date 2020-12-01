var express = require('express')
var app = express()
var mongoose = require('mongoose')
var User = require('./Model')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
mongoose.connect('mongodb+srv://User:bahubali12345@cluster0.tqt3y.mongodb.net/Interview?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
    console.log("Succeessfully connected")
})

//Display API
app.get("/display", function (req, res) {

    User.find().then((result) => {
        res.json(result)
    })

})

//Add API
app.post("/add", jsonParser, function (req, res) {

    console.log(req.body.role)

    let data = User.findOne({ role: "Art-Manger" }).then((result) => {

        console.log("Value of result",result)
        if (result == null) {
            
            //console.log("error", result)
            const data = new User({
                _id: mongoose.Types.ObjectId(),
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                email: req.body.email,
                role: req.body.role
            })
            data.save().then((result) => {
                res.json(result)
            })
        }
        else {

            console.log("Success", result)
            if(req.body.role != 'Art-Manger'){
                const data = new User({
                    _id: mongoose.Types.ObjectId(),
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    email: req.body.email,
                    role: req.body.role
                })
                data.save().then((result) => {
                    res.json(result)
                })  
            }
         
            
            else{
                return res.send({
                    message:"One record of art-manager is already there",
                        status : 2
                    });
                
            }
        }


    })

})

//Update API

app.put('/update/:id', jsonParser, function (req, res) {
    console.log(req.body)

    console.log(req.params.id)
    console.log(req.params.FirstName)
    User.update({ _id: req.params.id }, {
        $set: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            email: req.body.email,
            role: req.body.role
        }
    }).then((result) => {
        res.json(result)
    })
})

//delete API

app.delete("/delete/:id", jsonParser, function (req, res) {
    console.log(req.params.id)
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else { console.log('Error in employee delete :' + err); }
    });
})

//Search API

// app.get("/search/:FirstName",function(req,res){
//     console.log(req.params.FirstName)
//     var regex = new RegExp(req.params.LastName,'i')
//     User.find({
//         LastName : regex
//     }).then((data)=>{
//         res.json(data)
//     })
// })

app.listen(4200)