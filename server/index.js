import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const VOCAL_BRIDGE_API_KEY = process.env.VOICE_BRIDGE_API_KEY;
const VOCAL_BRIDGE_URL = 'https://vocalbridgeai.com';

app.get('/api/voice-token', async (req, res) => {
  if (!VOCAL_BRIDGE_API_KEY) {
    return res.status(500).json({ error: 'VOICE_BRIDGE_API_KEY not set in .env' });
  }

  try {
    const response = await fetch(`${VOCAL_BRIDGE_URL}/api/v1/token`, {
      method: 'POST',
      headers: {
        'X-API-Key': VOCAL_BRIDGE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        participant_name: 'Apartment Seeker',
        session_id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('VocalBridge error:', response.status, text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    console.log('Token generated for room:', data.room_name);
    res.json(data);
  } catch (err) {
    console.error('Token error:', err);
    res.status(500).json({ error: 'Failed to get voice token' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Token server running on http://localhost:${PORT}`);
});
