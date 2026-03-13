
-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('player-photos', 'player-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team-logos', 'team-logos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('match-media', 'match-media', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('org-assets', 'org-assets', true);

-- Public read for public buckets
CREATE POLICY "Public read player-photos" ON storage.objects FOR SELECT TO authenticated, anon USING (bucket_id = 'player-photos');
CREATE POLICY "Public read team-logos" ON storage.objects FOR SELECT TO authenticated, anon USING (bucket_id = 'team-logos');
CREATE POLICY "Public read match-media" ON storage.objects FOR SELECT TO authenticated, anon USING (bucket_id = 'match-media');
CREATE POLICY "Public read org-assets" ON storage.objects FOR SELECT TO authenticated, anon USING (bucket_id = 'org-assets');

-- Authenticated upload for all buckets
CREATE POLICY "Auth upload player-photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'player-photos');
CREATE POLICY "Auth upload team-logos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'team-logos');
CREATE POLICY "Auth upload documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');
CREATE POLICY "Auth upload match-media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'match-media');
CREATE POLICY "Auth upload org-assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'org-assets');

-- Authenticated read documents (private bucket)
CREATE POLICY "Auth read documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents');

-- Authenticated delete
CREATE POLICY "Auth delete own uploads" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('player-photos', 'team-logos', 'documents', 'match-media', 'org-assets'));
