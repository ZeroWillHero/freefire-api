const express  = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userroutes = require('./routes/userRoutes');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next) => {console.log(req.method);next();})
app.use((req,res,next) => {
    if (req.body.login_id !== null){
        next();
    }
})
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/user',userroutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://ict21018:HNMb5JklXRAGHqUU@cluster0.jso4fwj.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


