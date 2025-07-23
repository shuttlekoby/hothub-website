import { client, postsQuery, urlFor } from '@/lib/sanity'
import { Card, CardBody, CardFooter } from '@heroui/card'
import { Button } from '@heroui/button'
import { Image } from '@heroui/image'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar'
import Link from 'next/link'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage?: SanityImageSource
  author?: { name: string; image?: SanityImageSource }
  categories?: { title: string; _id: string }[]
}

async function getPosts(): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navbar isBordered className="bg-white/70 backdrop-blur-md">
        <NavbarBrand>
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🔥 HotHub
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              href="http://localhost:3333"
              target="_blank"
              color="primary"
              variant="flat"
              size="sm"
            >
              Studio
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🔥 HotHub
          </h1>
          <p className="text-2xl text-gray-700 mb-4 font-light">
            モダンブログプラットフォーム
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Sanity CMS × Next.js × HeroUIで構築された、美しく高速なブログエクスペリエンス
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card 
                key={post._id}
                className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white/80 backdrop-blur-sm"
                isPressable
                as={Link}
                href={`/blog/${post.slug.current}`}
              >
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(400).height(250).url()}
                    alt={post.title}
                    className="object-cover w-full h-48"
                    radius="lg"
                  />
                )}
                
                <CardBody className="px-6 py-4">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category._id}
                          className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}
                </CardBody>

                <CardFooter className="px-6 py-4 pt-0 flex justify-between items-center">
                  {post.author && (
                    <span className="text-sm font-medium text-gray-600">
                      {post.author.name}
                    </span>
                  )}
                  <time className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                  </time>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              まだ投稿がありません
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Sanity Studioで最初の投稿を作成して、美しいブログを始めましょう！
            </p>
            <Button
              as={Link}
              href="http://localhost:3333"
              target="_blank"
              color="primary"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              🚀 Sanity Studioを開く
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-4">
            &copy; 2024 HotHub. Built with ❤️ using Next.js, Sanity & HeroUI
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
