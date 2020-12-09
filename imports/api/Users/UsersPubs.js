import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

if (Meteor.isServer) {
	Meteor.publish('users', function(profile) {
		let query = {};
		if (profile && profile !== 'all') {
			query = {
				'profile.profile': profile
			};
		}
		ReactiveAggregate(this, Meteor.users, [
			{
				$match: query
			},
			{
				$addFields: {
					username: '$profile.username',
					emailUser: '$emails.address',
					profileUser: '$profile.profile'
				}
			},
			{
				$project: {
					'username': 1,
					'emailUser': 1,
					'profileUser': 1
				}
			}
		], { warnings: false });
	});
	Meteor.publish('clients', function() {
		ReactiveAggregate(this, Meteor.users, [
			{
				$project: {
					'profile': 1
				}
			}
		], { warnings: false });
	});
}
