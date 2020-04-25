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


mongodb.connect(connectionString, {useNewUrlParser: true}, function(err, client){
   db = client.db()
   app.listen(port);
   console.log('Server Running')
})

app.get('/', (req, res) => { 
    db.collection('CollectionTextRepo').find().toArray(function(err, items){
        console.log(items)
    })
    res.sendfile('app2.html'); 
})

app.post('/insert', function(req, res){

    db.collection('CollectionTextRepo').insertOne({
        'text': req.body.fname
    }, (err, result) => {
        res.sendfile('app2.html')
    })
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
                    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                    <span class="item-text"> ${item.text} </span>
                </li>`
                }).join('\n')}
                </ul>
                
              </div>
              
            </body>
            </html> 
            `
        )
    })
})


/*

app.get('/', (req, res) => {
    res.sendfile('app.html');
})


app.post('/insert', (req, res) => {
    let text = req.body.fname;

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) { // error handling
            return console.log('Unable to connect to database')
        }
        const db = client.db(databaseName);

        db.createCollection('texty', function(err, res){});

        let collect = db.collection('texty');

        collect.insertOne({
            name: text,
        }, (err, result) => {
            //console.log(result.ops);
        })

        var a = collect.find({}).toArray((err, res) => {
            console.log(res);
            client.close();
        })    
    })
    
    res.send(
        `
        <!DOCTYPE html>
        <html>
        <head>
        <title>HTML Hyperlinks</title>
        </head>
        <body>
        <p>Text received</p>
        <p>Go <a href='/'>home</a></p>
        </body>
        </html>
        `
    );
})

app.post('/retrieve', (req, res) => {
    let text = req.body.fname;

    let pr = '';

    MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
        if (error) { // error handling
            return console.log('Unable to connect to database')
        }
        const db = client.db(databaseName);

        db.createCollection('texty', function(err, res){});

        let collect = db.collection('texty');


        var a = collect.find({}).toArray((err, res) => {
            //console.log(res[0].name);
            for (let i in res) {
                pr = pr + res[i].name;
                //console.log(pr);
            }
            client.close();
            return pr;
        })
        console.log("pr " + a);
    })
    
    res.send(
        `
        <!DOCTYPE html>
<html>
<body>

<h2>HTML Forms</h2>

<form action="/insert" method="POST">
  <label for="fname">Insert Text:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <input type="submit" value="Submit">
</form>
<br>
<br>
<form action="/retrieve" method="POST">
    <label for="fname">Retrieve Text:</label><br>
    <input type="text" id="fname" name="fname" value="sjs"><br>
    <input type="submit" value="Retrieve">
  </form> 

<p>If you click the "Submit" button, the form-data will be sent to a page called "/action_page.php".</p>

</body>
</html>
        `
    );
})


app.listen(3000);

*/