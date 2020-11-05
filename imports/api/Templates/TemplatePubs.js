import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Template } from './Template';
import Utilities from '../../startup/both/Utilities';

if (Meteor.isServer) {
	Meteor.publish('templates', function( data ) {
		let query = {
			date: { $gte: Utilities.currentLocalISODate(), $lte: Utilities.currentLocalISODate() }
		};
		if(data){
			query = {
				date: { $gte: data.startDate.toISOString().substring(0, 10), $lte: data.endDate.toISOString().substring(0, 10) }
			}
		}
		ReactiveAggregate(this, Template, [
			{
				$match: query
			},
			{
				$lookup:
					{
						from: 'users',
						let: { idCreator: '$idCreator' },
						pipeline: [
							{ $match: { '$expr': { '$eq': ['$_id', '$$idCreator'] } } },
							{ $project: { 'profile.username': 1 } }
						],
						as: 'creator'
					}
			}, {
				$unwind: {
					path: '$creator',
					preserveNullAndEmptyArrays: true
				}
			}
		], { warnings: false });
	});
}

if (Meteor.isServer) {
	Meteor.publish('allTemplates', function( ) {
		ReactiveAggregate(this, Template, [
			{
				$lookup:
					{
						from: 'users',
						let: { idCreator: '$idCreator' },
						pipeline: [
							{ $match: { '$expr': { '$eq': ['$_id', '$$idCreator'] } } },
							{ $project: { 'profile.username': 1 } }
						],
						as: 'creator'
					}
			}, {
				$unwind: {
					path: '$creator',
					preserveNullAndEmptyArrays: true
				}
			}
		], { warnings: false });
	});
}