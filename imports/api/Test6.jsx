import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Test6 = new Mongo.Collection('test6');

if(Meteor.isServer) {
	Meteor.publish('test6', function() {
		return Test6.find({ userId: this.userId });
	});
}

Meteor.methods({

	'test6.Test6Level0Insert'(value0, Test6IncompleteLevel) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level1Value0: value0,
			Test6IncompleteLevel,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level1Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level1CorrectNumber: correctNumber,
			Test6Level1WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level2Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level2CorrectNumber: correctNumber,
			Test6Level2WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level3Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level3CorrectNumber: correctNumber,
			Test6Level3WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level4Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level4CorrectNumber: correctNumber,
			Test6Level4WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level5Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level5CorrectNumber: correctNumber,
			Test6Level5WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level6Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level6CorrectNumber: correctNumber,
			Test6Level6WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level7Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level7CorrectNumber: correctNumber,
			Test6Level7WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level8Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level8CorrectNumber: correctNumber,
			Test6Level8WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level9Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level9CorrectNumber: correctNumber,
			Test6Level9WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test6.Test6Level10Insert'(correctNumber, wrongNumber, Test6IncompleteLevel, Test6Attempts, Test6TotalCorrect, Test6TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test6.insert({
			Test6Level10CorrectNumber: correctNumber,
			Test6Level10WrongNumber: wrongNumber,
			Test6IncompleteLevel,
			Test6Attempts,
			Test6TotalCorrect,
			Test6TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});