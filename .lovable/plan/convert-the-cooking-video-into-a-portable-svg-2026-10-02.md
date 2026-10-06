# Convert the cooking video into a portable SVG

## What I’ll do
- Import the uploaded website source without copying any Git metadata.
- Retrieve the existing cooking MP4 referenced by the website.
- Create a standalone SVG wrapper that embeds the full MP4, preserving the original video rather than tracing a single frame.
- Add the SVG under `src/assets` and update the website’s video source to use it where browser support allows.
- Save a separate copy in Files for download and use elsewhere.
- Verify the imported website and playback at desktop and mobile sizes.

## Compatibility note
SVG has no native video codec. The deliverable will be an SVG containing an embedded HTML5 MP4 player. It works in modern browsers when opened directly, but platforms that sanitize SVG or display it only as an image may not play it.

## Technical details
- Keep the original responsive 16:9 presentation and accessible label.
- Preserve the MP4 as an embedded data URL so the downloadable SVG has no external dependency.
- Retain a safe MP4 fallback on the website if SVG-contained video is unsupported.
