ALTER TABLE public.payment_requests
  DROP CONSTRAINT IF EXISTS payment_requests_video_id_fkey;

ALTER TABLE public.payment_requests
  ADD CONSTRAINT payment_requests_video_id_fkey
  FOREIGN KEY (video_id) REFERENCES public.videos(id) ON DELETE SET NULL;