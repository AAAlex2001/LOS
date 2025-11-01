import React, { useEffect, useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import config from '@/config';

const { width } = Dimensions.get('window');

const API_BASE = config.API_BASE;

interface Track {
  id: number;
  title: string;
  artist: string;
  audio_url: string;
  order: number;
  is_active: boolean;
}

interface MusicPageData {
  tracks: Track[];
}

export default function MusicScreen({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [pageData, setPageData] = useState<MusicPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPositionMs, setDragPositionMs] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastXRef = useRef(0);
  const sliderRef = useRef<View>(null);
  const sliderPageXRef = useRef(0);
  const wasPlayingRef = useRef(false);

  const toAudioUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${API_BASE}/media/${url}`;
  };

  useEffect(() => {
    if (!visible) return;
    
    const load = async () => {
      try {
        // Set audio mode for playback
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        const res = await fetch(`${API_BASE}/api/music/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load music');
        const json = await res.json() as MusicPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [visible]);

  // Cleanup sound on unmount or when modal closes
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (!visible && sound) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      sound.unloadAsync();
      setSound(null);
      setPlayingTrackId(null);
      setIsDragging(false);
      setPosition(0);
      setDuration(0);
    }
  }, [visible, sound]);

  // Update position while playing (pause updates during dragging)
  useEffect(() => {
    if (playingTrackId && sound && !isDragging) {
      intervalRef.current = setInterval(async () => {
        try {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
          }
        } catch (error) {
          console.error('Error getting status:', error);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playingTrackId, sound, isDragging]);

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playTrack = async (track: Track) => {
    if (isLoadingTrack) return;

    try {
      // Toggle pause/resume on the same track
      if (sound && playingTrackId === track.id) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await sound.pauseAsync();
            setIsPaused(true);
          } else {
            await sound.playAsync();
            setIsPaused(false);
          }
        }
        return;
      }

      // Switching to a different track: stop previous
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setIsLoadingTrack(true);
      const audioUrl = toAudioUrl(track.audio_url);

      // Load and play new track
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setPlayingTrackId(track.id);
      setIsPaused(false);
      
      // Get initial duration
      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis || 0);
      }
    } catch (error) {
      console.error('Error playing track:', error);
    } finally {
      setIsLoadingTrack(false);
    }
  };

  const tracks = (pageData?.tracks || []).slice().sort((a, b) => a.order - b.order);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>МУЗЫКА</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1129BD" />
              <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
          ) : tracks.length === 0 ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Музыка пока не добавлена</Text>
            </View>
          ) : (
            tracks.map((track) => {
              const isPlaying = playingTrackId === track.id;
              return (
                <View key={track.id} style={[styles.trackCard, isPlaying && styles.trackCardExpanded]}>
                  {isPlaying ? (
                    <>
                      <View style={styles.soundTimeline}>
                        <View style={styles.timeRow}>
                          <Text style={styles.timeText}>{formatTime(isDragging ? dragPositionMs : position)}</Text>
                          <Text style={styles.timeText}>{formatTime(duration)}</Text>
                        </View>
                        {
                          // precompute slider pixel position to avoid percent rounding glitches
                        }
                        <View
                          ref={sliderRef}
                          style={styles.sliderContainer}
                          onStartShouldSetResponder={() => true}
                          onMoveShouldSetResponder={() => true}
                          onResponderGrant={(e) => {
                            if (sliderWidth <= 0) return;
                            const x = Math.max(0, Math.min(sliderWidth, e.nativeEvent.pageX - sliderPageXRef.current));
                            const newMs = duration ? (x / sliderWidth) * duration : 0;
                            if (intervalRef.current) {
                              clearInterval(intervalRef.current);
                              intervalRef.current = null;
                            }
                            setIsDragging(true);
                            setDragPositionMs(newMs);
                            lastXRef.current = x;
                            // Pause during drag to avoid race with playing stream
                            (async () => {
                              if (sound) {
                                try {
                                  const status = await sound.getStatusAsync();
                                  wasPlayingRef.current = !!(status.isLoaded && (status as any).isPlaying);
                                  if (wasPlayingRef.current) {
                                    await sound.pauseAsync();
                                  }
                                } catch {}
                              }
                            })();
                          }}
                          onResponderMove={(e) => {
                            if (sliderWidth <= 0) return;
                            const x = Math.max(0, Math.min(sliderWidth, e.nativeEvent.pageX - sliderPageXRef.current));
                            lastXRef.current = x;
                            if (rafRef.current == null) {
                              rafRef.current = requestAnimationFrame(() => {
                                const newMs = duration ? (lastXRef.current / sliderWidth) * duration : 0;
                                setDragPositionMs(newMs);
                                rafRef.current = null;
                              });
                            }
                          }}
                          onResponderRelease={async (e) => {
                            if (rafRef.current != null) {
                              cancelAnimationFrame(rafRef.current);
                              rafRef.current = null;
                            }
                            if (sliderWidth <= 0) return;
                            const x = Math.max(0, Math.min(sliderWidth, e.nativeEvent.pageX - sliderPageXRef.current));
                            const newMs = duration ? (x / sliderWidth) * duration : 0;
                            setPosition(newMs);
                            if (sound) {
                              try {
                                if (wasPlayingRef.current) {
                                  await sound.playFromPositionAsync(newMs);
                                } else {
                                  await sound.setPositionAsync(newMs);
                                }
                              } catch {}
                            }
                            setIsDragging(false);
                            wasPlayingRef.current = false;
                          }}
                          onLayout={(ev) => {
                            // Use measureInWindow for absolute X and width for precise pageX math
                            if (sliderRef.current) {
                              sliderRef.current.measureInWindow((px, py, w) => {
                                if (w && Math.abs(w - sliderWidth) > 0.5) setSliderWidth(w);
                                sliderPageXRef.current = px;
                              });
                            }
                          }}
                        >
                          {(() => {
                            const ratio = duration ? ((isDragging ? dragPositionMs : position) / duration) : 0;
                            const px = Math.max(0, Math.min(sliderWidth, ratio * sliderWidth));
                            const thumb = Math.max(0, Math.min(sliderWidth - 16, px - 8));
                            return (
                              <>
                                <View style={[styles.sliderProgress, { width: px }]} />
                                <View style={[styles.sliderThumb, { left: thumb }]} />
                              </>
                            );
                          })()}
                        </View>
                      </View>
                      <View style={styles.infoRow}>
                        <View style={styles.trackInfoExpanded}>
                          <Text style={styles.trackTitleExpanded}>{track.title}</Text>
                          <Text style={styles.trackArtistExpanded}>{track.artist}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => playTrack(track)}
                          style={styles.playButtonInline}
                          disabled={isLoadingTrack}
                        >
                          {isLoadingTrack && playingTrackId === track.id ? (
                            <ActivityIndicator size="small" color="#1129BD" />
                          ) : isPaused && playingTrackId === track.id ? (
                            <Ionicons name="play" size={24} color="#1129BD" />
                          ) : (
                            <Ionicons name="pause" size={24} color="#1129BD" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.trackInfo}>
                        <Text style={styles.trackTitle}>{track.title}</Text>
                        <Text style={styles.trackArtist}>{track.artist}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => playTrack(track)}
                        style={styles.playButton}
                        disabled={isLoadingTrack}
                      >
                        {isLoadingTrack && playingTrackId === track.id ? (
                          <ActivityIndicator size="small" color="#1129BD" />
                        ) : (
                          <Ionicons name="play" size={24} color="#1129BD" />
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', minHeight: 96, paddingTop: 44, paddingBottom: 10, paddingHorizontal: 12 },
  backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
  headerTitleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  headerTitle: { fontFamily: 'Inter', fontWeight: '700', fontSize: 16, color: '#000', textTransform: 'uppercase', letterSpacing: 0.2, marginTop: 24 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  loadingText: { fontSize: 18, color: '#666', marginTop: 10 },
  trackCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(17, 41, 189, 0.1)', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 24, gap: 8, marginBottom: 15, width: '100%', height: 48},
  trackCardExpanded: { flexDirection: 'column', alignItems: 'flex-start', paddingVertical: 8, paddingHorizontal: 24, gap: 8, height: 91, width: '100%' },
  trackInfo: { flex: 1, gap: 0 },
  trackTitle: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, lineHeight: 14, color: '#1129BD' },
  trackArtist: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, lineHeight: 14, color: '#010E59' },
  trackInfoExpanded: { gap: 4 },
  trackTitleExpanded: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, lineHeight: 14, color: '#1129BD' },
  trackArtistExpanded: { fontFamily: 'Inter', fontWeight: '500', fontSize: 12, lineHeight: 14, color: '#010E59' },
  playButton: { width: 24, height: 24 },
  playButtonExpanded: { width: 24, height: 24 },
  playButtonInline: { width: 24, height: 24 },
  soundTimeline: { width: '100%', gap: 5 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'},
  timeText: { fontFamily: 'Gilroy', fontWeight: '400', fontSize: 12, lineHeight: 14, color: '#1129BD' },
  slider: { width: '100%', height: 16 },
  sliderContainer: { width: '100%', height: 5, position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.31)', borderRadius: 8 },
  sliderProgress: { position: 'absolute', left: 0, top: 0, height: '100%', backgroundColor: '#1129BD', borderRadius: 8 },
  sliderThumb: { position: 'absolute', width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFFFFF', top: -5 },
  infoRow: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});

