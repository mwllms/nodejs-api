# nodejs-api
NodeJS CRUD API example with express and mongodb.

## Install
Clone repository to your local environment and than run 
```
$ yarn install
```

Create an .env file and insert DB_CONNECTION url (i.e. Atlas)

## Endpoints
GET /posts => Get all posts
GET /posts/:id => Get single post by id

POST /posts => Create new post

PATCH /posts/:id => Update single post by id

DELETE /posts/:id => Delete single post by id