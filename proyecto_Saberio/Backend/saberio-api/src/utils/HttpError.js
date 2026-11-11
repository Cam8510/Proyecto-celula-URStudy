class HttpError extends Error {
  constructor(status, mensaje, codigo = 'ERROR_SOLICITUD') {
    super(mensaje);

    this.name = 'HttpError';
    this.status = status;
    this.codigo = codigo;
  }
}

module.exports = HttpError;