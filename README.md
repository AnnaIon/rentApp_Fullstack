🏡 RentApp – Fullstack Apartment Rental Platform

RentApp is a full-stack web application designed to streamline property rental processes. It offers functionalities for property listings, user authentication, profile management, and real-time communication between users.​



📌 Features


🔐 User Authentication – Secure JWT-based login with cookie storage.

🏘️ Add & Manage Properties – Users can add, update, and delete their own flats.

🌟 Favorites System – Mark and manage your favorite listings.

📬 Chat Inbox – Send and receive messages in real-time with other users.

👤 User Profiles – Update personal data and view registered information.

🎯 Filter & Sort – Powerful filtering and sorting tools for browsing listings.



🛠️ Tech Stack


Frontend:

⚛️ React – Component-based UI library

🎨 Tailwind CSS – Utility-first CSS framework for styling

🔁 React Router – Client-side routing

🧠 React Context API – State management

🖼️ React Icons – Icon library for React

Backend:

🟩 Node.js – JavaScript runtime for server-side logic

Database:

 🍃 MongoDB – Cloud NoSQL DB (MongoDB Atlas)



📁 Project Structure

rentApp_Fullstack/
├── backend/                     # Backend application
│   ├── controllers/             # Route logic and controller functions
│   ├── models/                  # Mongoose schemas/models
│   ├── routes/                  # Express route handlers
│   ├── data/                    # DB connection logic (e.g., connectDB)
│   ├── config.env               # Environment variables (Mongo URI, etc.)
│   ├── app.js                   # Main Express app
│   └── package.json             # Backend dependencies and scripts
├── frontend/                    # Frontend root
│   └── rentapp/                 # React app folder
│       ├── assets/             # Images, logos, etc.
│       ├── authentication/     # Login, register, auth logic
│       ├── components/         # Reusable components (Header, Flat, etc.)
│       ├── context/            # Context API logic
│       ├── pages/              # Page views (Homepage, Profile, etc.)
│       ├── routes/             # React Router setup
│       ├── services/           # API calls (to backend)
│       ├── toastify/           # Toast notifications config
│       ├── App.jsx             # App root component
│       └── main.jsx            # Entry point of the app
├── .gitignore
├── README.md                   # Full project documentation


🚀 Getting Started

1. Clone the repository
git clone https://github.com/AnnaIon/rentApp_Fullstack.git

2. Navigate to the project directory
cd rentApp_Fullstack

3. Install dependencies
npm install

4. Start the development server
npm run dev


🧪 Core Functionalities
🏡 Homepage (Browse)
Explore all listings with filters for:

Area size

Price range

City

Alphabetical order

🧾 Add Flat
Logged-in users can fill in details:

📍 City, Street Name & No.

📏 Area

🆒 Has AC?

💰 Rent Price

📆 Available from

❤️ Favourites Page
View only the listings you've favorited.

Toggle the heart icon 💖 to manage them.

📨 Chat Inbox
Real-time chat with flat owners and interested users.

🗨️ Reply directly inside the listing card.

🧾 Conversations are saved per user and property.

👤 My Profile
View and update:

-Name

-Email

-Birthdate

🗑️ Delete account permanently if needed.

👥 Admin Access (Optional)
-View all registered users if logged in as an admin.

-Accessible via /all-users.


📸 UI Highlights
📱 Responsive Design – Works great on mobile & desktop.

🧡 Custom styling using MUI and your own :root theme variables.

🔄 Flip Cards – Each listing is shown with a flipping effect for more details.

