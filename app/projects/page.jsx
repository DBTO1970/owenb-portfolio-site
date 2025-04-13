// app/projects/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.client'
import { getAllProjects, getCategories } from '@/lib/sanity.queries'

export const metadata = {
  title: 'Projects | Film Portfolio',
  description: 'Browse my film and video projects'
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  const categories = await getCategories()
  
  // Group projects by category
  const projectsByCategory = {}
  categories.forEach(category => {
    projectsByCategory[category.slug] = []
  })
  
  // Add uncategorized for projects without a category
  projectsByCategory['uncategorized'] = []
  
  // Sort projects into categories
  projects.forEach(project => {
    if (project.categorySlug) {
      projectsByCategory[project.categorySlug].push(project)
    } else {
      projectsByCategory['uncategorized'].push(project)
    }
  })

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      
      {categories.map(category => (
        <div key={category._id} className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">{category.title}</h2>
          
          {projectsByCategory[category.slug]?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsByCategory[category.slug].map(project => (
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
                        <p className="text-gray-600">
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
          ) : (
            <p className="text-gray-500">No projects in this category yet.</p>
          )}
        </div>
      ))}
      
      {projectsByCategory['uncategorized']?.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b">Other Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsByCategory['uncategorized'].map(project => (
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
                      <p className="text-gray-600">
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
        </div>
      )}
    </main>
  )
}