const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
var url = require('url');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './pics/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
   
  var upload = multer({ storage: storage })

const app = express();
const router = express.Router();

app.use(isAuth);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

require('./forgotPassword')(app);
require('./resetPassword')(app);

app.use("/pics",express.static("pics"))
app.use("/Script",express.static("Script"))

app.post('/upload', upload.single('file'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    res.json({ username: 'Flavio' })
  }
  res.send(file)
  
})
app.use('/Area25', 
graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

mongoose
    .connect(
        // "mongodb+srv://root:root@cluster0-vpfmz.mongodb.net/testdb?retryWrites=true&w=majority"
        
        "mongodb://root:root@cluster0-shard-00-00-vpfmz.mongodb.net:27017,cluster0-shard-00-01-vpfmz.mongodb.net:27017,cluster0-shard-00-02-vpfmz.mongodb.net:27017/testdb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
        ,{ useNewUrlParser: true,useUnifiedTopology: true, reconnectInterval: 500,reconnectTries: Number.MAX_VALUE,connectTimeoutMS: 10000,socketTimeoutMS: 45000,}
    )
    .then(() => {
        app.listen(8000);
    })
    .catch(err => {
        conso8le.log(err);
    })
    

