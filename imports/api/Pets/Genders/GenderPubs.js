import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Gender } from './Gender';

if (Meteor.isServer) {
	Meteor.publish('species', function( ) {
		ReactiveAggregate(this, Gender, [], { warnings: false });
	});
}