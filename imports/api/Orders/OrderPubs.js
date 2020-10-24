import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Order } from './Order';

if (Meteor.isServer) {
	Meteor.publish('orders', function(data) {
		ReactiveAggregate(this, Order, [
			{
				$match: {
					date: { $gte: data.startDate.toISOString().substring(0, 10), $lte: data.endDate.toISOString().substring(0, 10) }
				}
			},
			{
				$lookup:
					{
						from: 'users',
						let: { idRequested: '$idRequested' },
						pipeline: [
							{ $match: { '$expr': { '$eq': ['$_id', '$$idRequested'] } } },
							{ $project: { 'profile.username': 1 } }
						],
						as: 'requested'
					}
			}, {
				$unwind: {
					path: '$requested',
					preserveNullAndEmptyArrays: true
				}
			}
		], { warnings: false });
	});
}