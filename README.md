# ReX ChatBot Application

This application provides career advice through a chatbot named ReX. Follow these steps to set up and run the application.

## Setup Instructions

1. **Install Node.js**: If you don't already have Node.js installed, download and install it from the [official website](https://nodejs.org/).

2. **Set Up the React Project**:
    - Clone this repository.
    - Navigate to the project directory.
    - Run `npm install` to install all necessary dependencies.

3. **Install Essential Dependencies**: Ensure `package.json` includes essential dependencies like Axios, React Router, and Material UI.

4. **Replace `<API_KEY>`**: Replace your API key at line 19 in `index.jsx` under the `chat` folder of `pages`.

5. **Start the JSON Server**:
    - In your project directory, start the JSON server on port 3500 by running:
      ```bash
      npx json-server --watch data/db.json --port 3500
      ```

6. **Run the App**:
    - Open another terminal window.
    - Navigate to the project directory if you aren't already there.
    - Run the app using:
      ```bash
      npm start
      ```
