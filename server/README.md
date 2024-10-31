# React-Node ChatApp

## API

### User Routes

#### 1. Sign Up

- **Endpoint:** `POST /signup`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "id": "string",
      "email": "string",
      "profileSetup": "boolean"
    }
    ```
  - **401 Bad Request**
  - **409 Conflict**
  - **500 Internal Server Error**

#### 2. Login

- **Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "user": {
        "id": "string",
        "email": "string",
        "profileSetup": "boolean",
        "firstName": "string",
        "lastName": "string",
        "image": "string"
      }
    }
    ```
  - **400 Invalid Password and Email**
  - **404 User Not Found**
  - **500 Internal Server Error**

#### 3. Get User Info

- **Endpoint:** `GET /user-info`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "user": {
        "id": "string",
        "email": "string",
        "profileSetup": "boolean",
        "firstName": "string",
        "lastName": "string",
        "image": "string"
      }
    }
    ```
  - **404 User Not Found**
  - **500 Internal Server Error**

#### 4. Update Profile

- **Endpoint:** `POST /update-profile`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body:**
  ```json
  {
    "firstName": "string",
    "lastName": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "user": {
        "id": "string",
        "email": "string",
        "profileSetup": "boolean",
        "firstName": "string",
        "lastName": "string",
        "image": "string"
      }
    }
    ```
  - **404 User Not Found**
  - **500 Internal Server Error**

#### 5. Add Profile Image

- **Endpoint:** `POST /add-profile-image`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Form Data:**
  ```json
  {
    "profile-image": "<file>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "image": "string"
    }
    ```
  - **400 File is Required**
  - **500 Internal Server Error**

#### 6. Remove Profile Image

- **Endpoint:** `DELETE /remove-profile-image`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  - **204 No Content**
  - **404 User Not Found**
  - **500 Internal Server Error**

#### 7. Logout

- **Endpoint:** `POST /logout`
- **Response:**
  - **200 OK**
    ```json
    {
      "message": "logout successful"
    }
    ```
  - **500 Internal Server Error**

For further details, you can refer to the source code:

- [User Routes](https://github.com/mhizterpaul/chat-app/blob/main/server/src/routes/user.ts)
- [User Controllers](https://github.com/mhizterpaul/chat-app/blob/main/server/src/controllers/users.ts)

### Contact Routes

#### 1. Search Contacts

- **Endpoint:** `POST /search`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body:**
  ```json
  {
    "searchTerm": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "contacts": [
        {
          "_id": "string",
          "firstName": "string",
          "lastName": "string",
          "email": "string"
        }
      ]
    }
    ```
  - **400 Bad Request: "searchTerm is required"**
  - **500 Internal Server Error**

#### 2. Get Contacts for DM List

- **Endpoint:** `GET /get-contacts-for-dm`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "contacts": [
        {
          "_id": "string",
          "lastMessageTime": "date",
          "firstName": "string",
          "lastName": "string",
          "lastMessage": {
            "messageType": "string",
            "content": "string",
            "fileUrl": "string",
            "timeStamp": "date"
          },
          "image": "string"
        }
      ]
    }
    ```
  - **500 Internal Server Error**

#### 3. Get All Contacts

- **Endpoint:** `GET /get-all-contacts`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "contacts": [
        {
          "label": "string",
          "avatar": "string"
        }
      ]
    }
    ```
  - **500 Internal Server Error**

For further details, you can refer to the source code:

- [Contact Routes](https://github.com/mhizterpaul/chat-app/blob/main/server/src/routes/contact.ts)
- [Contact Controllers](https://github.com/mhizterpaul/chat-app/blob/main/server/src/controllers/contacts.ts)

### Channel Routes

#### 1. Create Channel

- **Endpoint:** `POST /create-channel`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body:**
  ```json
  {
    "name": "string",
    "members": ["userId1", "userId2", ...],
    "avatar": "string (URL)"
  }
  ```
- **Response:**
  - **201 Created**
    ```json
    {
      "channel": {
        "name": "string",
        "members": ["userId1", "userId2", ...],
        "admin": "userId",
        "avatar": "string (URL)"
      }
    }
    ```
  - **400 Bad Request: "Admin user not found." or "some members are not valid users"**
  - **500 Internal Server Error**

#### 2. Get User Channels

- **Endpoint:** `GET /get-user-channels`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "channels": [
        {
          "name": "string",
          "members": ["userId1", "userId2", ...],
          "admin": "userId",
          "avatar": "string (URL)",
          "updatedAt": "date"
        }
      ]
    }
    ```
  - **500 Internal Server Error**

#### 3. Get Channel Messages

- **Endpoint:** `GET /get-channel-messages/:channelId`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "messages": [
        {
          "sender": {
            "firstName": "string",
            "lastName": "string",
            "email": "string",
            "image": "string (URL)"
          },
          "content": "string",
          "timestamp": "date"
        }
      ]
    }
    ```
  - **404 Not Found: "Channel not found"**
  - **500 Internal Server Error**

For further details, you can refer to the source code:

- [Channel Routes](https://github.com/mhizterpaul/chat-app/blob/main/server/src/routes/channel.ts)
- [Channel Controllers](https://github.com/mhizterpaul/chat-app/blob/main/server/src/controllers/channels.ts)

### Message Routes

#### 1. Get Messages

- **Endpoint:** `POST /get-messages`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body:**
  ```json
  {
    "id": "string"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "messages": [
        {
          "sender": "userId",
          "recipient": "userId",
          "content": "string",
          "timestamp": "date"
        }
      ]
    }
    ```
  - **400 Bad Request: "Both user ID's are required."**
  - **500 Internal Server Error**

#### 2. Upload File

- **Endpoint:** `POST /upload-file`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Form Data:**
  ```json
  {
    "single": "<file>"
  }
  ```
- **Response:**
  - **200 OK**
    ```json
    {
      "filePath": "string (URL)"
    }
    ```
  - **400 Bad Request: "file is required"**
  - **500 Internal Server Error**

For further details, you can refer to the source code:

- [Message Routes](https://github.com/mhizterpaul/chat-app/blob/main/server/src/routes/message.ts)
- [Message Controllers](https://github.com/mhizterpaul/chat-app/blob/main/server/src/controllers/messages.ts)
