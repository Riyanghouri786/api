export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Forward the request to the external API
        const apiResponse = await fetch('https://easytopromo.com/api/v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body), // Forward the request body
        });
  
        // Check if the external API responded successfully
        if (!apiResponse.ok) {
          throw new Error(`External API error! Status: ${apiResponse.status}`);
        }
  
        // Parse the response from the external API
        const data = await apiResponse.json();
  
        // Send the response back to the client
        res.status(200).json(data);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
      }
    } else {
      // Handle non-POST requests
      res.status(405).json({ error: 'Method not allowed' });
    }
  }