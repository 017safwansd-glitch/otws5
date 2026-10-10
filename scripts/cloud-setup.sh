#!/usr/bin/env bash
set -euo pipefail
cd /workspace/otws5
export npm_config_cache=/workspace/.npm-cache
for executable in node npm ffmpeg ffprobe chromium; do
  command -v "$executable" >/dev/null
done
npm ci --no-audit --no-fund
npm run check:final
