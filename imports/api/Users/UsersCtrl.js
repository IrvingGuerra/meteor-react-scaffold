import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../startup/server/BusinessClass/ResponseMessage';
import {check, Match} from 'meteor/check'
import UsersServ from './UsersServ';

import Permissions from "../../startup/server/Permissions";

export const saveUserMethod = new ValidatedMethod({
	name: 'user.save',
	mixins: [MethodHooks],
	permissions: [Permissions.USERS.CREATE.VALUE, Permissions.USERS.UPDATE.VALUE],
	validate ({user}) {
		try {
			check(user, {
				_id: Match.OneOf(String, null),
				firstname: String,
				lastname: String,
				username: String,
				profile: String,
				email: String,
				password: String,
			})
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error("500", "La información introducida no es válida");
		}
		UsersServ.validateEmail(user.email, user._id);
	},
	run ({user}){
		const responseMessage = new ResponseMessage();
		if (user._id === null){
			try {
				UsersServ.createUser(user);
				responseMessage.create(true, "Se ha creado un usuario.");
			} catch (err) {
				console.error("Error creating user: ", err);
				throw new Meteor.Error("500", "Error al crear el usuario");
			}
		}else{
			//This is just for editing in a panel
			console.log(user._id);
			console.log("Existe");
		}
		return responseMessage;
	}
})