import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	oAuthId: { type: Number, required: true },
	oAuthData: { type: Object, required: true },
});

const User = new mongoose.model('user',UserSchema);

export default User;
