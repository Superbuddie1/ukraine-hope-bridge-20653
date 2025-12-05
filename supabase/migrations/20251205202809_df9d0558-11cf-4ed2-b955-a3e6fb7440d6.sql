-- Add unique constraints on user_id for user_surveys and user_roadmaps tables
ALTER TABLE public.user_surveys ADD CONSTRAINT user_surveys_user_id_unique UNIQUE (user_id);
ALTER TABLE public.user_roadmaps ADD CONSTRAINT user_roadmaps_user_id_unique UNIQUE (user_id);