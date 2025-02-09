# REST API implementation

This is a Game of Thrones inspired REST API game. You are responsible to create the engine of the game.

## Your tasks

1. ✅ Implement the endpoints in **./src/api.js** file with the most suitable code for players and objects management REST API. You will find detailed instructions in this file.
2. ✅ Write some tests for your code. Use test folder for this purpose.
3. ✅ Answer all commented questions you find in the code.

### Required endpoints

You have to create endpoints (as many as you consider) to support the following functionality:

1. ✅ List all players.
2. ✅ Create player: adds a new player to data source.
3. ✅ Get player by id: returns the player for the given id.
4. ✅ Arm a player with an object in its bag.
5. ✅ Kill a player: sets player health to 0.
6. ✅ Create object: adds a new object to data source.
7. ✅ Get object by id: returns the object for the given id.
8. ✅ Upgrade object: increase/descrease the value of the object given by id with a new value
9. ✅ Destroy object: remove an object from available objects

**Bonus:**

1. ✅ Include a postman collection in utils folder to test the app.
2. ✅ Add basic authentication to /api path.
3. ✅ Implement pick up item endpoint: one player add to its bag one item that doesn't belong to any other player.
4. ✅ Implement attack player endpoint: one player attacks another player using an object from its bag. Adjust health accordingly
5. ✅ Implement steal bag from player endpoint: one player steals everything from another player. Bag objects are moved from one player to another.
6. ✅ Implement resurrect player endpoint: bring back to life a dead player using its id.
7. ✅ Implement use object endpoint: a player use an object against another player or itself.
8. ✅ Are you having fun? You are free to extend the game with new functionality.

## Game Rules

1. You are free to implement as many endpoints as you need.
2. You can use inline comments, git commits or readme file to justify your decissions.
3. Bag size is unlimited.
4. Bear in mind RESTful API concepts.
5. One object can be used by multiple players

**Use your own criteria for any rule that is not clear. Justify it.**

## Decisions

I've build a API bearing in mind the time I have to complete all task. For that reason:

1. All the logic is in the controllers. That is not a great architecture if the app have to scale. With more time I will apply DDD and an hexagonal architecture. You can find a example that I've build for practise these architecture here: [shopping-list](https://github.com/carloscpda/shopping-list)
2. I've decide to write acceptance test. It is a good aproach for test all the routes but not the logic. With more time I would write unitary test for this porpouse.
3. I am feel more confortable with typescript. For that reason I feel free to migrate it.
4. I've implemented persistante. A file is saved on **./cache/data.json**. You can restart the database removing this file and restarting the server.
5. For a bigger and scalable API I would use Event Sourcing and save every action (attack, steal, use-object, ...) as an event (transactions). And for example _/players/:id/attack_ would be _/actions/_.+
6. I've build a super basic auth on /api routes using a cookie.

## How to run the application using a local server

To run the project, open a terminal and execute the following command from project root path:

Install dependencies

> yarn

Start a local server

> yarn start

A local server will start on port 8080.

> http://localhost:8080

## How to run the application using Docker

Build the image:

> docker build -t <your username>/payvision-frontend-castleblack .

Run the image on localhost port 8081:

> docker run -p 8081:8080 -d <your username>/payvision-frontend-castleblack

Enter the container:

> docker exec -it <container id> sh

Print logs:

> docker logs <container id>
> docker logs -f --tail 10 <container id>

## How to test the application

To test the project, open a terminal and execute the following command from project root path:

Install dependencies

> yarn test

If you want watch it run

> yarn test:watch

## How to get authentication

Using the endpoint _/auth/signin_ with the body params **username** and **password**. You can define this envirioment variables with the same name or use the default ones: _admin_ and _secret_ respectively
