import Paciente from "../models/Paciente.js"


const agregarPaciente = async(req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteGuardado = await paciente.save()
        if(!pacienteGuardado) {
            const error = new Error('Error al guardar paciente')
            return res.status(400).json({msg: error.message})
        }
        
        res.json(pacienteGuardado)

    } catch (error) {
        console.log(error)
    }
}

const obtenerPacientes = async(req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
    res.json(pacientes)
}

const obtenerPaciente = async(req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    if(!paciente){
        return res.status(404).json({msg:'No encontrado'})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({msg:'Accion no valida'});
    }
    res.json({paciente})
}
const actualizarPaciente = async(req, res) => {
    //validacion de Auth
    const {id} = req.params;
    const paciente = await Paciente.findById(id)
    if(!paciente){
            return res.status(404).json({msg:'No encontrado'})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.status(403).json({msg:'Accion no valida'});
    }

    //modificacion de paciente

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.telefono = req.body.telefono || paciente.telefono
    paciente.email = req.body.email || paciente.email;
    paciente.fechaAlta = req.body.fechaAlta || paciente.fechaAlta;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;
    try {

        //almacenamiento en BD
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)

    } catch (error) {
        
    }
}
const eliminarPaciente = async(req, res) => {
     //validacion de Auth
     const {id} = req.params;
     const paciente = await Paciente.findById(id)
     if(!paciente){
         return res.status(404).json({msg:'No encontrado'})
     }
     if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
         return res.status(403).json({msg:'Accion no valida'});
     }

     try {
        await paciente.deleteOne();
        res.json({msg:'Paciente eliminado exitosamente'})
     } catch (error) {
        
     }
}



export{
    obtenerPacientes,
    agregarPaciente,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}