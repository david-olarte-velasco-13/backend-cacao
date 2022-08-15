const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete }= require('../controllers/usuarios'); 
const { emailExiste, documentoExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('documento', 'El documento es requerido').not().isEmpty(),
    check('documento').custom(documentoExiste),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;


//check('nombre_finca', 'El nombre de la finca es requerido').not().isEmpty(),
    //check('area_predio', 'El area total en hectareas de la finca es requerida').not().isEmpty(),
    //check('hectareas_sembradas', 'El numero de hectareas sembradas con cacao es requerido').not().isEmpty(),
    //check('clones_finca', 'Los clones que posee en la finca son requeridos').not().isEmpty(),