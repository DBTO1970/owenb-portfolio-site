// lib/sanity.queries.js
import { groq } from 'next-sanity'
import { client } from './sanity.client'

// Profile query
export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"][0]{
      _id,
      name,
      "slug": slug.current,
      profileImage,
      bio,
      email,
      phone,
      socialLinks
    }`
  )
}

// Projects query
export async function getAllProjects() {
  return client.fetch(
    groq`*[_type == "project"] | order(order asc, releaseDate desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      releaseDate,
      description,
      videoType,
      videoUrl,
      videoFile,
      embedCode,
      featured,
      "category": category->title,
      "categorySlug": category->slug.current
    }`
  )
}

// Featured projects query
export async function getFeaturedProjects() {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      releaseDate,
      description,
      videoType,
      videoUrl
    }[0...4]`
  )
}

// Single project query
export async function getProject(slug) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      releaseDate,
      description,
      videoType,
      videoUrl,
      videoFile,
      embedCode,
      credits,
      gallery,
      "category": category->title,
      "categorySlug": category->slug.current
    }`,
    { slug }
  )
}

// Resume items query
export async function getResumeItems() {
  return client.fetch(
    groq`*[_type == "resumeItem"] | order(category asc, order asc, startDate desc) {
      _id,
      category,
      title,
      organization,
      startDate,
      endDate,
      current,
      location,
      description
    }`
  )
}

// Gallery query
export async function getGalleries() {
  return client.fetch(
    groq`*[_type == "gallery"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      images,
      "category": category->title
    }`
  )
}

// Single gallery query
export async function getGallery(slug) {
  return client.fetch(
    groq`*[_type == "gallery" && slug.current == $slug][0]{
      _id,
      title,
      description,
      images,
      "category": category->title
    }`,
    { slug }
  )
}

// Categories query
export async function getCategories() {
  return client.fetch(
    groq`*[_type == "category"] {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  )
}