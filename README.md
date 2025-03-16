# where-2-meet
Unihack 2025 submission by John Pharoah

#Getting keys

1. Head over to the google maps developer portal and traveltime and make accounts to retrieve your api keys.

#Setup

1. After cloning the project, run ``cd backend``, then run ``npm i`` to install all dependencies.
2. Create a .env file and fill out the following fields:
```
ALLOWED_ORIGINS = [Your local host]
PORT = [Your backend port]
TRAVELTIME_APPLICATION_ID = [Your traveltime application id]
TRAVELTIME_API_KEY = [Your traveltime api key]
GOOGLE_MAPS_KEY = [Your google maps key]
```
3. Navigate to the frontend directory and run npm i.
4. Create a .env and put the google maps key into it.

#Running the project

1. On the backend directory, run ``npx ts-node app.ts``.
2. On the frontend directory, run ``npm run dev``