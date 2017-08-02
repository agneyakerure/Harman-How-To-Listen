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

	'test2.Test2Level2Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level2CorrectNumber: correctNumber,
			Test2Level2WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level3Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level3CorrectNumber: correctNumber,
			Test2Level3WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level4Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level4CorrectNumber: correctNumber,
			Test2Level4WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level5Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level5CorrectNumber: correctNumber,
			Test2Level5WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level6Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level6CorrectNumber: correctNumber,
			Test2Level6WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level7Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level7CorrectNumber: correctNumber,
			Test2Level7WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level8Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level8CorrectNumber: correctNumber,
			Test2Level8WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level9Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level9CorrectNumber: correctNumber,
			Test2Level9WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test2.Test2Level10Insert'(correctNumber, wrongNumber, Test2IncompleteLevel, Test2Attempts, Test2TotalCorrect, Test2TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test2.insert({
			Test2Level10CorrectNumber: correctNumber,
			Test2Level10WrongNumber: wrongNumber,
			Test2IncompleteLevel,
			Test2Attempts,
			Test2TotalCorrect,
			Test2TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});