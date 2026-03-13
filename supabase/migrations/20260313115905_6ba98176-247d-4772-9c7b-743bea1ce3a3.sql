
-- Fix permissive venue_bookings policies
DROP POLICY "Authenticated can create bookings" ON public.venue_bookings;
DROP POLICY "Authenticated can update bookings" ON public.venue_bookings;

CREATE POLICY "Authenticated can create bookings"
  ON public.venue_bookings FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.venues v
      WHERE v.id = venue_id AND public.is_org_member(auth.uid(), v.organization_id)
    )
  );

CREATE POLICY "Authenticated can update bookings"
  ON public.venue_bookings FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.venues v
      WHERE v.id = venue_id AND public.is_org_member(auth.uid(), v.organization_id)
    )
  );
