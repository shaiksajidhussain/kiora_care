// Configuration file for frontend backend URLs
// ============================================
// CHANGE THIS KEYWORD TO SWITCH ENVIRONMENTS:
//   "production" or "prod" → Uses production backend
//   "development" or "dev" → Uses localhost backend
// ============================================

const ENVIRONMENT = 'production'; // Change to 'production' for deployment
const config = {
  // Backend URL configuration
  backend: {
    local: 'http://localhost:3001',
    production: 'https://kiora-care-backend.vercel.app'
  }
};

// Get current backend URL based on environment keyword
export const getBackendUrl = () => {
  // Check for explicit backend URL override from environment variable (takes priority)
  const envUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.NEXT_PUBLIC_BACKEND_URL;
  if (envUrl) {
    return envUrl;
  }
  
  // Use the keyword set at the top of this file
  const envKeyword = (ENVIRONMENT || '').toLowerCase().trim();
  
  if (envKeyword === 'prod' || envKeyword === 'production') {
    return config.backend.production;
  }
  
  // Default to local for development or any other value
  return config.backend.local;
};

// Export the backend URL as a constant
export const BACKEND_URL = getBackendUrl();

// Export config for reference
export default {
  config,
  getBackendUrl,
  BACKEND_URL
};
