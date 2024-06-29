import express from 'express';
import dotenv from 'dotenv';
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js'
import cors from 'cors'
import conectarDB from './config/db.js';

//creacion del Servidor 
const app = express();


//habilitar la lectura de express al enviar datos
app.use(express.json())

//leyendo ENV
dotenv.config()

//llamado a la conexion DB
conectarDB()

//Establecer la poliza de CORS
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            //el origen esta permitido 
            callback(null, true)
        }else {
            callback(new Error('No permitido por CORS'))
        }
    }
}
//indicar el uso de CORS
app.use(cors(corsOptions))

//Routing

app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes )
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Servidor funcionando en el puerto', PORT)
})