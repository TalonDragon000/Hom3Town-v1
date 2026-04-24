/*
  # Create avatars table

  ## Summary
  Creates the core data table for persisting player avatar configurations
  from the Hom3Town character creator.

  ## New Tables

  ### `avatars`
  Stores one avatar per user. The `selected_frames` column holds the full
  character layer state as a JSONB object keyed by layer name (body, eyes,
  brows, mouth, underwear, shoes, bottom, top, facialHair, facialHair2, hair),
  with each value being a frame ID integer or null.

  - `id` (uuid, primary key) — row identifier
  - `user_id` (text, unique) — identifies the owner; will reference auth.users
    once authentication is enabled; defaults to 'guest' for unauthenticated saves
  - `selected_frames` (jsonb) — the full avatar layer state
  - `created_at` (timestamptz) — when the avatar was first saved
  - `updated_at` (timestamptz) — when the avatar was last updated

  ## Security

  - RLS enabled; only the owning user can read or write their own avatar row
  - A separate policy permits guest saves (user_id = 'guest') so the app works
    before authentication is wired up
*/

CREATE TABLE IF NOT EXISTS avatars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL DEFAULT 'guest',
  selected_frames jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS avatars_user_id_idx ON avatars (user_id);

ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own avatar
CREATE POLICY "Users can read own avatar"
  ON avatars FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

-- Authenticated users can insert their own avatar
CREATE POLICY "Users can insert own avatar"
  ON avatars FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

-- Authenticated users can update their own avatar
CREATE POLICY "Users can update own avatar"
  ON avatars FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

-- Allow guest saves (unauthenticated placeholder until auth is wired up)
CREATE POLICY "Guest saves allowed"
  ON avatars FOR ALL
  TO anon
  USING (user_id = 'guest')
  WITH CHECK (user_id = 'guest');
