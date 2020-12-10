import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { ResponseMessage } from '../../startup/server/BusinessClass/ResponseMessage';
import { check, Match } from 'meteor/check';
import { Template } from './Template';

import Permissions from '../../startup/server/Permissions';
import Utilities from '../../startup/both/Utilities';

export const saveTemplateMethod = new ValidatedMethod({
	name: 'template.save',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.CREATE.VALUE, Permissions.TEMPLATES.UPDATE.VALUE],
	validate(template) {
		try {
			check(template, {
				_id: Match.OneOf(String, null),
				title: String,
				pages: [Object]
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
				template.date = Utilities.currentLocalISODate();
				template.idCreator = Meteor.userId();
				template.editing = {
					status: true,
					who: Meteor.userId()
				}
				Template.insert(template);
				responseMessage.create(true, 'Se ha creado una plantilla.');
			} catch (err) {
				console.error('Error creating template: ', err);
				throw new Meteor.Error('500', 'Error al crear la plantilla');
			}
		} else {
			try {
				Template.update(template._id, {
					$set: {
						title: template.title,
						pages: template.pages
					}
				});
				responseMessage.create(true, 'Se ha actualizado la plantilla.');
			} catch (err) {
				console.error('Error updating template: ', err);
				throw new Meteor.Error('500', 'Error al actualizar la plantilla');
			}
		}
		return responseMessage;
	}
});

export const getTemplateMethod = new ValidatedMethod({
	name: 'template.get',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.LIST.VALUE],
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
			const template = Template.findOne(idTemplate);
			responseMessage.create(true, 'Plantilla obtenida exitosamente', null, template);
		} catch (err) {
			console.error('Error getting template: ', err);
			throw new Meteor.Error('500', 'Error al obtener la plantilla');
		}
		return responseMessage;
	}
});

export const copyTemplateMethod = new ValidatedMethod({
	name: 'template.copy',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.LIST.VALUE],
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
			const template = Template.findOne(idTemplate);
			delete template._id;
			template.title = 'Copia de ' + template.title;
			template.date = Utilities.currentLocalISODate();
			template.idCreator = Meteor.userId();
			template.editing = {
				status: false,
				who: null
			}
			Template.insert(template);
			responseMessage.create(true, 'Plantilla copiada exitosamente', null, template);
		} catch (err) {
			console.error('Error copying template: ', err);
			throw new Meteor.Error('500', 'Error al copiar la plantilla');
		}
		return responseMessage;
	}
});

export const deleteTemplateMethod = new ValidatedMethod({
	name: 'template.delete',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.DELETE.VALUE],
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

export const availabilityTemplateMethod = new ValidatedMethod({
	name: 'template.availability',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.LIST.VALUE],
	validate(title) {
		try {
			check(title, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(title) {
		const responseMessage = new ResponseMessage();
		try {
			const template = Template.findOne({ 'title': title });
			if (template) {
				responseMessage.create(true, 'La plantilla existe', null, template);
			} else {
				responseMessage.create(false, 'No existe una plantilla con el titulo: ' + title);
			}
		} catch (err) {
			console.error('Error checking template availability: ', err);
			throw new Meteor.Error('500', 'Error al comprobar disponibilidad de la plantilla');
		}
		return responseMessage;
	}
});

export const changeEditingTemplateMethod = new ValidatedMethod({
	name: 'template.changeEditing',
	mixins: [MethodHooks],
	permissions: [Permissions.TEMPLATES.UPDATE.VALUE],
	validate(template) {
		try {
			check(template, {
				_id: String,
				editing: Object
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(template) {
		const responseMessage = new ResponseMessage();
		try {
			Template.update(template._id, {
				$set: {
					editing: {
						status: template.editing.status,
						who: template.editing.who
					}
				}
			});
			responseMessage.create(true, 'Estado de edición actualizado exitosamente');
		} catch (err) {
			console.error('Error copying template: ', err);
			throw new Meteor.Error('500', 'Error al actualizar estado de edición');
		}
		return responseMessage;
	}
});
