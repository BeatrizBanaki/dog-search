const winston = require('winston');

// Configuração do logger
const logger = winston.createLogger({
  level: 'info', // Nível mínimo de logs a serem registrados
  format: winston.format.json(), // Formato dos logs (JSON)
  transports: [
    // Logs de erro serão armazenados em um arquivo separado
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Logs gerais serão armazenados em outro arquivo
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Se não estiver em produção, exiba os logs no console
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(), // Formato simples para o console
    })
  );
}

module.exports = logger;