'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Interface for song requests from the database
interface SongRequest {
  id: string;
  name: string;
  songArtist: string;
  submittedAt: string | Date; // Can be string from API or Date object
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
        console.log('Songs data received:', songsData);
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

  const formatDate = (dateString: string | Date) => {
    try {
      let date: Date;
      
      if (typeof dateString === 'string') {
        // Handle PostgreSQL timestamp strings more robustly
        // PostgreSQL timestamps can come in various formats
        date = new Date(dateString);
        
        // If the first attempt fails, try parsing common PostgreSQL formats
        if (isNaN(date.getTime())) {
          // Try removing timezone info if present
          const cleanString = dateString.replace(/[+-]\d{2}:\d{2}$/, '');
          date = new Date(cleanString);
        }
      } else {
        date = dateString;
      }
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date received:', dateString);
        return 'Date unavailable';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error, 'Date value:', dateString);
      return 'Date unavailable';
    }
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
        <header className="text-center mb-8 sm:mb-12 pt-12 sm:pt-16">
          <h1 className="relative z-10 text-4xl sm:text-5xl md:text-7xl font-black text-yellow-300 mb-6 sm:mb-8 tracking-wider drop-shadow-2xl leading-tight" 
              style={{
                textShadow: '4px 4px 0px #8B0000, 8px 8px 0px #000000',
                fontFamily: 'var(--font-rock-salt), cursive'
              }}>
            The Playlist
          </h1>
          
          <p className="text-lg sm:text-xl text-yellow-200 font-semibold tracking-wider mb-6 sm:mb-8" 
             style={{ textShadow: '1px 1px 0px #8B0000' }}>
            ALL SUBMITTED SONGS
          </p>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
            <Link href="/" 
                  className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl border-2 border-red-400 shadow-lg hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
              ← Back to Submit
            </Link>
          </div>
        </header>

        {/* Songs List */}
        <main className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-purple-500">
          <div className="p-4 sm:p-6 md:p-8">
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
              <div className="space-y-3 sm:space-y-4">
                <div className="text-center mb-6">
                  <p className="text-xl sm:text-2xl font-bold text-purple-400 mb-2">
                    Total Songs: {songs.length}
                  </p>
                </div>

                {songs.map((song, index) => (
                  <div key={song.id} 
                       className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl border-2 border-purple-500 p-4 sm:p-6 hover:border-red-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      {/* Song number and details */}
                      <div className="flex-1">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="text-2xl sm:text-3xl text-purple-400 font-bold min-w-[2.5rem] sm:min-w-[3rem] flex-shrink-0">
                            #{index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">
                              {song.songArtist}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-300">
                              Requested by: <span className="text-red-400 font-semibold break-words">{song.name}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Date - positioned below on mobile, to the right on desktop */}
                      <div className="text-left sm:text-right pt-2 sm:pt-0 border-t border-gray-600 sm:border-none">
                        <p className="text-xs sm:text-sm text-gray-400 mb-1">Submitted</p>
                        <p className="text-xs sm:text-sm text-purple-400 font-medium">
                          {formatDate(song.submittedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
