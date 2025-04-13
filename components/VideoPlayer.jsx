// components/VideoPlayer.jsx
'use client'

import { useEffect, useState } from 'react'
import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'

export default function VideoPlayer({ videoType, videoUrl, videoFile, embedCode }) {
  const [videoId, setVideoId] = useState('')

  useEffect(() => {
    if (videoType === 'youtube' && videoUrl) {
      // Extract YouTube ID from URL
      const match = videoUrl.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
      if (match && match[1]) {
        setVideoId(match[1])
      }
    } else if (videoType === 'vimeo' && videoUrl) {
      // Extract Vimeo ID from URL
      const match = videoUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/)
      if (match && match[1]) {
        setVideoId(match[1])
      }
    }
  }, [videoType, videoUrl])

  if (videoType === 'youtube' && videoId) {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    )
  }

  if (videoType === 'vimeo' && videoId) {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    )
  }

  if (videoType === 'cloudinary' && videoFile?.asset?._ref) {
    const publicId = videoFile.asset._ref.replace('file-', '').replace(/-.+$/, '')
    return (
      <div className="aspect-w-16 aspect-h-9">
        <CldVideoPlayer
          width="960"
          height="540"
          src={publicId}
          colors={{ accent: '#15803d', base: '#0c0a09', text: '#ffffff' }}
        />
      </div>
    )
  }

  if (videoType === 'embed' && embedCode) {
    return (
      <div className="aspect-w-16 aspect-h-9" dangerouslySetInnerHTML={{ __html: embedCode }} />
    )
  }

  return <div className="bg-gray-200 aspect-w-16 aspect-h-9 flex items-center justify-center">No video available</div>
}