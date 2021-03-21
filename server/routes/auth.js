import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy } from 'passport-github';
import dotenv from 'dotenv';
dotenv.config();

import { findById, findOrCreate } from '../services/User.js';
const JWT_KEY = 'passport_kioshi';

const router = express.Router();


passport.use(
	new Strategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: 'http://localhost:3001/auth/github/callback',
		},
		function (accessToken, refreshToken, profile, cb) {
			findOrCreate(profile);
			return cb(null, profile);
		}
	)
);
router.get(
	'/github',
	(req, res, next) => {
		const { redirectTo } = req.query;
		const state = JSON.stringify({ redirectTo });
		const authenticator = passport.authenticate('github', { scope: [], state, session: true });
		authenticator(req, res, next);
	},
	(req, res, next) => {
		next();
	}
);

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res, next) => {
	const token = jwt.sign({ id: req.user.id }, JWT_KEY, { expiresIn: 60 * 60 * 24 * 1000 });
	req.logIn(req.user, function (err) {
		if (err) return next(err);
		res.redirect(`http://localhost:3000?token=${token}`);
	});
});

export default router;
