import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import generarId from "../helpers/generarId.js";
//definir el SCHEMA 
const veterinarioSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true,
        trim: true
    },
    password: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default:null,
        trim: true
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type:Boolean,
        default: false
    }
})
// Detencion de la ejecucion previa o posterior con post('accion', funcion) y pre('accion', funcion) 

veterinarioSchema.pre('save', async function(next) {
    //evitar el doble hasheo al modificar datos
    if(!this.isModified("password")){
        next()
    }

    // su utiliza this para acceder al objeto actual 
    const salt = await bcrypt.genSalt(10);
    //hashear el Password
    this.password = await bcrypt.hash(this.password, salt)
    
})

//registrar metodos para la autenticacion con methods
veterinarioSchema.methods.comprobarPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm,this.password)
} 

//registrar el SCHEMA en mongoDB

const Veterinario = mongoose.model("Veterinario", veterinarioSchema)

export default Veterinario;