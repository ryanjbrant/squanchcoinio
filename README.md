# Squanch Coin

An interdimensional cryptocurrency portal powered by quantum computing and Rick and Morty-style innovation.

## Features

- Interactive quantum portal with dynamic TV static effect
- Terminal-style interface with realistic hacking simulation
- AI-powered artifact generation using OpenAI's GPT-4 and DALL-E 3
- Responsive design for all devices
- Immersive user experience with dynamic loading sequences

## OpenAI Integration

The project uses OpenAI's DALL-E 3 API for generating unique interdimensional artifacts. Here's how it works:

### API Configuration

```bash
REACT_APP_OPENAI_API_KEY=sk-proj-mot0r...  # Your OpenAI project key
```

### Generation Process

1. **Initialization**
   - The system loads the OpenAI project key from environment variables
   - Validates key presence before making API calls
   - Configures proper headers with Bearer authentication

2. **API Call Structure**
   ```typescript
   const response = await fetch('https://api.openai.com/v1/images/generations', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${apiKey}`
     },
     body: JSON.stringify({
       model: "dall-e-3",
       prompt: "Rick and Morty style illustration...",
       n: 1,
       size: "1024x1024",
       quality: "standard"
     })
   });
   ```

3. **Error Handling**
   - Validates API responses with detailed error logging
   - Implements fallback to static GIF if generation fails
   - Maintains quantum stability during API communication

4. **Image Processing**
   - Receives generated image URL from OpenAI
   - Handles image loading with error boundaries
   - Implements fallback mechanisms for failed loads

### Important Notes

- Use project key format (sk-proj-...) for API authentication
- Don't modify the key format or structure
- Ensure proper environment variable loading
- Restart development server after key changes

## Artifact Generation Flow

1. **Initialization Phase**
   - User triggers generation with 'Y' key
   - System validates API configuration
   - Establishes quantum connection

2. **Generation Phase**
   - Sends prompt to DALL-E 3
   - Processes API response
   - Stabilizes quantum data

3. **Display Phase**
   - Loads generated image
   - Displays artifact details
   - Shows safety protocols

4. **Error Recovery**
   - Automatic fallback to static GIF
   - Maintains terminal stability
   - Preserves user session

## Terminal Integration

The terminal interface is tightly integrated with the OpenAI generation process:

1. **Pre-Generation**
   - Displays loading sequences
   - Shows quantum stabilization
   - Prepares API connection

2. **During Generation**
   - Real-time progress updates
   - Package installation simulation
   - Error monitoring

3. **Post-Generation**
   - Image materialization
   - Safety protocol display
   - Session management

## Troubleshooting

### API Issues
- Verify project key format (sk-proj-...)
- Check environment variable loading
- Confirm server restart after changes
- Monitor console for detailed error logs

### Generation Issues
- Check quantum stabilization status
- Verify API response format
- Monitor image loading process
- Check fallback mechanism

### Common Error Codes
- 401: Authentication issue
- 429: Rate limit exceeded
- 500: Server-side error
- 400: Invalid request format

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (project key format)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ryanjbrant/squanchcoinio.git
cd squanchcoinio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
REACT_APP_OPENAI_API_KEY=your_project_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Technology Stack

- React
- TypeScript
- Styled Components
- OpenAI API (GPT-4 & DALL-E 3)
- WebGL Shaders

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgments

- Rick and Morty for inspiration
- OpenAI for AI capabilities
- The quantum realm for its mysteries 