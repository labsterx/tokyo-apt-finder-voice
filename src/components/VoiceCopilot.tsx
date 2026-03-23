import { useEffect, useRef } from 'react';
import type { TranscriptEntry } from '../types';

interface VoiceState {
  isConnected: boolean;
  isConnecting: boolean;
  isMicEnabled: boolean;
  error: string | null;
  transcript: TranscriptEntry[];
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  toggleMic: () => Promise<void>;
}

interface Props {
  voice: VoiceState;
}

export function VoiceCopilot({ voice }: Props) {
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [voice.transcript.length]);

  // Not connected: show connect button
  if (!voice.isConnected) {
    return (
      <div className="fixed bottom-6 right-6" style={{ zIndex: 9999 }}>
        {voice.error && (
          <div className="mb-2 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg shadow">
            {voice.error}
          </div>
        )}
        <button
          onClick={voice.connect}
          disabled={voice.isConnecting}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-4 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <div className="relative">
            {voice.isConnecting && <div className="listening-pulse" />}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <span className="font-semibold">
            {voice.isConnecting ? 'Connecting...' : 'Talk to Copilot'}
          </span>
        </button>
      </div>
    );
  }

  // Connected: show expanded panel
  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden" style={{ zIndex: 9999 }}>
      {/* Header */}
      <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            {voice.isMicEnabled && <div className="listening-pulse" />}
            <div className="w-3 h-3 bg-green-400 rounded-full relative z-10" />
          </div>
          <span className="text-white text-sm font-medium">
            {voice.isMicEnabled ? 'Listening...' : 'Muted'}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={voice.toggleMic}
            className={`p-1.5 rounded-lg transition-colors ${
              voice.isMicEnabled ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-red-500 hover:bg-red-400'
            }`}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {voice.isMicEnabled ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              )}
            </svg>
          </button>
          <button
            onClick={voice.disconnect}
            className="p-1.5 bg-red-500 hover:bg-red-400 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Transcript */}
      <div className="h-48 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {voice.transcript.length === 0 && (
          <p className="text-xs text-gray-400 text-center mt-8">
            Start speaking to find your perfect apartment...
          </p>
        )}
        {voice.transcript.map((entry, i) => (
          <div
            key={i}
            className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] text-xs px-3 py-2 rounded-xl ${
                entry.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-white text-gray-700 border border-gray-200 rounded-bl-sm'
              }`}
            >
              {entry.text}
            </div>
          </div>
        ))}
        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
}
