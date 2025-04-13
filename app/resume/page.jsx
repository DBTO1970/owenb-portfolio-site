// app/resume/page.jsx
import { getResumeItems, getProfile } from '@/lib/sanity.queries'
import PortableText from '@/components/PortableText'

export const metadata = {
  title: 'Resume | Film Portfolio',
  description: 'View my professional experience and qualifications'
}

export default async function ResumePage() {
  const resumeItems = await getResumeItems()
  const profile = await getProfile()
  
  // Group resume items by category
  const workItems = resumeItems.filter(item => item.category === 'work')
  const educationItems = resumeItems.filter(item => item.category === 'education')
  const skillsItems = resumeItems.filter(item => item.category === 'skills')
  const awardsItems = resumeItems.filter(item => item.category === 'awards')

  // Function to format date
  const formatDate = (dateString, current) => {
    if (!dateString) return current ? 'Present' : ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Resume</h1>
        
        <button 
          onClick={() => window.open('/api/pdf/resume', '_blank')}
          className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </button>
      </div>
      
      {/* Contact Info */}
      {profile && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{profile.name}</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-gray-700">
            {profile.email && <div>{profile.email}</div>}
            {profile.phone && <div>{profile.phone}</div>}
            {profile.socialLinks?.map((link, index) => (
              <div key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                  {link.platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Work Experience */}
      {workItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Work Experience</h2>
          
          <div className="space-y-8">
            {workItems.map(item => (
              <div key={item._id} className="relative pl-8 border-l-2 border-gray-200">
                <div className="absolute w-3 h-3 bg-green-700 rounded-full -left-[7px]"></div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.organization && (
                  <p className="text-lg text-gray-700">{item.organization}</p>
                )}
                <p className="text-gray-600 mb-2">
                  {formatDate(item.startDate)} — {item.current ? 'Present' : formatDate(item.endDate)}
                  {item.location && <> • {item.location}</>}
                </p>
                {item.description && (
                  <div className="prose">
                    <PortableText value={item.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {educationItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Education</h2>
          
          <div className="space-y-8">
            {educationItems.map(item => (
              <div key={item._id} className="relative pl-8 border-l-2 border-gray-200">
                <div className="absolute w-3 h-3 bg-green-700 rounded-full -left-[7px]"></div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.organization && (
                  <p className="text-lg text-gray-700">{item.organization}</p>
                )}
                <p className="text-gray-600 mb-2">
                  {formatDate(item.startDate)} — {item.current ? 'Present' : formatDate(item.endDate)}
                  {item.location && <> • {item.location}</>}
                </p>
                {item.description && (
                  <div className="prose">
                    <PortableText value={item.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skillsItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Skills</h2>
          
          <div className="space-y-4">
            {skillsItems.map(item => (
              <div key={item._id}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.description && (
                  <div className="prose">
                    <PortableText value={item.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Awards */}
      {awardsItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Awards & Recognition</h2>
          
          <div className="space-y-6">
            {awardsItems.map(item => (
              <div key={item._id}>
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.organization && (
                  <p className="text-lg text-gray-700">{item.organization}</p>
                )}
                <p className="text-gray-600 mb-2">
                  {formatDate(item.startDate)}
                  {item.location && <> • {item.location}</>}
                </p>
                {item.description && (
                  <div className="prose">
                    <PortableText value={item.description} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}