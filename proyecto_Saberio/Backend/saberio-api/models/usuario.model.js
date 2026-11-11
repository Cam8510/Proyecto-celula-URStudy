const { Schema, model } = require('mongoose');
const verificacionCorreoSchema = require('./verificacionCorreo.schema');

const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
    },

    correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'El correo es demasiado largo'],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'El correo no tiene un formato válido',
      ],
    },

    passwordHash: {
      type: String,
      required: [true, 'El hash de la contraseña es obligatorio'],
      select: false,
    },

    roles: {
      type: [
        {
          type: String,
          enum: {
            values: ['estudiante', 'monitor', 'admin'],
            message: 'El rol {VALUE} no es válido',
          },
        },
      ],

      default: undefined,

      required: [true, 'Debe asignarse al menos un rol'],

      validate: [
        {
          validator: function (roles) {
            return Array.isArray(roles) && roles.length > 0;
          },
          message: 'Debe asignarse al menos un rol',
        },
        {
          validator: function (roles) {
            return (
              Array.isArray(roles) &&
              new Set(roles).size === roles.length
            );
          },
          message: 'Los roles no pueden repetirse',
        },
      ],
    },

    correoVerificado: {
      type: Boolean,
      default: false,
    },

    correoVerificadoEn: {
      type: Date,
      default: null,
    },

    verificacionCorreo: {
      type: verificacionCorreoSchema,
      default: undefined,
      select: false,
    },

    estadoCuenta: {
      type: String,
      enum: ['habilitada', 'suspendida'],
      default: 'habilitada',
    },

    acreditacionMonitor: {
      type: String,
      enum: [
        'no_solicitada',
        'pendiente',
        'aprobada',
        'rechazada',
      ],
      default: 'no_solicitada',
    },
  },
  {
    collection: 'usuarios',
    timestamps: true,
    versionKey: false,

    toJSON: {
      transform: function (documento, objeto) {
        objeto.id = objeto._id.toString();

        delete objeto._id;
        delete objeto.passwordHash;
        delete objeto.verificacionCorreo;

        return objeto;
      },
    },
  }
);

// La misma dirección no puede pertenecer a dos cuentas.
usuarioSchema.index({ correo: 1 }, { unique: true });

module.exports = model('Usuario', usuarioSchema);