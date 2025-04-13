// app/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'
import { getProfile, getFeaturedProjects } from '@/lib/sanity.queries'
import PortableText from '@/components/PortableText'

export default async function HomePage() {
  const profile = await getProfile()
  const featuredProjects = await getFeaturedProjects()

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {profile?.profileImage && (
              <div className="md:w-1/3">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(profile.profileImage).url()}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}
            
            <div className="md:w-2/3">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{profile?.name}</h1>
              <div className="prose prose-lg prose-invert">
                {profile?.bio && <PortableText value={profile.bio} />}
              </div>
              <div className="mt-6 flex gap-4">
                <Link href="/projects" className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium">
                  View Projects
                </Link>
                <Link href="/contact" className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium">
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects?.map((project) => (
              <Link key={project._id} href={`/projects/${project.slug}`}>
                <div className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                  {project.mainImage && (
                    <div className="relative aspect-video">
                      <Image
                        src={urlFor(project.mainImage).url()}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-700 transition duration-300">
                      {project.title}
                    </h3>
                    {project.releaseDate && (
                      <p className="text-gray-600 mb-2">
                        {new Date(project.releaseDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/projects" className="text-green-700 hover:text-green-600 font-medium text-lg hover:underline">
              View All Projects →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}