import config from '../config/login';
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

var poolData = {
    UserPoolId: config.cognito.userPoolId,
    ClientId: config.cognito.userPoolClientId
};

export const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const getCognitoUser = (email) => {
    return new AmazonCognitoIdentity.CognitoUser({
        Username: email,
        Pool: userPool
    })
}

export const login = (email, password, onSuccess, onFailure) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: email,
        Password: password
    });

    var cognitoUser = getCognitoUser(email)
    cognitoUser.authenticateUser(authenticationDetails, {onSuccess, onFailure});
}

export const verify = (email, code, onSuccess, onFailure) => {
    return getCognitoUser(email).confirmRegistration(code, true, (err, result) => {
        if (!err) onSuccess(result)
        else onFailure(err)
    })
}

export const register = (email, password, onSuccess, onFailure) => {
    var dataEmail = {
        Name: 'email',
        Value: email
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

    userPool.signUp(email, password, [attributeEmail], null,
        function signUpCallback(err, result) {
            if (!err) onSuccess(result)
            else onFailure(err)
        }
    );
}

export const logout = (email) => {
    getCognitoUser(email).signOut()
}