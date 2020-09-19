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
	createUser(userData){
		const responseMessage = new ResponseMessage();
		const idUser = Accounts.createUser(userData);
		if(idUser){
			responseMessage.data = {idUser};
			Accounts.sendEnrollmentEmail(idUser, userData.email);
		}
		responseMessage.isStatus = true;
		responseMessage.message = "User created successful";
		return responseMessage;
	}
}