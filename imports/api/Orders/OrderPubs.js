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
					status: {
						$function:
							{
								body: `function(status) {
									switch (status) {
										case 'open':
											return 'Abierto';
										case 'awaitingSample':
											return 'En espera de muestra';
										case 'process':
											return 'En proceso';
										case 'awaitingResults':
											return 'En espera de resultados';
										case 'attended':
											return 'Atendido';
									}
								}`,
								args: ['$status'],
								lang: 'js'
							}
					},
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
			queryRequest = { '$eq': ['$_id', idRequest] };
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
					status: {
						$function:
							{
								body: `function(status) {
									switch (status) {
										case 'open':
											return 'Abierto';
										case 'awaitingSample':
											return 'En espera de muestra';
										case 'process':
											return 'En proceso';
										case 'awaitingResults':
											return 'En espera de resultados';
										case 'attended':
											return 'Atendido';
									}
								}`,
								args: ['$status'],
								lang: 'js'
							}
					},
					timeAverage: {
						$function:
							{
								body: `function(date, closingDate) {
									const date1 = new Date(date);
									const date2 = new Date(closingDate);
									return Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)) + ' dia(s)';
								}`,
								args: ['$date', '$closingDate'],
								lang: 'js'
							}
					},
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
