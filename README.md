<p align="center">
  <img alt="Dominoes Points Tracker Logo" src="https://github.com/user-attachments/assets/86dfce3e-9a77-4039-8a3a-65231a09f379" width="150"/>
</p>

<h1 align="center">Domino Points Tracker</h1>

<p align="center">
  <a href="https://domino-points-tracker.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-Try_Now-blue?style=for-the-badge&logo=vercel" alt="Live Demo Badge">
  </a>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Project Status Badge">
</p>

## 🎯 About This Project

The **Domino Points Tracker** is a user-friendly web application meticulously designed to simplify scorekeeping for your domino games. Tired of fumbling with pen and paper or error-prone mental math? This intuitive tool allows you to effortlessly add players, track their scores round by round, and automatically determine the winner based on a set point limit. It enhances the gaming experience with a celebratory confetti animation for the victor and intelligently saves your game history for future reference.

## ✨ Features

* **Player Management**: Easily add new players and remove existing ones from the current game.
* **Dynamic Score Tracking**: Input scores for each round with a clean interface, automatically updating totals.
* **Customizable Game Limit**: Set a winning point threshold (e.g., 100 or 200 points) to automatically declare the game's victor.
* **Win/Loss Records**: The application keeps a persistent tally of player wins and losses across multiple games.
* **Flexible Game Resets**: Options to clear scores for the current game and start a new round, or completely reset the entire game session, including players.
* **Save & Load Games**: Save the current game state to history and conveniently load previous saved games at any time.
* **Automated Game History**: A comprehensive list of all your saved games is maintained, with older entries automatically cleaned up after a month to keep your history relevant.
* **Confetti Celebration**: A delightful visual flourish that triggers a confetti animation for the winning player.
* **Clear Winner & Loser Display**: Prominently highlights the winning player and, in 2-player games, also indicates the losing player.
* **Persistent Data Storage**: All your data—players, current game progress, and saved game history—is securely stored locally in your browser, ensuring your progress is retained between sessions.

## 🚀 Technologies Used

This project is built with a robust and modern stack of web technologies, ensuring a smooth, efficient, and maintainable application:

* **React**: A powerful JavaScript library for building dynamic, component-based, and highly responsive user interfaces.
* **TypeScript**: Enhances code quality, readability, and maintainability by adding static typing to JavaScript, catching errors early in development.
* **Tailwind CSS**: A utility-first CSS framework that enables rapid UI development by composing designs directly in your markup, leading to highly optimized and consistent styling.
* **Local Storage API**: Utilized for persistent client-side data storage, ensuring that game data and settings are saved between browser sessions.
* **Vite**: A next-generation frontend tooling that provides an extremely fast development server and an optimized build process.

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your system.

* [Node.js](https://nodejs.org/) (which includes npm)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git)
    ```
    *(Replace `YOUR_USERNAME/YOUR_REPOSITORY` with your actual repository path, e.g., `git clone https://github.com/your-github-username/domino-points-tracker.git`)*
2.  **Navigate into the project directory:**
    ```bash
    cd domino-points-tracker
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
# yarn dev
