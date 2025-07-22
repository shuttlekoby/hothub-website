import { client, postsQuery, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  _createdAt: string
  excerpt: string
  coverImage?: unknown
  author?: { name: string; image?: unknown }
}

async function getPosts(): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          HotHub Blog
        </h1>
        <p className="text-lg text-gray-600">
          Powered by Sanity CMS and Next.js
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group block"
          >
            <article className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              {post.coverImage && (
                <div className="aspect-video relative">
                  <Image
                    src={urlFor(post.coverImage).width(400).height(225).url()}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.author && (
                    <span>{post.author.name}</span>
                  )}
                  <time dateTime={post._createdAt}>
                    {new Date(post._createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No blog posts yet. Create your first post in Sanity Studio!
          </p>
          <a
            href="http://localhost:3333"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Sanity Studio
          </a>
        </div>
      )}
    </main>
  )
} 