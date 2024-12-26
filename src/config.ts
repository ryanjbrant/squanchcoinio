export const config = {
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
};

// Verify environment variables are loaded
console.log('Environment variables loaded:', {
  openaiApiKey: config.openaiApiKey ? 'Present' : 'Missing',
}); 