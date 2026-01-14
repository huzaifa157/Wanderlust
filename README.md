# 🌍 Wanderlust - Travel Listing Platform

A full-stack MERN web application for browsing, creating, updating, and managing travel listings. Users can explore destinations, view detailed information, and manage accommodations with a seamless user experience.

## ✨ Features

- **📋 Browse Listings** - View all available travel destinations and accommodations with images
- **➕ Create Listings** - Add new listings with title, description, image URL, price, location, and country
- **✏️ Edit Listings** - Update existing listing information with validation
- **🗑️ Delete Listings** - Remove listings from the database
- **👁️ View Details** - See detailed information for individual listings
- **✅ Form Validation** - Server-side validation using Joi to ensure data integrity
- **🚨 Error Handling** - Comprehensive error management with custom error pages
- **📱 Responsive Design** - Mobile-friendly interface with custom styling

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js v5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose v8.19.1** - MongoDB object modeling

### Frontend
- **EJS v3.1.10** - Templating engine
- **EJS-Mate v4.0.0** - Layout/partial support for EJS
- **CSS3** - Custom styling
- **Vanilla JavaScript** - Client-side interactions

### Utilities & Middleware
- **Joi v18.0.1** - Schema validation
- **Method-Override v3.0.0** - HTTP verb support (PUT, DELETE)
- **Custom Error Handlers** - ExpressError and wrapAsync utilities

## 📁 Project Structure

```
wanderlust/
├── app.js                     # Main application entry point with routes
├── schema.js                  # Joi validation schemas for listings
├── package.json               # Project dependencies and scripts
├── init/                      # Database initialization scripts
│   ├── index.js              # Database seeding script
│   └── data.js               # Sample listing data
├── models/                    # Mongoose models
│   ├── listing.js            # Listing schema (title, description, image, price, etc.)
│   └── review.js             # Review schema (comment, rating, date)
├── utils/                     # Utility functions
│   ├── ExpressError.js       # Custom error class
│   └── wrapAsync.js          # Async error handler wrapper
├── public/                    # Static assets
│   ├── css/
│   │   └── style.css         # Custom styles
│   └── js/
│       └── script.js         # Client-side JavaScript
└── views/                     # EJS templates
    ├── includes/              # Reusable components
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs   # Main layout template
    └── listing/               # Listing-specific views
        ├── index.ejs         # All listings page
        ├── show.ejs          # Single listing detail
        ├── new.ejs           # Create listing form
        ├── edit.ejs          # Edit listing form
        └── error.ejs         # Custom error page
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running locally)
- npm or yarn package manager

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

3. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

4. **Initialize the database with sample data**
   ```bash
   node init/index.js
   ```

5. **Start the application**
   ```bash
   node app.js
   ```

6. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## 📡 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Root route (server status) |
| GET | `/listings` | Display all listings |
| GET | `/listings/new` | Show form to create new listing |
| POST | `/listings` | Create new listing (with validation) |
| GET | `/listings/:id` | Show individual listing details |
| GET | `/listings/:id/edit` | Show form to edit listing |
| PUT | `/listings/:id` | Update listing (with validation) |
| DELETE | `/listings/:id/delete` | Delete listing |

## 🗄️ Database Schema

### Listing Model
```javascript
{
  title: String (required),
  description: String,
  image: {
    filename: String (default: "listingimage"),
    url: String (default: placeholder image)
  },
  price: Number,
  location: String,
  country: String
}
```

### Review Model
```javascript
{
  comment: String,
  rating: Number (min: 1, max: 5),
  createdAt: Date (default: current date)
}
```

## ⚙️ Configuration

### Database Connection
The application connects to MongoDB at:
```javascript
mongodb://127.0.0.1:27017/wanderlust
```

To change the database URL, modify the connection string in [app.js](app.js):
```javascript
await mongoose.connect('your-mongodb-connection-string');
```

### Port Configuration
The server runs on port `8080` by default. To change it, modify the port in [app.js](app.js):
```javascript
app.listen(8080, () => {
    console.log("server is running")
})
```

## 🧪 Validation

The application uses **Joi** for server-side validation:
- **Title**: Required, must be a string
- **Description**: Required, must be a string
- **Location**: Required, must be a string
- **Country**: Required, must be a string
- **Price**: Required, must be a number ≥ 0
- **Image**: Optional, allows empty strings or null

## 🛡️ Error Handling

### Custom Error Handling
- **ExpressError Class**: Custom error class with status code and message
- **wrapAsync Utility**: Wraps async route handlers to catch errors
- **404 Handler**: Catches all undefined routes
- **Global Error Handler**: Renders custom error page with status and message

### Error Response
All errors are displayed on a dedicated error page with:
- HTTP status code
- Descriptive error message
- User-friendly interface

## 📝 Scripts

Available npm scripts:
```json
{
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

To run the application:
```bash
node app.js
```

## 🔧 Development

### Adding New Features
1. Define routes in [app.js](app.js)
2. Create corresponding views in `views/listing/`
3. Add validation in [schema.js](schema.js) if needed
4. Test the feature locally

### Database Seeding
To reset and repopulate the database:
```bash
node init/index.js
```

## 📦 Dependencies

```json
{
  "ejs": "^3.1.10",
  "ejs-mate": "^4.0.0",
  "express": "^5.1.0",
  "joi": "^18.0.1",
  "method-override": "^3.0.0",
  "mongoose": "^8.19.1"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Major Project - MERN Stack Application

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB for the powerful NoSQL database
- EJS for the flexible templating engine

---

**Note**: This is a learning project built as part of the MERN stack curriculum. Feel free to use it as a reference or starting point for your own projects!
