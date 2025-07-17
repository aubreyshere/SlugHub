
# SlugHub

SlugHub is a full-stack web application built using React, Node.js, and Firebase. It provides a platform for community-based interaction, allowing users to engage through events, posts, or other customizable features.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Hosting**: Firebase Hosting (optional)

## Project Structure

```
SlugHub/
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   └── node_modules/
├── server/               # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── config/               # Firebase config and keys
├── .env                  # Environment variables (ignored)
├── .gitignore
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/slughub.git
cd slughub
```

### 2. Install dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create `.env` files in both the `client/` and `server/` directories.

**Example `.env` for `client/`**:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

**Example `.env` for `server/`**:
```
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_service_account_private_key
```

The `.env` files are included in `.gitignore` and should not be committed.

## Development

To start the frontend:

```bash
cd client
npm run dev
```

To start the backend:

```bash
cd server
npm start
```

## Features

- Firebase Authentication with email/password
- Firestore for storing and retrieving data
- Express server for API routing
- React frontend with dynamic UI
- Environment-based configuration

## Deployment

To deploy the frontend using Firebase Hosting:

```bash
cd client
npm run build
firebase deploy
```

Ensure Firebase CLI is installed and initialized with your project.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Push to your branch
5. Open a pull request

## License

MIT License
