// Configuration file for frontend backend URLs
// Automatically switches between local and production based on environment
// In Vite: development mode uses local, production build uses production URL

const isProduction = import.meta.env.PROD || import.meta.env.MODE === 'production';

const config = {
  // Backend URL configuration
  backend: {
    local: 'http://localhost:3001',
    production: 'https://kiora-care-backend.vercel.app'
  }
};

// Get current backend URL based on environment
// Priority: 1. Environment variable, 2. Config based on mode, 3. Local fallback
export const getBackendUrl = () => {
  // Check for explicit environment variable override
  const envUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BACKEND_URL;
  if (envUrl) {
    return envUrl;
  }
  
  // Use config based on production/development mode
  return isProduction ? config.backend.production : config.backend.local;
};

// Export the backend URL as a constant
export const BACKEND_URL = getBackendUrl();

// Export config for reference
export default {
  config,
  getBackendUrl,
  BACKEND_URL,
  isProduction
};
