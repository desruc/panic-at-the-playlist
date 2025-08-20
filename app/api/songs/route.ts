import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/songs - Get all songs
export async function GET() {
  try {
    const songs = await prisma.songRequest.findMany({
      orderBy: {
        submittedAt: 'desc'
      }
    })
    
    return NextResponse.json(songs)
  } catch (error) {
    console.error('Error fetching songs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 }
    )
  }
}

// POST /api/songs - Submit a new song
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, songArtist } = body

    if (!name || !songArtist) {
      return NextResponse.json(
        { error: 'Name and song/artist are required' },
        { status: 400 }
      )
    }

    const song = await prisma.songRequest.create({
      data: {
        name,
        songArtist
      }
    })

    return NextResponse.json(song, { status: 201 })
  } catch (error) {
    console.error('Error creating song:', error)
    return NextResponse.json(
      { error: 'Failed to submit song' },
      { status: 500 }
    )
  }
}
