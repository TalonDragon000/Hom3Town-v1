const FRAME_WIDTH = 64;
const FRAME_HEIGHT = 128;
const FRAMES_PER_ROW = 12;

export function calculateBackgroundPosition(frameId: number): string {
  const col = frameId % FRAMES_PER_ROW;
  const row = Math.floor(frameId / FRAMES_PER_ROW);
  return `${-(col * FRAME_WIDTH)}px ${-(row * FRAME_HEIGHT)}px`;
}

export const BLANK_FRAMES = new Set([23, 31, 32, 33, 34, 35]);

export function isBlankFrame(frameId: number): boolean {
  return BLANK_FRAMES.has(frameId);
}
