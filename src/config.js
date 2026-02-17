// const ENVIRONMENT = 'development'; // Use 'development' for local, 'production' for local testing with prod backend
const ENVIRONMENT = 'production'; // Use 'development' for local, 'production' for local testing with prod backend

const config = {
  ENVIRONMENT: ENVIRONMENT,
  // Backend URL configuration
  backend: {
    local: 'http://localhost:3001',
    production: 'https://kiora-care-backend.vercel.app'
  }
};

// Get backend URL based on ENVIRONMENT
export const getBackendUrl = () => {
  const envKeyword = (config.ENVIRONMENT || '').toLowerCase().trim();
  if (envKeyword === 'prod' || envKeyword === 'production') {
    return config.backend.production;
  }
  return config.backend.local;
};

export { config, ENVIRONMENT };
export default config;
