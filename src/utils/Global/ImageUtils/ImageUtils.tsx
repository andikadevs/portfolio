/**
 * File: src/utils/Global/ImageUtils/ImageUtils.tsx
 * Utility functions for handling image-related operations using Pexels API
 * Contains the getRelevantImage function used by generate-title
 */

import { createClient } from 'pexels';

const pexelsClient = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY || '');

export async function getRelevantImage(topic: string, existingImages: string[]) {
  try {
    const result = await pexelsClient.photos.search({
      query: topic,
      per_page: 30,
      orientation: 'landscape'
    });

    if ('error' in result) {
      throw new Error('Failed to fetch from Pexels');
    }

    // Filter out any images that have been used before
    const availablePhotos = result.photos.filter(
      (photo: any) => !existingImages.includes(photo.src.large)
    );

    if (availablePhotos.length === 0) {
      throw new Error('No unique images found');
    }

    // Select a random photo from available ones
    const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)];

    return {
      url: randomPhoto.src.large,
      photographer: randomPhoto.photographer
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    // Return a default image if the fetch fails
    return {
      url: 'https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg',
      photographer: 'Default Image'
    };
  }
}