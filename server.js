import express from 'express';
import Connection from './database/connection.js';
import App from './app.js';

const StartServer = async() => {
    const PORT = process.env.PORT || 5000;

    const app = express();
    
    const connection = new Connection()
    
    await connection.main();
    
    await App(app);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();