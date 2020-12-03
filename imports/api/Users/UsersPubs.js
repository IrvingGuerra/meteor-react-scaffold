import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

if (Meteor.isServer) {
	Meteor.publish('users', function() {
		ReactiveAggregate(this, Meteor.users, [
			{
				$project: {
					"emails": 1,
					"profile": 1
				}
			}
		], { warnings: false });
	})
}

if (Meteor.isServer) {
	Meteor.publish('clients', function() {
		ReactiveAggregate(this, Meteor.users, [
			{
				$project: {
					"profile": 1
				}
			}
		], { warnings: false });
	})
}
