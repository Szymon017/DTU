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

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) ;
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));
//database connection

try{

    mongoose.connect(`mongodb+srv://joahimjager:${process.env.DATABASE_PASSWORD}@dtu.itkk9jy.mongodb.net/?retryWrites=true&w=majority`)
}catch(err){
    console.log(err);
}
   
//routes
app.use(cors({
    origin:['https://detective-task-unit-sa.onrender.com/']
}));
app.use('/officers', Officers)
app.use('/cases', Cases)
app.use('/persons', Persons)
app.use('/crime', Crime)
app.use('/annoucements', Annoucement)
if(process.env.PORT){
    app.listen(PORT, (err) => {
        console.log(`Server running on port ${PORT}`);
    })
}

