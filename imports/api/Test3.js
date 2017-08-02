import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Test3 = new Mongo.Collection('test3');

if(Meteor.isServer) {
	Meteor.publish('test3', function() {
		return Test3.find({ userId: this.userId });
	});
}

Meteor.methods({

	'test3.Test3Level0Insert'(value0, Test3IncompleteLevel) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level1Value0: value0,
			Test3IncompleteLevel,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level1Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level1CorrectNumber: correctNumber,
			Test3Level1WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level2Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level2CorrectNumber: correctNumber,
			Test3Level2WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level3Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level3CorrectNumber: correctNumber,
			Test3Level3WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level4Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level4CorrectNumber: correctNumber,
			Test3Level4WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level5Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level5CorrectNumber: correctNumber,
			Test3Level5WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level6Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level6CorrectNumber: correctNumber,
			Test3Level6WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level7Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level7CorrectNumber: correctNumber,
			Test3Level7WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level8Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level8CorrectNumber: correctNumber,
			Test3Level8WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level9Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level9CorrectNumber: correctNumber,
			Test3Level9WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test3.Test3Level10Insert'(correctNumber, wrongNumber, Test3IncompleteLevel, Test3Attempts, Test3TotalCorrect, Test3TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test3.insert({
			Test3Level10CorrectNumber: correctNumber,
			Test3Level10WrongNumber: wrongNumber,
			Test3IncompleteLevel,
			Test3Attempts,
			Test3TotalCorrect,
			Test3TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});