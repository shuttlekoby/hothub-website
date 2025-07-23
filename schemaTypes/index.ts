import blockContent from './blockContent'
import category from './category'
import post from './post'
import author from './author'

// Cosplayer schemas
import cosplayer from './cosplayer'
import cosplayImage from './cosplayImage'
import imageCollection from './imageCollection'

export const schemaTypes = [
  // Legacy blog schemas (kept for backward compatibility)
  post, 
  author, 
  category, 
  blockContent,
  
  // New cosplayer schemas
  cosplayer,
  cosplayImage,
  imageCollection,
]
