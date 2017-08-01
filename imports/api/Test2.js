import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Test2 = new Mongo.Collection('test2');

if(Meteor.isServer) {
	Meteor.publish('test2', function() {
		return Test2.find({ userId: this.userId });
	});
}

Meteor.methods({

	'test2.Test2Level0Insert'(value0, Test2IncompleteLevel) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level1Value0: value0,
			Test2IncompleteLevel,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level1Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level1CorrectNumber: correctNumber,
			Test2Level1WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});