import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './router';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// conexion a la base de datos
mongoose.Promise = global.Promise;
const dbUrl = "mongodb+srv://kitian:2DTfLgcAR6IVbHsa@cluster0.gtuys.mongodb.net/portfolio";

mongoose.connect(
    dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(mongoose => console.log("Conectado a la BBDD online"))
.catch(err => console.error(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))) ;
app.use('/api/', router);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('Seridor corriendo en el puerto 3000');
});