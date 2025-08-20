'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fun placeholder names that change on each refresh
  const funPlaceholderNames = [
    "Freddie Mercury",
    "Captain Awesome", 
    "The Dancing Queen",
    "Sir Mix-a-Lot",
    "Beyoncé Knowles",
    "Dwayne 'The Rock' Johnson",
    "Taylor Swift",
    "Keanu Reeves",
    "Mick Jagger",
    "David Bowie",
    "Stevie Nicks",
    "Jim Morrison",
    "Wedding Crasher",
    "Dance Floor Destroyer",
    "Playlist Master",
    "The Life of the Party",
    "Wedding DJ Extraordinaire",
    "Princess Sparkles",
    "Queen of the Dance Floor",
    "Timothée Chalamet"
  ];

  // Fun song placeholders that change on each refresh
  const funSongPlaceholders = [
    "Mr Brightside - The Killers",
    "Bohemian Rhapsody - Queen",
    "Sweet Child O Mine - Guns N Roses",
    "Don't Stop Believin' - Journey",
    "Wonderwall - Oasis",
    "Hotel California - Eagles",
    "Stairway to Heaven - Led Zeppelin",
    "Smells Like Teen Spirit - Nirvana",
    "Like a Rolling Stone - Bob Dylan",
    "Imagine - John Lennon",
    "Billie Jean - Michael Jackson",
    "Purple Haze - Jimi Hendrix",
    "Born to Run - Bruce Springsteen",
    "Respect - Aretha Franklin",
    "Good Vibrations - The Beach Boys",
    "Hey Jude - The Beatles",
    "Johnny B. Goode - Chuck Berry",
    "What's Going On - Marvin Gaye",
    "Bridge Over Troubled Water - Simon & Garfunkel",
    "I Will Always Love You - Whitney Houston"
  ];

  // State for random placeholders
  const [randomPlaceholderName, setRandomPlaceholderName] = useState('');
  const [randomSongPlaceholder, setRandomSongPlaceholder] = useState('');

  // Set random placeholders on component mount
  useEffect(() => {
    setRandomPlaceholderName(funPlaceholderNames[Math.floor(Math.random() * funPlaceholderNames.length)]);
    setRandomSongPlaceholder(funSongPlaceholders[Math.floor(Math.random() * funSongPlaceholders.length)]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, songArtist }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit song');
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form
      setName('');
      setSongArtist('');
    } catch (error) {
      console.error('Error submitting song:', error);
      setIsSubmitting(false);
      // You could add error state handling here
      alert('Failed to submit song. Please try again.');
    }
  };

  const handleNewRequest = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-600 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-600 rounded-full opacity-30 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-red-800 rounded-full opacity-10 animate-ping"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 flex items-center justify-center min-h-screen">
          {/* Thank you card */}
          <div className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-green-500 p-4 sm:p-6 md:p-8 text-center">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🎉</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-3 sm:mb-4">THANK YOU!</h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">
              Your song request has been submitted successfully!
            </p>
            <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">
              I&apos;ll make sure it gets added to the playlist.
            </p>
            <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8">
              <span className='italic'>We look forward to skipping it if it sucks </span>😏
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleNewRequest}
                className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold bg-gradient-to-r from-green-600 via-purple-600 to-blue-600 text-white rounded-xl border-4 border-green-400 shadow-xl hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
              >
                Submit Another Request
              </button>
              
              <Link href="/songs" 
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl border-4 border-purple-400 shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-center">
                🎵 View All Songs
              </Link>
            </div>
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

      <div className="max-w-4xl mx-auto relative z-10">
                {/* Vintage Concert Poster Header */}
        <header className="text-center mb-8 sm:mb-12 pt-12 sm:pt-16">
          {/* Main title with vintage concert poster styling */}
          <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-yellow-300 mb-6 sm:mb-8 tracking-wider drop-shadow-2xl leading-tight" 
              style={{
                textShadow: '4px 4px 0px #8B0000, 8px 8px 0px #000000',
                fontFamily: 'var(--font-rock-salt), cursive'
              }}>
            Panic! At The Playlist
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-yellow-200 font-semibold tracking-wider mb-6 sm:mb-8" 
             style={{ textShadow: '1px 1px 0px #8B0000' }}>
            JAMES & ALEXANDRA&apos;S WEDDING
          </p>

          {/* Navigation */}
          <div className="flex justify-center space-x-4 mb-6 sm:mb-8">
            <Link href="/songs" 
                  className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl border-2 border-purple-400 shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
              🎵 View All Songs
            </Link>
          </div>
        </header>
        
        {/* Main form with sophisticated aesthetic */}
        <main className="bg-black/90 backdrop-blur-sm rounded-2xl shadow-2xl border-4 border-purple-500">
          <div className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name input */}
              <div className="group">
                <label className="block text-lg sm:text-xl md:text-2xl font-bold text-red-400 mb-2 sm:mb-3 drop-shadow-sm">
                  Your Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg md:text-xl bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-gray-600 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={randomPlaceholderName}
                />
              </div>

              {/* Song/Artist input */}
              <div className="group">
                <label className="block text-lg sm:text-xl md:text-2xl font-bold text-purple-400 mb-2 sm:mb-3 drop-shadow-sm">
                  Song & Artist:
                </label>
                <input
                  type="text"
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg md:text-xl bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-gray-600 rounded-xl focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={randomSongPlaceholder}
                />
              </div>

              {/* Submit button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white rounded-2xl border-4 border-red-400 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>

            {/* Decorative elements */}
            <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
              <div className="flex justify-center space-x-2 sm:space-x-4 text-3xl sm:text-4xl">
                <span>🌹</span>
              </div>
              <p className="text-base sm:text-lg text-gray-400 font-medium">
                Thank you for helping create our perfect wedding playlist
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
