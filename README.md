# 🌍 Wanderlust - Travel Listing Platform

> A full-stack MERN web application for discovering, managing, and reviewing travel destinations worldwide. Built with modern web technologies and best practices.

[![Node.js Version](https://img.shields.io/badge/node-20.12.2-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Design Patterns - MVC Architecture](#-design-patterns---mvc-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Cloud Integration](#-cloud-integration)
- [Middleware](#-middleware)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Wanderlust** is a modern travel listing platform that allows users to discover accommodations, share their travel experiences, and review destinations. The application provides a seamless experience for both hosts (listing owners) and travelers with secure authentication, interactive maps, and cloud-based image storage.

### Key Highlights
- 🔐 Secure user authentication with Passport.js
- 🗺️ Interactive maps powered by Mapbox
- ☁️ Cloud image storage via Cloudinary
- ⭐ Rating and review system
- 🎨 Responsive and modern UI
- 🛡️ Robust validation and error handling

---

## ✨ Features

### User Management
- **User Registration & Login** - Secure authentication using Passport.js with local strategy
- **Session Management** - Persistent sessions with MongoDB store
- **Authorization** - Route protection and ownership-based access control
- **Flash Messages** - Real-time feedback for user actions

### Listing Management
- **📋 Browse Listings** - Explore all available travel destinations with images and details
- **➕ Create Listings** - Add new listings with comprehensive information
  - Title, description, price, location, and country
  - Image upload with Cloudinary integration
  - Geocoding with Mapbox for location coordinates
- **✏️ Edit Listings** - Update existing listings (owner-only access)
- **🗑️ Delete Listings** - Remove listings with cascade deletion of reviews
- **👁️ View Details** - Detailed listing pages with interactive maps

### Review System
- **⭐ Add Reviews** - Authenticated users can leave ratings (1-5) and comments
- **🗑️ Delete Reviews** - Authors can delete their own reviews
- **📊 Rating Display** - Visual rating indicators on listings

### Additional Features
- **✅ Server-Side Validation** - Joi schemas ensure data integrity
- **🚨 Comprehensive Error Handling** - Custom error pages and middleware
- **📱 Responsive Design** - Mobile-first approach with custom CSS
- **🗺️ Interactive Maps** - Mapbox integration for location visualization
- **☁️ Cloud Storage** - Cloudinary for efficient image management
- **🔒 Security** - Environment variables, secure sessions, and input sanitization

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20.12.2 | Runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB Atlas** | - | Cloud-hosted NoSQL database |
| **Mongoose** | 8.19.1 | MongoDB object modeling and schema validation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **EJS** | 3.1.10 | Server-side templating engine |
| **EJS-Mate** | 4.0.0 | Layout and partial support for EJS |
| **CSS3** | - | Custom styling and responsive design |
| **JavaScript** | ES6+ | Client-side interactions |

### Authentication & Security
| Technology | Version | Purpose |
|------------|---------|---------|
| **Passport.js** | 0.7.0 | Authentication middleware |
| **Passport-Local-Mongoose** | 9.0.1 | Local authentication strategy with hashing |
| **Express-Session** | 1.18.2 | Session management |
| **Connect-Mongo** | 6.0.0 | MongoDB session store |
| **Connect-Flash** | 0.1.1 | Flash messages for user feedback |

### Validation & File Handling
| Technology | Version | Purpose |
|------------|---------|---------|
| **Joi** | 18.0.1 | Schema description and data validation |
| **Multer** | 2.0.2 | Multipart/form-data file uploads |
| **Multer-Storage-Cloudinary** | 4.0.0 | Cloudinary storage engine for Multer |

### Cloud Services & APIs
| Service | Purpose |
|---------|---------|
| **Cloudinary** | Cloud-based image storage and optimization |
| **Mapbox SDK** | Geocoding and interactive maps |
| **MongoDB Atlas** | Cloud database hosting |

### Utilities
- **Method-Override** (3.0.0) - HTTP verb support (PUT, DELETE)
- **Dotenv** (17.2.3) - Environment variable management
- **Custom Middleware** - Error handling, async wrappers, authentication checks

---

## 🏗️ Project Architecture

```
wanderlust/
│
├── app.js                      # Application entry point & server configuration
├── CloudConfig.js              # Cloudinary configuration for image uploads
├── middleware.js               # Custom middleware (auth, validation)
├── schema.js                   # Joi validation schemas
├── package.json                # Project dependencies and scripts
│
├── Controllers/                # Business logic layer
│   ├── listing.js             # Listing CRUD operations
│   ├── review.js              # Review operations
│   └── user.js                # User authentication operations
│
├── models/                     # Mongoose data models
│   ├── listing.js             # Listing schema with geometry
│   ├── review.js              # Review schema with author reference
│   └── user.js                # User schema with Passport integration
│
├── Routes/                     # Express route definitions
│   ├── listings.js            # Listing routes (CRUD)
│   ├── review.js              # Review routes
│   └── user.js                # Authentication routes
│
├── views/                      # EJS templates
│   ├── includes/              # Reusable components
│   │   ├── navbar.ejs        # Navigation bar
│   │   ├── footor.ejs        # Footer
│   │   └── flash.ejs         # Flash message display
│   ├── layouts/
│   │   └── boilerplate.ejs   # Main layout template
│   ├── listing/
│   │   ├── index.ejs         # All listings page
│   │   ├── show.ejs          # Individual listing details
│   │   ├── new.ejs           # Create new listing form
│   │   ├── edit.ejs          # Edit listing form
│   │   └── error.ejs         # Error page
│   └── users/
│       ├── signup.ejs        # User registration form
│       └── login.ejs         # User login form
│
├── public/                     # Static assets
│   ├── css/
│   │   ├── style.css         # Main stylesheet
│   │   ├── form.css          # Form styling
│   │   ├── rating.css        # Star rating styles
│   │   └── footor.css        # Footer styles
│   └── js/
│       └── script.js         # Client-side JavaScript
│
├── utils/                      # Utility functions
│   ├── ExpressError.js       # Custom error class
│   └── wrapAsync.js          # Async error handler wrapper
│
└── init/                       # Database initialization
    ├── index.js               # Database seeding script
    └── data.js                # Sample listing data
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v20.12.2 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign up](https://cloudinary.com/)
- **Mapbox Account** - [Sign up](https://www.mapbox.com/)
- **npm** or **yarn** package manager

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Major Project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (See [Configuration](#-configuration) section)

4. **Initialize the database with sample data** (Optional)
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   node app.js
   ```
   
   The server will start on `http://localhost:8080`

6. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:8080/listings
   ```

---

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Atlas
ATLAS_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Configuration
MAP_TOKEN=your_mapbox_access_token

# Session Secret
SECRET=your_session_secret_key_here

# Environment
NODE_ENV=development
```

### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `ATLAS_URL` | MongoDB Atlas connection string | ✅ Yes |
| `CLOUD_NAME` | Cloudinary cloud name from dashboard | ✅ Yes |
| `CLOUD_API_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUD_API_SECRET` | Cloudinary API secret | ✅ Yes |
| `MAP_TOKEN` | Mapbox public access token | ✅ Yes |
| `SECRET` | Secret key for session encryption (min 32 characters) | ✅ Yes |
| `NODE_ENV` | Environment mode (`development` or `production`) | ⚠️ Recommended |

### Getting API Keys

**MongoDB Atlas:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and replace `<username>` and `<password>`

**Cloudinary:**
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

**Mapbox:**
1. Create an account at [Mapbox](https://www.mapbox.com/)
2. Go to Account → Tokens
3. Copy the default public token or create a new one

---

## 🎮 Usage

### For Travelers (Users)

1. **Browse Listings**
   - Visit the homepage to see all available listings
   - Click on any listing to view detailed information

2. **Create Account**
   - Click "Sign Up" in the navbar
   - Provide email and username
   - Create a secure password

3. **Add Reviews**
   - Navigate to any listing detail page
   - Leave a rating (1-5 stars) and comment
   - Submit your review

4. **Manage Reviews**
   - Delete your own reviews from listing pages

### For Hosts (Listing Owners)

1. **Create a Listing**
   - Log in to your account
   - Click "Create New Listing"
   - Fill in all required fields:
     - Title and description
     - Upload image
     - Set price per night
     - Enter location and country
   - Submit the form

2. **Edit Your Listings**
   - Go to your listing's detail page
   - Click "Edit" button (only visible to owner)
   - Update information and save

3. **Delete Listings**
   - Navigate to your listing
   - Click "Delete" button (only visible to owner)
   - Confirm deletion (all associated reviews will be removed)

---

## 📡 API Routes

### User Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/signup` | Display signup form | Public |
| POST | `/signup` | Register new user | Public |
| GET | `/login` | Display login form | Public |
| POST | `/login` | Authenticate user | Public |
| GET | `/logout` | Logout current user | Authenticated |

### Listing Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/listings` | Display all listings | Public |
| GET | `/listings/new` | Show create listing form | Authenticated |
| POST | `/listings` | Create new listing | Authenticated |
| GET | `/listings/:id` | Show listing details with map | Public |
| GET | `/listings/:id/edit` | Show edit form | Owner only |
| PUT | `/listings/:id` | Update listing | Owner only |
| DELETE | `/listings/:id` | Delete listing | Owner only |

### Review Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/listings/:id/reviews` | Add review to listing | Authenticated |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review | Author only |

---

## 🗄️ Database Schema

### Listing Model

```javascript
{
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: ObjectId,
    ref: "Review"
  }],
  owner: {
    type: ObjectId,
    ref: "User"
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}
```

**Middleware:**
- Post-deletion hook to cascade delete all associated reviews

### Review Model

```javascript
{
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: ObjectId,
    ref: "User"
  }
}
```

### User Model

```javascript
{
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  }
  // Additional fields added by passport-local-mongoose:
  // - hash (password hash)
  // - salt (for password hashing)
}
```

**Plugins:**
- `passport-local-mongoose` - Adds authentication methods and password hashing

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **User Registration**
   - User submits email and password
   - `passport-local-mongoose` automatically hashes password
   - User saved to MongoDB with salt and hash

2. **User Login**
   - User submits credentials
   - Passport verifies against stored hash
   - Session created and stored in MongoDB
   - User object available via `req.user`

3. **Session Management**
   - Sessions stored in MongoDB using `connect-mongo`
   - Sessions persist for 14 days
   - httpOnly cookies for security

### Authorization Middleware

```javascript
// Check if user is logged in
isLoggedIn(req, res, next)

// Check if user is listing owner
isOwner(req, res, next)

// Check if user is review author
isReviewAuthor(req, res, next)
```

### Security Features

- ✅ Password hashing with pbkdf2 algorithm
- ✅ Secure session cookies (httpOnly)
- ✅ Session storage in MongoDB
- ✅ CSRF protection via method-override
- ✅ Input sanitization and validation
- ✅ Environment variable protection

---

## ☁️ Cloud Integration

### Cloudinary - Image Storage

**Configuration:**
```javascript
// CloudConfig.js
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
```

**Features:**
- Automatic image upload and optimization
- Storage in `wanderlust_DEV` folder
- Supported formats: PNG, JPG, JPEG
- Integration with Multer for file handling

### Mapbox - Geocoding & Maps

**Features:**
- Forward geocoding (location → coordinates)
- Interactive maps on listing detail pages
- Custom markers for listing locations
- Geolocation data stored in GeoJSON format

**Usage:**
```javascript
// Geocoding in listing controller
const geoData = await geocodingClient
  .forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
  .send();
```

---

## 🚨 Error Handling

### Custom Error Class

```javascript
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
```

### Async Wrapper

Catches async errors and passes to error handler:

```javascript
const wrapAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
```

### Validation

**Server-Side Validation with Joi:**

```javascript
const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null)
  }).required()
});
```

### Error Pages

- **404 Error** - Page not found
- **500 Error** - Server errors
- **Custom Error Pages** - User-friendly error messages with status codes

---

## 🏗️ Design Patterns - MVC Architecture

**Wanderlust** implements the **Model-View-Controller (MVC)** architectural pattern, a industry-standard design pattern that separates concerns and promotes clean, maintainable, and scalable code. This demonstrates professional software engineering practices essential for enterprise applications.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Browser)                      │
│              - Renders HTML from Server                  │
│              - Submits Forms & Requests                  │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP Request/Response
┌────────────────────────▼────────────────────────────────┐
│                  ROUTES (Dispatcher)                     │
│       - Maps HTTP methods to Controller actions          │
│       - Applies middleware (auth, validation)            │
│       - Located in: Routes/*.js                          │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    ┌────────┐      ┌──────────┐      ┌────────┐
    │MODELS  │      │VIEWS     │      │CONTROLLERS│
    │(M)     │      │(V)       │      │(C)     │
    └────────┘      └──────────┘      └────────┘
        │                │                │
        │                │                │
```

### Components Breakdown

#### **Models (M) - Data Layer**
**Purpose:** Database abstraction and business logic

**Responsibilities:**
- Define MongoDB schemas using Mongoose
- Implement data validation rules
- Create database relationships and references
- Execute CRUD operations (Create, Read, Update, Delete)
- Cascade operations (e.g., delete listing → delete reviews)

**Located in:** `models/` directory
- `listing.js` - Listing schema with GeoJSON geometry for map integration
- `review.js` - Review schema with author references
- `user.js` - User schema with Passport.js integration

**Key Patterns:**
- **Schema Relationships:** One-to-Many (User → Listings, Listings → Reviews)
- **Middleware Hooks:** Post-deletion cascade delete reviews
- **Authentication Integration:** Passport-local-mongoose for secure authentication

#### **Views (V) - Presentation Layer**
**Purpose:** Server-side template rendering and UI presentation

**Responsibilities:**
- Render dynamic HTML using EJS templating engine
- Display data from controllers
- Handle form submission interfaces
- Manage user-facing error messages
- Maintain consistent layout and styling

**Located in:** `views/` directory
```
views/
├── layouts/
│   └── boilerplate.ejs        # Base template for all pages
├── includes/
│   ├── navbar.ejs             # Navigation component
│   ├── flash.ejs              # Alert/notification component
│   └── footor.ejs             # Footer component
├── listing/
│   ├── index.ejs              # Browse all listings
│   ├── show.ejs               # View single listing with map
│   ├── new.ejs                # Create listing form
│   ├── edit.ejs               # Edit listing form
│   └── error.ejs              # Error display
└── users/
    ├── signup.ejs             # Registration form
    └── login.ejs              # Login form
```

**Key Patterns:**
- **Template Inheritance:** boilerplate.ejs extends to all pages
- **Component Reusability:** Shared includes for navbar, footer
- **Server-Side Rendering:** Dynamic content generation before sending to client

#### **Controllers (C) - Business Logic Layer**
**Purpose:** Request processing and application logic

**Responsibilities:**
- Receive and validate HTTP requests
- Interact with Models to fetch/modify data
- Execute business logic and operations
- Select appropriate Views for response
- Handle errors and validation failures
- Manage application workflows

**Located in:** `Controllers/` directory
- `listing.js` - CRUD operations for listings with Cloudinary image upload
- `review.js` - Review management and validation
- `user.js` - User authentication and registration

**Key Patterns:**
- **Separation of Concerns:** Business logic isolated from routes
- **Error Handling:** Async/await with error propagation
- **Data Processing:** Request validation before model interaction
- **Response Management:** Appropriate status codes and redirects

#### **Routes (Dispatcher) - Request Routing**
**Purpose:** Map HTTP requests to appropriate controllers

**Responsibilities:**
- Define API endpoints with HTTP methods
- Apply middleware for authentication/authorization
- Validate request data with Joi schemas
- Route to correct controller actions
- Return appropriate responses

**Located in:** `Routes/` directory
- `listings.js` - CRUD routes for listings
- `review.js` - Routes for review management
- `user.js` - Authentication routes

**Key Patterns:**
```javascript
// Example: Secure route with middleware
router.delete(
  '/:id',
  isLoggedIn,           // Middleware: Check authentication
  isOwner,              // Middleware: Check authorization
  wrapAsync(controller) // Controller: Handle request
);
```

### Data Flow Example: Create Listing

```
1. USER                    → Fills form in browser (View)
                             ↓
2. ROUTE (listings.js)     → Receives POST request
                             → Validates with Joi schema
                             → Checks isLoggedIn middleware
                             ↓
3. CONTROLLER (listing.js) → Extract form data
                             → Upload image to Cloudinary
                             → Geocode location with Mapbox
                             → Create new Listing (Model)
                             ↓
4. MODEL (listing.js)      → Validate with Mongoose schema
                             → Save to MongoDB
                             → Return created document
                             ↓
5. CONTROLLER (cont'd)     → Redirect to listing detail page
                             ↓
6. VIEW (show.ejs)         → Render listing with all details
                             ↓
7. USER                    → Sees new listing in browser
```

### Benefits of MVC Architecture

| Benefit | Impact on Development |
|---------|----------------------|
| **Separation of Concerns** | Each layer has single responsibility; easier to understand and maintain |
| **Code Reusability** | Models used by multiple controllers; Views reused across pages |
| **Scalability** | Easy to add new features without affecting existing code |
| **Testability** | Controllers and Models can be tested independently |
| **Team Collaboration** | Multiple developers can work on M, V, C simultaneously |
| **Maintainability** | Changes isolated to relevant layers only |
| **Code Organization** | Clear structure makes codebase intuitive |
| **Professional Standards** | Industry-standard pattern used in enterprise applications |

### 

This MVC implementation demonstrates:
- ✅ Understanding of **software design patterns**
- ✅ Ability to **structure large applications**
- ✅ Knowledge of **separation of concerns** principle
- ✅ Experience with **layered architecture**
- ✅ Proficiency in **clean code practices**
- ✅ Readiness for **team-based development**
- ✅ Adherence to **inImpactdustry best practices**
- ✅ Scalable and **enterprise-ready** code organization

---

## 🔧 Middleware

### Custom Middleware

**Defined in `middleware.js`:**

```javascript
// Authentication check
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};

// Listing ownership validation
module.exports.isOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing.owner.re

- `express.urlencoded()` - Parse form data
- `express.static()` - Serve static files
- `method-override()` - Support PUT and DELETE
- `express-session()` - Session management
- `passport.initialize()` - Initialize Passport
- `passport.session()` - Persistent login sessions

---

## 🧪 Testing

### Manual Testing Chequals(req.user._id)) {
    req.flash("error", "You don't have permission!");
    return res.redirect(`/listings/${req.params.id}`);
  }
  next();
};
```

### Built-in Middlewaecklist

**User Authentication:**
- [ ] Register new user
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Session persistence

**Listing Operations:**
- [ ] View all listings
- [ ] View single listing with map
- [ ] Create new listing (authenticated)
- [ ] Edit own listing
- [ ] Delete own listing
- [ ] Prevent editing others' listings

**Review Operations:**
- [ ] Add review to listing (authenticated)
- [ ] View reviews on listing page
- [ ] Delete own review
- [ ] Prevent deleting others' reviews

**Validation:**
- [ ] Form validation on client side
- [ ] Server-side validation with Joi
- [ ] Error messages display correctly

---

## 🚀 Deployment

### Prerequisites for Deployment

- MongoDB Atlas account (cloud database)
- Cloudinary account (image hosting)
- Mapbox account (maps)
- Hosting platform (Render, Heroku, Railway, etc.)

### Deployment Steps

1. **Set up MongoDB Atlas**
   - Create a cluster
   - Whitelist all IP addresses (0.0.0.0/0) for accessibility
   - Get connection string

2. **Configure Environment Variables**
   - Set all environment variables on hosting platform
   - Ensure `NODE_ENV=production`

3. **Update package.json**
   ```json
   {
     "scripts": {
       "start": "node app.js"
     }
   }
   ```

4. **Deploy to Hosting Platform**
   - Push code to GitHub repository
   - Connect repository to hosting platform
   - Set environment variables
   - Deploy application

### Recommended Platforms

- **Render** - Free tier with automatic deployment
- **Railway** - Easy setup with MongoDB support
- **Heroku** - Classic platform (paid plans)
- **Vercel** - Great for frontend (requires serverless adaptation)

---

## 📚 Learning Resources

### Technologies Used

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Passport.js Documentation](http://www.passportjs.org/docs/)
- [EJS Documentation](https://ejs.co/#docs)
- [Joi Validation](https://joi.dev/api/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation if needed

---

## 🐛 Known Issues & Future Enhancements

### Known Issues
- None currently reported

### Planned Features

- [ ] User profile pages with listing history
- [ ] Advanced search and filtering
- [ ] Booking system with calendar
- [ ] Payment integration
- [ ] Email notifications
- [ ] Real-time chat between users
- [ ] Favorites/Wishlist functionality
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Admin dashboard

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Created as a major project demonstrating full-stack MERN development skills.

---

## 🙏 Acknowledgments

- [Delta Batch](https://www.apnacollege.in/) - For project inspiration and guidance
- [MongoDB Atlas](https://www.mongodb.com/) - Cloud database hosting
- [Cloudinary](https://cloudinary.com/) - Image storage and optimization
- [Mapbox](https://www.mapbox.com/) - Interactive maps and geocoding
- [Stack Overflow Community](https://stackoverflow.com/) - Problem solving assistance

---

## 📞 Support

For support, questions, or feedback:

- Create an issue in the repository
- Contact via email (if provided)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ using MERN Stack

</div>

