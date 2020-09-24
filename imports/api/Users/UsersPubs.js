import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
	Meteor.publish('user', function() {
		if (this.userId) {
			return Meteor.users.find(
				{ _id: this.userId },
				{
					fields: {
						emails: 1,
						profile: 1,
						status: 1,
					},
				}
			);
		}
		return this.ready();
	})
}
