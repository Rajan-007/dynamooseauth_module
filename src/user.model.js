const dynamoose = require('dynamoose');

dynamoose.aws.ddb.local('http://localhost:7000');

const userSchema = new dynamoose.Schema({
    name: {
        type: String,
        hashKey: true
    },
    password: {
        type: String
    }
});

const User = dynamoose.model('User', userSchema);

module.exports = User;
