export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Noto+Serif+KR:wght@300;400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .gr {
    width: 100%;
    max-width: 390px;
    min-height: 700px;
    background: #06040f;
    position: relative;
    overflow: hidden;
    font-family: 'Noto Serif KR','Cormorant Garamond',serif;
    color: #f0e6d3;
    margin: 0 auto;
    border: 1px solid rgba(201,149,106,0.3);
  }

  @keyframes floatPetal {
    0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
    10%  { opacity: .55; }
    85%  { opacity: .25; }
    100% { transform: translateY(-680px) rotate(420deg) translateX(30px); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
  @keyframes slideR   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes charIn   {
    0%   { opacity:0; transform:scale(.96) translateX(-18px); filter:blur(6px) brightness(.4); }
    100% { opacity:1; transform:scale(1)   translateX(0);     filter:blur(0)   brightness(1);  }
  }
  @keyframes glowP    { 0%,100%{opacity:.45} 50%{opacity:.9} }
  @keyframes hbeat    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.28)} }
  @keyframes crownF   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes titleR   { 0%{opacity:0;letter-spacing:.45em} 100%{opacity:1;letter-spacing:.08em} }
  @keyframes flagPop  {
    0%  {opacity:0;transform:scale(.8) translateY(10px)}
    60% {transform:scale(1.05) translateY(-2px)}
    100%{opacity:1;transform:scale(1) translateY(0)}
  }
  @keyframes panelSlide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulse    { 0%,100%{opacity:.7} 50%{opacity:1} }

  .gold-line {
    height: 1px;
    background: linear-gradient(90deg,transparent,#c9956a,#f0d9b5,#c9956a,transparent);
    background-size: 200% auto;
    animation: shimmer 3s linear infinite;
  }

  /* ── 버튼들 ─────────────────────────────────────────────────────────── */
  .btn-choice {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg,rgba(139,26,58,.82) 0%,rgba(55,7,20,.95) 100%);
    border: 1px solid rgba(201,149,106,.5);
    color: #f0e6d3;
    font-family: 'Noto Serif KR',serif;
    font-size: 12.5px; line-height: 1.55;
    padding: 11px 15px;
    border-radius: 2px; cursor: pointer;
    transition: all .3s; text-align: left;
    width: 100%; margin-bottom: 6px;
  }
  .btn-choice::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(201,149,106,.12),transparent);
    opacity:0; transition:opacity .3s;
  }
  .btn-choice:hover::before { opacity:1; }
  .btn-choice:hover {
    border-color:rgba(201,149,106,.9);
    transform:translateX(4px);
    box-shadow:0 4px 20px rgba(139,26,58,.4);
  }
  .btn-choice:disabled {
    opacity: 0.3; cursor: not-allowed; transform: none;
  }

  .btn-next {
    background:transparent; border:none;
    color:#c9956a; font-family:'Cinzel',serif;
    font-size:11px; cursor:pointer; letter-spacing:.12em;
    padding:6px 10px; transition:all .2s;
  }
  .btn-next:hover { color:#f0d9b5; text-shadow:0 0 12px rgba(201,149,106,.8); }

  .btn-start {
    background:linear-gradient(135deg,rgba(139,26,58,.85),rgba(60,8,22,.95));
    border:1px solid rgba(201,149,106,.65);
    color:#f0d9b5; font-family:'Cinzel',serif;
    font-size:13px; letter-spacing:.22em;
    padding:15px 46px; border-radius:2px; cursor:pointer;
    box-shadow:0 4px 24px rgba(139,26,58,.4); transition:all .3s;
  }
  .btn-start:hover { box-shadow:0 6px 32px rgba(201,149,106,.35); transform:translateY(-1px); }

  .btn-restart {
    background:transparent; border:1px solid rgba(201,149,106,.6);
    color:#c9956a; font-family:'Cinzel',serif;
    font-size:11px; letter-spacing:.2em;
    padding:11px 34px; border-radius:2px; cursor:pointer; transition:all .3s;
  }
  .btn-restart:hover { border-color:#c9956a; color:#f0d9b5; }

  /* ── 드레스 카드 ─────────────────────────────────────────────────────── */
  .wcard {
    border:1px solid rgba(201,149,106,.28); border-radius:4px;
    background:linear-gradient(135deg,rgba(201,149,106,.04),rgba(139,26,58,.07));
    padding:16px 18px; cursor:pointer; transition:all .3s; margin-bottom:13px;
  }
  .wcard:hover {
    border-color:rgba(201,149,106,.8);
    background:linear-gradient(135deg,rgba(201,149,106,.1),rgba(139,26,58,.14));
    transform:translateY(-2px); box-shadow:0 8px 24px rgba(139,26,58,.28);
  }

  /* ── 장식 코너 ───────────────────────────────────────────────────────── */
  .corner { position:absolute; width:22px; height:22px; border-color:rgba(201,149,106,.42); border-style:solid; }
  .ctl { top:8px;    left:8px;   border-width:1px 0 0 1px; }
  .ctr { top:8px;    right:8px;  border-width:1px 1px 0 0; }
  .cbl { bottom:8px; left:8px;   border-width:0 0 1px 1px; }
  .cbr { bottom:8px; right:8px;  border-width:0 1px 1px 0; }

  /* ── 게이지 바 ───────────────────────────────────────────────────────── */
  .sbar  { height:3px; background:rgba(255,255,255,.08); border-radius:2px; overflow:hidden; flex:1; }
  .sfill { height:100%; border-radius:2px; transition:width .6s cubic-bezier(.4,0,.2,1); }

  /* ── 다이얼로그 박스 ─────────────────────────────────────────────────── */
  .dbox {
    position:absolute; bottom:0; left:0; right:0;
    background:linear-gradient(180deg,rgba(6,4,15,.8) 0%,rgba(8,4,18,.97) 100%);
    backdrop-filter:blur(14px);
    border-top:1px solid rgba(201,149,106,.32);
    padding:14px 16px 18px;
    z-index:50; animation:slideUp .38s ease-out;
  }

  /* ── 스탯 패널 ───────────────────────────────────────────────────────── */
  .stat-panel {
    position:absolute; right:0; z-index:45;
    background:rgba(6,4,15,.92); backdrop-filter:blur(10px);
    border-left:1px solid rgba(201,149,106,.2);
    border-top:1px solid rgba(201,149,106,.2);
    border-top-left-radius:6px;
    width:132px; overflow:hidden;
    animation:panelSlide .4s ease-out;
  }
  .stat-panel-toggle {
    width:100%; background:transparent;
    border:none; border-bottom:1px solid rgba(201,149,106,.15);
    color:rgba(201,149,106,.7); font-family:'Cinzel',serif;
    font-size:7px; letter-spacing:.2em; padding:6px 10px;
    cursor:pointer; display:flex; justify-content:space-between; align-items:center;
    transition:background .2s;
  }
  .stat-panel-toggle:hover { background:rgba(201,149,106,.06); }
  .stat-panel-body { padding:8px 10px 10px; }

  /* ── 플래그 배지 ─────────────────────────────────────────────────────── */
  .flag-badge {
    display:inline-block; font-family:'Cinzel',serif;
    font-size:7.5px; letter-spacing:.08em;
    padding:3px 7px; border-radius:2px;
    margin-right:3px; margin-bottom:3px;
    animation:flagPop .5s ease-out forwards;
  }

  /* ── 캐릭터 이미지 ───────────────────────────────────────────────────── */
  .char-img {
    display:block; width:auto; height:400px;
    object-fit:contain; object-position:center top;
    z-index:2; animation:charIn .65s cubic-bezier(.4,0,.2,1) forwards;
    filter:drop-shadow(0 0 20px var(--char-glow,rgba(200,150,100,.4)));
  }
`;
