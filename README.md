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
6. `npx firebase init hosting` - change public folder to `build`
7. `yarn build`
8. `yarn deploy`
9. (optional) Go to Project Settings in Firebase and copy over Analytics code to `index.ts`
10. (optional) Add Custom domain, prove ownership by adding TXT record, then add A record

## Cloud Run Deploy Steps

1. https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
2. Change config values in `./server/package.json` scripts `build` and `deploy`
3. `cd server`
4. `yarn build`
5. `yarn deploy`

## Branches

- [Main](https://github.com/LuukvE/blueprints) - Checklist and HTTP GET request
- [Scroll](https://github.com/LuukvE/blueprints/tree/scroll) - Animate on scroll with [AOS](https://github.com/michalsnik/aos)
- [Chat](https://github.com/LuukvE/blueprints/tree/chat) - Form and HTTP POST request
- [CRUD](https://github.com/LuukvE/blueprints/tree/crud) - List of editable data objects
- [Websocket](https://github.com/LuukvE/blueprints/tree/websocket) - Real-time version of CRUD
- [Hosting](https://github.com/LuukvE/blueprints/tree/hosting) - Google Firebase and Cloud Run config
- [Bootstrap](https://github.com/LuukvE/blueprints/tree/bootstrap) - Bootstrap-based contact form
- [Database](https://github.com/LuukvE/blueprints/tree/database) - Read and write to Google Firestore database
- [Slack](https://github.com/LuukvE/blueprints/tree/slack) - Write and receive messages from Slack channels

## About

Watch me develop these blueprints over at [Youtube](https://www.youtube.com/c/ApexBlueprints) or come and request new blueprints during the live stream on [Twitch](https://twitch.tv/apexblueprints). I stream on Friday and Saturday from 19:00 till 23:00 UTC.

If you really enjoy my source code, you're welcome to support me with a small donation via Crypto. ETH / BSC / Polygon: `0x41CD1371DcfbD9Fe74096F67141303f18DA313F5`
