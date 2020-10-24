import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Template } from './Template';

if (Meteor.isServer) {
	Meteor.publish('templates', function( data ) {
		let query = {};
		if(data){
			query = {
				creationDate: { $gte: data.startDate.toISOString().substring(0, 10), $lte: data.endDate.toISOString().substring(0, 10) }
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