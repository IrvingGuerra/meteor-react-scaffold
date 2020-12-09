import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';
import { Breed } from './Breed';

if (Meteor.isServer) {
	Meteor.publish('breeds', function(specie) {
		let query = {};
		if(specie && specie !== ''){
			query = {
				idSpecie: specie
			}
		}
		ReactiveAggregate(this, Breed, [
			{
				$match: query
			},
			{
				$lookup:
					{
						from: 'species',
						let: { idSpecie: '$idSpecie' },
						pipeline: [
							{ $match: { '$expr': { '$eq': ['$_id', '$$idSpecie'] } } },
							{ $project: { 'name': 1 } }
						],
						as: 'specie'
					}
			},
			{
				$unwind: {
					path: '$specie',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$project: {
					"name": 1,
					"specie": 1
				}
			}
		], { warnings: false });
	});
}
