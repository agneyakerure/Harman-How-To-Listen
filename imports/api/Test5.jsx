import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Test5 = new Mongo.Collection('test5');

if(Meteor.isServer) {
	Meteor.publish('test5', function() {
		return Test5.find({ userId: this.userId });
	});
}

Meteor.methods({

	'test5.Test5Level0Insert'(value0, Test5IncompleteLevel) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level1Value0: value0,
			Test5IncompleteLevel,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level1Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level1CorrectNumber: correctNumber,
			Test5Level1WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level2Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level2CorrectNumber: correctNumber,
			Test5Level2WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level3Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level3CorrectNumber: correctNumber,
			Test5Level3WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level4Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level4CorrectNumber: correctNumber,
			Test5Level4WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level5Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level5CorrectNumber: correctNumber,
			Test5Level5WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level6Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level6CorrectNumber: correctNumber,
			Test5Level6WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level7Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level7CorrectNumber: correctNumber,
			Test5Level7WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level8Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level8CorrectNumber: correctNumber,
			Test5Level8WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level9Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level9CorrectNumber: correctNumber,
			Test5Level9WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test5.Test5Level10Insert'(correctNumber, wrongNumber, Test5IncompleteLevel, Test5Attempts, Test5TotalCorrect, Test5TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test5.insert({
			Test5Level10CorrectNumber: correctNumber,
			Test5Level10WrongNumber: wrongNumber,
			Test5IncompleteLevel,
			Test5Attempts,
			Test5TotalCorrect,
			Test5TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});