# Blueprints

Modern blueprints for TypeScript web development.

## Install

1. Install NodeJS 16 from [nodejs.org](https://nodejs.org)
2. `npm install --global yarn`
3. `yarn`
4. `yarn start` in `./client`
5. `yarn start` in `./server`

## Firebase Deploy Steps

1. Go to [firebase.google.com](https://firebase.google.com) and sign in to your Google account
2. Create a "Web" project
3. `cd client`
4. `yarn add firebase`
5. `npx firebase login`
7. `npx firebase init hosting` - change public folder to `build`
8. `yarn build`
9. `yarn deploy`
10. (optional) Go to Project Settings in Firebase and copy over Analytics code to `index.ts`
11. (optional) Add Custom domain, prove ownership by adding TXT record, then add A record

## Cloud Run Deploy Steps

1. https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
2. Change config values in `./server/package.json` scripts `build` and `deploy`
3. `cd server`
4. `yarn build`
5. `yarn deploy`
