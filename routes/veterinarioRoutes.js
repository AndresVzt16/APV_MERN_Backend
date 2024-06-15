import express from "express";
import {
  perfil,
  registrar,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarPassword,
  nuevoPassword,
  actualizarPerfil,
  actualizarPassword
} from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

//obtener el Router

const router = express.Router();

// enrutamiento de direcciones
//Rutas publicas
router.post("/", registrar);
//agregar parametros dinamicos via get con /:name
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post('/olvide-password',olvidePassword)

//multiples metodos de http con route
router.route('/olvide-password/:token').get(comprobarPassword).post(nuevoPassword)

//Rutas con Auth
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil )
router.put("/actualizar-password", checkAuth, actualizarPassword)
export default router;
