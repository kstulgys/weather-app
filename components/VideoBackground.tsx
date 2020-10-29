import * as React from 'react'
import { Box } from '@chakra-ui/core'

interface VideoBackgroundProps {
  src?: string
}

export function VideoBackground({ src = '/bg_videos/video.mp4' }: VideoBackgroundProps): JSX.Element {
  return (
    <Box
      as="video"
      autoPlay
      muted
      loop
      position="absolute"
      top="0"
      left="0"
      width="full"
      height="full"
      objectFit="cover"
    >
      <source src={src} type="video/mp4" />
    </Box>
  )
}
