import { Meteor } from 'meteor/meteor';
import { Order } from './Order';

if (Meteor.isServer) {
	Meteor.publish('orders', function() {
		return Order.find({});
	});
}