User Domain

{
  "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "userName": "rev36",
  "name": "Evandro Giacomelli",
  "email": "rev@dev.com",
  "phone": "+55469990101",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Pato Branco"
  },
  "relacionamento": "SINGLE",
  "bio": "developer",
  "passwordHash": "$2b$12$w8Q7qZ1yZxYQv8Qx8u1k4e7QK...",
  "visibility": "PUBLIC",
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z",
  "deletedAt": null
}

Campos internos (nao retornam em respostas publicas): passwordHash, deletedAt

ENUMS:
- visibility: "PUBLIC" | "PRIVATE"
- relacionamento: "SINGLE" | "DATING" | "MARRIED" | "DIVORCED" | "WIDOWED"
- Post visibility: "PUBLIC" | "PRIVATE"
- media.type: (a definir)

CreateUser ->
POST /users

Body:
{
  "userName": "rev36",
  "name": "Evandro Giacomelli",
  "email": "rev@dev.com",
  "password": "string",
  "phone": "+55469990101",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Pato Branco"
  },
  "relacionamento": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC"
}

Response: 201
{
  "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "userName": "rev36",
  "name": "Evandro Giacomelli",
  "email": "rev@dev.com",
  "phone": "+55469990101",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Pato Branco"
  },
  "relacionamento": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "email": "Invalid format",
      "userName": "Must be 3-20 characters",
      "password": "Must contain at least 8 characters"
    }
  }
- 409 CONFLICT
  Response:
  {
    "code": "CONFLICT",
    "message": "Email or username already in use"
  }

GetUser ->
GET /users/{id}

Response: 200
{
  "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "userName": "rev36",
  "name": "Evandro Giacomelli",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Pato Branco"
  },
  "relacionamento": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}

Errors:
- 404 NOT_FOUND
  Response:
  {
    "code": "NOT_FOUND",
    "message": "User not found"
  }

ListUsers ->
GET /users?page=1&limit=10

Response: 200
{
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      "userName": "rev36",
      "name": "Evandro Giacomelli",
      "visibility": "PUBLIC",
      "isActive": true,
      "createdAt": "2026-01-12T10:00:00Z"
    },
    {
      "id": "b2c3d4e5-f6a7-8901-bcde-2345678901fa",
      "userName": "sunnee",
      "name": "Marcos Rodrigues",
      "visibility": "PUBLIC",
      "isActive": true,
      "createdAt": "2026-01-10T08:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 23,
    "totalPages": 3
  }
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "page": "Must be >= 1",
      "limit": "Must be between 1 and 100"
    }
  }

Query Params:
- page (default: 1, min: 1)
- limit (default: 10, min: 1, max: 100)

GetMe ->
GET /me

Headers:
Authorization: Bearer <accessToken>

Response: 200
{
  "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "userName": "rev36",
  "name": "Evandro Giacomelli",
  "email": "rev@dev.com",
  "phone": "+55469990101",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Pato Branco"
  },
  "relacionamento": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}

Errors:
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }

UpdateMe ->
PATCH /me

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "name": "Evandro G.",
  "phone": "+55469990202",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Curitiba"
  },
  "relacionamento": "DATING",
  "bio": "backend developer",
  "visibility": "PRIVATE"
}

Response: 200
{
  "id": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "userName": "rev36",
  "name": "Evandro G.",
  "email": "rev@dev.com",
  "phone": "+55469990202",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Curitiba"
  },
  "relacionamento": "DATING",
  "bio": "backend developer",
  "visibility": "PRIVATE",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-15T09:20:00Z"
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "userName": "Field cannot be updated",
      "email": "Field cannot be updated"
    }
  }
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }

DeleteMe ->
DELETE /me

Headers:
Authorization: Bearer <accessToken>

Response: 204

Errors:
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }

Login ->
POST /auth/login

Body:
{
  "email": "rev@dev.com",
  "password": "string"
}

Response: 200
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "tokenType": "Bearer",
  "expiresInSec": 86400
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "email": "Invalid format"
    }
  }
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }

CreatePost ->
POST /posts

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "title": "post title",
  "content": "Hello world",
  "media": [
    {
      "type": "IMAGE",
      "url": "https://cdn.app.com/posts/abc123.jpg"
    }
  ],
  "visibility": "PUBLIC"
}

