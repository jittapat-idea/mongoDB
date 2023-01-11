const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const Customer = require('./models/customer.js')

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(()=>{
        console.log("can connect to MongoDB")
     }).catch(err=>{
        console.log('cannot connect to MongoDB')
        process.exit();
     })

     app.use(cors())
     require('./routes/customer.route.js')(app);

     const server = app.listen(3000,()=>{
        let port = server.address().port
        console.log('run at http://localhost:%s',port)
     })


     function initCustomer(){
        let data = [
            {
                CustomerId : 1001,
                FullName: "Krisada",
                Address: "Nonthaburi"
            },
            {
                CustomerId : 1002,
                FullName: "Jittapat",
                Address: "Bangkok"
            }
        ]
        for(let i = 0;i<data.length;i++){
            const c= new Customer(data[i])
            c.save()
        }
        console.log("สร้างได้อะครับน้องๆ")
     }