import Veterinario from '../models/Veterinario.js'
import generarJWT from '../helpers/generarJWT.js'
import generarId from '../helpers/generarId.js'
import emailRegistro from '../helpers/emailRegistro.js'
import emailOlvidePassword from '../helpers/emailOlvidePassword.js'
const registrar = async(req, res) => {
    
    //prevenir usuarios duplicados
    const {nombre, email} = req.body

    //verificar si el usuario existe
    const existeUsuario = await Veterinario.findOne({email})
    if(existeUsuario) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({msg: error.message})
    }
     

    try {
        //Guardar un nuevo registro 
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save()

        //enviar Email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })
    } catch (error) {
        return res.status(400).json({msg:"No se pudo almacenar el registro"})
    }
    res.json({msg:"Usuario registrado correctamente, confirma tu cuenta desde tu email."})

}

const perfil = (req, res) => {
    const{veterinario} = req
    res.json(veterinario)
}

const confirmar = async(req, res) => {
    console.log(req.params.token)
    const {token} = req.params
    const usuarioConfirmar = await Veterinario.findOne({token})

    if(!usuarioConfirmar) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message})
    }
    
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save()        
    } catch (error) {
        console.log(error)
    }

   
    res.json({msg:`La cuenta asociada a: ${usuarioConfirmar.email} se ha confirmado correctamente`})
}

const autenticar = async(req, res) => {
    const {email, password} = req.body

    const usuarioAutenticar = await Veterinario.findOne({email});
    if(!usuarioAutenticar){
    const error = new Error('Email o contraseña no validos')
     return res.status(404).json({msg: error.message})
    }

    //comprobar si no esta confirmado
    if(!usuarioAutenticar.confirmado) {
        const error = new Error('El usuario no existe o no está confirmado')
        return res.status(403).json({msg: error.message});
    }

    //Autenticar al usuario

    //revisar password
    if(await usuarioAutenticar.comprobarPassword(password)){

        res.json({
            _id:usuarioAutenticar.id,
            nombre:usuarioAutenticar.nombre,
            email:usuarioAutenticar.email,
            token:generarJWT(usuarioAutenticar.id)})
    }else{
        const error = new Error("credenciales incorrectas")
        return res.status(400).json({msg:error.message})
    }
    
}

const olvidePassword = async(req, res) => {
    //verificar si email existe
    const{email} = req.body
    console.log(email)
   
    const emailComprobar = await Veterinario.findOne({email});
    console.log(emailComprobar)
    if(!emailComprobar){
        const e = new Error('No se pudo encontrar el email')
        return res.status(403).json({msg:e.message})
    }
    
  
    emailComprobar.token = generarId();
    emailComprobar.save();
    emailOlvidePassword({
            nombre:emailComprobar.nombre, 
            email,
            token: emailComprobar.token
        })
    


    res.json({msg: `Email enviado a ${email} con las instrucciones`})

  
    
}
const comprobarPassword = async(req, res) => {
    const{token} = req.params
    // consultar token
    const usuarioVerificar = await Veterinario.findOne({token});
    if(usuarioVerificar){
        return res.json({msg:'Token valido y aprobado'})
    }else{
        const error = new Error('Token no valido');
        return res.status(403).json({msg: error.message})
    }
}
const nuevoPassword = async(req, res) => {
    const{token} = req.params
    const{password} = req.body

    //verificacion de usuario

    const usuarioCambio = await Veterinario.findOne({token});
    if(!usuarioCambio) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message})

    }

    try {
        usuarioCambio.token = null
        usuarioCambio.password = password;
        await usuarioCambio.save()
        res.json({msg:'El cambio fue correcto ya puedes iniciar sesion con tu nueva contraseña'})
    } catch (error) {
        console.log(error)
    }


}


const actualizarPerfil = async (req, res) =>{
    const{id} = req.params
    const{nombre, email, telefono, web} =  req.body
    try {
        const perfil = await Veterinario.findById(id)
        
        perfil.nombre = nombre || perfil.nombre
        perfil.email = email || perfil.email
        perfil.telefono = telefono || perfil.telefono
        perfil.web = web || perfil.web
        
        const perfilActualizado = await perfil.save()
        if(perfilActualizado){
            res.json({msg:'Perfil editado correctamente'})
        }else{
            const error = new Error('No se pudo almacenar')
            res.json({msg:error.message})
        }
        
    } catch (error) {
        
    }
}

const actualizarPassword = async(req, res) => {
    // Leer los datos
    const{id} = req.veterinario
    const{password, nuevoPassword} = req.body
    // Comprobar que el veterinario existe

    const veterinario = await Veterinario.findById(id);
    if(!veterinario) {
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message})

    }
    console.log(veterinario)
    //Comprobar su password
    if(await veterinario.comprobarPassword(password)){
        veterinario.password = nuevoPassword
        await veterinario.save()
        res.json({msg:'Contraseña actualizada correctamente'})
    }else{
        const error = new Error('Accion no valida')
        res.status(400).json({msg:error.message})
        
    }
    //Almacenar su nuevo password
    
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarPassword,
    nuevoPassword, 
    actualizarPerfil,
    actualizarPassword
}