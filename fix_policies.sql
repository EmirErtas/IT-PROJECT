-- 1. Refresh Supabase Schema Cache (Fixes "couldnt find in system cache")
NOTIFY pgrst, 'reload config';

-- 2. Enable RLS (Security)
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notes ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies to avoid "already exists" errors
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

DROP POLICY IF EXISTS "Users can crud own projects" ON projects;
DROP POLICY IF EXISTS "Users can crud own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can crud own notes" ON notes;

-- 4. Re-create Policies correctly
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can crud own projects" ON projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can crud own tasks" ON tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can crud own notes" ON notes FOR ALL USING (auth.uid() = user_id);
