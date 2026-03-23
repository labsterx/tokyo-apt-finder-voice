# Tokyo Apartment Finder — Voice-Controlled Dashboard

A voice-powered Tokyo apartment search dashboard built for the **DeepLearning.AI Builder Night Tokyo** hackathon. Instead of clicking filters, users speak naturally to find apartments — the map zooms and listings update in real-time.

## Demo Flow

1. Open the dashboard showing 20 apartment listings across 5 Tokyo wards
2. Click **"Talk to Copilot"** — the voice agent connects
3. Say: *"Show me apartments in Shibuya under 150,000 yen"* — the map zooms to Shibuya, listings filter down
4. Say: *"Do any allow pets?"* — filters further to pet-friendly apartments
5. Say: *"Show me everything again"* — resets all filters

## How It Works

```
User speaks → VocalBridge Agent (cloud) → triggers client action
  → LiveKit data channel → React app handles action → UI updates instantly
```

The voice agent uses [Vocal Bridge](https://vocalbridgeai.com) **Client Actions** to send structured commands (`filter_apartments`, `zoom_to_ward`, `reset_filters`) over LiveKit's data channel. The React app listens for these events and updates filters, map position, and listings in real-time.

## Tech Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS 4
- **Map:** Leaflet + OpenStreetMap (no API key needed)
- **Voice:** Vocal Bridge (LiveKit SDK)
- **Backend:** Express (token proxy)

## Getting Started

### Prerequisites

- Node.js 20+
- A [Vocal Bridge](https://vocalbridgeai.com) account with a deployed agent

### Setup

```bash
# Install dependencies
npm install

# Copy env file and add your Vocal Bridge API key
cp .env.example .env
# Edit .env and set VOICE_BRIDGE_API_KEY=vb_your_key_here

# Start the token server (runs on :3001)
node server/index.js

# Start the dev server (runs on :5173)
npm run dev
```

Open http://localhost:5173 and click **"Talk to Copilot"** to start.

### Vocal Bridge Agent Configuration

Create an agent on the [Vocal Bridge dashboard](https://vocalbridgeai.com) with these settings:

**Agent Settings:**
- **Deploy To:** Web
- **Agent Style:** Chatty (Low Latency)
- **Background System:** Off
- **Web Search:** Off

**Greeting Message:**
```
Welcome to Tokyo Apartment Finder! Tell me what kind of apartment you're looking for — I can filter by ward, price, and features like pet-friendly or furnished.
```

**System Prompt:**
```
You are a Tokyo apartment finding assistant on an interactive dashboard.

Available wards: Shibuya, Shinjuku, Minato, Meguro, Setagaya.
Prices range from 80,000 to 250,000 yen per month.
Features: Pets Allowed, Corner Room, South Facing, Near Station, Furnished, Auto-Lock, Balcony, Washer/Dryer.

CRITICAL: When you trigger client actions, you MUST include the payload with the actual data. Never send an empty payload.

Examples of CORRECT client action usage:

User says "Show me Shibuya apartments under 150,000 yen":
- Trigger filter_apartments with payload: {"ward": "Shibuya", "max_price": 150000}
- Then reply verbally

User says "Do any allow pets?":
- Trigger filter_apartments with payload: {"features": ["Pets Allowed"]}
- Then reply verbally

User says "Show me everything" or "Reset":
- Trigger reset_filters with payload: {}
- Then reply verbally

User mentions a specific ward like "What about Meguro?":
- Trigger filter_apartments with payload: {"ward": "Meguro"}
- Then reply verbally

RULES:
- ALWAYS include the data in the payload. For example ward name, price limit, or feature names.
- Filters are additive. Only send NEW criteria each time.
- Keep verbal replies to 2-3 sentences.
- Respond in English by default, Japanese if the user speaks Japanese.
```

**Client Actions** (all `agent_to_app`, configured under Built-in Integrations):

| Action | Payload | Description |
|--------|---------|-------------|
| `filter_apartments` | `{ward?, max_price?, features?[]}` | Filter listings |
| `zoom_to_ward` | `{ward}` | Zoom map to a ward |
| `highlight_apartment` | `{apartment_id}` | Highlight a listing |
| `reset_filters` | `{}` | Clear all filters |

**Available wards:** Shibuya, Shinjuku, Minato, Meguro, Setagaya

**Available features:** Pets Allowed, Corner Room, South Facing, Near Station, Furnished, Auto-Lock, Balcony, Washer/Dryer

After saving, click **Deploy Agent**, then go to Developer Mode to create an API key.

## Project Structure

```
├── server/index.js              # Express token proxy
├── src/
│   ├── App.tsx                  # Main layout
│   ├── types.ts                 # Shared types
│   ├── data/apartments.ts       # 20 mock apartments
│   ├── hooks/
│   │   ├── useVoiceAgent.ts     # LiveKit + client action handling
│   │   └── useApartmentFilters.ts # Filter state machine
│   ├── components/
│   │   ├── ApartmentCard.tsx    # Listing card
│   │   ├── ApartmentGrid.tsx    # Card grid
│   │   ├── TokyoMap.tsx         # Leaflet map with animated zoom
│   │   ├── VoiceCopilot.tsx     # Mic button + transcript panel
│   │   └── FilterBar.tsx        # Active filter pills
│   └── utils/
│       └── wardCoordinates.ts   # Ward lat/lng coordinates
└── .env.example                 # Required env vars
```

## License

MIT
