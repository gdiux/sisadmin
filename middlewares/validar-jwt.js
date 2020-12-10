const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // READ TOKEN
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe el token, debe ingresar'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;

        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

// MODULE EXPORTS
module.exports = {
    validarJWT
}