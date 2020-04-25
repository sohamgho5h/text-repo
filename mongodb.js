const mongodb = require('mongodb')
// MongoClient gives access to the functions required to connect to the database
const MongoClient = mongodb.MongoClient // so we can do CRUD operations
const connectionURL = 'mongodb://127.0.0.1:27017' // issues occur when we type localhost
// so we type the full IP and the port for connection
const databaseName = 'text-repo' // database name

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) { // error handling
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)
    //db.createCollection('lalala')
    db.listCollections().toArray( function(err, item) {
       //console.log(item);
    } );

    var a = db.collection('lalala').find({
        name: 'ala1'
    }).toArray((err, res) => {
        console.log(res);
        client.close();
    })

    //console.log(a);

    // for (let i = 0; i < 5; i++) {
    //     db.collection('lalala').insertOne({
    //         name: 'ala' + i,
    //         address: 'din' + i + 1
    //     }, (err, result) => {
    //         console.log(result.ops);
    //     })
    // }    
})
