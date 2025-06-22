# MarylandMeals

MarylandMeals is a dedicated mobile application designed to provide personalized meal planning and calorie tracking specifically for University of Maryland (UMD) students. This application helps users manage their dietary intake and achieve their health and wellness goals.

## Features

  * **Personalized Meal Planning:** Offers tailored meal suggestions based on user preferences and dietary needs.
  * **Calorie Tracking:** Allows users to log and monitor their daily calorie consumption.
  * **UMD Nutrition Integration:** Scrapes UMD's nutrition website to provide accurate and relevant food information.
  * **Data-Driven System:** Utilizes a robust backend to store and manage nutrition data.
  * **Secure Authentication:** Ensures efficient data flow between the mobile client and backend services with session-based authentication.

## Tech Stack

The application is built using a comprehensive set of technologies for both frontend and backend development, as well as data management:

  * **Frontend:** React Native/Expo (TypeScript)
  * **Backend:** Node.js
  * **Web Scraping:** BeautifulSoup
  * **Databases:**
      * PostgreSQL (for structured data)
      * MongoDB (for storing information)

## Getting Started

To get a local copy of this project up and running, follow these steps.

### Prerequisites

  * Node.js (LTS version recommended)
  * npm or yarn
  * Expo CLI
  * PostgreSQL installed and configured
  * MongoDB installed and running

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/MarylandMealsTeam/MarylandMealsApp.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd MarylandMealsApp
    ```
3.  Install backend dependencies:
    ```bash
    # Assuming backend is in a 'backend' or similar folder
    cd backend # Adjust path as necessary
    npm install # or yarn install
    ```
4.  Install frontend dependencies:
    ```bash
    # Assuming frontend is in a 'frontend' or 'app' folder
    cd ../frontend # Adjust path as necessary
    npm install # or yarn install
    ```
5.  Set up your database connections (PostgreSQL and MongoDB) and configure environment variables (e.g., database URLs, API keys) as needed in a `.env` file for both frontend and backend if applicable.

### Running the Application

1.  Start the backend server:
    ```bash
    cd backend # Adjust path as necessary
    npm start # or equivalent command
    ```
2.  Start the frontend application using Expo:
    ```bash
    cd ../frontend # Adjust path as necessary
    npx expo start
    ```
    This will open a new tab in your browser with Expo Dev Tools, from which you can run the app on an emulator/simulator or your physical device.

## Contact

For any inquiries or collaborations, please reach out.

Project Link: [https://github.com/MarylandMealsTeam/MarylandMealsApp](https://www.google.com/search?q=https://github.com/MarylandMealsTeam/MarylandMealsApp)
