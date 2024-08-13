

# Airbnb Clone - MERN Stack Capstone Project

This project is a clone of the Airbnb website, created using the MERN stack. It includes essential features such as property listings, user profiles, a search with filters, a booking system, a secure payment gateway, reviews and ratings, and host and calendar management for availability.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Property Listings**: Users can browse through a list of available properties.
- **User Profiles**: Users can create and manage their profiles.
- **Search with Filters**: Users can search for properties using various filters like location, price range, and amenities.
- **Booking System**: Users can book properties for specific dates.
- **Secure Payment Gateway**: Integration with a payment gateway for secure transactions.
- **Reviews and Ratings**: Users can leave reviews and ratings for properties.
- **Host Management**: Hosts can manage their properties, including availability and pricing.
- **Calendar Management**: Hosts can manage the availability of their properties using a calendar.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Material UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Storage**: AWS S3 for image storage
- **Deployment**: Netlify (Frontend), Render (Backend)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Hemapriya182024/Airbnb-Backend.git
   cd Airbnb-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```plaintext
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Hemapriya182024/Airbnb-Frontend.git
   cd Airbnb-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

## Usage

- Visit the frontend on `http://localhost:3000`
- The backend server runs on `http://localhost:5000`

## Screenshots

## Screenshots

### Home Page
![Home Page](/Screenshots/homepage.png)

### Property Listing
![Property Listing](https://github.com/Hemapriya182024/Airbnb-Frontend/raw/main/Screenshots/property-listing.png)

### Booking Page
![Booking Page](https://github.com/Hemapriya182024/Airbnb-Frontend/raw/main/Screenshots/booking-page.png)

### User Profile
![User Profile](https://github.com/Hemapriya182024/Airbnb-Frontend/raw/main/Screenshots/user-profile.png)

### Host Dashboard
![Host Dashboard](https://github.com/Hemapriya182024/Airbnb-Frontend/raw/main/Screenshots/host-dashboard.png)

### Search with Filters
![Search with Filters](https://github.com/Hemapriya182024/Airbnb-Frontend/raw/main/Screenshots/search-filters.png)

### Calendar Management
![Calendar Management](https://github.com/Hemapriya182024/Airbnb-Frontend/raw/main/Screenshots/calendar-management.png)

## Live Backend

You can check out the live backend of this project at [Airbnb Backend on Render](https://airbnb-backend-tm1o.onrender.com/).


## Project Structure

### Frontend

```
src/
│
├── components/       # Reusable components
├── pages/            # Different pages of the application
├── redux/            # Redux setup for state management
├── App.js            # Main application component
└── index.js          # Entry point
```

### Backend

```
src/
│
├── controllers/      # Functions to handle requests
├── models/           # MongoDB models
├── routes/           # API routes
├── middlewares/      # Custom middlewares
└── server.js         # Server setup
```

## API Documentation

(Add API endpoints and their descriptions here.)

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

- **GitHub**: [Hemapriya182024](https://github.com/Hemapriya182024)
- **LinkedIn**: [Hemapriya K](https://www.linkedin.com/in/hemapriya-k-4536a730b/)

