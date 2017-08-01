import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
	Meteor.publish('values', function() {
		return Links.find({ userId: this.userId });
	});
}

Meteor.methods({
	'links.insert'(value0, incompleteLevel) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level1Value0: value0,
			incompleteLevel,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert2'(value1, value2, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level1Value1: value1,
			Test1Level1Value2: value2,
			Test1Level1CorrectNumber: correctNumber,
			Test1Level1WrongNumber: wrongNumber,
			// Test1Level1Attempts: level1attempts,
			// Test1TotalAttempts,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert3'(value1, value2, value3, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level2Value1: value1,
			Test1Level2Value2: value2,
			Test1Level2Value3: value3,
			Test1Level2CorrectNumber: correctNumber,
			Test1Level2WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert4'(value1, value2, value3, value4, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level3Value1: value1,
			Test1Level3Value2: value2,
			Test1Level3Value3: value3,
			Test1Level3Value4: value4,
			Test1Level3CorrectNumber: correctNumber,
			Test1Level3WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert5'(value1, value2, value3, value4, value5, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level4Value1: value1,
			Test1Level4Value2: value2,
			Test1Level4Value3: value3,
			Test1Level4Value4: value4,
			Test1Level4Value5: value5,
			Test1Level4CorrectNumber: correctNumber,
			Test1Level4WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert6'(value1, value2, value3, value4, value5, value6, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level5Value1: value1,
			Test1Level5Value2: value2,
			Test1Level5Value3: value3,
			Test1Level5Value4: value4,
			Test1Level5Value5: value5,
			Test1Level5Value6: value6,
			Test1Level5CorrectNumber: correctNumber,
			Test1Level5WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert7'(value1, value2, value3, value4, value5, value6, value7, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level6Value1: value1,
			Test1Level6Value2: value2,
			Test1Level6Value3: value3,
			Test1Level6Value4: value4,
			Test1Level6Value5: value5,
			Test1Level6Value6: value6,
			Test1Level6Value7: value7,
			Test1Level6CorrectNumber: correctNumber,
			Test1Level6WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert8'(value1, value2, value3, value4, value5, value6, value7, value8, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level7Value1: value1,
			Test1Level7Value2: value2,
			Test1Level7Value3: value3,
			Test1Level7Value4: value4,
			Test1Level7Value5: value5,
			Test1Level7Value6: value6,
			Test1Level7Value7: value7,
			Test1Level7Value8: value8,
			Test1Level7CorrectNumber: correctNumber,
			Test1Level7WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert9'(value1, value2, value3, value4, value5, value6, value7, value8, value9, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level8Value1: value1,
			Test1Level8Value2: value2,
			Test1Level8Value3: value3,
			Test1Level8Value4: value4,
			Test1Level8Value5: value5,
			Test1Level8Value6: value6,
			Test1Level8Value7: value7,
			Test1Level8Value8: value8,
			Test1Level8Value9: value9,
			Test1Level8CorrectNumber: correctNumber,
			Test1Level8WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},

	'links.insert10'(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, correctNumber, wrongNumber, incompleteLevel, Test1Attempts, Test1TotalCorrect, Test1TotalWrong) {
		if(!this.userId) {
			throw new Meteor.Error('Not Authorized');
		}
		Links.insert({
			Test1Level9Value1: value1,
			Test1Level9Value2: value2,
			Test1Level9Value3: value3,
			Test1Level9Value4: value4,
			Test1Level9Value5: value5,
			Test1Level9Value6: value6,
			Test1Level9Value7: value7,
			Test1Level9Value8: value8,
			Test1Level9Value9: value9,
			Test1Level9Value10: value10,
			Test1Level9CorrectNumber: correctNumber,
			Test1Level9WrongNumber: wrongNumber,
			incompleteLevel,
			Test1Attempts,
			Test1TotalCorrect,
			Test1TotalWrong,
			userId: this.userId,
			createdAt: new Date()
		});
	},
});