const express = require('express');
const app = express();
const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
//const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'text-repo'

let db
let port = process.env.PORT

if (port == null || port == ''){
    port = 3000
}

let connectionString = 'mongodb+srv://bigbrownbag:pass_bigbrownbag@bigbrownbagdb-okwmh.mongodb.net/DBTextRepo?retryWrites=true&w=majority'
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.static('public'));

mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
   db = client.db()
   app.listen(port);
   console.log('Server Running')
})

app.get('/', (req, res) => { 
    res.sendfile('app2.html'); 
})

app.post('/insert', function(req, res){

    if (req.body.fname == ''){
        res.redirect('/')
    }
    else{
        db.collection('CollectionTextRepo').insertOne({
            'text': req.body.fname
        }, (err, result) => {
            res.redirect('/')
        })
    }
})

app.post('/retrieve', (req, res) => {
    db.collection('CollectionTextRepo').find().toArray(function(err, items){
        console.log(items)
        res.send(
            `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Text Repository</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
            </head>
            <body>
              <div class="container">
                <h1 class="display-4 text-center py-1">Text Repository</h1>
                
                <div class="jumbotron p-3 shadow-sm">
                  <form action="/insert" method="POST">
                    <div class="d-flex align-items-center">
                      <input autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;" name = "fname">
                      <button class="btn btn-primary">Add New Item</button>
                    </div>
                  </form>
                </div>

                <ul class="list-group pb-5">

                <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <form action="/retrieve" method="POST">
                    <div>
                        <button class="btn btn-primary">Retrieve</button>
                    </div>
                </form>
                </li>
    
                ${items.map(function(item){
                    return `
                    <li id = "${item._id}" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text"> ${item.text} </span>
                        <div>
                            <button data-id = "${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                            <button data-id = "${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                        </div>
                    </li>`
                }).join('\n')}
                </ul>
                
              </div>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src = "/browser.js"></script>
            </body>
            </html> 
            `
        )
    })
})

app.post('/update', function(req, res){
    db.collection('CollectionTextRepo').findOneAndUpdate( {_id: new mongodb.ObjectId(req.body.id)} , {$set: {text: req.body.text }}, function(){
        res.send("Updated")
    })
})

app.post('/delete', function(req, res){
    db.collection('CollectionTextRepo').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function(){
        res.send("Deleted")
    })
})