Response: 201
{
  "id": "c3d4e5f6-a7b8-9012-cdef-3456789012ab",
  "authorId": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "title": "post title",
  "content": "Hello world",
  "media": [
    {
      "type": "IMAGE",
      "url": "https://cdn.app.com/posts/abc123.jpg"
    }
  ],
  "visibility": "PUBLIC",
  "createdAt": "2026-01-12T10:05:00Z",
  "updatedAt": "2026-01-12T10:05:00Z"
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "title": "Must be between 1 and 120 characters",
      "content": "Must not be empty",
      "media[0].url": "Invalid URL"
    }
  }
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }

GetPost ->
GET /posts/{id}

Response: 200
{
  "id": "c3d4e5f6-a7b8-9012-cdef-3456789012ab",
  "authorId": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "title": "Post title",
  "content": "Hello world",
  "media": [
    {
      "type": "IMAGE",
      "url": "https://cdn.app.com/posts/abc123.jpg"
    }
  ],
  "visibility": "PUBLIC",
  "createdAt": "2026-01-12T10:05:00Z",
  "updatedAt": "2026-01-12T10:05:00Z"
}

Errors:
- 404 NOT_FOUND
  Response:
  {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }

ListPostsByAuthor ->
GET /users/{authorId}/posts?page=1&limit=10

Response: 200
{
  "data": [
    {
      "id": "c3d4e5f6-a7b8-9012-cdef-3456789012ab",
      "authorId": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      "title": "Post title",
      "content": "Hello world",
      "media": [
        {
          "type": "IMAGE",
          "url": "https://cdn.app.com/posts/abc123.jpg"
        }
      ],
      "visibility": "PUBLIC",
      "createdAt": "2026-01-12T10:05:00Z",
      "updatedAt": "2026-01-12T10:05:00Z"
    },
    {
      "id": "d4e5f6a7-b890-1234-def0-4567890123bc",
      "authorId": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
      "title": "Another post",
      "content": "Second post content",
      "media": [],
      "visibility": "PUBLIC",
      "createdAt": "2026-01-10T08:15:00Z",
      "updatedAt": "2026-01-10T08:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 23,
    "totalPages": 3
  }
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "page": "Must be >= 1",
      "limit": "Must be between 1 and 100"
    }
  }
- 404 NOT_FOUND
  Response:
  {
    "code": "NOT_FOUND",
    "message": "User not found"
  }

Query Params:
- page (default: 1, min: 1)
- limit (default: 10, min: 1, max: 100)

UpdatePost ->
PATCH /posts/{id}

Headers:
Authorization: Bearer <accessToken>

Body:
{
  "title": "Updated post title",
  "content": "Updated content",
  "media": [
    {
      "type": "IMAGE",
      "url": "https://cdn.app.com/posts/new-image.jpg"
    }
  ],
  "visibility": "PRIVATE"
}

Response: 200
{
  "id": "c3d4e5f6-a7b8-9012-cdef-3456789012ab",
  "authorId": "a1b2c3d4-e5f6-7890-abcd-1234567890ef",
  "title": "Updated post title",
  "content": "Updated content",
  "media": [
    {
      "type": "IMAGE",
      "url": "https://cdn.app.com/posts/new-image.jpg"
    }
  ],
  "visibility": "PRIVATE",
  "createdAt": "2026-01-12T10:05:00Z",
  "updatedAt": "2026-01-15T09:45:00Z"
}

Errors:
- 400 VALIDATION_ERROR
  Response:
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "title": "Must be between 1 and 120 characters"
    }
  }
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
- 403 FORBIDDEN
  Response:
  {
    "code": "FORBIDDEN",
    "message": "You are not allowed to update this post"
  }
- 404 NOT_FOUND
  Response:
  {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }

Campos permitidos:
- title
- content
- media
- visibility

Campos nao permitidos:
- id
- authorId
- createdAt
- updatedAt
- deletedAt

DeletePost ->
DELETE /posts/{id}

Headers:
Authorization: Bearer <accessToken>

Response: 204

Errors:
- 401 UNAUTHORIZED
  Response:
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
- 403 FORBIDDEN
  Response:
  {
    "code": "FORBIDDEN",
    "message": "You are not allowed to delete this post"
  }
- 404 NOT_FOUND
  Response:
  {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }
