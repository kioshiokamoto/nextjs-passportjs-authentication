import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();
const app = express();

import connectDB from './config/db.js';
import Auth from './routes/auth.js';
import Perfil from './routes/profile.js';

//Conexion a bd
connectDB();

//Middleware
app.use(bodyParser.json({ limit: '50mb' }));

//MANUAL CORS!
app.use((_, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
});
app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

app.use('/auth', Auth);
app.use('/profile', Perfil);


app.listen(3001, () => console.log(`Server listening on http://localhost:3001`));

//En caso de error en procesos
process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});
