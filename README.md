# Rede Social API

Contratos de endpoints para Users, Login e Post.

## Indice

- [Users](#users)
  - [CreateUser](#createuser)
  - [GetUser](#getuser)
  - [ListUsers](#listusers)
  - [GetMe](#getme)
  - [UpdateMe](#updateme)
  - [DeleteMe](#deleteme)
- [Login](#login)
  - [Login](#login-endpoint)
- [Post](#posts)
  - [CreatePost](#createpost)
  - [GetPost](#getpost)
  - [ListPostsByAuthor](#listpostsbyauthor)
  - [UpdatePost](#updatepost)
  - [DeletePost](#deletepost)
- [Enums](#enums)

## Users

### CreateUser

Endpoint: `POST /users`

Headers:
- (nenhum)

Body:
```json
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
  "relationship": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC"
}
```

Response: `201`
```json
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
  "relationship": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "email": "Invalid format",
      "userName": "Must be 3-20 characters",
      "password": "Must contain at least 8 characters"
    }
  }
  ```
- `409 CONFLICT`
  ```json
  {
    "code": "CONFLICT",
    "message": "Email or username already in use"
  }
  ```

### GetUser

Endpoint: `GET /users/{id}`

Headers:
- (nenhum)

Response: `200`
```json
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
  "relationship": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}
```

Errors:
- `404 NOT_FOUND`
  ```json
  {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
  ```

### ListUsers

Endpoint: `GET /users?page=1&limit=10`

Headers:
- (nenhum)

Response: `200`
```json
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
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "page": "Must be >= 1",
      "limit": "Must be between 1 and 100"
    }
  }
  ```

### GetMe

Endpoint: `GET /me`

Headers:
- `Authorization: Bearer <accessToken>`

Response: `200`
```json
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
  "relationship": "SINGLE",
  "bio": "developer",
  "visibility": "PUBLIC",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}
```

Errors:
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
  ```

### UpdateMe

Endpoint: `PATCH /me`

Headers:
- `Authorization: Bearer <accessToken>`

Body:
```json
{
  "name": "Evandro G.",
  "phone": "+55469990202",
  "birth": "1994-10-02",
  "location": {
    "country": "BR",
    "state": "PR",
    "city": "Curitiba"
  },
  "relationship": "DATING",
  "bio": "backend developer",
  "visibility": "PRIVATE"
}
```

Response: `200`
```json
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
  "relationship": "DATING",
  "bio": "backend developer",
  "visibility": "PRIVATE",
  "isActive": true,
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-15T09:20:00Z"
}
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "userName": "Field cannot be updated",
      "email": "Field cannot be updated"
    }
  }
  ```
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
  ```

### DeleteMe

Endpoint: `DELETE /me`

Headers:
- `Authorization: Bearer <accessToken>`

Response: `204`

Errors:
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
  ```

## Login

### Login Endpoint

Endpoint: `POST /auth/login`

Headers:
- (nenhum)

Body:
```json
{
  "email": "rev@dev.com",
  "password": "string"
}
```

Response: `200`
```json
{
  "accessToken": "eyJhbGc...",
  "tokenType": "Bearer",
  "expiresInSec": 86400
}
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "email": "Invalid format"
    }
  }
  ```
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
  ```

## Post

### CreatePost

Endpoint: `POST /posts`

Headers:
- `Authorization: Bearer <accessToken>`

Body:
```json
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
```

Response: `201`
```json
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
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "title": "Must be between 1 and 120 characters",
      "content": "Must not be empty",
      "media[0].url": "Invalid URL"
    }
  }
  ```
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
  ```

### GetPost

Endpoint: `GET /posts/{id}`

Headers:
- (nenhum)

Response: `200`
```json
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
```

Errors:
- `404 NOT_FOUND`
  ```json
  {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }
  ```

### ListPostsByAuthor

Endpoint: `GET /users/{authorId}/posts?page=1&limit=10`

Headers:
- (nenhum)

Response: `200`
```json
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
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "page": "Must be >= 1",
      "limit": "Must be between 1 and 100"
    }
  }
  ```
- `404 NOT_FOUND`
  ```json
  {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
  ```

### UpdatePost

Endpoint: `PATCH /posts/{id}`

Headers:
- `Authorization: Bearer <accessToken>`

Body:
```json
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
```

Response: `200`
```json
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
```

Errors:
- `400 VALIDATION_ERROR`
  ```json
  {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "title": "Must be between 1 and 120 characters"
    }
  }
  ```
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
  ```
- `403 FORBIDDEN`
  ```json
  {
    "code": "FORBIDDEN",
    "message": "You are not allowed to update this post"
  }
  ```
- `404 NOT_FOUND`
  ```json
  {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }
  ```

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

### DeletePost

Endpoint: `DELETE /posts/{id}`

Headers:
- `Authorization: Bearer <accessToken>`

Response: `204`

Errors:
- `401 UNAUTHORIZED`
  ```json
  {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
  ```
- `403 FORBIDDEN`
  ```json
  {
    "code": "FORBIDDEN",
    "message": "You are not allowed to delete this post"
  }
  ```
- `404 NOT_FOUND`
  ```json
  {
    "code": "NOT_FOUND",
    "message": "Post not found"
  }
  ```

## Enums

User visibility:
- `PUBLIC`
- `PRIVATE`

Relationship:
- `SINGLE`
- `DATING`
- `MARRIED`
- `DIVORCED`
- `WIDOWED`

Post visibility:
- `PUBLIC`
- `PRIVATE`

media.type:
- (a definir)
