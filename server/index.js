import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import Officers from './routes/Officers.js'
import Cases from './routes/Cases.js'
import Persons from './routes/Persons.js'
import Crime from './routes/Crime.js'
import Annoucement from './routes/Annoucements.js'
import bodyParser from 'body-parser'
import path from "path";


dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) ;
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://dtu-sa.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

//database connection

try{

    mongoose.connect(`mongodb+srv://joahimjager:${process.env.DATABASE_PASSWORD}@dtu.itkk9jy.mongodb.net/?retryWrites=true&w=majority`)
}catch(err){
    console.log(err);
}
   
//routes

app.use('/officers', Officers)
app.use('/cases', Cases)
app.use('/persons', Persons)
app.use('/crime', Crime)
app.use('/annoucements', Annoucement)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
})