# Google Maps API Setup (Optional)

The schedule form includes a "Map location" text field. To enable an embedded map or address autocomplete restricted to Hyderabad/Secunderabad:

1. **Create a project and get an API key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a project or select an existing one
   - Create credentials → API key
   - Restrict the key (recommended): set application restrictions and limit to Maps JavaScript API and Places API

2. **Enable APIs**
   - Enable **Maps JavaScript API**
   - Enable **Places API** (for address autocomplete)

3. **Add the key to the frontend**
   - In the project root `.env` file, add:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
   - Restart the dev server after changing `.env`

4. **Use in the app**
   - The key is available as `import.meta.env.VITE_GOOGLE_MAPS_API_KEY`
   - You can add a map component or Places Autocomplete restricted to Hyderabad/Secunderabad and show an error if the user selects a location outside that area.

Until the key is set, the form keeps a simple text input for "Google Maps link or location name".
