// lib/sanity.client.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'k4jsdvzm',
  dataset: 'production',
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: process.env.NODE_ENV === 'production',
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)