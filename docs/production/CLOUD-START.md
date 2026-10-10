Use the existing isolated checkout at /workspace/otws5. No Git worktree is needed.

The active composition is ParachuteReCoolFinal, a 1920x1080, 30 FPS, 5400-frame Remotion film. It uses local photographic assets and SVG animation. Node, npm, FFmpeg/ffprobe and Chromium are installed; no 3D renderer is required for this workflow.

Run npm run check:final from /workspace/otws5. When the user needs Studio, start npm run studio there, keep its process running, inspect startup output and verify an HTTP 200 response containing Remotion at the local port 3000. Local URLs are for internal checks only.

Render with npm run render:final. The full MP4 writes to out/parachute-recool-final.mp4. The script uses the pinned Remotion dependencies and system Chromium.

The new code is in src/editorial. It preserves the approved narration cues and the original packaging and combined logo. Core content stays right of x575; there are no presenter markers or default caption bars. Audio is silent until user recordings are supplied. Keep the generated photographic assets already stored in public/assets/editorial. Image generation is unnecessary for ordinary startup.

Processes must restart in a new task. Saving setup instructions does not publish the prepared environment; fresh-task snapshot restoration has not been independently verified.
