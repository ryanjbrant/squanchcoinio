export const config = {
  openaiApiKey: process.env.REACT_APP_OPENAI_API_KEY,
};

// Verify environment variables are loaded
const envStatus = {
  nodeEnv: process.env.NODE_ENV,
  hasOpenAiKey: !!process.env.REACT_APP_OPENAI_API_KEY,
  openAiKeyValue: process.env.REACT_APP_OPENAI_API_KEY,
};

console.log('Environment Status:', envStatus);

if (!config.openaiApiKey) {
  console.error('OpenAI API key is missing from environment variables');
  console.error('Please check that:');
  console.error('1. Your .env file exists in the project root');
  console.error('2. It contains REACT_APP_OPENAI_API_KEY=your_actual_key_here');
  console.error('3. You have restarted your development server');
}