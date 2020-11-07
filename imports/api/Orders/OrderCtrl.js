import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Permissions from '../../startup/server/Permissions';
import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { ResponseMessage } from '../../startup/server/BusinessClass/ResponseMessage';
import { Order } from './Order';
import Utilities from '../../startup/both/Utilities';

export const requestOrderMethod = new ValidatedMethod({
	name: 'order.request',
	mixins: [MethodHooks],
	permissions: [Permissions.ORDERS.CREATE.VALUE, Permissions.ORDERS.UPDATE.VALUE],
	validate(order) {
		try {
			check(order, {
				_id: Match.OneOf(String, null),
				petOwner: String,
				clinic: String,
				phone: String,
				petName: String,
				petSpecie: String,
				petBreed: String,
				petGender: String,
				petAge: String,
				EFG: String,
				TX: String,
				samplingDate: Date,
				samplingHour: Date,
				biochemistry: Object,
				analytes: Object,
				hemostasis: Object,
				nonConventional: Object,
				urinaryTract: Object,
				cytology: Object,
				hematology: Object,
				parasitology: Object,
				bacteriology: Object,
				endocrinology: Object,
				complementary: Object,
				infectious: Object,
				toxicology: Object,
				histopathology: Object
			});
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(order) {
		const responseMessage = new ResponseMessage();
		if (order._id === null) {
			try {
				delete order._id;
				order.number = Order.find().count() + 1;
				order.status = 'open';
				order.date = Utilities.currentLocalISODate();
				order.idRequested = Meteor.userId();
				Order.insert(order);
				responseMessage.create(true, 'Orden solicitada exitosamente');
			} catch (err) {
				console.error('Error requesting order: ', err);
				throw new Meteor.Error('500', 'Error al solicitar la orden');
			}
		} else {

		}
		return responseMessage;
	}
});

export const updateOrderMethod = new ValidatedMethod({
	name: 'order.update',
	mixins: [MethodHooks],
	permissions: [Permissions.ORDERS.UPDATE.VALUE],
	validate({ order, status }) {
		try {
			check(order, {
				_id: Match.OneOf(String, null),
				number: Number,
				date: String,
				idRequested: String,
				petOwner: String,
				clinic: String,
				phone: String,
				petName: String,
				petSpecie: String,
				petBreed: String,
				petGender: String,
				petAge: String,
				EFG: String,
				TX: String,
				samplingDate: Date,
				samplingHour: Date,
				status: String,
				analyses: [Object],
				biochemistry: Object,
				analytes: Object,
				hemostasis: Object,
				nonConventional: Object,
				urinaryTract: Object,
				cytology: Object,
				hematology: Object,
				parasitology: Object,
				bacteriology: Object,
				endocrinology: Object,
				complementary: Object,
				infectious: Object,
				toxicology: Object,
				histopathology: Object
			});
			check(status, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run({ order, status }) {
		const responseMessage = new ResponseMessage();
		try {
			order.status = status;
			Order.update(order._id, {
				$set: order
			});
			responseMessage.create(true, 'Se ha actualizado la orden.');
		} catch (err) {
			console.error('Error updating order: ', err);
			throw new Meteor.Error('500', 'Error al actualizar la orden');
		}
		return responseMessage;
	}
});

export const updateAnalysisInOrderMethod = new ValidatedMethod({
	name: 'analysis.update',
	mixins: [MethodHooks],
	permissions: [Permissions.ORDERS.UPDATE.VALUE],
	validate({ analysis, orderId }) {
		try {
			check(analysis, {
				_id: String,
				title: String,
				pages: [Object]
			});
			check(orderId, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run({ analysis, orderId }) {
		const responseMessage = new ResponseMessage();
		try {
			const order = Order.findOne(orderId);
			const analyses = order.analyses;
			const index = analyses.findIndex(t => t._id = analysis._id);
			analyses[index] = analysis;
			Order.update(orderId, {
				$set: {
					analyses: analyses
				}
			});
			responseMessage.create(true, 'Se ha actualizado la orden.');
		} catch (err) {
			console.error('Error updating order: ', err);
			throw new Meteor.Error('500', 'Error al actualizar la orden');
		}
		return responseMessage;
	}
});

export const getOrderMethod = new ValidatedMethod({
	name: 'order.get',
	mixins: [MethodHooks],
	permissions: [Permissions.ORDERS.LIST.VALUE],
	validate(idOrder) {
		try {
			check(idOrder, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run(idOrder) {
		const responseMessage = new ResponseMessage();
		try {
			const order = Order.findOne(idOrder);
			responseMessage.create(true, 'Orden obtenida exitosamente', null, order);
		} catch (err) {
			console.error('Error getting order: ', err);
			throw new Meteor.Error('500', 'Error al obtener la orden');
		}
		return responseMessage;
	}
});

export const changeStatusOrderMethod = new ValidatedMethod({
	name: 'order.changeStatus',
	mixins: [MethodHooks],
	permissions: [Permissions.ORDERS.UPDATE.VALUE],
	validate({ idOrder, status }) {
		try {
			check(idOrder, String);
			check(status, String);
		} catch (exception) {
			console.log('La información introducida no es válida: ', exception);
			throw new Meteor.Error('500', 'La información introducida no es válida');
		}
	},
	run({ idOrder, status }) {
		const responseMessage = new ResponseMessage();
		try {
			if (status === 'attended'){
				Order.update(idOrder, {
					$set: {
						status: status,
						closingDate: Utilities.currentLocalISODate()
					}
				});
			}else{
				Order.update(idOrder, {
					$set: {
						status: status
					}
				});
			}
			responseMessage.create(true, 'Se ha actualizado el estatus de la orden.');
		} catch (err) {
			console.error('Error updating order: ', err);
			throw new Meteor.Error('500', 'Error al actualizar el estatus de la orden');
		}
		return responseMessage;
	}
});