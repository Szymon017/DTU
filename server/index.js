import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'
import Officers from './routes/Officers.js'
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) ;

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

app.use('/officers', Officers)

app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
})