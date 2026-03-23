import { useState, useCallback, useEffect, useRef } from 'react';
import { Room, RoomEvent, Track } from 'livekit-client';
import type { TranscriptEntry } from '../types';

interface UseVoiceAgentOptions {
  onAction: (action: string, payload: Record<string, any>) => void;
}

export function useVoiceAgent({ onAction }: UseVoiceAgentOptions) {
  const roomRef = useRef<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onActionRef = useRef(onAction);
  onActionRef.current = onAction;

  useEffect(() => {
    const room = new Room();
    roomRef.current = room;

    const handleTrackSubscribed = (track: any) => {
      if (track.kind === Track.Kind.Audio) {
        const el = track.attach();
        el.id = 'agent-audio';
        document.body.appendChild(el);
      }
    };

    const handleDataReceived = (
      payload: Uint8Array,
      _participant: any,
      _kind: any,
      topic?: string
    ) => {
      if (topic !== 'client_actions') return;
      try {
        const data = JSON.parse(new TextDecoder().decode(payload));
        if (data.type !== 'client_action') return;

        if (data.action === 'send_transcript') {
          setTranscript(prev => [...prev, {
            role: data.payload.role,
            text: data.payload.text,
            timestamp: data.payload.timestamp,
          }]);
        } else if (data.action === 'heartbeat') {
          // Ignore heartbeat events
        } else {
          console.log('[VoiceAgent] Action received:', data.action, JSON.stringify(data.payload, null, 2));
          onActionRef.current(data.action, data.payload);
        }
      } catch (e) {
        console.warn('[VoiceAgent] Failed to parse data channel message', e);
      }
    };

    const handleDisconnected = () => {
      setIsConnected(false);
      setIsMicEnabled(false);
    };

    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    room.on(RoomEvent.DataReceived, handleDataReceived);
    room.on(RoomEvent.Disconnected, handleDisconnected);

    return () => {
      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.off(RoomEvent.DataReceived, handleDataReceived);
      room.off(RoomEvent.Disconnected, handleDisconnected);
      room.disconnect();
      document.getElementById('agent-audio')?.remove();
    };
  }, []);

  const connect = useCallback(async () => {
    if (!roomRef.current) return;
    setIsConnecting(true);
    setError(null);
    try {
      const res = await fetch('/api/voice-token');
      if (!res.ok) throw new Error('Token request failed');
      const { livekit_url, token } = await res.json();
      await roomRef.current.connect(livekit_url, token);
      await roomRef.current.localParticipant.setMicrophoneEnabled(true);
      setIsConnected(true);
      setIsMicEnabled(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await roomRef.current?.disconnect();
    setTranscript([]);
  }, []);

  const toggleMic = useCallback(async () => {
    if (!roomRef.current) return;
    const next = !isMicEnabled;
    await roomRef.current.localParticipant.setMicrophoneEnabled(next);
    setIsMicEnabled(next);
  }, [isMicEnabled]);

  return {
    isConnected, isConnecting, isMicEnabled, error,
    transcript,
    connect, disconnect, toggleMic,
  };
}
