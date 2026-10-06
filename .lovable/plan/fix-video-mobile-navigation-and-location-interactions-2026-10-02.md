# Fix video, mobile navigation, and location interactions

## Changes
- Make the cooking video use its portrait source ratio on phones and a contained, centered presentation on larger screens so the complete frame remains visible without cropping.
- Replace the oversized mobile navigation with a solid, opaque menu panel, compact spacing, and a matching icon beside every navigation label.
- Keep all location cards permanently rendered and visually stable while hovering or selecting map markers; use interaction only to highlight the matching card and marker.
- Preserve the existing A1 EATS dark, fire-accented visual identity and desktop navigation.

## Verification
- Check the full page at mobile, tablet, and desktop sizes.
- Confirm the video’s full frame is visible, the mobile menu fits onscreen, and location cards never disappear during hover or selection.
- Confirm the preview builds without errors.

## Technical details
- Update the shared navigation and section presentation only; no content, links, or business data will change.
- Keep the existing CDN-hosted MP4 player and its play/mute controls.
