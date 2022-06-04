# Blueprints

Modern blueprints for TypeScript web development.

## Install

1. Install NodeJS
2. `$ npm install`
3. `$ npm start`
4. `$ npm run server`

## Firebase Deploy Steps

1. Go to [firebase.google.com](https://firebase.google.com) and sign in to your Google account
2. Create a "Web" project
3. `$ npm install firebase`
4. `$ npx firebase login`
5. `$ npx firebase init hosting` - change public folder to `build`
6. Add deploy script to `package.json`
7. `$ npm run build`
8. `$ npm run deploy`
9. (optional) Go to Project Settings in Firebase and copy over Analytics code to `index.ts`
10. (optional) Add Custom domain, prove ownership by adding TXT record, then add A record

## Cloud Run Deploy Steps

1. https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
2. Change config values in `package.json` scripts `build-api` and `deploy-api`
3. `$ npm run build-api`
4. `$ npm run deploy-api`
