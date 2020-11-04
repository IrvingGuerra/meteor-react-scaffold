import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Specie } from './Specie';

if (Meteor.isServer) {
	Meteor.publish('species', function( ) {
		ReactiveAggregate(this, Specie, [], { warnings: false });
	});
}