// app/api/pdf/resume/route.js
import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import { getResumeItems, getProfile } from '@/lib/sanity.queries'
import chrome from '@sparticuz/chromium'

export async function GET() {
  try {
    const resumeItems = await getResumeItems()
    const profile = await getProfile()
    
    // Create HTML for resume
    const html = createResumeHTML(profile, resumeItems)
    
    // Launch headless browser
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: process.env.NODE_ENV === 'production'
        ? await chrome.executablePath
        : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Adjust for your local env
      headless: true,
    })
    
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true,
    })
    
    await browser.close()
    
    // Return PDF
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Error generating PDF' },
      { status: 500 }
    )
  }
}

function createResumeHTML(profile, resumeItems) {
  // Group resume items by category
  const workItems = resumeItems.filter(item => item.category === 'work')
  const educationItems = resumeItems.filter(item => item.category === 'education')
  const skillsItems = resumeItems.filter(item => item.category === 'skills')
  const awardsItems = resumeItems.filter(item => item.category === 'awards')

  // Function to format date
  const formatDate = (dateString, current) =>