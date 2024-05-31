
# TrampFit

TrampFit is a gym session booking platform designed to simplify the process of scheduling workout sessions for fitness enthusiasts. The platform offers a subscription-based model that allows users to book sessions at any associated gyms, providing greater flexibility and convenience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Registration and Authentication**: Secure user registration and login system.
- **Dashboard**: Personalized user dashboard to manage bookings and profile.
- **Session Booking System**: Browse and book available gym sessions.
- **Payment Integration**: Secure payment gateway for processing session payments.
- **Admin Panel**: Manage sessions, user accounts, and bookings.
- **Responsive Design**: Consistent user experience across various devices.

## Tech Stack

- **Frontend**: Next.js, Material UI, ShadCN
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (managed via Supabase)
- **Payment Processing**: Stripe

## Installation

Clone the repository and install the dependencies for both frontend and backend:

```bash
git clone https://github.com/your-username/TrampFit.git
cd TrampFit

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for backend
cd ../backend
npm install
```

## Running the Application

To run the application locally, follow these steps:

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Start the development server:
    ```bash
    npm run dev
    ```

### Backend

1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Start the backend server:
    ```bash
    npm start
    ```

## Project Structure

```plaintext
TrampFit/
├── backend/          # Backend source code
│   ├── controllers/  # Controllers for handling requests
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── helper/       # helper functions
│   ├── middleware/   # Middleware
│   ├── app.js        # Express app setup
│   └── ...
├── frontend/         # Frontend source code
│   ├── components/   # React components
│   ├── pages/        # Next.js pages
│   ├── public/       # static data
│   ├── styles/       # Stylesheets
│   └── ...
├── .gitignore
├── README.md
└── package.json
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file according to your project's specifics.
