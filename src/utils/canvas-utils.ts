export const FRAME_COUNT = 120;

export const getFrameUrl = (index: number): string => {
  const frameNumber = (index + 1).toString().padStart(4, '0');
  return `/sequence/frame_${frameNumber}.webp`;
};
