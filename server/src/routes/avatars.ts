import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabase';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { user_id, selected_frames } = req.body as {
    user_id: string;
    selected_frames: Record<string, number | null>;
  };

  if (!user_id || !selected_frames) {
    res.status(400).json({ error: 'user_id and selected_frames are required' });
    return;
  }

  const { data, error } = await supabase
    .from('avatars')
    .upsert({ user_id, selected_frames }, { onConflict: 'user_id' })
    .select()
    .maybeSingle();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ avatar: data });
});

router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('avatars')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(200).json({ avatar: data });
});

export default router;
