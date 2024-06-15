import { Timestamp } from "mongodb";
import fechaActual from "../helpers/obtenerFechas.js";
import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    propietario:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    telefono:{
        type:String,
        required: true
    },
    fechaIngreso:{
        type:String,
        required: true,
        default:fechaActual()
    },
    fechaAlta:{
        default:null,
        type:String,
        
    },
    sintomas: [
        { 
            sintoma: {
                type: String,
                required: true
            },
            completado: {
                type: Boolean, // Cambiado de String a Boolean
                default: false
            }
        }
    ],
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Veterinario'
    }
}, {
    timestamps: true
})

const Paciente = mongoose.model("Paciente", pacienteSchema);
export default Paciente