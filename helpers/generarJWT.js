import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    //estructura de JWT
    /* jwt.sign({datos},key_secret,{
        configuraciones adicionales
    }) */

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

export default generarJWT