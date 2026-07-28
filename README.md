# Clawd Pop 3D

Pop escaped block creatures with a handless gold-and-silver cannon while
clearing a compact, procedurally generated laboratory.

This repository is the minimal player-facing GitHub Pages build. The game uses
generated geometry, textures, effects, and audio; it ships no image, sound, or
font assets.

## Play

Open the repository's GitHub Pages site in a modern browser with WebGL 2.
https://vibezzzcoder.github.io/clawd-pop/

### Desktop

- Move: `WASD`
- Look: mouse or trackpad drag
- Fire: left click
- Sprint: `Shift`
- Pause: `Esc`
- Mute: `M`

The game asks for pointer lock, but play remains available if the browser
declines it.

### Phone or tablet

- Move with the lower-left stick.
- Drag on the right side to aim.
- Tap the aim area to fire at the centre reticle.
- Use the lower-left buttons to toggle sprint or pause.

Portrait and landscape are both supported. Landscape may feel more natural for
a first-person game.

## Local preview

This build uses JavaScript modules, so serve the folder rather than opening
`index.html` directly as a `file://` URL. For example:

```sh
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## Status

This snapshot includes Milestones 1–7, including the complete procedural run,
desktop controls, touch controls, portrait and landscape layouts, and quality
presets. Physical-phone touch comfort, Safari/iOS audio, browser-chrome
behaviour, and real mobile frame time still require owner testing.

## License and notice

The game is released under the [MIT License](LICENSE). See
[NOTICE.md](NOTICE.md) for the fan-project disclaimer and the Three.js license.
