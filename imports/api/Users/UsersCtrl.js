import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../startup/server/BusinessClass/ResponseMessage';
import { check, Match } from 'meteor/check';
import UsersServ from './UsersServ';
import Permissions from '../../startup/server/Permissions';

export const saveUserMethod = new ValidatedMethod({
	name: 'user.save',
	mixins: [MethodHooks],
	permissions: [Permissions.USERS.CREATE.VALUE, Permissions.USERS.UPDATE.VALUE],
	validate({ user }) {
		try {
			check(user, {
				_id: Match.OneOf(String, null),
				firstname: String,
				lastname: String,
				username: String,
				phone: String,
				profile: String,
				email: String,
				password: String
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
		UsersServ.validateEmail(user.email, user._id);
	},
	run({ user }) {
		const responseMessage = new ResponseMessage();
		if (user._id === null) {
			try {
				UsersServ.createUser(user);
				responseMessage.create(true, 'Se ha creado un usuario.');
			} catch (err) {
				console.error('Error creating user: ', err);
				throw new Meteor.Error('500', 'Error al crear el usuario');
			}
		} else {
			//This is just for editing in a panel
			try {
				const currentUser = Meteor.users.findOne(user._id);
				Meteor.users.update(user._id, {
					$set: {
						'profile.username': user.username,
						'profile.firstname': user.firstname,
						'profile.lastname': user.lastname,
						'profile.phone': user.phone,
						'profile.profile': user.profile
					}
				});
				if (currentUser.emails[0].address !== user.email) {
					Accounts.removeEmail(user._id, currentUser.emails[0].address);
					Accounts.addEmail(user._id, user.email);
					Accounts.sendVerificationEmail(user._id);
				}
				Accounts.setPassword(user._id, user.password);
				responseMessage.create(true, 'Se ha actualizado el usuario.');
			} catch (err) {
				console.error('Error updating template: ', err);
				throw new Meteor.Error('500', 'Error al actualizar al usuario');
			}
		}
		return responseMessage;
	}
});

export const getUserMethod = new ValidatedMethod({
	name: 'user.get',
	mixins: [MethodHooks],
	permissions: [Permissions.USERS.LIST.VALUE],
	validate(idUser) {
		try {
			check(idUser, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idUser) {
		const responseMessage = new ResponseMessage();
		try {
			const user = Meteor.users.findOne(idUser);
			responseMessage.create(true, 'Se ha obtenido el usuario.', null, user);
		} catch (err) {
			console.error('Error getting user: ', err);
			throw new Meteor.Error('500', 'Error al obtener el usuario');
		}
		return responseMessage;
	}
});

export const deleteUserMethod = new ValidatedMethod({
	name: 'user.delete',
	mixins: [MethodHooks],
	permissions: [Permissions.USERS.DELETE.VALUE],
	validate(idUser) {
		try {
			check(idUser, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idUser) {
		const responseMessage = new ResponseMessage();
		try {
			Meteor.users.remove(idUser);
			responseMessage.create(true, 'Se ha eliminado el usuario.');
		} catch (err) {
			console.error('Error removing template: ', err);
			throw new Meteor.Error('500', 'Error al eliminar el usuario');
		}
		return responseMessage;
	}
});
