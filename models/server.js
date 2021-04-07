const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor () {
        // Crea el servidor
        this.app = express();

        // Para conveniencia
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conexión a la DB
        this.conectarDB();
        
        // Middlewares
        this.middlewares();

        // Carga las rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
    }

    // Crea las rutas
    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    // 
    listen () {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }

}

module.exports = Server;