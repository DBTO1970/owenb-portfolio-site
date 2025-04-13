// app/projects/[slug]/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { urlFor } from '@/lib/sanity.client'
import { getProject } from '@/lib/sanity.queries'
import PortableText from '@/components/PortableText'
import VideoPlayer from '@/components/VideoPlayer'

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }
  
  return {
    title: `${project.title} | Film Portfolio`,
    description: project.description ? 
      project.description[0].children[0].text.substring(0, 160) : 
      `View details about ${project.title}`,
  }
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Link href="/projects" className="text-green-700 hover:text-green-600 mb-6 inline-block">
        ← Back to Projects
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      
      {project.category && (
        <p className="text-gray-600 mb-6">
          Category: {project.category}
          {project.releaseDate && (
            <> • Released: {new Date(project.releaseDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long'
            })}</>
          )}
        </p>
      )}
      
      {/* Video Player */}
      <div className="mb-12">
        <VideoPlayer 
          videoType={project.videoType}
          videoUrl={project.videoUrl}
          videoFile={project.videoFile}
          embedCode={project.embedCode}
        />
      </div>
      
      {/* Project Description */}
      <div className="prose prose-lg max-w-none mb-12">
        {project.description && <PortableText value={project.description} />}
      </div>
      
      {/* Project Credits */}
      {project.credits && project.credits.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Credits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.credits.map((credit, index) => (
              <div key={index} className="flex">
                <div className="w-1/3 font-semibold">{credit.role}:</div>
                <div className="w-2/3">{credit.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((item, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={urlFor(item).url()}
                  alt={item.caption || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}