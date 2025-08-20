'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data structure - replace with actual database data
interface SongRequest {
  id: string;
  name: string;
  songArtist: string;
  submittedAt: Date;
}

export default function SongsList() {
  const [songs, setSongs] = useState<SongRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const response = await fetch('/api/songs');
        if (!response.ok) {
          throw new Error('Failed to fetch songs');
        }
        
        const songsData = await response.json();
        setSongs(songsData);
      } catch (error) {
        console.error('Error loading songs:', error);
        // You could add error state handling here
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-600 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-600 rounded-full opacity-30 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-red-800 rounded-full opacity-10 animate-ping"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-6 animate-spin">🎵</div>
            <h2 className="text-3xl font-bold text-purple-400 mb-4">Loading Songs...</h2>
            <p className="text-xl text-gray-300">Fetching the playlist from the depths of the internet</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-600 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-600 rounded-full opacity-30 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-red-800 rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <header className="text-center mb-12 pt-16">
          <h1 className="relative z-10 text-5xl md:text-7xl font-black text-yellow-300 mb-8 tracking-wider drop-shadow-2xl leading-tight" 
              style={{
                textShadow: '4px 4px 0px #8B0000, 8px 8px 0px #000000',
                fontFamily: 'var(--font-rock-salt), cursive'
              }}>
            The Playlist
          </h1>
          
          <p className="text-xl text-yellow-200 font-semibold tracking-wider mb-8" 
             style={{ textShadow: '1px 1px 0px #8B0000' }}>
            ALL SUBMITTED SONGS
          </p>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link href="/" 
                  className="px-6 py-3 text-lg font-bold bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl border-2 border-red-400 shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
              ← Back to Submit
            </Link>
          </div>
        </header>

        {/* Songs List */}
        <main className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-purple-500">
          <div className="p-8">
            {songs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-6">🎵</div>
                <h3 className="text-2xl font-bold text-gray-300 mb-4">No Songs Yet!</h3>
                <p className="text-lg text-gray-400 mb-6">Be the first to submit a song request!</p>
                <Link href="/" 
                      className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl border-2 border-green-400 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300">
                  Submit First Song
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold text-purple-400 mb-2">
                    Total Songs: {songs.length}
                  </p>
                </div>

                {songs.map((song, index) => (
                  <div key={song.id} 
                       className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl border-2 border-purple-500 p-6 hover:border-red-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl text-purple-400 font-bold min-w-[3rem]">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">
                              {song.songArtist}
                            </h3>
                            <p className="text-lg text-gray-300">
                              Requested by: <span className="text-red-400 font-semibold">{song.name}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 mb-1">Submitted</p>
                        <p className="text-sm text-purple-400 font-medium">
                          {formatDate(song.submittedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Decorative footer */}
            <div className="mt-12 text-center space-y-4">
              <div className="flex justify-center space-x-4 text-4xl">
                <span className="animate-bounce">🎵</span>
                <span className="animate-pulse">💀</span>
                <span className="animate-bounce delay-100">🎸</span>
                <span className="animate-pulse delay-200">🎤</span>
                <span className="animate-bounce delay-300">🎵</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
