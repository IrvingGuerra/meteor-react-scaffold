import { Meteor } from 'meteor/meteor';
import { Template } from './Template';

if (Meteor.isServer) {
	Meteor.publish('templates', function() {
		return Template.find({});
	});
}