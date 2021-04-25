const { response, request } = require('express');

const esAdmin = (req = request, res = response, next) => {
    if (! req.usuario) {
        return res.status(500).json({
            message: 'Se está intentando verificar el rol sin validar el token.'
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(403).json({
            message: `${nombre} no tiene permiso - No es administrador.`
        });
    }

    next();
}


const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (! req.usuario) {
            return res.status(500).json({
                message: 'Se está intentando verificar el rol sin validar el token.'
            });
        }

        if (! roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                message: `El servicio requiere uno de los siguientes roles: ${roles}.`
            });
        }

        console.log(roles);
        next();
    }
}

module.exports = {
    esAdmin,
    tieneRole
}