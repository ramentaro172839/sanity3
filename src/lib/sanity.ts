import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getPosts() {
  const posts = await client.fetch(`
    *[_type == "post" && !isDraft] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      author->{
        name,
        slug,
        image
      },
      categories[]->{
        title,
        slug,
        color
      },
      tags[]->{
        title,
        slug
      }
    }
  `)
  return posts
}

export async function getPost(slug: string) {
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      body,
      author->{
        name,
        slug,
        image,
        bio,
        catchphrase,
        socialLinks
      },
      categories[]->{
        title,
        slug,
        color
      },
      tags[]->{
        title,
        slug
      }
    }
  `, { slug })
  return post
}

export async function getAuthor() {
  const author = await client.fetch(`
    *[_type == "author"][0] {
      _id,
      name,
      slug,
      image,
      bio,
      catchphrase,
      socialLinks
    }
  `)
  return author
}

export async function getCategories() {
  const categories = await client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color
    }
  `)
  return categories
}

export async function getTags() {
  const tags = await client.fetch(`
    *[_type == "tag"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `)
  return tags
}

export async function getPostsByCategory(categorySlug: string) {
  const posts = await client.fetch(`
    *[_type == "post" && !isDraft && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      author->{
        name,
        slug,
        image
      },
      categories[]->{
        title,
        slug,
        color
      },
      tags[]->{
        title,
        slug
      }
    }
  `, { categorySlug })
  return posts
}

export async function getPostsByTag(tagSlug: string) {
  const posts = await client.fetch(`
    *[_type == "post" && !isDraft && references(*[_type == "tag" && slug.current == $tagSlug]._id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage,
      author->{
        name,
        slug,
        image
      },
      categories[]->{
        title,
        slug,
        color
      },
      tags[]->{
        title,
        slug
      }
    }
  `, { tagSlug })
  return posts
}