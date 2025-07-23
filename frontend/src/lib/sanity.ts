import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION!

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)

// Legacy blog queries (kept for backward compatibility)
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, _id}
}`

export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImage,
  "author": author->{name, image},
  "categories": categories[]->{title, _id}
}`

// Cosplayer queries
export const cosplayersQuery = `*[_type == "cosplayer" && isActive == true] | order(followersCount desc) {
  _id,
  name,
  slug,
  twitterUsername,
  profileImage,
  coverImage,
  bio,
  tags,
  followersCount,
  followingCount,
  socialLinks,
  lastUpdated
}`

export const cosplayerQuery = `*[_type == "cosplayer" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  twitterUsername,
  profileImage,
  coverImage,
  bio,
  tags,
  followersCount,
  followingCount,
  socialLinks,
  lastUpdated,
  "collections": *[_type == "imageCollection" && references(^._id) && isPublished == true] | order(createdAt desc) {
    _id,
    title,
    slug,
    coverImage,
    character,
    series,
    collectionType,
    isNSFW,
    "imageCount": count(images)
  },
  "recentImages": *[_type == "cosplayImage" && references(^._id)] | order(uploadDate desc)[0...12] {
    _id,
    title,
    image,
    character,
    series,
    isNSFW,
    uploadDate
  }
}`

export const imageCollectionsQuery = `*[_type == "imageCollection" && isPublished == true] | order(createdAt desc) {
  _id,
  title,
  slug,
  description,
  coverImage,
  character,
  series,
  collectionType,
  isNSFW,
  createdAt,
  "cosplayer": cosplayer->{name, slug, profileImage},
  "imageCount": count(images)
}`

export const imageCollectionQuery = `*[_type == "imageCollection" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  coverImage,
  character,
  series,
  collectionType,
  isNSFW,
  createdAt,
  "cosplayer": cosplayer->{name, slug, profileImage, twitterUsername},
  "images": images[]->{
    _id,
    title,
    image,
    character,
    series,
    tags,
    isNSFW,
    uploadDate,
    twitterUrl,
    likes,
    views
  }
}`

export const cosplayImagesQuery = `*[_type == "cosplayImage"] | order(uploadDate desc) {
  _id,
  title,
  image,
  character,
  series,
  tags,
  isNSFW,
  uploadDate,
  likes,
  views,
  "cosplayer": cosplayer->{name, slug, profileImage}
}`
