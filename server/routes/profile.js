import express from 'express';
import { findById, findOrCreate } from '../services/User.js';

const router = express();

router.use((req, res, next) => {
	const token = req.headers['authorization'];

	jwt.verify(token, jwtKey, function (err, data) {
		if (err) {
			res.status(401).send({ error: 'NotAuthorized' });
		} else {
			req.user = data;
			next();
		}
	});
});
router.get('/', async (req, res) => {
    user = await findById(req.user.id)

    res.send(user);
})

export default router;