const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    documento: {
        type: String,
        required: [true, 'El documento es requerido'],
        unique: true
    },
    nombre_finca: {
        type: String,
        required: [true, 'El nombre de la finca es requerido']
    },
    area_predio: {
        type: String,
        required: [true, 'El area total en hectareas de la finca es requerida']
    },
    estado: {
        type: Boolean,
        default: true
    },
    hectareas_sembradas: {
        type: String,
        required: [true, 'El numero de hectareas sembradas con cacao es requerido']
    },
    clones_finca: {
        type: String,
        required: [true, 'Los clones que posee en la finca son requeridos']
    },
    altura_finca: {
        type: String,
        default: "No se conoce el dato"
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );