# Wanderlust - Travel Listing Platform

A full-stack web application for browsing, creating, and reviewing travel listings. Built with Node.js, Express, and MongoDB.

## Features

- **Browse Listings** - View all available travel destinations and accommodations
- **Create Listings** - Add new listings with details and images
- **Edit Listings** - Update existing listing information
- **Reviews** - Leave and read reviews for listings
- **Error Handling** - Comprehensive error management and user feedback
- **Responsive Design** - Mobile-friendly interface

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating, CSS, Vanilla JavaScript
- **Styling**: Custom CSS

## Project Structure

```
wanderlust/
├── app.js                 # Main application entry point
├── schema.js              # Joi validation schemas
├── package.json           # Project dependencies
├── init/                  # Database initialization
│   ├── index.js
│   └── data.js
├── models/                # Database models
│   ├── listing.js
│   └── review.js
├── utils/                 # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── public/                # Static assets
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── views/                 # EJS templates
    ├── includes/
    ├── layouts/
    └── listing/
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up MongoDB connection in `app.js`
4. Initialize the database with seed data:
   ```bash
   node init/index.js
   ```

## Getting Started

Run the application:
```bash
npm start
```

The application will start on the configured port (check `app.js` for details).

## Key Components

- **Models** - Mongoose schemas for listings and reviews
- **Routes & Controllers** - API endpoints and business logic in `app.js`
- **Views** - EJS templates for UI rendering
- **Utilities** - Error handling and async wrapper functions

## License

MIT
