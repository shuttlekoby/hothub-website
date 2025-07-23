import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import slugify from 'slugify'

interface CosplayerData {
  name: string
  twitterUsername: string
  bio: string
  followersCount: number
  followingCount: number
  profileImageUrl: string
  tags: string[]
}

interface SanityDoc {
  _type: string
  name: string
  slug: {
    _type: string
    current: string
  }
  twitterUsername: string
  bio: string
  followersCount: number
  followingCount: number
  tags: string[]
  isActive: boolean
  lastUpdated: string
  socialLinks: {
    twitter: string | null
  }
  profileImageUrl?: string
}

export async function POST(req: NextRequest) {
  try {
    const cosplayerData: CosplayerData = await req.json()

    if (!cosplayerData.name || !cosplayerData.twitterUsername) {
      return NextResponse.json(
        { error: 'Name and Twitter username are required' },
        { status: 400 }
      )
    }

    // スラッグを生成
    const slug = slugify(cosplayerData.name, { lower: true, strict: true })

    // Sanityに保存するドキュメント
    const sanityDoc: SanityDoc = {
      _type: 'cosplayer',
      name: cosplayerData.name,
      slug: {
        _type: 'slug',
        current: slug
      },
      twitterUsername: cosplayerData.twitterUsername,
      bio: cosplayerData.bio || '',
      followersCount: cosplayerData.followersCount || 0,
      followingCount: cosplayerData.followingCount || 0,
      tags: cosplayerData.tags || [],
      isActive: true,
      lastUpdated: new Date().toISOString(),
      socialLinks: {
        twitter: cosplayerData.twitterUsername ? `https://twitter.com/${cosplayerData.twitterUsername}` : null,
      }
    }

    // プロフィール画像URLがある場合は外部リンクとして保存
    if (cosplayerData.profileImageUrl) {
      sanityDoc.profileImageUrl = cosplayerData.profileImageUrl
    }

    // TODO: 将来的に画像をSanityアセットとしてアップロードする場合
    // const imageAsset = await client.assets.upload('image', imageBuffer)

    // Sanityに保存
    const result = await client.create(sanityDoc)

    return NextResponse.json({
      success: true,
      cosplayer: result,
      message: 'Cosplayer profile created successfully'
    })

  } catch (error: unknown) {
    console.error('Save cosplayer error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // 重複スラッグエラーの場合
    if (errorMessage.includes('unique')) {
      return NextResponse.json({
        error: 'A cosplayer with this name already exists',
        details: errorMessage
      }, { status: 409 })
    }

    return NextResponse.json({
      error: 'Failed to save cosplayer',
      details: errorMessage
    }, { status: 500 })
  }
} 