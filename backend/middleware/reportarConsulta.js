//backend/middleware/reportarConsulta.js

export const reportarConsulta = (req, res, next) => {
  console.log(`
🕒 Fecha: ${new Date().toLocaleString()}
👤 Usuario: ${req.user?.email || "No autenticado"}
📌 Método: ${req.method}
🌐 Ruta: ${req.originalUrl}
🆔 Params: ${JSON.stringify(req.params)}
📦 Body: ${JSON.stringify(req.body)}
  `);

  next();
};
