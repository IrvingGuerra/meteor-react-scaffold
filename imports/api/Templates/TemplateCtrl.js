import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../startup/server/BusinessClass/ResponseMessage';
import { check, Match } from 'meteor/check';
import { Template } from './Template';

import Permissions from '../../startup/server/Permissions';

export const saveUserMethod = new ValidatedMethod({
	name: 'template.save',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.CREATE.VALUE, Permissions.TEMPLATES.UPDATE.VALUE],
	validate(template) {
		try {
			check(template, {
				_id: Match.OneOf(String, null),
				title: String,
				margin: Number,
				canvas: String
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(template) {
		const responseMessage = new ResponseMessage();
		if (template._id === null) {
			try {
				delete template._id;
				Template.insert(template);
				responseMessage.create(true, 'Se ha creado una plantilla.');
			} catch (err) {
				console.error('Error creating template: ', err);
				throw new Meteor.Error('500', 'Error al crear la plantilla');
			}
		} else {
			//This is just for editing in a panel
			console.log(template._id);
			console.log('Existe');
		}
		return responseMessage;
	}
});

export const deleteUserMethod = new ValidatedMethod({
	name: 'template.delete',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.CREATE.VALUE, Permissions.TEMPLATES.UPDATE.VALUE],
	validate(idTemplate) {
		try {
			check(idTemplate, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idTemplate) {
		const responseMessage = new ResponseMessage();
		try {
			Template.remove(idTemplate);
			responseMessage.create(true, 'Se ha eliminado la plantilla.');
		} catch (err) {
			console.error('Error removing template: ', err);
			throw new Meteor.Error('500', 'Error al eliminar la plantilla');
		}
		return responseMessage;
	}
});