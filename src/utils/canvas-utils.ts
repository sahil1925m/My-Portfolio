export const FRAME_COUNT = 120;

export const getFrameUrl = (index: number): string => {
  const frameNumber = index.toString().padStart(3, '0');
  return `/sequence/frame_${frameNumber}.webp`;
};
