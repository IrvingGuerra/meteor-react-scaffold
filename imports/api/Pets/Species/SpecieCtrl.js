import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../../startup/server/BusinessClass/ResponseMessage';
import { check, Match } from 'meteor/check';
import Permissions from '../../../startup/server/Permissions';
import { Specie } from './Specie';

export const saveSpecieMethod = new ValidatedMethod({
	name: 'specie.save',
	mixins: [MethodHooks],
	permissions: [Permissions.SPECIES.CREATE.VALUE, Permissions.SPECIES.UPDATE.VALUE],
	validate(specie) {
		try {
			check(specie, {
				_id: Match.OneOf(String, null),
				name: String,
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(specie) {
		const responseMessage = new ResponseMessage();
		if (specie._id === null) {
			try {
				delete specie._id;
				Specie.insert(specie);
				responseMessage.create(true, 'Se ha creado una especie.');
			} catch (err) {
				console.error('Error creating specie: ', err);
				throw new Meteor.Error('500', 'Error al crear la especie');
			}
		} else {
			try {
				Specie.update(specie._id, {
					$set: {
						name: specie.title
					}
				});
				responseMessage.create(true, 'Se ha actualizado la especie.');
			} catch (err) {
				console.error('Error updating specie: ', err);
				throw new Meteor.Error('500', 'Error al actualizar la especie');
			}
		}
		return responseMessage;
	}
});

export const deleteSpecieMethod = new ValidatedMethod({
	name: 'specie.delete',
	mixins: [MethodHooks],
	permissions: [Permissions.SPECIES.DELETE.VALUE],
	validate(idSpecie) {
		try {
			check(idSpecie, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idSpecie) {
		const responseMessage = new ResponseMessage();
		try {
			Specie.remove(idSpecie);
			responseMessage.create(true, 'Se ha eliminado la especie.');
		} catch (err) {
			console.error('Error removing specie: ', err);
			throw new Meteor.Error('500', 'Error al eliminar la especie');
		}
		return responseMessage;
	}
});