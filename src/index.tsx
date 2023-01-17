import App from './App';
import awsConfig from './aws-exports';
import './index.css';
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Amplify, Auth } from 'aws-amplify';
import { createAuthLink } from 'aws-appsync-auth-link';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

const url = awsConfig.aws_appsync_graphqlEndpoint;
const region = awsConfig.aws_appsync_region;

Amplify.configure(awsConfig);

Auth.configure({
  region,
  identityPoolId: awsConfig.aws_cognito_identity_pool_id,
});

// Auth.signIn({ username: 'jones@getsubsecond.com', password: 'password' })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

const httpLink = new HttpLink({
  uri: url,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    createAuthLink({
      url: awsConfig.aws_appsync_graphqlEndpoint,
      auth: {
        type: 'AWS_IAM',
        credentials: Auth.Credentials.get(),
      },
      region,
    }),
    httpLink,
  ]),
});

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <ApolloProvider client={client}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ApolloProvider>
);
