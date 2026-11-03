-- 1. Table des profils utilisateurs (Jeunes et Formateurs)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('jeune', 'formateur')) DEFAULT 'jeune',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des objectifs
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  phase TEXT NOT NULL,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'completed')) DEFAULT 'todo',
  confidence INTEGER DEFAULT 0,
  validated_by_trainer BOOLEAN DEFAULT FALSE,
  trainer_feedback TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Active la sécurité niveau ligne (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Politiques d'accès publiques pour démarrage rapide
CREATE POLICY "Acces public profils" ON profiles FOR ALL USING (true);
CREATE POLICY "Acces public objectifs" ON goals FOR ALL USING (true);
