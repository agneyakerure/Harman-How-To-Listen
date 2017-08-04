import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Test4 = new Mongo.Collection('test4');

if(Meteor.isServer) {
	Meteor.publish('test4', function() {
		return Test4.find({ userId: this.userId });
	});
}

Meteor.methods({

	'test4.Test4Level0Insert'(value0, Test4IncompleteLevel) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level1Value0: value0,
			Test4IncompleteLevel,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level1Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level1CorrectNumber: correctNumber,
			Test4Level1WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level2Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level2CorrectNumber: correctNumber,
			Test4Level2WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level3Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level3CorrectNumber: correctNumber,
			Test4Level3WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level4Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level4CorrectNumber: correctNumber,
			Test4Level4WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level5Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level5CorrectNumber: correctNumber,
			Test4Level5WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level6Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level6CorrectNumber: correctNumber,
			Test4Level6WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level7Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level7CorrectNumber: correctNumber,
			Test4Level7WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level8Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level8CorrectNumber: correctNumber,
			Test4Level8WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level9Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level9CorrectNumber: correctNumber,
			Test4Level9WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'test4.Test4Level10Insert'(correctNumber, wrongNumber, Test4IncompleteLevel, Test4Attempts, Test4TotalCorrect, Test4TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Test4.insert({
			Test4Level10CorrectNumber: correctNumber,
			Test4Level10WrongNumber: wrongNumber,
			Test4IncompleteLevel,
			Test4Attempts,
			Test4TotalCorrect,
			Test4TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});