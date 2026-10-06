const fs = require('fs');

console.log("Reading downloaded assets...");
const boardBase64 = fs.readFileSync("./downloaded_board.png").toString("base64");
const titleBase64 = fs.readFileSync("./downloaded_title.png").toString("base64");
const avatarBase64 = fs.readFileSync("./downloaded_avatar.png").toString("base64");

const boardDataUri = `data:image/png;base64,${boardBase64}`;
const titleDataUri = `data:image/png;base64,${titleBase64}`;
const avatarDataUri = `data:image/png;base64,${avatarBase64}`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Snakes and Ladder</title>
  <meta name="description" content="Interactive educational Snakes and Ladder game with customizable questions, CPU and multiplayer modes, sound effects, and 3D dice.">
  <meta property="og:title" content="Snakes and Ladder">
  <meta property="og:description" content="Interactive educational Snakes and Ladder game with customizable questions, CPU and multiplayer modes, sound effects, and 3D dice.">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <style>
    :root {
      --bg-dark-navy: #030a1c;
      --bg-metallic-navy: #081a3e;
      --bg-deep-blue: #0b2559;
      --cyan-bright: #40e8ff;
      --cyan-neon: #00f2ff;
      --royal-blue: #0876ed;
      --purple-accent: #582bc2;
      --panel-cream: #fffdf5;
      --panel-cream-dark: #f5f0db;
      --gold-primary: #ffd85b;
      --gold-glow: rgba(255, 216, 91, 0.6);
      --font-family: 'Trebuchet MS', 'Arial Rounded MT Bold', system-ui, -apple-system, sans-serif;
      --token-1: #ff5d66;
      --token-2: #1878ee;
      --token-3: #18a75b;
      --token-4: #8a4de1;
      --token-5: #ef8b20;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    body {
      font-family: var(--font-family);
      background: radial-gradient(circle at 50% 12%, #0f3473 0%, #081a3e 50%, #030a1c 100%);
      color: #ffffff;
      min-height: 100vh;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.4;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* HEADER */
    header.app-header {
      width: 100%;
      max-width: 1320px;
      padding: 14px 20px 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }

    .title-img-wrap {
      display: flex;
      align-items: center;
    }

    .header-title-img {
      width: min(72vw, 720px);
      height: 120px;
      object-fit: cover;
      object-position: left 40%;
      filter: drop-shadow(0 6px 14px rgba(2, 10, 32, 0.95)) drop-shadow(0 0 16px rgba(8, 118, 237, 0.4));
      border-radius: 12px;
      user-select: none;
      pointer-events: auto;
    }

    .sound-toggle-btn {
      background: linear-gradient(135deg, #093780 0%, #061c47 100%);
      border: 2px solid var(--cyan-bright);
      color: #ffffff;
      font-family: var(--font-family);
      font-size: clamp(13px, 1.4vw, 16px);
      font-weight: bold;
      padding: 9px 18px;
      border-radius: 28px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(64, 232, 255, 0.3);
      transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      white-space: nowrap;
    }

    .sound-toggle-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(64, 232, 255, 0.4), inset 0 1px 4px rgba(64, 232, 255, 0.5);
      border-color: #ffffff;
    }

    .sound-toggle-btn:active {
      transform: translateY(1px);
    }

    .sound-toggle-btn:focus-visible {
      outline: 3px solid var(--gold-primary);
      outline-offset: 3px;
    }

    /* MAIN CONTAINER */
    main.app-main {
      width: 100%;
      max-width: 1320px;
      padding: 0 16px 36px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    /* SETTINGS SCREEN */
    .settings-screen {
      width: 100%;
      max-width: 820px;
      background: linear-gradient(145deg, #0d2a63 0%, #081b40 70%, #05122b 100%);
      border: 3px solid var(--royal-blue);
      outline: 2px solid var(--cyan-bright);
      border-radius: 24px;
      padding: clamp(20px, 4vw, 36px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(8, 118, 237, 0.35);
      margin-top: 10px;
    }

    .settings-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .settings-header h1 {
      font-size: clamp(24px, 3.4vw, 34px);
      color: #ffffff;
      text-shadow: 0 2px 10px rgba(64, 232, 255, 0.6);
      margin-bottom: 6px;
    }

    .settings-header p {
      font-size: clamp(14px, 1.8vw, 17px);
      color: #d0e4ff;
    }

    .settings-section-title {
      font-size: 18px;
      font-weight: bold;
      color: var(--cyan-bright);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .mode-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .mode-card-btn {
      background: linear-gradient(140deg, #103980 0%, #09214d 100%);
      border: 2px solid rgba(64, 232, 255, 0.3);
      border-radius: 18px;
      padding: 20px 16px;
      color: #ffffff;
      cursor: pointer;
      text-align: center;
      font-family: var(--font-family);
      font-size: 19px;
      font-weight: bold;
      transition: all 0.2s ease;
      box-shadow: 0 6px 16px rgba(0,0,0,0.4);
    }

    .mode-card-btn:hover {
      border-color: var(--cyan-bright);
      transform: translateY(-2px);
    }

    .mode-card-btn[aria-pressed="true"] {
      border: 3px solid var(--cyan-bright);
      outline: 3px solid #ffffff;
      outline-offset: -3px;
      background: linear-gradient(140deg, #1754be 0%, #0c337b 100%);
      box-shadow: 0 0 22px rgba(64, 232, 255, 0.65), 0 8px 20px rgba(0,0,0,0.5);
    }

    .player-count-picker {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 16px 0 24px 0;
      padding: 14px;
      background: rgba(4, 17, 43, 0.7);
      border-radius: 14px;
      border: 1px solid rgba(64, 232, 255, 0.3);
    }

    .player-count-picker span {
      font-weight: bold;
      color: #ffffff;
      font-size: 16px;
    }

    .count-chip-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #0d2d63;
      border: 2px solid rgba(64, 232, 255, 0.4);
      color: #ffffff;
      font-weight: bold;
      font-size: 17px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }

    .count-chip-btn:hover {
      border-color: var(--cyan-bright);
    }

    .count-chip-btn[aria-pressed="true"] {
      background: var(--royal-blue);
      border: 3px solid var(--cyan-bright);
      box-shadow: 0 0 12px var(--cyan-bright);
      color: #ffffff;
      transform: scale(1.1);
    }

    .names-container {
      background: rgba(4, 18, 46, 0.8);
      border: 1px solid rgba(64, 232, 255, 0.25);
      border-radius: 18px;
      padding: 20px;
      margin-bottom: 24px;
    }

    .name-rows-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
      margin-bottom: 18px;
    }

    .name-input-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .name-input-label {
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .token-dot-indicator {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid #ffffff;
      display: inline-block;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    }

    .name-text-input {
      background: #081b3d;
      border: 2px solid #1a4b9c;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 15px;
      padding: 10px 14px;
      border-radius: 10px;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .name-text-input:focus {
      border-color: var(--cyan-bright);
      box-shadow: 0 0 8px rgba(64, 232, 255, 0.4);
    }

    .save-names-bar {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .btn-green-action {
      background: linear-gradient(135deg, #18a75b 0%, #0d6e39 100%);
      border: 2px solid #57e096;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 15px;
      font-weight: bold;
      padding: 10px 22px;
      border-radius: 12px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      transition: all 0.15s ease;
    }

    .btn-green-action:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(24, 167, 91, 0.5);
      border-color: #ffffff;
    }

    .btn-green-action:active {
      transform: translateY(1px);
    }

    .names-status-msg {
      font-size: 14px;
      font-weight: bold;
    }

    .names-status-msg.saved {
      color: #57e096;
    }

    .names-status-msg.unsaved {
      color: #ffd85b;
    }

    /* QUESTION EDITOR DETAILS */
    details.question-details {
      background: rgba(4, 18, 46, 0.85);
      border: 1px solid rgba(64, 232, 255, 0.3);
      border-radius: 18px;
      padding: 16px 20px;
      margin-bottom: 28px;
    }

    details.question-details summary {
      cursor: pointer;
      font-size: 17px;
      font-weight: bold;
      color: var(--gold-primary);
      user-select: none;
      display: flex;
      align-items: center;
      gap: 8px;
      outline: none;
    }

    details.question-details summary:focus-visible {
      outline: 2px solid var(--cyan-bright);
      outline-offset: 4px;
    }

    .questions-editor-body {
      padding-top: 18px;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .editor-card {
      background: #09214d;
      border: 1px solid rgba(64, 232, 255, 0.2);
      border-radius: 14px;
      padding: 16px;
    }

    .editor-card h3 {
      font-size: 16px;
      color: var(--cyan-bright);
      margin-bottom: 12px;
    }

    .bulk-textareas-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 14px;
    }

    @media (max-width: 650px) {
      .bulk-textareas-grid {
        grid-template-columns: 1fr;
      }
    }

    .bulk-textarea-col label {
      font-size: 13px;
      color: #b9d8ff;
      display: block;
      margin-bottom: 6px;
      font-weight: bold;
    }

    .bulk-textarea-col textarea {
      width: 100%;
      height: 150px;
      background: #061738;
      border: 1.5px solid #1a4b9c;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 13px;
      padding: 10px;
      border-radius: 8px;
      resize: vertical;
      outline: none;
    }

    .bulk-textarea-col textarea:focus {
      border-color: var(--cyan-bright);
    }

    .single-square-grid {
      display: grid;
      grid-template-columns: 130px 1fr 1fr;
      gap: 12px;
      align-items: flex-end;
      margin-bottom: 14px;
    }

    @media (max-width: 700px) {
      .single-square-grid {
        grid-template-columns: 1fr;
      }
    }

    .single-square-grid select,
    .single-square-grid input {
      background: #061738;
      border: 1.5px solid #1a4b9c;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 14px;
      padding: 9px 12px;
      border-radius: 8px;
      outline: none;
      width: 100%;
    }

    .single-square-grid select:focus,
    .single-square-grid input:focus {
      border-color: var(--cyan-bright);
    }

    .single-btn-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-secondary {
      background: #103875;
      border: 1.5px solid rgba(64, 232, 255, 0.4);
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 13px;
      font-weight: bold;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-secondary:hover {
      background: #1852aa;
      border-color: var(--cyan-bright);
    }

    .btn-danger {
      background: #73121b;
      border: 1.5px solid #e6404e;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 13px;
      font-weight: bold;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-danger:hover {
      background: #a81c2a;
    }

    .editor-status-msg {
      margin-top: 10px;
      font-size: 14px;
      font-weight: bold;
      min-height: 20px;
    }

    .editor-status-msg.success {
      color: #57e096;
    }

    .editor-status-msg.error {
      color: #ff6b75;
    }

    .btn-start-game {
      width: 100%;
      background: linear-gradient(135deg, #18a75b 0%, #0d6e39 100%);
      border: 3px solid #57e096;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: clamp(20px, 2.5vw, 24px);
      font-weight: bold;
      padding: 18px;
      border-radius: 16px;
      cursor: pointer;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(24, 167, 91, 0.4);
      transition: all 0.2s ease;
    }

    .btn-start-game:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6), 0 0 30px rgba(24, 167, 91, 0.65);
      border-color: #ffffff;
    }

    .btn-start-game:active {
      transform: translateY(1px);
    }

    /* GAME SCREEN */
    .game-screen {
      width: 100%;
      max-width: 1320px;
      display: none;
      flex-direction: column;
      gap: 16px;
    }

    .game-screen.active {
      display: flex;
    }

    .top-game-bar {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      gap: 14px;
      flex-wrap: wrap;
    }

    .game-nav-btn {
      background: linear-gradient(135deg, #0f3980 0%, #081d45 100%);
      border: 2px solid var(--cyan-bright);
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 15px;
      font-weight: bold;
      padding: 9px 18px;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .game-nav-btn:hover {
      transform: translateY(-2px);
      border-color: #ffffff;
      box-shadow: 0 6px 14px rgba(64, 232, 255, 0.4);
    }

    .game-nav-btn:active {
      transform: translateY(1px);
    }

    /* MAIN GAME TWO-COLUMN LAYOUT */
    .game-columns-wrap {
      display: grid;
      grid-template-columns: 1fr 310px;
      gap: clamp(16px, 2vw, 28px);
      align-items: start;
      width: 100%;
    }

    @media (max-width: 850px) {
      .game-columns-wrap {
        grid-template-columns: 1fr;
      }
    }

    /* BOARD COLUMN */
    .board-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
    }

    /* BOARD FRAME & METALLIC GLOW */
    .board-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 1.177;
      background: #061e47;
      border: 8px solid var(--royal-blue);
      outline: 5px solid var(--cyan-bright);
      border-radius: 28px;
      overflow: hidden;
      box-shadow:
        0 0 35px rgba(255, 215, 0, 0.45),
        0 0 16px rgba(255, 180, 0, 0.3),
        inset 0 0 25px rgba(2, 165, 235, 0.5),
        0 20px 45px rgba(0, 0, 0, 0.9);
      user-select: none;
    }

    /* Mandatory Main Board Image alignment */
    .board-bg-img {
      position: absolute;
      left: 49.5%;
      top: 52.8%;
      width: 120%;
      height: 123%;
      transform: translate(-50%, -50%);
      object-fit: fill;
      pointer-events: none;
      user-select: none;
      z-index: 1;
    }

    /* 5x4 Grid Container for hit areas and tokens */
    .board-grid-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
    }

    .board-square-cell {
      position: relative;
      background: transparent;
      outline: none;
    }

    /* Question mark buttons */
    .question-mark-btn {
      position: absolute;
      top: 11%;
      right: 7%;
      width: clamp(24px, 3.2vw, 34px);
      height: clamp(24px, 3.2vw, 34px);
      border-radius: 50%;
      border: 2px solid #ffffff;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: clamp(14px, 1.8vw, 18px);
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      z-index: 5;
    }

    /* Square 10 specific offset */
    .board-square-cell[data-sq="10"] .question-mark-btn {
      right: 24%;
    }

    .question-mark-btn:hover {
      transform: scale(1.15);
      border-color: #ffffff;
    }

    .question-mark-btn:focus-visible {
      outline: 3px solid var(--gold-primary);
      outline-offset: 2px;
    }

    .question-mark-btn.has-question {
      background: #18a75b !important;
      box-shadow: 0 0 12px #18a75b, 0 3px 8px rgba(0, 0, 0, 0.6);
    }

    /* Column repeating colors */
    .qm-col-0 { background: #18a75b; }
    .qm-col-1 { background: #1878ee; }
    .qm-col-2 { background: #8a4de1; }
    .qm-col-3 { background: #ff5d66; }
    .qm-col-4 { background: #ef8b20; }

    /* TOKEN LAYER */
    .token-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 10;
    }

    /* TOKENS */
    .player-token {
      position: absolute;
      width: clamp(24px, 4vw, 42px);
      height: clamp(24px, 4vw, 42px);
      border-radius: 50%;
      border: 2.5px solid #ffffff;
      color: #ffffff;
      font-family: var(--font-family);
      font-weight: 900;
      font-size: clamp(12px, 1.8vw, 18px);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      box-shadow:
        0 4px 10px rgba(0, 0, 0, 0.75),
        inset 0 3px 5px rgba(255, 255, 255, 0.7),
        inset 0 -3px 5px rgba(0, 0, 0, 0.5);
      transition: left 0.24s cubic-bezier(0.25, 1, 0.5, 1), top 0.24s cubic-bezier(0.25, 1, 0.5, 1);
      transform: translate(-50%, -50%);
      z-index: 10;
      pointer-events: auto;
    }

    .player-token.hop {
      animation: tokenHop 0.24s ease-out;
    }

    @keyframes tokenHop {
      0% { transform: translate(-50%, -50%) scale(1) translateY(0); }
      50% { transform: translate(-50%, -50%) scale(1.2) translateY(-16px); }
      100% { transform: translate(-50%, -50%) scale(1) translateY(0); }
    }

    .token-p1 { background: radial-gradient(circle at 35% 30%, #ff8e95 0%, var(--token-1) 60%, #a81c25 100%); }
    .token-p2 { background: radial-gradient(circle at 35% 30%, #68abff 0%, var(--token-2) 60%, #06459c 100%); }
    .token-p3 { background: radial-gradient(circle at 35% 30%, #5ce49a 0%, var(--token-3) 60%, #086634 100%); }
    .token-p4 { background: radial-gradient(circle at 35% 30%, #bc8cff 0%, var(--token-4) 60%, #521c9c 100%); }
    .token-p5 { background: radial-gradient(circle at 35% 30%, #ffb666 0%, var(--token-5) 60%, #9c5006 100%); }

    /* STARTING DOCK */
    .starting-dock {
      width: 100%;
      background: linear-gradient(135deg, #09214d 0%, #051433 100%);
      border: 3px solid var(--royal-blue);
      border-radius: 18px;
      padding: 12px 18px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6), inset 0 1px 3px rgba(64, 232, 255, 0.3);
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: relative;
    }

    .starting-dock-title {
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 1.5px;
      color: var(--cyan-bright);
      text-transform: uppercase;
      text-align: center;
    }

    .dock-tokens-lane {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      min-height: 48px;
      position: relative;
    }

    /* RIGHT CONTROL COLUMN */
    .control-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      position: sticky;
      top: 20px;
    }

    @media (max-width: 850px) {
      .control-column {
        position: static;
      }
    }

    /* CREAM CONTROL PANEL */
    .cream-control-panel {
      background: var(--panel-cream);
      color: #1a2a44;
      border: 4px solid var(--cyan-bright);
      outline: 5px solid var(--royal-blue);
      border-radius: 22px;
      padding: 20px 18px;
      box-shadow: 0 14px 35px rgba(0, 0, 0, 0.75), inset 0 2px 4px rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .turn-header-box {
      text-align: center;
      border-bottom: 2px dashed #d5cbb0;
      padding-bottom: 12px;
    }

    .turn-caption {
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 1.5px;
      color: #4a5d7c;
      text-transform: uppercase;
    }

    .active-player-banner {
      font-size: 24px;
      font-weight: 900;
      color: #072658;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin: 4px 0 6px 0;
    }

    .turn-status-text {
      font-size: 14px;
      font-weight: bold;
      color: #2b4369;
      min-height: 22px;
    }

    /* AVATAR + DICE STAGE */
    .avatar-dice-stage {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 14px;
      align-items: center;
      justify-content: center;
      padding: 6px 0;
    }

    .avatar-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .animated-avatar-qmarks {
      display: flex;
      gap: 6px;
      margin-bottom: 4px;
      height: 22px;
    }

    .avatar-qmark {
      font-size: 16px;
      font-weight: 900;
      color: #0876ed;
      text-shadow: 0 0 6px rgba(64, 232, 255, 0.8);
      animation: qmarkBob 1.6s ease-in-out infinite alternate;
    }

    .avatar-qmark:nth-child(2) { animation-delay: 0.3s; color: #8a4de1; }
    .avatar-qmark:nth-child(3) { animation-delay: 0.6s; color: #ff5d66; }

    @keyframes qmarkBob {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-7px) scale(1.2); }
    }

    .side-avatar-box {
      width: 90px;
      height: 90px;
      border-radius: 18px;
      border: 3px solid var(--royal-blue);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      background: #0b2559;
    }

    .side-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 3D DICE STAGE */
    .dice-container-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    /* Stationary 96x96 button */
    .dice-btn-stationary {
      width: 96px;
      height: 96px;
      background: transparent;
      border: none;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 600px;
      outline: none;
      padding: 0;
    }

    .dice-btn-stationary:focus-visible {
      outline: 3px solid var(--royal-blue);
      border-radius: 18px;
    }

    /* 76x76 CSS 3D Cube */
    .dice-cube {
      width: 76px;
      height: 76px;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 1s cubic-bezier(0.2, 0.8, 0.3, 1);
      transform: rotateX(-12deg) rotateY(16deg);
    }

    .dice-face {
      position: absolute;
      width: 76px;
      height: 76px;
      border-radius: 15px;
      border: 2px solid var(--gold-primary);
      background: linear-gradient(135deg, #32dfff 0%, #087cf4 35%, #0a439f 70%, #061c52 100%);
      box-shadow: inset 0 0 10px rgba(64, 232, 255, 0.4), 0 0 12px rgba(6, 28, 82, 0.6);
      backface-visibility: hidden;
    }

    /* Face orientations (translated by 38px) */
    .face-1 { transform: rotateY(0deg) translateZ(38px); }
    .face-2 { transform: rotateY(90deg) translateZ(38px); }
    .face-3 { transform: rotateX(90deg) translateZ(38px); }
    .face-4 { transform: rotateX(-90deg) translateZ(38px); }
    .face-5 { transform: rotateY(-90deg) translateZ(38px); }
    .face-6 { transform: rotateY(180deg) translateZ(38px); }

    /* Circular golden pips */
    .pip {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: radial-gradient(circle, #fff3a8 0%, #ffd85b 60%, #c49410 100%);
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.5), 0 0 6px #ffd85b;
      position: absolute;
    }

    /* Pip arrangements */
    .pip-c { top: 31px; left: 31px; }
    .pip-tl { top: 13px; left: 13px; }
    .pip-tr { top: 13px; right: 13px; }
    .pip-bl { bottom: 13px; left: 13px; }
    .pip-br { bottom: 13px; right: 13px; }
    .pip-ml { top: 31px; left: 13px; }
    .pip-mr { top: 31px; right: 13px; }

    /* Action move button */
    .btn-move-action {
      background: linear-gradient(135deg, #0876ed 0%, #05459e 100%);
      border: 2px solid var(--cyan-bright);
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 16px;
      font-weight: 900;
      padding: 10px 18px;
      border-radius: 12px;
      cursor: pointer;
      margin-top: 10px;
      width: 100%;
      text-align: center;
      box-shadow: 0 4px 14px rgba(8, 118, 237, 0.5), 0 0 14px var(--cyan-bright);
      animation: pulseGlow 1.2s infinite alternate;
      transition: all 0.15s ease;
    }

    @keyframes pulseGlow {
      0% { transform: scale(1); box-shadow: 0 4px 14px rgba(8, 118, 237, 0.5), 0 0 8px var(--cyan-bright); }
      100% { transform: scale(1.03); box-shadow: 0 6px 18px rgba(8, 118, 237, 0.7), 0 0 18px var(--cyan-bright); }
    }

    .btn-move-action:hover {
      border-color: #ffffff;
    }

    /* PLAYER SCOREBOARD */
    .player-scoreboard {
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-top: 2px dashed #d5cbb0;
      padding-top: 12px;
    }

    .score-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: 10px;
      background: #f7f3e4;
      border: 1.5px solid transparent;
      transition: all 0.2s ease;
    }

    .score-row.active-turn-row {
      border: 2.5px solid var(--royal-blue);
      background: #eef5ff;
      box-shadow: 0 2px 8px rgba(8, 118, 237, 0.25);
    }

    .score-player-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
      font-size: 15px;
      color: #1a2a44;
    }

    .score-trophies {
      font-size: 14px;
      font-weight: 900;
      color: #9c6806;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* FOOTER SIGNATURE OUTSIDE CONTROL PANEL */
    .footer-signature {
      text-align: center;
      padding: 10px 0;
      width: 100%;
    }

    .signature-name {
      font-size: 19px;
      font-weight: 900;
      color: var(--gold-primary);
      text-shadow: 0 0 10px var(--gold-glow);
      letter-spacing: 0.5px;
    }

    .signature-title {
      font-size: 13px;
      color: #f7edd2;
      margin-top: 2px;
    }

    /* QUESTION MODAL */
    dialog.question-modal {
      border: none;
      border-radius: 20px;
      background: linear-gradient(145deg, #0d2859 0%, #081a3d 100%);
      color: #ffffff;
      padding: 26px;
      width: 90%;
      max-width: 480px;
      box-shadow: 0 16px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(64, 232, 255, 0.5);
      border: 3px solid var(--royal-blue);
      outline: 3px solid var(--cyan-bright);
      margin: auto;
    }

    dialog.question-modal::backdrop {
      background: rgba(2, 8, 20, 0.8);
      backdrop-filter: blur(4px);
    }

    .modal-content-wrap {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .modal-title {
      font-size: 22px;
      color: var(--gold-primary);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .modal-question-box {
      background: #061738;
      border: 1.5px solid #1a4b9c;
      border-radius: 12px;
      padding: 16px;
      font-size: 17px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1.4;
    }

    .modal-answer-input {
      background: #081f4a;
      border: 2px solid #2360c2;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 16px;
      padding: 12px 14px;
      border-radius: 10px;
      outline: none;
      width: 100%;
    }

    .modal-answer-input:focus {
      border-color: var(--cyan-bright);
      box-shadow: 0 0 10px rgba(64, 232, 255, 0.5);
    }

    .modal-feedback {
      font-size: 15px;
      font-weight: bold;
      min-height: 22px;
    }

    .modal-feedback.correct { color: #57e096; }
    .modal-feedback.wrong { color: #ff6b75; }

    .modal-btn-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn-check-answer {
      background: linear-gradient(135deg, #18a75b 0%, #0d6e39 100%);
      border: 2px solid #57e096;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 15px;
      font-weight: bold;
      padding: 10px 18px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-check-answer:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(24, 167, 91, 0.5);
    }

    .btn-close-modal {
      background: #0b2559;
      border: 1.5px solid #2360c2;
      color: #d0e4ff;
      font-family: var(--font-family);
      font-size: 15px;
      font-weight: bold;
      padding: 10px 18px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .btn-close-modal:hover {
      background: #103780;
      color: #ffffff;
    }

    /* SNAKE CRYING OVERLAY */
    .snake-cry-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      font-size: 80px;
      z-index: 100;
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .snake-cry-overlay.show {
      transform: translate(-50%, -50%) scale(1.3);
    }

    /* VICTORY OVERLAY */
    .victory-overlay {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at 50% 30%, #0d3885 0%, #05163b 60%, #02091c 100%);
      z-index: 1000;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
    }

    .victory-overlay.active {
      display: flex;
    }

    .victory-box {
      background: linear-gradient(145deg, #0f326e 0%, #092047 100%);
      border: 4px solid var(--gold-primary);
      outline: 4px solid var(--cyan-bright);
      border-radius: 28px;
      padding: clamp(24px, 5vw, 44px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.9), 0 0 45px var(--gold-glow);
      max-width: 500px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      position: relative;
      z-index: 1002;
    }

    .victory-trophy-icon {
      font-size: clamp(64px, 12vw, 96px);
      filter: drop-shadow(0 0 24px var(--gold-primary));
      animation: victoryFloat 2s ease-in-out infinite alternate;
    }

    @keyframes victoryFloat {
      0% { transform: translateY(0) scale(1); }
      100% { transform: translateY(-12px) scale(1.08); }
    }

    .victory-title {
      font-size: clamp(32px, 5vw, 44px);
      font-weight: 900;
      color: var(--gold-primary);
      text-shadow: 0 0 16px var(--gold-glow);
    }

    .victory-player-name {
      font-size: clamp(22px, 3.5vw, 28px);
      color: #ffffff;
      font-weight: bold;
    }

    .victory-reason {
      font-size: 16px;
      color: #b8dcff;
    }

    .btn-play-again {
      background: linear-gradient(135deg, #18a75b 0%, #0d6e39 100%);
      border: 3px solid #57e096;
      color: #ffffff;
      font-family: var(--font-family);
      font-size: 20px;
      font-weight: 900;
      padding: 14px 32px;
      border-radius: 16px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(24, 167, 91, 0.5);
      transition: all 0.2s ease;
      margin-top: 8px;
    }

    .btn-play-again:hover {
      transform: translateY(-2px);
      border-color: #ffffff;
    }

    /* CONFETTI */
    .confetti-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1001;
      overflow: hidden;
    }

    .confetti-piece {
      position: absolute;
      top: -20px;
      width: 12px;
      height: 18px;
      opacity: 0.9;
      animation: confettiFall linear infinite;
    }

    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
    }

    /* ACCESSIBILITY & PREFERS-REDUCED-MOTION */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* MOBILE SIZES <= 480PX */
    @media (max-width: 480px) {
      header.app-header {
        padding: 10px 12px;
      }
      .header-title-img {
        width: min(64vw, 250px);
        height: 46px;
      }
      .sound-toggle-btn {
        padding: 7px 12px;
        font-size: 12px;
      }
      main.app-main {
        padding: 0 10px 24px 10px;
      }
      .board-frame {
        border-width: 5px;
        outline-width: 3px;
        border-radius: 18px;
      }
      .avatar-dice-stage {
        grid-template-columns: 80px 1fr;
        gap: 10px;
      }
      .side-avatar-box {
        width: 74px;
        height: 74px;
      }
    }
  </style>
</head>
<body>

  <!-- SR Live Announcements -->
  <div id="liveAnnouncer" class="sr-only" aria-live="polite" aria-atomic="true"></div>
  <div id="assertiveAnnouncer" class="sr-only" aria-live="assertive" aria-atomic="true"></div>

  <!-- HEADER -->
  <header class="app-header">
    <div class="title-img-wrap">
      <img
        class="header-title-img"
        src="${titleDataUri}"
        onerror="this.src='https://raw.githubusercontent.com/cs0028monglish-cmd/pictures-for-my-site-/main/title%20for%20snakes%20and%20ladder%20.png'"
        alt="SNAKES AND LADDER"
      >
    </div>
    <button
      id="btnSoundToggle"
      class="sound-toggle-btn"
      aria-label="Toggle sound effects"
      aria-pressed="true"
    >
      🔊 Sound on
    </button>
  </header>

  <!-- MAIN -->
  <main class="app-main">

    <!-- SETTINGS SCREEN -->
    <section class="settings-screen" id="settingsScreen" aria-labelledby="settingsHeading">
      <div class="settings-header">
        <h1 id="settingsHeading">Set up your game</h1>
        <p>Choose how to play, save the player names, and add your learning questions.</p>
      </div>

      <!-- Play Mode Selection -->
      <div class="settings-section-title">🎮 Choose Play Mode</div>
      <div class="mode-cards-grid" role="group" aria-label="Game play mode">
        <button
          type="button"
          class="mode-card-btn"
          id="btnModeCpu"
          aria-pressed="true"
        >
          🤖 Versus computer
        </button>
        <button
          type="button"
          class="mode-card-btn"
          id="btnModePlayers"
          aria-pressed="false"
        >
          👥 Various players
        </button>
      </div>

      <!-- Player Count (visible only in various players mode) -->
      <div class="player-count-picker" id="playerCountPicker" style="display: none;">
        <span>Number of players:</span>
        <button type="button" class="count-chip-btn" data-count="2" aria-pressed="true">2</button>
        <button type="button" class="count-chip-btn" data-count="3" aria-pressed="false">3</button>
        <button type="button" class="count-chip-btn" data-count="4" aria-pressed="false">4</button>
        <button type="button" class="count-chip-btn" data-count="5" aria-pressed="false">5</button>
      </div>

      <!-- Player Names -->
      <div class="names-container">
        <div class="settings-section-title">🏷️ Player Names</div>
        <div class="name-rows-grid" id="nameRowsGrid">
          <!-- Dynamically populated name inputs -->
        </div>
        <div class="save-names-bar">
          <button type="button" class="btn-green-action" id="btnSaveNames">
            Save player names
          </button>
          <span class="names-status-msg" id="namesStatusMsg"></span>
        </div>
      </div>

      <!-- Question Editor Collapsible Details -->
      <details class="question-details" id="questionDetails">
        <summary>Add or edit my questions</summary>
        <div class="questions-editor-body">

          <!-- Bulk Import -->
          <div class="editor-card">
            <h3>Bulk Question & Answer Import</h3>
            <p style="font-size: 13px; color: #b8d4ff; margin-bottom: 10px;">
              Enter 1 to 20 matching lines. Line 1 sets Square 1, Line 2 sets Square 2, and so on.
            </p>
            <div class="bulk-textareas-grid">
              <div class="bulk-textarea-col">
                <label for="bulkQuestionsInput">Questions, one per line</label>
                <textarea id="bulkQuestionsInput" placeholder="What is 5 + 5?&#10;What is the capital of France?&#10;Which planet is closest to the Sun?"></textarea>
              </div>
              <div class="bulk-textarea-col">
                <label for="bulkAnswersInput">Answers, one per line</label>
                <textarea id="bulkAnswersInput" placeholder="10&#10;Paris&#10;Mercury"></textarea>
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <button type="button" class="btn-secondary" id="btnBulkImport">Load bulk questions</button>
              <div class="editor-status-msg" id="bulkStatusMsg" role="status"></div>
            </div>
          </div>

          <!-- Single Square Editor -->
          <div class="editor-card">
            <h3>Single Square Editor</h3>
            <div class="single-square-grid">
              <div>
                <label for="selectSquareNum" style="font-size: 13px; color: #b8d4ff; display: block; margin-bottom: 6px;">Square</label>
                <select id="selectSquareNum">
                  <!-- 1 to 20 options -->
                </select>
              </div>
              <div>
                <label for="singleQuestionInput" style="font-size: 13px; color: #b8d4ff; display: block; margin-bottom: 6px;">Question</label>
                <input type="text" id="singleQuestionInput" placeholder="e.g. 7 x 8 = ?">
              </div>
              <div>
                <label for="singleAnswerInput" style="font-size: 13px; color: #b8d4ff; display: block; margin-bottom: 6px;">Exact Answer</label>
                <input type="text" id="singleAnswerInput" placeholder="e.g. 56">
              </div>
            </div>
            <div class="single-btn-group">
              <button type="button" class="btn-secondary" id="btnSaveSingleSquare">Save this square</button>
              <button type="button" class="btn-danger" id="btnClearSingleSquare">Clear this square</button>
            </div>
            <div class="editor-status-msg" id="singleStatusMsg" role="status"></div>
          </div>

        </div>
      </details>

      <button type="button" class="btn-start-game" id="btnStartGame">
        Start the game ▶
      </button>
    </section>

    <!-- GAME SCREEN -->
    <section class="game-screen" id="gameScreen" aria-label="Snakes and Ladder Game Board">
      <!-- Top nav controls -->
      <div class="top-game-bar">
        <button type="button" class="game-nav-btn" id="btnBackToSettings">
          ← Back to settings
        </button>
        <button type="button" class="game-nav-btn" id="btnRestartGame">
          ↻ Restart game
        </button>
      </div>

      <div class="game-columns-wrap">
        <!-- BOARD COLUMN -->
        <div class="board-column">
          <div class="board-frame" id="boardFrame" aria-label="Game board with 20 serpentine squares">
            <!-- Mandatory Main Board Asset -->
            <img
              class="board-bg-img"
              src="${boardDataUri}"
              onerror="this.src='https://raw.githubusercontent.com/cs0028monglish-cmd/pictures-for-my-site-/main/snakes%20and%20Ladder.png'"
              alt=""
              aria-hidden="true"
            >

            <!-- 5x4 Grid Overlay for Hit Areas -->
            <div class="board-grid-overlay" id="boardGridOverlay">
              <!-- 20 Squares in Serpentine Order -->
            </div>

            <!-- Absolute Token Layer on Board -->
            <div class="token-layer" id="tokenLayer"></div>

            <!-- Snake Cry Overlay Animation -->
            <div class="snake-cry-overlay" id="snakeCryOverlay" aria-hidden="true">😭</div>
          </div>

          <!-- Starting Dock for Position 0 -->
          <div class="starting-dock" id="startingDock" aria-label="Starting dock for tokens at position 0">
            <div class="starting-dock-title">STARTING DOCK</div>
            <div class="dock-tokens-lane" id="dockTokensLane">
              <!-- Tokens at 0 sit here -->
            </div>
          </div>
        </div>

        <!-- RIGHT CONTROL COLUMN -->
        <aside class="control-column">
          <div class="cream-control-panel" aria-label="Game controls and player info">
            <div class="turn-header-box">
              <div class="turn-caption">CURRENT TURN</div>
              <div class="active-player-banner" id="activePlayerBanner">
                <span class="token-dot-indicator" id="activePlayerDot"></span>
                <span id="activePlayerName">P1</span>
              </div>
              <div class="turn-status-text" id="turnStatusText" role="status">
                Click the dice to roll.
              </div>
            </div>

            <!-- Avatar + 3D Dice Stage -->
            <div class="avatar-dice-stage">
              <div class="avatar-wrapper">
                <div class="animated-avatar-qmarks" aria-hidden="true">
                  <span class="avatar-qmark">?</span>
                  <span class="avatar-qmark">?</span>
                  <span class="avatar-qmark">?</span>
                </div>
                <div class="side-avatar-box">
                  <img
                    class="side-avatar-img"
                    src="${avatarDataUri}"
                    onerror="this.src='https://raw.githubusercontent.com/cs0028monglish-cmd/pictures-for-my-site-/main/snakes%20and%20ladder%203.png'"
                    alt="Game avatar"
                  >
                </div>
              </div>

              <div class="dice-container-box">
                <!-- Stationary 96x96px Button -->
                <button
                  type="button"
                  class="dice-btn-stationary"
                  id="btnDiceStationary"
                  aria-label="Roll 3D Dice"
                >
                  <div class="dice-cube" id="diceCube">
                    <!-- Face 1 -->
                    <div class="dice-face face-1">
                      <div class="pip pip-c"></div>
                    </div>
                    <!-- Face 2 -->
                    <div class="dice-face face-2">
                      <div class="pip pip-tr"></div>
                      <div class="pip pip-bl"></div>
                    </div>
                    <!-- Face 3 -->
                    <div class="dice-face face-3">
                      <div class="pip pip-tr"></div>
                      <div class="pip pip-c"></div>
                      <div class="pip pip-bl"></div>
                    </div>
                    <!-- Face 4 -->
                    <div class="dice-face face-4">
                      <div class="pip pip-tl"></div>
                      <div class="pip pip-tr"></div>
                      <div class="pip pip-bl"></div>
                      <div class="pip pip-br"></div>
                    </div>
                    <!-- Face 5 -->
                    <div class="dice-face face-5">
                      <div class="pip pip-tl"></div>
                      <div class="pip pip-tr"></div>
                      <div class="pip pip-c"></div>
                      <div class="pip pip-bl"></div>
                      <div class="pip pip-br"></div>
                    </div>
                    <!-- Face 6 -->
                    <div class="dice-face face-6">
                      <div class="pip pip-tl"></div>
                      <div class="pip pip-tr"></div>
                      <div class="pip pip-ml"></div>
                      <div class="pip pip-mr"></div>
                      <div class="pip pip-bl"></div>
                      <div class="pip pip-br"></div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Action Move Button (appears after roll) -->
            <button
              type="button"
              class="btn-move-action"
              id="btnMoveAction"
              style="display: none;"
            >
              Move 0 spaces
            </button>

            <!-- Player List & Trophies -->
            <div class="player-scoreboard" id="playerScoreboard">
              <!-- Score rows -->
            </div>
          </div>

          <!-- Footer Signature Under Control Box -->
          <div class="footer-signature">
            <div class="signature-name">Dr.Abir Wafa</div>
            <div class="signature-title">Head of EdTech at Edulixa</div>
          </div>
        </aside>
      </div>
    </section>

  </main>

  <!-- QUESTION MODAL -->
  <dialog class="question-modal" id="questionModal" aria-labelledby="modalTitle">
    <div class="modal-content-wrap">
      <div class="modal-title" id="modalTitle">Square 1 question</div>
      <div class="modal-question-box" id="modalQuestionText">What is 2 + 2?</div>
      <div>
        <label for="modalAnswerInput" class="sr-only">Your answer</label>
        <input
          type="text"
          class="modal-answer-input"
          id="modalAnswerInput"
          placeholder="Type your answer here..."
          autocomplete="off"
        >
      </div>
      <div class="modal-feedback" id="modalFeedback" role="status"></div>
      <div class="modal-btn-row">
        <button type="button" class="btn-close-modal" id="btnCloseModal">Close</button>
        <button type="button" class="btn-check-answer" id="btnCheckAnswer">Check my answer</button>
      </div>
    </div>
  </dialog>

  <!-- VICTORY OVERLAY -->
  <div class="victory-overlay" id="victoryOverlay" role="dialog" aria-modal="true" aria-labelledby="victoryHeading">
    <div class="confetti-container" id="confettiContainer"></div>
    <div class="victory-box">
      <div class="victory-trophy-icon" aria-hidden="true">🏆</div>
      <div class="victory-title" id="victoryHeading">Victory!</div>
      <div class="victory-player-name" id="victoryPlayerName">P1</div>
      <div class="victory-reason" id="victoryReason">reached square 20!</div>
      <button type="button" class="btn-play-again" id="btnPlayAgain">Play again</button>
    </div>
  </div>

  <!-- SCRIPT -->
  <script>
    (function () {
      'use strict';

      /* --- CONSTANTS & GEOMETRY --- */
      const PLAYER_COLORS = [
        '#ff5d66', // 1: coral
        '#1878ee', // 2: blue
        '#18a75b', // 3: green
        '#8a4de1', // 4: purple
        '#ef8b20'  // 5: orange
      ];

      // Serpentine Board Layout:
      // Row 0 (top): 20, 19, 18, 17, 16
      // Row 1:       11, 12, 13, 14, 15
      // Row 2:       10,  9,  8,  7,  6
      // Row 3 (bot):  1,  2,  3,  4,  5
      const SQUARE_GRID_MAP = {
        20: { row: 0, col: 0 }, 19: { row: 0, col: 1 }, 18: { row: 0, col: 2 }, 17: { row: 0, col: 3 }, 16: { row: 0, col: 4 },
        11: { row: 1, col: 0 }, 12: { row: 1, col: 1 }, 13: { row: 1, col: 2 }, 14: { row: 1, col: 3 }, 15: { row: 1, col: 4 },
        10: { row: 2, col: 0 },  9: { row: 2, col: 1 },  8: { row: 2, col: 2 },  7: { row: 2, col: 3 },  6: { row: 2, col: 4 },
         1: { row: 3, col: 0 },  2: { row: 3, col: 1 },  3: { row: 3, col: 2 },  4: { row: 3, col: 3 },  5: { row: 3, col: 4 }
      };

      // In row order from top-left (0,0) to bottom-right (3,4) for CSS grid rendering
      const GRID_SQUARE_ORDER = [
        20, 19, 18, 17, 16,
        11, 12, 13, 14, 15,
        10,  9,  8,  7,  6,
         1,  2,  3,  4,  5
      ];

      // Exact Ladders and Snakes
      const LADDERS = {
        2: 9,
        7: 14,
        12: 19
      };

      const SNAKES = {
        11: 10,
        13: 8,
        15: 6
      };

      /* --- WEB AUDIO API SYNTHESIZER --- */
      let audioCtx = null;
      let soundEnabled = true;

      function getAudioContext() {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            audioCtx = new AudioContextClass();
          }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        return audioCtx;
      }

      function playSound(type) {
        if (!soundEnabled) return;
        try {
          const ctx = getAudioContext();
          if (!ctx) return;
          const now = ctx.currentTime;

          if (type === 'save') {
            // Pleasant chime
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.3);
          } else if (type === 'roll') {
            // Dice shaking rattle clicks
            for (let i = 0; i < 6; i++) {
              const clickOsc = ctx.createOscillator();
              const clickGain = ctx.createGain();
              clickOsc.type = 'triangle';
              clickOsc.frequency.setValueAtTime(140 + Math.random() * 260, now + i * 0.08);
              clickGain.gain.setValueAtTime(0.18, now + i * 0.08);
              clickGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.04);
              clickOsc.connect(clickGain);
              clickGain.connect(ctx.destination);
              clickOsc.start(now + i * 0.08);
              clickOsc.stop(now + i * 0.08 + 0.04);
            }
          } else if (type === 'step') {
            // Cheerful hop blip
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.14);
          } else if (type === 'blocked') {
            // Soft thud
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
          } else if (type === 'ladder') {
            // Ascending ladder arpeggio (C4 -> E4 -> G4 -> C5)
            const freqs = [261.63, 329.63, 392.00, 523.25];
            freqs.forEach((f, idx) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(f, now + idx * 0.1);
              gain.gain.setValueAtTime(0.22, now + idx * 0.1);
              gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.22);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + idx * 0.1);
              osc.stop(now + idx * 0.1 + 0.22);
            });
          } else if (type === 'snake') {
            // Descending sad slide
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(460, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.45);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.5);
          } else if (type === 'wrong') {
            // Gentle low buzz
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(190, now);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.26);
          } else if (type === 'correct') {
            // Bright chime
            const notes = [783.99, 1046.50];
            notes.forEach((f, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, now + i * 0.1);
              gain.gain.setValueAtTime(0.22, now + i * 0.1);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + i * 0.1);
              osc.stop(now + i * 0.1 + 0.25);
            });
          } else if (type === 'trophy') {
            // Cheerful fanfare
            const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            notes.forEach((f, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(f, now + i * 0.08);
              gain.gain.setValueAtTime(0.2, now + i * 0.08);
              gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + i * 0.08);
              osc.stop(now + i * 0.08 + 0.35);
            });
          } else if (type === 'victory') {
            // Grand triumphant victory tune
            const melody = [
              { f: 523.25, t: 0.0, d: 0.18 },
              { f: 659.25, t: 0.18, d: 0.18 },
              { f: 783.99, t: 0.36, d: 0.22 },
              { f: 1046.50, t: 0.58, d: 0.45 },
              { f: 880.00, t: 1.05, d: 0.2 },
              { f: 1046.50, t: 1.25, d: 0.6 }
            ];
            melody.forEach(m => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(m.f, now + m.t);
              gain.gain.setValueAtTime(0.25, now + m.t);
              gain.gain.exponentialRampToValueAtTime(0.001, now + m.t + m.d);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(now + m.t);
              osc.stop(now + m.t + m.d);
            });
          }
        } catch (e) {
          console.warn('Audio playback error:', e);
        }
      }

      /* --- HELPER UTILITIES --- */
      function escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
      }

      function announceLive(message, assertive = false) {
        const el = document.getElementById(assertive ? 'assertiveAnnouncer' : 'liveAnnouncer');
        if (el) {
          el.textContent = message;
        }
      }

      function normalizeAnswer(ans) {
        if (!ans) return '';
        return ans.trim().replace(/\\s+/g, ' ').toLowerCase();
      }

      /* --- STATE OBJECT --- */
      const state = {
        mode: 'cpu', // 'cpu' or 'players'
        playerCount: 2, // 2 to 5 in 'players' mode
        savedNames: [],
        players: [], // array of player objects: { id, name, isCpu, color, pos, trophies, earnedSquares: Set }
        activeIndex: 0,
        rolledValue: 0,
        busy: false,
        sound: true,
        questions: Array.from({ length: 20 }, () => ({ q: '', a: '' })),
        openSquare: null,
        gameOver: false,
        diceRotations: { x: -12, y: 16 }
      };

      /* --- LOCAL STORAGE MANAGEMENT --- */
      function loadSavedData() {
        try {
          const namesJson = localStorage.getItem('snakeTrailNames');
          if (namesJson) {
            const parsed = JSON.parse(namesJson);
            if (Array.isArray(parsed)) {
              state.savedNames = parsed.map(n => String(n).trim().slice(0, 22));
            }
          }
        } catch (e) {
          console.warn('Failed loading snakeTrailNames:', e);
        }

        try {
          const qJson = localStorage.getItem('snakeTrailQuestions');
          if (qJson) {
            const parsed = JSON.parse(qJson);
            if (Array.isArray(parsed)) {
              for (let i = 0; i < 20; i++) {
                if (parsed[i]) {
                  state.questions[i] = {
                    q: String(parsed[i].q || '').trim(),
                    a: String(parsed[i].a || '').trim()
                  };
                }
              }
            }
          }
        } catch (e) {
          console.warn('Failed loading snakeTrailQuestions:', e);
        }
      }

      function saveQuestionsToStorage() {
        try {
          localStorage.setItem('snakeTrailQuestions', JSON.stringify(state.questions));
        } catch (e) {
          console.warn('Failed saving questions:', e);
        }
      }

      /* --- SETTINGS SCREEN LOGIC --- */
      function renderNameInputs() {
        const grid = document.getElementById('nameRowsGrid');
        grid.innerHTML = '';
        const count = state.mode === 'cpu' ? 2 : state.playerCount;

        for (let i = 0; i < count; i++) {
          const group = document.createElement('div');
          group.className = 'name-input-group';

          const label = document.createElement('label');
          label.className = 'name-input-label';
          label.htmlFor = 'nameInputP' + (i + 1);

          const dot = document.createElement('span');
          dot.className = 'token-dot-indicator';
          dot.style.background = PLAYER_COLORS[i];

          const isCpuRow = (state.mode === 'cpu' && i === 1);
          label.appendChild(dot);
          label.appendChild(document.createTextNode(isCpuRow ? 'Player 2 (Computer):' : 'Player ' + (i + 1) + ':'));

          const input = document.createElement('input');
          input.type = 'text';
          input.className = 'name-text-input';
          input.id = 'nameInputP' + (i + 1);
          input.maxLength = 22;

          if (isCpuRow) {
            input.value = 'CPU';
            input.disabled = true;
          } else {
            const defaultPlaceholder = 'P' + (i + 1);
            input.placeholder = defaultPlaceholder;
            input.value = state.savedNames[i] !== undefined ? state.savedNames[i] : '';
            input.addEventListener('input', () => {
              const statusEl = document.getElementById('namesStatusMsg');
              statusEl.textContent = 'Unsaved changes';
              statusEl.className = 'names-status-msg unsaved';
            });
          }

          group.appendChild(label);
          group.appendChild(input);
          grid.appendChild(group);
        }
      }

      function setupSingleSquareSelector() {
        const select = document.getElementById('selectSquareNum');
        select.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
          const opt = document.createElement('option');
          opt.value = i;
          opt.textContent = 'Square ' + i;
          select.appendChild(opt);
        }
        updateSingleSquareInputs();

        select.addEventListener('change', updateSingleSquareInputs);
      }

      function updateSingleSquareInputs() {
        const sq = parseInt(document.getElementById('selectSquareNum').value, 10);
        const record = state.questions[sq - 1] || { q: '', a: '' };
        document.getElementById('singleQuestionInput').value = record.q;
        document.getElementById('singleAnswerInput').value = record.a;
        document.getElementById('singleStatusMsg').textContent = '';
      }

      /* --- INITIALIZE GAME STATE --- */
      function initGamePlayers() {
        const count = state.mode === 'cpu' ? 2 : state.playerCount;
        state.players = [];

        for (let i = 0; i < count; i++) {
          const isCpu = (state.mode === 'cpu' && i === 1);
          let rawName = '';
          const inputEl = document.getElementById('nameInputP' + (i + 1));
          if (inputEl) {
            rawName = inputEl.value.trim();
          } else if (state.savedNames[i]) {
            rawName = state.savedNames[i].trim();
          }

          let finalName = '';
          if (isCpu) {
            finalName = 'CPU';
          } else if (!rawName) {
            finalName = 'P' + (i + 1);
          } else {
            finalName = rawName.slice(0, 22);
          }

          state.players.push({
            id: i + 1,
            name: finalName,
            isCpu: isCpu,
            color: PLAYER_COLORS[i],
            pos: 0,
            trophies: 0,
            earnedSquares: new Set()
          });
        }

        state.activeIndex = 0;
        state.rolledValue = 0;
        state.busy = false;
        state.gameOver = false;
        state.openSquare = null;
      }

      /* --- BOARD DOM GENERATION --- */
      function buildBoardDOM() {
        const grid = document.getElementById('boardGridOverlay');
        grid.innerHTML = '';

        // 20 Squares in Serpentine Order as visually arranged on board
        GRID_SQUARE_ORDER.forEach(sqNum => {
          const cell = document.createElement('div');
          cell.className = 'board-square-cell';
          cell.setAttribute('data-sq', sqNum);
          cell.id = 'squareCell_' + sqNum;

          // Question Button
          const qBtn = document.createElement('button');
          qBtn.type = 'button';
          qBtn.className = 'question-mark-btn qm-col-' + (SQUARE_GRID_MAP[sqNum].col % 5);
          qBtn.setAttribute('data-square', sqNum);
          qBtn.setAttribute('aria-label', 'Open question for square ' + sqNum);
          qBtn.textContent = '?';

          // Check if this square has a saved question
          const hasQ = state.questions[sqNum - 1] && state.questions[sqNum - 1].q.trim().length > 0;
          if (hasQ) {
            qBtn.classList.add('has-question');
          }

          qBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSquareQuestion(sqNum);
          });

          cell.appendChild(qBtn);
          grid.appendChild(cell);
        });
      }

      function updateBoardQuestionIndicators() {
        for (let i = 1; i <= 20; i++) {
          const btn = document.querySelector('.question-mark-btn[data-square="' + i + '"]');
          if (btn) {
            const hasQ = state.questions[i - 1] && state.questions[i - 1].q.trim().length > 0;
            if (hasQ) {
              btn.classList.add('has-question');
            } else {
              btn.classList.remove('has-question');
            }
          }
        }
      }

      /* --- TOKEN RENDERING & POSITIONING --- */
      function renderTokensDOM() {
        const tokenLayer = document.getElementById('tokenLayer');
        const dockLane = document.getElementById('dockTokensLane');
        tokenLayer.innerHTML = '';
        dockLane.innerHTML = '';

        state.players.forEach(player => {
          const token = document.createElement('div');
          token.className = 'player-token token-p' + player.id;
          token.id = 'playerToken_' + player.id;
          token.textContent = player.isCpu ? 'CPU' : player.id;
          token.setAttribute('aria-label', player.name + ' at position ' + player.pos);
          tokenLayer.appendChild(token);
        });

        recalculateTokenPositions();
      }

      function recalculateTokenPositions() {
        const boardFrame = document.getElementById('boardFrame');
        const dockLane = document.getElementById('dockTokensLane');
        if (!boardFrame || !dockLane) return;

        const boardRect = boardFrame.getBoundingClientRect();
        const dockRect = dockLane.getBoundingClientRect();

        // Group players by position
        const posGroups = {};
        state.players.forEach(p => {
          if (!posGroups[p.pos]) posGroups[p.pos] = [];
          posGroups[p.pos].push(p);
        });

        // Determine token base size
        const sampleToken = document.querySelector('.player-token');
        const tokenSize = sampleToken ? sampleToken.offsetWidth : 32;

        Object.keys(posGroups).forEach(posStr => {
          const pos = parseInt(posStr, 10);
          const playersAtPos = posGroups[pos];
          const k = playersAtPos.length;

          if (pos === 0) {
            // Position 0: tokens placed in starting dock
            const totalWidth = k * (tokenSize + 12);
            const startX = (dockRect.width - totalWidth) / 2 + tokenSize / 2;

            playersAtPos.forEach((p, idx) => {
              const el = document.getElementById('playerToken_' + p.id);
              if (!el) return;

              // Absolute coordinates relative to boardFrame
              const dockCenterX = dockRect.left - boardRect.left + startX + idx * (tokenSize + 12);
              const dockCenterY = dockRect.top - boardRect.top + dockRect.height / 2;

              el.style.left = dockCenterX + 'px';
              el.style.top = dockCenterY + 'px';
              el.style.transform = 'translate(-50%, -50%)';
            });
          } else {
            // Squares 1 to 20: calculate exact geometric center
            const cell = document.getElementById('squareCell_' + pos);
            if (!cell) return;
            const cellRect = cell.getBoundingClientRect();

            const centerX = cellRect.left - boardRect.left + cellRect.width / 2;
            const centerY = cellRect.top - boardRect.top + cellRect.height / 2;

            // Offset calculations for clustering
            // Lone token offset: exactly 0px on both axes!
            const offset = tokenSize * 0.40;

            playersAtPos.forEach((p, idx) => {
              const el = document.getElementById('playerToken_' + p.id);
              if (!el) return;

              let dx = 0;
              let dy = 0;

              if (k === 1) {
                dx = 0;
                dy = 0;
              } else if (k === 2) {
                // 2 players: left and right of center
                dx = idx === 0 ? -offset * 0.9 : offset * 0.9;
                dy = 0;
              } else if (k === 3) {
                // 3 players: two above and one below
                if (idx === 0) { dx = -offset * 0.8; dy = -offset * 0.7; }
                else if (idx === 1) { dx = offset * 0.8; dy = -offset * 0.7; }
                else { dx = 0; dy = offset * 0.7; }
              } else if (k === 4) {
                // 4 players: centered 2x2 cluster
                dx = (idx % 2 === 0 ? -1 : 1) * offset * 0.75;
                dy = (idx < 2 ? -1 : 1) * offset * 0.75;
              } else if (k >= 5) {
                // 5 players: 4 corners + 1 center
                if (idx === 0) { dx = -offset * 0.8; dy = -offset * 0.8; }
                else if (idx === 1) { dx = offset * 0.8; dy = -offset * 0.8; }
                else if (idx === 2) { dx = -offset * 0.8; dy = offset * 0.8; }
                else if (idx === 3) { dx = offset * 0.8; dy = offset * 0.8; }
                else { dx = 0; dy = 0; }
              }

              el.style.left = (centerX + dx) + 'px';
              el.style.top = (centerY + dy) + 'px';
              el.style.transform = 'translate(-50%, -50%)';
            });
          }
        });
      }

      /* --- SCOREBOARD & TURN UI --- */
      function updateScoreboard() {
        const board = document.getElementById('playerScoreboard');
        board.innerHTML = '';

        state.players.forEach((p, idx) => {
          const row = document.createElement('div');
          row.className = 'score-row' + (idx === state.activeIndex ? ' active-turn-row' : '');
          if (idx === state.activeIndex) {
            row.style.borderColor = p.color;
          }

          const info = document.createElement('div');
          info.className = 'score-player-info';

          const dot = document.createElement('span');
          dot.className = 'token-dot-indicator';
          dot.style.background = p.color;

          const nameSpan = document.createElement('span');
          nameSpan.textContent = p.name + (p.isCpu ? ' (CPU)' : '');

          info.appendChild(dot);
          info.appendChild(nameSpan);

          const trophies = document.createElement('div');
          trophies.className = 'score-trophies';
          trophies.setAttribute('aria-label', p.trophies + ' out of 5 trophies earned');
          trophies.textContent = '🏆 ' + p.trophies + '/5';

          row.appendChild(info);
          row.appendChild(trophies);
          board.appendChild(row);
        });

        // Update active player banner
        const activePlayer = state.players[state.activeIndex];
        if (activePlayer) {
          document.getElementById('activePlayerName').textContent = activePlayer.name;
          document.getElementById('activePlayerDot').style.background = activePlayer.color;
        }
      }

      function setStatus(text) {
        document.getElementById('turnStatusText').textContent = text;
        announceLive(text);
      }

      /* --- EXACT REALISTIC 3D DICE LOGIC --- */
      // Face rotations mapping for dice:
      // Value 1: Front face -> rotateX(0) rotateY(0)
      // Value 2: Right face -> rotateY(-90deg)
      // Value 3: Top face   -> rotateX(-90deg)
      // Value 4: Bottom face-> rotateX(90deg)
      // Value 5: Left face  -> rotateY(90deg)
      // Value 6: Back face  -> rotateY(180deg)
      const FACE_TARGET_ROTATIONS = {
        1: { x: 0,   y: 0 },
        2: { x: 0,   y: -90 },
        3: { x: -90, y: 0 },
        4: { x: 90,  y: 0 },
        5: { x: 0,   y: 90 },
        6: { x: 0,   y: 180 }
      };

      let currentSpinCount = 0;

      function rollDice() {
        if (state.busy || state.gameOver) return;
        state.busy = true;

        playSound('roll');
        setStatus('Rolling the dice...');

        const val = Math.floor(Math.random() * 6) + 1;
        state.rolledValue = val;

        // Multiple full rotations for 1s 3D animation
        currentSpinCount++;
        const target = FACE_TARGET_ROTATIONS[val];
        const extraTurnsX = 360 * (2 + (currentSpinCount % 2));
        const extraTurnsY = 360 * (3 + (currentSpinCount % 2));

        // Slight resting tilt: -12deg X, +16deg Y
        const finalX = extraTurnsX + target.x - 12;
        const finalY = extraTurnsY + target.y + 16;

        const cube = document.getElementById('diceCube');
        cube.style.transform = 'rotateX(' + finalX + 'deg) rotateY(' + finalY + 'deg)';

        setTimeout(() => {
          onDiceRollFinished(val);
        }, 1000);
      }

      function onDiceRollFinished(val) {
        const activePlayer = state.players[state.activeIndex];
        const moveBtn = document.getElementById('btnMoveAction');

        if (activePlayer.isCpu) {
          setStatus('CPU rolled a ' + val + '!');
          moveBtn.style.display = 'none';
          // CPU automatically moves after a readable delay
          setTimeout(() => {
            executeMove(val);
          }, 850);
        } else {
          setStatus(activePlayer.name + ' rolled a ' + val + '!');
          moveBtn.textContent = 'Move ' + val + (val === 1 ? ' space' : ' spaces');
          moveBtn.style.display = 'block';
          moveBtn.focus();
          state.busy = false; // Allow human to click the move button
        }
      }

      /* --- MOVEMENT & TURN LOGIC --- */
      async function executeMove(roll) {
        if (state.busy && !state.players[state.activeIndex].isCpu) return;
        state.busy = true;

        const moveBtn = document.getElementById('btnMoveAction');
        moveBtn.style.display = 'none';

        const player = state.players[state.activeIndex];
        const currentPos = player.pos;
        const targetPos = currentPos + roll;

        // Check Overshoot: roll exceeding 20 stays put
        if (targetPos > 20) {
          playSound('blocked');
          const msg = player.name + ' needs an exact roll. The token stays put.';
          setStatus(msg);
          await sleep(1500);
          finishTurn();
          return;
        }

        // Move one square at a time with hop animation and sound
        for (let p = currentPos + 1; p <= targetPos; p++) {
          player.pos = p;
          const tokenEl = document.getElementById('playerToken_' + player.id);
          if (tokenEl) {
            tokenEl.classList.remove('hop');
            void tokenEl.offsetWidth; // retrigger reflow
            tokenEl.classList.add('hop');
          }
          playSound('step');
          recalculateTokenPositions();
          await sleep(270);
        }

        // Check Exact Finish Win
        if (player.pos === 20) {
          triggerVictory(player, 'reached square 20!');
          return;
        }

        // Check Ladders
        if (LADDERS[player.pos]) {
          const dest = LADDERS[player.pos];
          playSound('ladder');
          setStatus('Ladder! ' + player.name + ' climbs to square ' + dest + '!');
          await sleep(600);
          player.pos = dest;
          recalculateTokenPositions();
          await sleep(600);

          if (player.pos === 20) {
            triggerVictory(player, 'reached square 20!');
            return;
          }
        }
        // Check Snakes
        else if (SNAKES[player.pos]) {
          const dest = SNAKES[player.pos];
          playSound('snake');
          setStatus('Oh no! A snake bites ' + player.name + ' and slides the token down to square ' + dest + '!');

          // Show large crying emoji
          const cryOverlay = document.getElementById('snakeCryOverlay');
          cryOverlay.classList.add('show');
          await sleep(800);
          cryOverlay.classList.remove('show');

          player.pos = dest;
          recalculateTokenPositions();
          await sleep(600);
        }

        finishTurn();
      }

      function finishTurn() {
        if (state.gameOver) return;

        state.activeIndex = (state.activeIndex + 1) % state.players.length;
        updateScoreboard();

        const nextPlayer = state.players[state.activeIndex];
        state.busy = false;

        if (nextPlayer.isCpu) {
          setStatus("CPU's turn...");
          // CPU automatically rolls after short readable delay
          setTimeout(() => {
            if (!state.busy && !state.gameOver) {
              rollDice();
            }
          }, 900);
        } else {
          setStatus(nextPlayer.name + "'s turn. Click the dice to roll.");
        }
      }

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      /* --- QUESTIONS, ANSWERS & TROPHIES --- */
      function openSquareQuestion(sqNum) {
        if (state.busy || state.gameOver) return;
        const activePlayer = state.players[state.activeIndex];
        if (activePlayer.isCpu) return; // Questions open only during human turn

        const record = state.questions[sqNum - 1];
        if (!record || !record.q || !record.q.trim()) {
          alert('No question is saved for square ' + sqNum + ' yet. Add it in settings.');
          return;
        }

        state.openSquare = sqNum;
        const modal = document.getElementById('questionModal');
        document.getElementById('modalTitle').textContent = 'Square ' + sqNum + ' question';
        document.getElementById('modalQuestionText').textContent = record.q;

        const input = document.getElementById('modalAnswerInput');
        input.value = '';
        const feedback = document.getElementById('modalFeedback');
        feedback.textContent = '';
        feedback.className = 'modal-feedback';

        modal.showModal();
        input.focus();
      }

      function checkModalAnswer() {
        if (!state.openSquare) return;
        const sqNum = state.openSquare;
        const record = state.questions[sqNum - 1];
        const input = document.getElementById('modalAnswerInput');
        const feedback = document.getElementById('modalFeedback');

        const userAns = normalizeAnswer(input.value);
        const targetAns = normalizeAnswer(record ? record.a : '');

        if (!userAns) {
          feedback.textContent = 'Please enter an answer!';
          feedback.className = 'modal-feedback wrong';
          playSound('wrong');
          return;
        }

        if (userAns !== targetAns) {
          feedback.textContent = 'Not quite—try again. Check spelling and spacing.';
          feedback.className = 'modal-feedback wrong';
          playSound('wrong');
          announceLive('Not quite—try again.');
          return;
        }

        // Correct Answer!
        const player = state.players[state.activeIndex];
        if (!player.earnedSquares.has(sqNum)) {
          player.earnedSquares.add(sqNum);
          player.trophies++;
          updateScoreboard();

          feedback.textContent = 'Correct! Trophy earned! ✨🏆';
          feedback.className = 'modal-feedback correct';
          playSound('trophy');
          announceLive('Correct! Trophy earned!');

          // Check 5-trophy win condition!
          if (player.trophies >= 5) {
            setTimeout(() => {
              const modal = document.getElementById('questionModal');
              modal.close();
              player.pos = 20;
              recalculateTokenPositions();
              triggerVictory(player, 'collected five trophies!');
            }, 800);
          }
        } else {
          feedback.textContent = 'Correct! You already earned the trophy for this square.';
          feedback.className = 'modal-feedback correct';
          playSound('correct');
        }
      }

      /* --- VICTORY & CONFETTI --- */
      function triggerVictory(player, reason) {
        state.gameOver = true;
        state.busy = true;

        playSound('victory');
        const overlay = document.getElementById('victoryOverlay');
        document.getElementById('victoryPlayerName').textContent = player.name + ' wins!';
        document.getElementById('victoryReason').textContent = reason;

        createConfetti();
        overlay.classList.add('active');
        document.getElementById('btnPlayAgain').focus();
        announceLive('Victory! ' + player.name + ' wins! Reason: ' + reason, true);
      }

      function createConfetti() {
        const container = document.getElementById('confettiContainer');
        container.innerHTML = '';
        const colors = ['#ffd85b', '#ff5d66', '#40e8ff', '#18a75b', '#8a4de1', '#ffffff', '#ff9800'];

        for (let i = 0; i < 90; i++) {
          const piece = document.createElement('div');
          piece.className = 'confetti-piece';
          piece.style.left = Math.random() * 100 + '%';
          piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          piece.style.width = (8 + Math.random() * 10) + 'px';
          piece.style.height = (12 + Math.random() * 14) + 'px';
          piece.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
          piece.style.animationDelay = (Math.random() * 3) + 's';
          container.appendChild(piece);
        }
      }

      /* --- RESTART & RESET LOGIC --- */
      function restartGame() {
        state.players.forEach(p => {
          p.pos = 0;
          p.trophies = 0;
          p.earnedSquares.clear();
        });
        state.activeIndex = 0;
        state.rolledValue = 0;
        state.busy = false;
        state.gameOver = false;
        state.openSquare = null;

        document.getElementById('victoryOverlay').classList.remove('active');
        document.getElementById('btnMoveAction').style.display = 'none';

        updateScoreboard();
        recalculateTokenPositions();
        setStatus(state.players[0].name + "'s turn. Click the dice to roll.");
      }

      function backToSettings() {
        document.getElementById('gameScreen').classList.remove('active');
        document.getElementById('settingsScreen').style.display = 'block';
        document.getElementById('victoryOverlay').classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      /* --- EVENT LISTENERS & SETUP --- */
      function attachEventListeners() {
        // Sound toggle
        const btnSound = document.getElementById('btnSoundToggle');
        btnSound.addEventListener('click', () => {
          soundEnabled = !soundEnabled;
          btnSound.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
          btnSound.textContent = soundEnabled ? '🔊 Sound on' : '🔇 Sound off';
          if (soundEnabled) {
            getAudioContext();
            playSound('save');
          }
        });

        // Mode cards
        const btnModeCpu = document.getElementById('btnModeCpu');
        const btnModePlayers = document.getElementById('btnModePlayers');
        const picker = document.getElementById('playerCountPicker');

        btnModeCpu.addEventListener('click', () => {
          state.mode = 'cpu';
          btnModeCpu.setAttribute('aria-pressed', 'true');
          btnModePlayers.setAttribute('aria-pressed', 'false');
          picker.style.display = 'none';
          renderNameInputs();
        });

        btnModePlayers.addEventListener('click', () => {
          state.mode = 'players';
          btnModePlayers.setAttribute('aria-pressed', 'true');
          btnModeCpu.setAttribute('aria-pressed', 'false');
          picker.style.display = 'flex';
          renderNameInputs();
        });

        // Player count chips
        document.querySelectorAll('.count-chip-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.count-chip-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');
            state.playerCount = parseInt(btn.getAttribute('data-count'), 10);
            renderNameInputs();
          });
        });

        // Save player names button
        document.getElementById('btnSaveNames').addEventListener('click', () => {
          const count = state.mode === 'cpu' ? 2 : state.playerCount;
          state.savedNames = [];

          for (let i = 0; i < count; i++) {
            const input = document.getElementById('nameInputP' + (i + 1));
            const val = input ? input.value.trim().slice(0, 22) : '';
            state.savedNames.push(val);
          }

          try {
            localStorage.setItem('snakeTrailNames', JSON.stringify(state.savedNames));
            const statusEl = document.getElementById('namesStatusMsg');
            statusEl.textContent = '✓ ' + count + ' names saved';
            statusEl.className = 'names-status-msg saved';
            playSound('save');
          } catch (e) {
            console.warn('Failed to save names to localStorage:', e);
          }
        });

        // Bulk question import
        document.getElementById('btnBulkImport').addEventListener('click', () => {
          const qText = document.getElementById('bulkQuestionsInput').value;
          const aText = document.getElementById('bulkAnswersInput').value;
          const statusEl = document.getElementById('bulkStatusMsg');

          const qLines = qText.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
          const aLines = aText.split('\\n').map(l => l.trim()).filter(l => l.length > 0);

          if (qLines.length === 0 || aLines.length === 0) {
            statusEl.textContent = 'Please enter both questions and answers.';
            statusEl.className = 'editor-status-msg error';
            playSound('wrong');
            return;
          }

          if (qLines.length !== aLines.length) {
            statusEl.textContent = 'Count mismatch! Found ' + qLines.length + ' questions and ' + aLines.length + ' answers. Counts must match.';
            statusEl.className = 'editor-status-msg error';
            playSound('wrong');
            return;
          }

          const countToLoad = Math.min(20, qLines.length);
          for (let i = 0; i < countToLoad; i++) {
            state.questions[i] = {
              q: qLines[i],
              a: aLines[i]
            };
          }

          saveQuestionsToStorage();
          updateBoardQuestionIndicators();
          updateSingleSquareInputs();

          statusEl.textContent = '✓ Successfully loaded ' + countToLoad + ' questions!';
          statusEl.className = 'editor-status-msg success';
          playSound('save');
        });

        // Single square save
        document.getElementById('btnSaveSingleSquare').addEventListener('click', () => {
          const sq = parseInt(document.getElementById('selectSquareNum').value, 10);
          const q = document.getElementById('singleQuestionInput').value.trim();
          const a = document.getElementById('singleAnswerInput').value.trim();
          const statusEl = document.getElementById('singleStatusMsg');

          if (!q) {
            statusEl.textContent = 'Please provide question text.';
            statusEl.className = 'editor-status-msg error';
            playSound('wrong');
            return;
          }

          state.questions[sq - 1] = { q, a };
          saveQuestionsToStorage();
          updateBoardQuestionIndicators();

          statusEl.textContent = '✓ Saved question for square ' + sq + '!';
          statusEl.className = 'editor-status-msg success';
          playSound('save');
        });

        // Single square clear
        document.getElementById('btnClearSingleSquare').addEventListener('click', () => {
          const sq = parseInt(document.getElementById('selectSquareNum').value, 10);
          state.questions[sq - 1] = { q: '', a: '' };
          document.getElementById('singleQuestionInput').value = '';
          document.getElementById('singleAnswerInput').value = '';
          saveQuestionsToStorage();
          updateBoardQuestionIndicators();

          const statusEl = document.getElementById('singleStatusMsg');
          statusEl.textContent = '✓ Cleared square ' + sq + '!';
          statusEl.className = 'editor-status-msg success';
          playSound('save');
        });

        // Start game button
        document.getElementById('btnStartGame').addEventListener('click', () => {
          getAudioContext();
          initGamePlayers();
          buildBoardDOM();
          renderTokensDOM();
          updateScoreboard();

          document.getElementById('settingsScreen').style.display = 'none';
          document.getElementById('gameScreen').classList.add('active');

          setStatus(state.players[0].name + "'s turn. Click the dice to roll.");
          playSound('save');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Game nav buttons
        document.getElementById('btnBackToSettings').addEventListener('click', backToSettings);
        document.getElementById('btnRestartGame').addEventListener('click', restartGame);

        // Dice button
        document.getElementById('btnDiceStationary').addEventListener('click', rollDice);

        // Move action button
        document.getElementById('btnMoveAction').addEventListener('click', () => {
          executeMove(state.rolledValue);
        });

        // Modal buttons & keyboard controls
        document.getElementById('btnCheckAnswer').addEventListener('click', checkModalAnswer);
        document.getElementById('btnCloseModal').addEventListener('click', () => {
          document.getElementById('questionModal').close();
        });

        document.getElementById('modalAnswerInput').addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            checkModalAnswer();
          }
        });

        // Play again button
        document.getElementById('btnPlayAgain').addEventListener('click', () => {
          restartGame();
        });

        // Window resize repositioning
        window.addEventListener('resize', () => {
          recalculateTokenPositions();
        });
      }

      /* --- INITIAL BOOTSTRAP --- */
      function init() {
        loadSavedData();
        renderNameInputs();
        setupSingleSquareSelector();
        attachEventListeners();
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }

    })();
  </script>
</body>
</html>`;

fs.writeFileSync("index.html", html);
fs.writeFileSync("snake-learning-game-latest-edition.html", html);
console.log("Both index.html and snake-learning-game-latest-edition.html generated successfully!");
