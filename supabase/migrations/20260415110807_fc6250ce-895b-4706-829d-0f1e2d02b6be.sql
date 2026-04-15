
-- Fix overly permissive INSERT on profiles - restrict to service role (trigger)
DROP POLICY "System inserts profiles" ON public.profiles;
CREATE POLICY "Trigger inserts profiles" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Fix overly permissive INSERT on user_roles
DROP POLICY "System inserts roles" ON public.user_roles;
CREATE POLICY "Trigger inserts roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Fix public bucket listing - restrict to authenticated users
DROP POLICY "Anyone can view video assets" ON storage.objects;
CREATE POLICY "Authenticated view video assets" ON storage.objects FOR SELECT USING (bucket_id = 'video-assets' AND auth.role() = 'authenticated');
