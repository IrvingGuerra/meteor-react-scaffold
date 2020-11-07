import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Order } from './Order';

if (Meteor.isServer) {
	Meteor.publish('orders', function(data) {
		let query = {
			date: { $gte: data.startDate.toISOString().substring(0, 10), $lte: data.endDate.toISOString().substring(0, 10) }
		};
		ReactiveAggregate(this, Order, [
			{
				$match: query
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
			},
			{
				$project: {
					"number": 1,
					"date": 1,
					"requested": 1,
					"status": 1,
					"idRequested": 1
				}
			}
		], { warnings: false });
	});
}

if (Meteor.isServer) {
	Meteor.publish('analisesReport', function(data) {
		let query = {
			date: { $gte: data.startDate.toISOString().substring(0, 10), $lte: data.endDate.toISOString().substring(0, 10) },
			status: 'attended'
		};
		ReactiveAggregate(this, Order, [
			{
				$match: query
			},
			{
				$lookup:
					{
						from: 'users',
						let: { idRequested: '$idRequested' },
						pipeline: [
							{ $match: { '$expr': { '$eq': ['$_id', '$$idRequested'] } } },
							{ $project: { 'profile.username': 1, 'profile.profile': 1 } }
						],
						as: 'requested'
					}
			}, {
				$unwind: {
					path: '$requested',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$project: {
					"number": 1,
					"date": 1,
					"closingDate": 1,
					"requested": 1,
					"status": 1
				}
			}
		], { warnings: false });
	});
}