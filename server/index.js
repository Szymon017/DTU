import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) ;

app.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}`);
})