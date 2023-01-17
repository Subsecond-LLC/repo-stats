/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["githubsecret"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
import fetch from 'node-fetch';
import aws from 'aws-sdk';

/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const GITHUB_CLIENT_ID = '726814fd13cb9d417f4b';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export async function handler(event) {
  const { code } = event.arguments;

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: ['githubsecret'].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  const GITHUB_CLIENT_SECRET = Parameters[0].Value;

  const result = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token } = await result.json();

  const user = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: 'application/json',
    },
  });

  const { login, email } = await user.json();

  return {
    githubName: login,
    email,
    bearerToken: access_token,
  };
}
