export async function onRequest(context) {
    const token = context.env.CLOUDFLARE_API_TOKEN;  // Haalt de API-token op uit Cloudflare Environment Variables
    const url = "https://api.cloudflare.com/client/v4/zones";  // Cloudflare API URL
  
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: "API request failed" }), {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  