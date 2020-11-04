import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../../startup/server/BusinessClass/ResponseMessage';
import { check, Match } from 'meteor/check';
import Permissions from '../../../startup/server/Permissions';
import { Gender } from './Gender';

export const saveGenderMethod = new ValidatedMethod({
	name: 'gender.save',
	mixins: [MethodHooks],
	permissions: [Permissions.GENDERS.CREATE.VALUE, Permissions.GENDERS.UPDATE.VALUE],
	validate(gender) {
		try {
			check(gender, {
				_id: Match.OneOf(String, null),
				name: String,
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(gender) {
		const responseMessage = new ResponseMessage();
		if (gender._id === null) {
			try {
				delete gender._id;
				Gender.insert(gender);
				responseMessage.create(true, 'Se ha creado un genero.');
			} catch (err) {
				console.error('Error creating gender: ', err);
				throw new Meteor.Error('500', 'Error al crear el genero');
			}
		} else {
			try {
				Gender.update(gender._id, {
					$set: {
						name: gender.name
					}
				});
				responseMessage.create(true, 'Se ha actualizado el genero.');
			} catch (err) {
				console.error('Error updating gender: ', err);
				throw new Meteor.Error('500', 'Error al actualizar el genero');
			}
		}
		return responseMessage;
	}
});

export const deleteGenderMethod = new ValidatedMethod({
	name: 'gender.delete',
	mixins: [MethodHooks],
	permissions: [Permissions.GENDERS.DELETE.VALUE],
	validate(idGender) {
		try {
			check(idGender, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idGender) {
		const responseMessage = new ResponseMessage();
		try {
			Gender.remove(idGender);
			responseMessage.create(true, 'Se ha eliminado el genero.');
		} catch (err) {
			console.error('Error removing gender: ', err);
			throw new Meteor.Error('500', 'Error al eliminar el genero');
		}
		return responseMessage;
	}
});