// components/PortableText.jsx
'use client'

import { PortableText as SanityPortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'

const components = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full h-64 md:h-96 my-6">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )
    }
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <Link href={value.href} rel={rel} target={target} className="text-blue-600 hover:underline">
          {children}
        </Link>
      )
    }
  }
}

export default function PortableText({ value }) {
  return <SanityPortableText value={value} components={components} />
}