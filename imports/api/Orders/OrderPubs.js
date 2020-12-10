import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Order } from './Order';

if (Meteor.isServer) {
	Meteor.publish('orders', function({ startDate, endDate, status, idRequested }) {
		let query = {
			date: {
				$gte: startDate.toISOString().substring(0, 10),
				$lte: endDate.toISOString().substring(0, 10)
			}
		};
		if (status !== 'all') {
			query.status = status;
		}
		if (idRequested) {
			query.idRequested = idRequested;
		}
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
			}, {
				$addFields: {
					requestedName: '$requested.profile.username'
				}
			},
			{
				$project: {
					'number': 1,
					'status': 1,
					'date': 1,
					'requestedName': 1
				}
			}
		], { warnings: false });
	});
}

if (Meteor.isServer) {
	Meteor.publish('analysesReport', function({ startDate, endDate, profile, idRequest }) {
		let query = {
			date: {
				$gte: startDate.toISOString().substring(0, 10),
				$lte: endDate.toISOString().substring(0, 10)
			},
			status: 'attended'
		};
		let queryRequest = { '$eq': ['$_id', '$$idRequested'] };
		if (profile !== 'all') {
			queryRequest = { '$and': [{ '$eq': ['$_id', '$$idRequested'] }, { '$eq': ['$profile.profile', profile] }] };
		}
		if (idRequest !== 'all') {
			query.idRequested = idRequest;
		}
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
							{ $match: { '$expr': queryRequest } },
							{ $project: { 'profile.username': 1, 'profile.profile': 1 } }
						],
						as: 'requested'
					}
			}, {
				$unwind: '$requested'
			}, {
				$addFields: {
					requestedName: '$requested.profile.username',
					requestedProfile: '$requested.profile.profile'
				}
			},
			{
				$project: {
					'number': 1,
					'status': 1,
					'date': 1,
					'closingDate': 1,
					'timeAverage': 1,
					'requestedName': 1,
					'requestedProfile': 1
				}
			}
		], { warnings: false });
	});
}
