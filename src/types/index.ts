export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  body?: unknown[]
  author: Author
  categories?: Category[]
  tags?: Tag[]
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
    }
  }
  bio?: unknown[]
  catchphrase?: string
  socialLinks?: SocialLink[]
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color?: string
}

export interface Tag {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'youtube' | 'tiktok' | 'other'
  url: string
}