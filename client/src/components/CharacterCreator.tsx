import { useState, useCallback } from 'react';
import type { AvatarCategory, SelectedFrames, Gender } from '@/types/avatar';
import { FRAME_TAGS, determineGender, isFrameAllowedForGender } from '@/data/frameTags';
import { calculateBackgroundPosition, isBlankFrame } from '@/utils/spriteCalculations';
import Toast from './Toast';
import spriteSheet from '@/assets/Starter Avatar Set.png';

const LAYER_ORDER: AvatarCategory[] = [
  'body', 'eyes', 'brows', 'mouth', 'underwear',
  'shoes', 'bottom', 'top', 'facialHair', 'facialHair2', 'hair',
];

const TAB_LABELS: Record<AvatarCategory, string> = {
  body: 'Body', eyes: 'Eyes', brows: 'Brows', mouth: 'Mouth',
  underwear: 'Underwear', shoes: 'Shoes', bottom: 'Bottoms', top: 'Tops',
  facialHair: 'Facial Hair', facialHair2: 'Facial Hair 2', hair: 'Hair',
};

const EMPTY_FRAMES: SelectedFrames = {
  body: null, eyes: null, brows: null, mouth: null,
  underwear: null, shoes: null, bottom: null, top: null,
  facialHair: null, facialHair2: null, hair: null,
};

const SPRITE_URL = spriteSheet;

interface ToastState {
  message: string;
  type: 'success' | 'error';
}

export default function CharacterCreator() {
  const [selectedFrames, setSelectedFrames] = useState<SelectedFrames>({ ...EMPTY_FRAMES, body: 0 });
  const [selectedGender, setSelectedGender] = useState<Gender>('male');
  const [activeTab, setActiveTab] = useState<AvatarCategory>('body');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const handleFrameSelection = useCallback((frameId: number, category: AvatarCategory) => {
    if (category === 'body') {
      setSelectedFrames({ ...EMPTY_FRAMES, body: frameId });
      setSelectedGender(determineGender(frameId));
    } else {
      setSelectedFrames((prev) => ({ ...prev, [category]: frameId }));
    }
  }, []);

  const handleClear = useCallback(() => {
    setSelectedFrames({ ...EMPTY_FRAMES });
    setSelectedGender(null);
    setActiveTab('body');
  }, []);

  const handleConfirm = useCallback(async () => {
    if (selectedFrames.body === null) {
      setToast({ message: 'Please select a body first.', type: 'error' });
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/avatars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'guest',
          selected_frames: selectedFrames,
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      setToast({ message: 'Avatar saved successfully!', type: 'success' });
    } catch {
      setToast({ message: 'Failed to save avatar. Please try again.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }, [selectedFrames]);

  const visibleFrames = FRAME_TAGS[activeTab].filter((frameId) => {
    if (isBlankFrame(frameId)) return false;
    if (activeTab === 'body') return true;
    return isFrameAllowedForGender(frameId, selectedGender);
  });

  return (
    <div className="container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="character-container">
        {/* Preview Panel */}
        <div className="preview-container">
          <center><h3>Preview Character</h3></center>
          <div className="preview-character">
            {LAYER_ORDER.map((layer, idx) => {
              const frameId = selectedFrames[layer];
              if (frameId === null) return null;
              return (
                <div
                  key={layer}
                  id={`preview-${layer}`}
                  className="preview-layer"
                  style={{
                    zIndex: idx + 1,
                    display: 'block',
                    backgroundImage: `url("${SPRITE_URL}")`,
                    backgroundPosition: calculateBackgroundPosition(frameId),
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'auto',
                  }}
                />
              );
            })}
          </div>
          <center>
            <button className="action-btn" onClick={handleClear}>CLEAR</button>
            <button className="action-btn" onClick={handleConfirm} disabled={isSaving}>
              {isSaving ? 'SAVING...' : 'CONFIRM'}
            </button>
          </center>
        </div>

        {/* Creator Panel */}
        <div className="create-container">
          <h3>Create Character</h3>

          <div className="asset-tabs">
            {LAYER_ORDER.map((cat) => (
              <button
                key={cat}
                className={`tab${activeTab === cat ? ' active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {TAB_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="asset-container">
            {visibleFrames.map((frameId) => (
              <div
                key={frameId}
                className={`asset-btn${selectedFrames[activeTab] === frameId ? ' selected' : ''}`}
                onClick={() => handleFrameSelection(frameId, activeTab)}
                style={{
                  backgroundImage: `url("${SPRITE_URL}")`,
                  backgroundPosition: calculateBackgroundPosition(frameId),
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'auto',
                }}
              >
                <div className="frame-id-display">ID: {frameId}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
