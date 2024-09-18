# Weather Service

A simple Node.js weather service that provides current weather conditions and alerts for given coordinates.

## Features

- Fetch current weather data (condition and temperature) for specified latitude and longitude
- Retrieve weather alerts for the location, if any
- RESTful API endpoint for easy integration

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Make a GET request to `/api/weather` with `lat` and `lon` query parameters:
   ```
   http://localhost:3000/api/weather?lat=35.6895&lon=139.6917
   ```

## API Response

The API returns a JSON object with the following structure:

```json
{
  "weatherCondition": "clear",
  "temperatureStatus": "moderate",
  "alerts": []
}
```

- `weatherCondition`: Current weather condition (e.g., "clear", "clouds", "rain")
- `temperatureStatus`: Temperature category ("cold", "moderate", or "hot")
- `alerts`: Array of weather alerts for the location (if any)

## Development

- Run tests:
  ```
  npm test
  ```
- Build the project:
  ```
  npm run build
  ```

## Technologies Used

- Node.js
- Express.js
- TypeScript
- Axios
- Jest (for testing)
- OpenWeather API
