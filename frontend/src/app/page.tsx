import { client, cosplayersQuery, urlFor } from '@/lib/sanity'
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import { Avatar } from '@heroui/avatar'
import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

type Cosplayer = {
  _id: string
  name: string
  slug: { current: string }
  twitterUsername?: string
  profileImage?: SanityImageSource
  coverImage?: SanityImageSource
  bio?: string
  tags?: string[]
  followersCount: number
  followingCount: number
  socialLinks?: {
    twitter?: string
    instagram?: string
    website?: string
  }
  lastUpdated: string
}

async function getCosplayers(): Promise<Cosplayer[]> {
  return await client.fetch(cosplayersQuery)
}

function CosplayerProfileCard({ cosplayer }: { cosplayer: Cosplayer }) {
  const [isFollowed, setIsFollowed] = React.useState(false)

  return (
    <Card className="max-w-[340px] group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={cosplayer.profileImage ? urlFor(cosplayer.profileImage).width(60).height(60).url() : undefined}
            name={cosplayer.name}
            className="ring-2 ring-pink-200"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {cosplayer.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {cosplayer.twitterUsername ? `@${cosplayer.twitterUsername}` : 'コスプレイヤー'}
            </h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : "bg-gradient-to-r from-pink-500 to-purple-600"}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "フォロー解除" : "フォロー"}
        </Button>
      </CardHeader>
      
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p className="line-clamp-3 mb-2">
          {cosplayer.bio || 'プロフィール情報はありません'}
        </p>
        
        {cosplayer.tags && cosplayer.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {cosplayer.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardBody>
      
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {cosplayer.followingCount.toLocaleString()}
          </p>
          <p className="text-default-400 text-small">フォロー中</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">
            {cosplayer.followersCount.toLocaleString()}
          </p>
          <p className="text-default-400 text-small">フォロワー</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default async function Home() {
  const cosplayers = await getCosplayers()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Navigation */}
      <Header currentPage="home" />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🌸 CosHub
          </h1>
          <p className="text-2xl text-gray-700 mb-4 font-light">
            エロコスプレイヤー専用プラットフォーム
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            美しいコスプレイヤーたちのプロフィールと作品を発見しよう
          </p>
        </div>

        {/* Cosplayer Grid */}
        {cosplayers.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cosplayers.map((cosplayer) => (
              <Link
                key={cosplayer._id}
                href={`/cosplayer/${cosplayer.slug.current}`}
                className="block"
              >
                <CosplayerProfileCard cosplayer={cosplayer} />
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌸</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              まだコスプレイヤーが登録されていません
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              最初のコスプレイヤーを追加して、美しいCosHubを始めましょう！
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                as={Link}
                href="/create"
                color="primary"
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl"
              >
                🎭 コスプレイヤーを追加
              </Button>
              <Button
                as={Link}
                href="http://localhost:3333"
                target="_blank"
                color="secondary"
                size="lg"
                variant="bordered"
              >
                🛠️ Sanity Studioを開く
              </Button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {cosplayers.length > 0 && (
          <div className="mt-20 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {cosplayers.length}
                </div>
                <div className="text-gray-600">登録コスプレイヤー</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {cosplayers.reduce((sum, c) => sum + c.followersCount, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">総フォロワー数</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {cosplayers.filter(c => c.tags && c.tags.length > 0).length}
                </div>
                <div className="text-gray-600">タグ付きプロフィール</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-pink-200 text-center">
          <p className="text-gray-500 mb-4">
            &copy; 2024 CosHub. Built with ❤️ for Cosplay Community
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="light" size="sm" color="primary">
              Next.js
            </Button>
            <Button variant="light" size="sm" color="secondary">
              Sanity
            </Button>
            <Button variant="light" size="sm" color="success">
              HeroUI
            </Button>
          </div>
        </footer>
      </main>
    </div>
  )
}
