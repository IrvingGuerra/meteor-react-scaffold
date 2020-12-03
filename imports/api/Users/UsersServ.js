import {Meteor} from 'meteor/meteor';
import { ResponseMessage } from '../../startup/server/BusinessClass/ResponseMessage';

export default {
	validateEmail(newEmail, idUser) {
		const existsEmail = Accounts.findUserByEmail(newEmail);
		if (idUser) {
			const oldUser = Meteor.users.findOne(idUser);
			if (oldUser.emails[0].address !== newEmail && existsEmail) {
				throw new Meteor.Error("403", "El email ya se encuentra en uso");
			}
		} else if (existsEmail) {
			throw new Meteor.Error("403", "El email ya se encuentra en uso");
		}
	},
	createUser(user){
		const responseMessage = new ResponseMessage();
		const idUser = Accounts.createUser({email: user.email,password: user.password});
		if(idUser.id){
			responseMessage.data = {idUser};
			Accounts.sendEnrollmentEmail(idUser, user.email);
		}
		Meteor.users.update(idUser, {
			$set: {
				"profile.firstname": user.firstname,
				"profile.lastname": user.lastname,
				"profile.username": user.username,
				"profile.phone": user.phone,
				"profile.profile": user.profile,
			}
		});
		responseMessage.isStatus = true;
		responseMessage.message = "User created successful";
		return responseMessage;
	}
}
