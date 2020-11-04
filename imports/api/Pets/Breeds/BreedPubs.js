import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Breed } from './Breed';

if (Meteor.isServer) {
	Meteor.publish('breeds', function( ) {
		ReactiveAggregate(this, Breed, [
			{
				$lookup:
					{
						from: 'species',
						let: { idSpecie: '$idSpecie' },
						pipeline: [
							{ $match: { '$expr': { '$eq': ['$_id', '$$idSpecie'] } } },
							{ $project: { 'name': 1 } }
						],
						as: 'breed'
					}
			}, {
				$unwind: {
					path: '$breed',
					preserveNullAndEmptyArrays: true
				}
			}
		], { warnings: false });
	});
}