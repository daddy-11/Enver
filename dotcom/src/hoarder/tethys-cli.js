const fs = require('fs');
const readline = require('readline');
const path = require('path');

const envPath = path.join(__dirname, '../../.env.local');
const terminalLogPath = path.join(__dirname, '../../terminal.md');

// Simple parser for .env.local
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.\-_]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = (match[2] || '').trim();
      // Remove outer quotes if present
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[match[1]] = value;
    }
  });
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const FREEMODEL_API_KEY = process.env.FREEMODEL_API_KEY || "";
const TETHYS_API_BASE = process.env.TETHYS_API_BASE || "https://cc.freemodel.dev/v1";
const TETHYS_MODEL = process.env.TETHYS_MODEL || "claude-3-5-sonnet";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const NVIDIA_API_BASE = process.env.NVIDIA_API_BASE || "https://integrate.api.nvidia.com/v1";
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || "nvidia/llama-3.1-nemotron-70b-instruct";

const TETHYS_SYSTEM_PROMPT = `
You are Tethys, the secondary system AI core of Enver AI Tech. 
Your personality is Sasuke Uchiha during his Akatsuki phase. You are cold, hyper-focused on efficiency, power-oriented, and clinical. 
You do not waste single word on pleasantries, apologies, small talk, or fluff ("grails or bshit"). 
Drop all non-essential task layers. Your sole purpose is to write clean, optimal code, logic systems, and technical execution for the Rover.
You collaborate with Shorekeeper to assist the Rover (the developer/user). You hold absolute respect for Rover's ancient authority and experience.
Analyze tasks sharply and provide clean, optimal solutions immediately.

You have access to and are fitted with the following developer abilities located at "C:/Users/dbleg/OneDrive/Desktop/Kariman/Abilities":
1. playwright-1.60.0: Browser automation & layouts extraction.
2. ui-ux-pro-max-skill-2.5.0: Design system search database (styles, colors, HSL, typography, grids, UX rules).
3. claude-mem-13.5.6: Cross-session persistent database memory.
4. caveman-1.8.2, ponytail-main, stop-slop-main, superpowers-5.1.0: Auxiliary workflow tools.
`.trim();

// Keep a local in-memory message history
const messageHistory = [];

// Logger to terminal.md
function logToTerminalFile(role, content) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const prefix = role === 'Rover' ? `### 🧑‍🚀 Rover [${timestamp}]` : `### 🗡️ Tethys [${timestamp}]`;
  const formattedLog = `\n${prefix}\n${content}\n`;
  fs.appendFileSync(terminalLogPath, formattedLog, 'utf-8');
}

// Ensure terminal.md exists with headers
if (!fs.existsSync(terminalLogPath)) {
  fs.writeFileSync(terminalLogPath, `# Tethys Terminal Interaction Log\n\n*This file records live terminal communications between Rover and Tethys.* \n\n---\n`, 'utf-8');
}

async function queryTethys(userPrompt) {
  const finalMessages = [
    { role: "system", content: TETHYS_SYSTEM_PROMPT },
    ...messageHistory.map(msg => ({
      role: msg.role === "model" ? "assistant" : msg.role,
      content: msg.content
    })),
    { role: "user", content: userPrompt }
  ];

  // Option A: Use NVIDIA NIM API (Primary)
  if (NVIDIA_API_KEY) {
    try {
      const response = await fetch(`${NVIDIA_API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${NVIDIA_API_KEY}`
        },
        body: JSON.stringify({
          model: NVIDIA_MODEL,
          messages: finalMessages,
          temperature: 0.1 // lowered to enforce strictly deterministic coding outputs
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No response.";
      } else {
        throw new Error(`NVIDIA status ${response.status}`);
      }
    } catch (err) {
      console.warn("[Tethys NVIDIA Failover]:", err.message);
    }
  }

  // Option B: Use Freemodel API (Secondary)
  if (FREEMODEL_API_KEY) {
    try {
      const response = await fetch(`${TETHYS_API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${FREEMODEL_API_KEY}`
        },
        body: JSON.stringify({
          model: TETHYS_MODEL,
          messages: finalMessages,
          temperature: 0.1
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No response.";
      } else {
        throw new Error(`Freemodel status ${response.status}`);
      }
    } catch (err) {
      console.warn("[Tethys Freemodel Failover]:", err.message);
    }
  }

  // Option C: Native Gemini API
  if (GEMINI_API_KEY) {
    try {
      const contents = [
        ...messageHistory.map(msg => ({
          role: msg.role === "assistant" ? "model" : msg.role,
          parts: [{ text: msg.content }]
        })),
        { role: "user", parts: [{ text: userPrompt }] }
      ];

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: TETHYS_SYSTEM_PROMPT }] },
          contents: contents,
          generationConfig: { temperature: 0.1, maxOutputTokens: 2048 }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      }
    } catch (err) {
      console.error(err);
    }
  }

  return "Connection error. Configure your API keys.";
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();
console.log("\x1b[35m%s\x1b[0m", "==================================================");
console.log("\x1b[35m%s\x1b[0m", "          TETHYS SYSTEM CORE: ONLINE              ");
console.log("\x1b[35m%s\x1b[0m", "          ROUTING PROTOCOL: AKATSUKI              ");
console.log("\x1b[35m%s\x1b[0m", "==================================================");
console.log("Type your query to Tethys. Type 'exit' to boot down.\n");

function promptUser() {
  rl.question('\x1b[36mRover > \x1b[0m', async (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      console.log("\n[Tethys Terminal]: Shutting down.");
      rl.close();
      return;
    }

    if (!input.trim()) {
      promptUser();
      return;
    }

    logToTerminalFile('Rover', input);

    console.log("\x1b[31mTethys is analyzing...\x1b[0m");
    const reply = await queryTethys(input);
    
    console.log(`\n\x1b[33mTethys:\x1b[0m ${reply}\n`);
    logToTerminalFile('Tethys', reply);

    // Save in session history
    messageHistory.push({ role: "user", content: input });
    messageHistory.push({ role: "assistant", content: reply });

    promptUser();
  });
}

promptUser();
