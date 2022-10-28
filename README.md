Exercise Tracker REST API

User Stories:
I can create a user by posting form data username to /api/users and returned will be an object with _id and username.
I can get an array of all users by getting api/users with the same info as when creating a user.
I can add an exercise to any user by posting form data _id (userId), description, duration, and optionally date to /api/users/_id/exercises. If no date is supplied it will use current date. Returned will be the user object with also the exercise fields added.
I can retrieve a full exercise log of any user by getting /api/users/_id/logs. Return will be the user object with added array log and count (total exercise count).
I can retrieve part of the log of any user by also passing along optional parameters: from / to / limit. (Date format: yyyy-mm-dd, limit: number)
