const http = require('http');
const postgres = require('postgres');
const url = require('url');

// Load database URL from environment
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("Warning: DATABASE_URL environment variable is not defined.");
}

// Initialize postgres client lazily
let sql;
try {
  if (databaseUrl) {
    sql = postgres(databaseUrl, { ssl: 'require' });
  }
} catch (err) {
  console.error("Failed to initialize PostgreSQL client:", err);
}

const PORT = process.env.HOARDER_PORT || 3001;

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // Health check endpoint
  if (parsedUrl.pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', process: 'info-hoarder' }));
    return;
  }

  // Candidate intake submission endpoint
  if (parsedUrl.pathname === '/api/intake' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const { fullName, email, phone, githubUrl, linkedinUrl, experienceYears, challenges, skills, preferredRoles } = data;

        if (!fullName || !email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'fullName and email are required fields.' }));
          return;
        }

        if (!sql) {
          // If DB is offline, log locally to stdout/file so we don't lose data
          console.log("[DATA HOARDED LOCAL BACKUP]:", data);
          res.writeHead(202, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            message: 'Intake accepted. Database not connected, stored locally in system logs.',
            backup: true 
          }));
          return;
        }

        // Insert candidate record into DB
        const result = await sql`
          INSERT INTO candidate_profiles (
            full_name, email, phone, github_url, linkedin_url, experience_years, challenges, skills, preferred_roles
          ) VALUES (
            ${fullName}, ${email}, ${phone || null}, ${githubUrl || null}, ${linkedinUrl || null}, ${experienceYears || null}, ${challenges || null}, ${skills || null}, ${preferredRoles || null}
          ) RETURNING id
        `;

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          message: 'Candidate information hoarded successfully.', 
          id: result[0].id 
        }));

      } catch (err) {
        console.error("Error processing candidate intake:", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error occurred.' }));
      }
    });
    return;
  }

  // Default Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found.' }));
});

server.listen(PORT, () => {
  console.log(`[Info Hoarder Process] running on port ${PORT}`);
});
