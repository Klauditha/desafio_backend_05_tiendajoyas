const reportQuery = async (req, res, next) => {
  const parametros = req.params;
  const query = req.query;
  const url = req.url;
  let mensaje = `\nHoy ${new Date()} \nSe ha recibido una consulta en la ruta ${url}`;

  if (JSON.stringify(parametros).length > 2) {
    mensaje += `\ncon los parámetros: ${JSON.stringify(parametros)}`;
  }
  if (JSON.stringify(query).length > 2) {
    mensaje += `\ncon los query string: ${JSON.stringify(query)}`;
  }
  console.log(mensaje);
  next();
};

module.exports = {
  reportQuery,
};
