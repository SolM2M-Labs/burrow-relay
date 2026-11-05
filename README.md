# Burrow Relay

A small Squeekchain circuit puzzle. Flip a lamp and its four orthogonal neighbours. The goal is to light every lamp. Reset repeats the current board and Hint identifies one move from a shortest solution.

Open `index.html` in a browser, or serve it from any static host. Practice is immediately playable. **Load live puzzle** fetches the official status endpoint and builds a fixed puzzle from a fresh hardware snapshot. The captured time and RPM are displayed; the puzzle does not claim to stream the wheel after loading. Wheel speed sets the number of scramble pulses. Missing, simulated, stale or invalid readings never create a hardware board. No wallet, payments or prizes.

Run `node --test relay.test.cjs` for the board and telemetry checks.

Squeekchain integration: <https://docs.squeekchain.com/developers/api/>
