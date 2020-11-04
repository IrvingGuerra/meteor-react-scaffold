import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../../startup/server/BusinessClass/ResponseMessage';
import { check, Match } from 'meteor/check';
import Permissions from '../../../startup/server/Permissions';
import { Breed } from './Breed';

export const saveBreedMethod = new ValidatedMethod({
	name: 'breed.save',
	mixins: [MethodHooks],
	permissions: [Permissions.BREEDS.CREATE.VALUE, Permissions.BREEDS.UPDATE.VALUE],
	validate(breed) {
		try {
			check(breed, {
				_id: Match.OneOf(String, null),
				idSpecie: String,
				name: String,
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(breed) {
		const responseMessage = new ResponseMessage();
		if (breed._id === null) {
			try {
				delete breed._id;
				Breed.insert(breed);
				responseMessage.create(true, 'Se ha creado una raza.');
			} catch (err) {
				console.error('Error creating breed: ', err);
				throw new Meteor.Error('500', 'Error al crear la raza');
			}
		} else {
			try {
				Breed.update(breed._id, {
					$set: {
						idSpecie: breed.idSpecie,
						name: breed.name
					}
				});
				responseMessage.create(true, 'Se ha actualizado la raza.');
			} catch (err) {
				console.error('Error updating specie: ', err);
				throw new Meteor.Error('500', 'Error al actualizar la especie');
			}
		}
		return responseMessage;
	}
});

export const deleteBreedMethod = new ValidatedMethod({
	name: 'breed.delete',
	mixins: [MethodHooks],
	permissions: [Permissions.BREEDS.DELETE.VALUE],
	validate(idBreed) {
		try {
			check(idBreed, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idBreed) {
		const responseMessage = new ResponseMessage();
		try {
			Breed.remove(idBreed);
			responseMessage.create(true, 'Se ha eliminado la raza.');
		} catch (err) {
			console.error('Error removing breed: ', err);
			throw new Meteor.Error('500', 'Error al eliminar la raza');
		}
		return responseMessage;
	}
});