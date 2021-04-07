const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, idExiste } = require('../helpers/db_validators');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.get('/', usuariosGet);
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatorio y debe tener más de 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no es válido.').isEmail().custom(emailExiste),
    // check('rol', 'El rol es inválido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),    
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId().custom(idExiste),
    check('rol').custom((rol) => esRolValido(rol)), 
    validarCampos
], usuariosPut);
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(idExiste), 
    validarCampos
], usuariosDelete);

module.exports = router;