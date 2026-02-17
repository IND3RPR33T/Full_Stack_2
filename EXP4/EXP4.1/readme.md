<img width="1902" height="932" alt="image" src="https://github.com/user-attachments/assets/180cc2b7-b36a-4b8b-aa7f-edd02c6dd193" />
<img width="1895" height="923" alt="image" src="https://github.com/user-attachments/assets/c125c6b2-3b36-4dfa-9484-79d5aac95b6f" />


# Context Lab

A React application demonstrating the power of the React Context API for global state management. This project serves as a practical lab for understanding how to avoid prop drilling by using Context to manage shared state like themes and user profiles.

## Features

- **Global State Management**: Utilizes `GlobalContext` to share state across the component tree without prop drilling.
- **Theme Toggling**: Switch between Light and Dark modes dynamically. The theme state is persisted and applied globally.
- **User Profile**: Manages and displays user profile information using the global context.

## Tech Stack

- **React**: UI library.
- **Vite**: Build tool and development server.
- **Context API**: Native React state management.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1.  Navigate to the project directory:
    ```bash
    cd EXP4/EXP4.1
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
├── context/
│   └── GlobalContext.jsx  # Context definition and provider
├── components/            # (If applicable)
├── App.jsx                # Main component consuming context
├── main.jsx               # Entry point, wraps App with GlobalProvider
├── Theme.jsx              # Component to toggle themes
├── Profile.jsx            # Component to display user info
└── App.css                # Application styles
```

## Learn More

To learn more about the React Context API, check out the [official documentation](https://react.dev/learn/passing-data-deeply-with-context).
