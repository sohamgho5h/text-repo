const express = require('express');
const app = express();
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'text-repo'

app.use(express.urlencoded({
    extended: false
}));

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

