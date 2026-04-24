export type AvatarCategory =
  | 'body'
  | 'eyes'
  | 'brows'
  | 'mouth'
  | 'underwear'
  | 'shoes'
  | 'bottom'
  | 'top'
  | 'facialHair'
  | 'facialHair2'
  | 'hair';

export type Gender = 'male' | 'female' | 'unisex' | null;

export type SelectedFrames = Record<AvatarCategory, number | null>;

export interface FrameTags {
  male: number[];
  female: number[];
  unisex: number[];
  body: number[];
  eyes: number[];
  brows: number[];
  mouth: number[];
  underwear: number[];
  shoes: number[];
  bottom: number[];
  top: number[];
  facialHair: number[];
  facialHair2: number[];
  hair: number[];
}
