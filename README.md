## SPA Client Demo ##
Demo React SPA client with middleware proxy authorizing with authorization_code grant.

Based on the following article: https://fusionauth.io/blog/2020/03/10/securely-implement-oauth-in-react, but works with Spring OAuth2.1 Authorization Server demos instead on FusionAuth authorization server.

## How to Run ##
1. Add the following to `/etc/hosts`:
```
127.0.0.1 react-app
127.0.0.1 auth-server
```

2. Run authorization server on port 9001 (or adjust port in `server/constants.js` and `client/constants.js`), e.g:
  - https://github.com/xsmirnovx/spring-authorization-server-demo
  - https://github.com/spring-projects/spring-authorization-server/tree/main/samples/default-authorizationserver

3. Start frontend:
```
cd client
npm start
```
Start express server:
```
cd server
node index.js
```

4. Open `http://react-app:3001` in browser
