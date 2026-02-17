import { useState, useEffect, useRef, useCallback } from "react";

import { IMG, CHARS, CHAPTER_BG, ROUTE_BG }          from './data/assets.js';
import { INITIAL_STATE, resolveActs, calcEnding, resolveText, checkCondition } from './engine/gameEngine.js';
import { SCENARIO_1_5 }                               from './data/scenario_1_5.js';
import { SCENARIO_6_10 }                              from './data/scenario_6_10.js';
import { Petals, Corners, Toast, CharDisplay, StatPanel, EvidenceCounter, EndingScreen } from './components/UIComponents.jsx';
import PuzzleOverlay                                  from './components/PuzzleOverlay.jsx';
import { GLOBAL_CSS }                                 from './styles/globalCss.js';

const SCENARIO = [...SCENARIO_1_5, ...SCENARIO_6_10];

// ─── 워드로브 ─────────────────────────────────────────────────────────────
function WardrobeScreen({ onSelect }) {
  const dresses = [
    { name:'로즈골드 야회복',     desc:'사교계를 장악할 우아함. 차갑게, 하지만 완벽하게.', stat:'magic',    val:20, color:'#c9956a', icon:'✦', detail:'마력 +20'  },
    { name:'크림슨 벨벳 드레스',  desc:'시선을 사로잡는 치명적 매혹. 악녀다운 선택.',      stat:'charm',    val:20, color:'#c44060', icon:'♥', detail:'매력 +20'  },
    { name:'미드나잇 새틴 드레스', desc:'냉철한 귀족의 지적 아름다움.',                     stat:'intel',    val:20, color:'#7ab8d4', icon:'◆', detail:'지성 +20'  },
  ];
  return (
    <div className="gr" style={{minHeight:700}}>
      <style>{GLOBAL_CSS}</style>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 30%,rgba(139,26,58,.2) 0%,transparent 50%),#06040f'}}/>
      <Petals/><Corners/>
      <div style={{position:'relative',zIndex:10,padding:'48px 26px 26px',minHeight:700,display:'flex',flexDirection:'column'}}>
        <div style={{textAlign:'center',marginBottom:26,animation:'fadeUp .6s ease-out'}}>
          <p style={{fontFamily:'Cinzel',fontSize:9,letterSpacing:'.3em',color:'rgba(201,149,106,.52)',marginBottom:10}}>DRESS ROOM</p>
          <h2 style={{fontFamily:'Cormorant Garamond',fontSize:25,fontWeight:300,color:'#f0d9b5',letterSpacing:'.05em',marginBottom:10}}>무도회를 위한 선택</h2>
          <div className="gold-line" style={{width:88,margin:'0 auto'}}/>
          <p style={{fontSize:11,color:'rgba(240,230,211,.38)',marginTop:10}}>이 선택은 이후 대화에 영향을 줍니다</p>
        </div>
        <div style={{flex:1}}>
          {dresses.map((d, i) => (
            <div key={d.name} className="wcard" onClick={() => onSelect(d.stat, d.val)} style={{animation:`fadeUp .5s ${i*.1}s ease-out both`}}>
              <div style={{display:'flex',alignItems:'center',gap:13}}>
                <div style={{width:42,height:42,borderRadius:'50%',background:`radial-gradient(circle,${d.color}22,${d.color}08)`,border:`1px solid ${d.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,color:d.color,flexShrink:0}}>{d.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:'Noto Serif KR',fontSize:15,fontWeight:600,color:'#f0d9b5',marginBottom:3}}>{d.name}</div>
                  <div style={{fontSize:11,color:'rgba(240,230,211,.42)',marginBottom:5}}>{d.desc}</div>
                  <div style={{fontFamily:'Cinzel',fontSize:10,color:d.color,letterSpacing:'.05em'}}>{d.detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 타이틀 ───────────────────────────────────────────────────────────────
function TitleScreen({ onStart }) {
  const [anim, setAnim] = useState(false);
  useEffect(() => { setTimeout(() => setAnim(true), 350); }, []);

  return (
    <div className="gr" style={{minHeight:700, position: 'relative', overflow: 'hidden'}}>
      <style>{GLOBAL_CSS}</style>
      
      {/* 1. 배경 그라데이션 대신 비디오를 넣습니다 */}
      <video 
        src={IMG.intro_video} 
        autoPlay 
        loop 
        muted 
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />

      {/* 2. 비디오 위에 살짝 어두운 덮개를 씌워 글자를 잘 보이게 합니다 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(6,4,15,0.4)', // 숫자를 높일수록 더 어두워집니다
        zIndex: 1
      }}/>

      <Petals/><Corners/>

      {/* 기존 라인 장식들 (zIndex를 조절해 비디오 위에 오게 합니다) */}
      <div style={{position:'absolute',left:36,top:0,bottom:0,width:1,background:'linear-gradient(180deg,transparent,rgba(201,149,106,.25) 30%,rgba(201,149,106,.25) 70%,transparent)',zIndex:3}}/>
      <div style={{position:'absolute',right:36,top:0,bottom:0,width:1,background:'linear-gradient(180deg,transparent,rgba(201,149,106,.25) 30%,rgba(201,149,106,.25) 70%,transparent)',zIndex:3}}/>

      {/* 중앙 콘텐츠 영역 */}
      <div style={{position:'relative',zIndex:10,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:700,padding:'40px 50px',textAlign:'center'}}>
        <div style={{fontSize:36,marginBottom:18,animation:'crownF 3s ease-in-out infinite',filter:'drop-shadow(0 0 18px rgba(201,149,106,.85))'}}>♛</div>
        <div className="gold-line" style={{width:110,marginBottom:22}}/>
        <h1 style={{fontFamily:'Cinzel',fontWeight:700,fontSize:30,lineHeight:1.38,color:'#f0d9b5',letterSpacing:'.08em',textShadow:'0 0 40px rgba(201,149,106,.5)',animation:anim?'titleR 1.2s ease-out forwards':'none',opacity:0,marginBottom:8}}>레아나의<br/>생존 법칙</h1>
        <p style={{fontFamily:'Cormorant Garamond',fontStyle:'italic',fontSize:13,color:'rgba(201,149,106,.62)',letterSpacing:'.05em',marginBottom:6,animation:anim?'fadeUp 1.2s .4s ease-out forwards':'none',opacity:0}}>Lex Survivalis Leana</p>
        <div className="gold-line" style={{width:110,marginBottom:34}}/>
        <p style={{fontSize:13,lineHeight:1.95,color:'rgba(240,230,211,.52)',marginBottom:20,animation:anim?'fadeUp 1s .6s ease-out forwards':'none',opacity:0}}>악녀에 빙의했다.<br/>모든 선택이 기억된다.<br/>목표는 오직 하나 — 생존.</p>
        <p style={{fontSize:10,color:'rgba(201,149,106,.35)',fontFamily:'Cinzel',letterSpacing:'.15em',marginBottom:36,animation:anim?'fadeUp 1s .7s ease-out forwards':'none',opacity:0}}>10 CHAPTERS  ·  8 ENDINGS  ·  FULL BRANCHING</p>
        <button className="btn-start" onClick={onStart} style={{animation:anim?'fadeUp 1s .9s ease-out forwards':'none',opacity:0}}>운명을 시작하다</button>
      </div>
    </div>
  );
}

// ─── 메인 앱 ──────────────────────────────────────────────────────────────
export default function App() {
  const [screen,     setScreen]     = useState('title');
  const [chapter,    setChapter]    = useState(0);
  const [sceneIdx,   setSceneIdx]   = useState(0);
  const [stats,      setStats]      = useState(INITIAL_STATE.stats);
  const [affinity,   setAffinity]   = useState(INITIAL_STATE.affinity);
  const [flags,      setFlags]      = useState(INITIAL_STATE.flags);
  const [activeChar, setActiveChar] = useState(null);
  const [charImg,    setCharImg]    = useState(null);
  const [sceneBg,    setSceneBg]    = useState(null);
  const [endingType, setEndingType] = useState(null);
  const [charVis,    setCharVis]    = useState(false);
  const [textKey,    setTextKey]    = useState(0);
  const [toast,      setToast]      = useState(null);
  const [panelOpen,  setPanelOpen]  = useState(false);
  const [puzzle,     setPuzzle]     = useState(null);

  const prevChar = useRef(null);
  const stateRef = useRef({ stats, affinity, flags, chapter, sceneIdx });
  stateRef.current = { stats, affinity, flags, chapter, sceneIdx };

  useEffect(() => {
    if (activeChar !== prevChar.current) {
      setCharVis(false);
      setTimeout(() => setCharVis(true), 160);
      prevChar.current = activeChar;
    }
  }, [activeChar]);

  const showToast = useCallback((msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2400);
  }, []);

  const applyScene = useCallback((ch, si, charOverride) => {
    const chData = SCENARIO[ch];
    if (!chData) return;
    const scene = chData.scenes[si];
    if (!scene) return;
    setChapter(ch); setSceneIdx(si); setTextKey(k => k + 1);
    setActiveChar(charOverride ?? scene.char ?? null);
    setSceneBg(scene.bg ?? null);
    setCharImg(scene.imgOverride ?? null);
  }, []);

  const nextScene = useCallback(() => {
    const { chapter: ch, sceneIdx: si, flags: fl, stats: st, affinity: af } = stateRef.current;
    const scenes = SCENARIO[ch]?.scenes ?? [];
    setTextKey(k => k + 1);

    let nextIdx = si + 1;
    while (nextIdx < scenes.length) {
      const s = scenes[nextIdx];
      const condOk = !s.condition || checkCondition(s.condition, fl, st, af);
      if (condOk && s.text !== null) break;
      nextIdx++;
    }

    if (nextIdx < scenes.length) {
      const s = scenes[nextIdx];
      setSceneIdx(nextIdx);
      setActiveChar(s.char ?? null);
      setSceneBg(s.bg ?? null);
      setCharImg(s.imgOverride ?? null);
    } else {
      const nc = ch + 1;
      if (nc < SCENARIO.length) {
        const s0 = SCENARIO[nc].scenes[0];
        setChapter(nc); setSceneIdx(0);
        setActiveChar(s0.char ?? null);
        setSceneBg(null); setCharImg(null);
      }
    }
  }, []);

  const runActs = useCallback((acts) => {
    const cur = stateRef.current;
    const updates = resolveActs(acts, { stats: cur.stats, affinity: cur.affinity, flags: cur.flags });
    setStats(updates.stats);
    setAffinity(updates.affinity);
    setFlags(updates.flags);

    let navigated = false;
    for (const fx of updates.sideEffects) {
      if (fx.type === 'toast')  showToast(fx.msg, fx.color);
      if (fx.type === 'screen') setScreen(fx.v);
      if (fx.type === 'puzzle') setPuzzle(fx.puzzleId);
      if (fx.type === 'ending' && !navigated) {
        const type = calcEnding(updates.stats, updates.affinity, updates.flags);
        setEndingType(type); setScreen('ending'); navigated = true;
      }
      if (fx.type === 'goto' && !navigated) {
        applyScene(fx.ch, fx.si, fx.char); navigated = true;
      }
      if (fx.type === 'next' && !navigated) {
        nextScene(); navigated = true;
      }
    }
  }, [showToast, applyScene, nextScene]);

  const reset = useCallback(() => {
    setScreen('title'); setChapter(0); setSceneIdx(0);
    setStats(INITIAL_STATE.stats); setAffinity(INITIAL_STATE.affinity); setFlags(INITIAL_STATE.flags);
    setActiveChar(null); setCharImg(null); setSceneBg(null);
    setEndingType(null); setPanelOpen(false); setPuzzle(null);
  }, []);

  const handleDressSelect = useCallback((statKey, val) => {
    setStats(p => ({ ...p, [statKey]: Math.min(100, p[statKey] + val) }));
    setChapter(1); setSceneIdx(0);
    setActiveChar(SCENARIO[1].scenes[0].char ?? null);
    setScreen('play');
  }, []);

  const handlePuzzleComplete = useCallback((solved) => {
    setPuzzle(null);
    if (solved) {
      setFlags(p => ({ ...p, puzzleSolved: true }));
      showToast('암호가 해독됐다. 결정적인 단서를 확보했다.', '#a070d8');
    }
    nextScene();
  }, [showToast, nextScene]);

  // ── 화면 분기 ────────────────────────────────────────────────────────
  if (screen === 'title')    return <TitleScreen onStart={() => setScreen('play')}/>;
  if (screen === 'wardrobe') return <WardrobeScreen onSelect={handleDressSelect}/>;

  if (screen === 'ending') return (
    <div className="gr" style={{minHeight:700}}>
      <style>{GLOBAL_CSS}</style>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,rgba(201,149,106,.1) 0%,#06040f 62%)'}}/>
      <Petals/><Corners/>
      <EndingScreen endingType={endingType} stats={stats} affinity={affinity} flags={flags} onRestart={reset}/>
    </div>
  );

  // ── PLAY ─────────────────────────────────────────────────────────────
  const chData = SCENARIO[chapter];
  const currentScene = chData?.scenes[sceneIdx];
  if (!currentScene || currentScene.text === null) {
    setTimeout(nextScene, 0); return null;
  }

  const ch = activeChar ? CHARS[activeChar] : null;
  const displayText = resolveText(currentScene, flags, stats, affinity);
  const isFullscreenLeana = !activeChar && currentScene.fullscreenLeana;

  let bgKey = sceneBg;
  if (!bgKey) {
    if (chapter === 8)      bgKey = activeChar ? ROUTE_BG[activeChar]?.ch9  : null;
    else if (chapter === 9) bgKey = activeChar ? ROUTE_BG[activeChar]?.ch10 : null;
    else                    bgKey = CHAPTER_BG[chapter] ?? null;
  }
  const bgSrc = bgKey ? IMG[bgKey] : null;

  const leanaImg = chapter >= 5
    ? (flags.rumorSource !== 'none' ? IMG.leanaResolve : IMG.leanaCrisis)
    : IMG.leana;

  const visibleChoices = currentScene.choices?.filter(c =>
    !c.condition || checkCondition(c.condition, flags, stats, affinity)
  );

  const dboxHeight = visibleChoices ? 80 + visibleChoices.length * 62 : 120;

  return (
    <div className="gr" style={{minHeight:700}}>
      <style>{GLOBAL_CSS}</style>

      {bgSrc ? (
        <div style={{position:'absolute',inset:0,zIndex:0,overflow:'hidden'}}>
          <img src={bgSrc} alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',opacity:.52,filter:'brightness(.68)'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(6,4,15,.45) 0%,rgba(6,4,15,.22) 40%,rgba(6,4,15,.72) 100%)'}}/>
        </div>
      ) : (
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 20% 30%,rgba(139,26,58,.16) 0%,transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(90,30,120,.14) 0%,transparent 50%),#06040f'}}/>
      )}
      <Petals/>

      {/* 레아나 풀스크린 (특정 씬) */}
      {isFullscreenLeana && (
        <div style={{
          position:'absolute', top:0, left:0, right:0, bottom:0,
          zIndex:8, pointerEvents:'none',
        }}>
          {/* 글로우 */}
          <div style={{
            position:'absolute', bottom: dboxHeight, left:'50%', transform:'translateX(-50%)',
            width:'80%', height:200,
            background:'radial-gradient(ellipse at center bottom,rgba(201,149,106,.2) 0%,transparent 65%)',
            animation:'glowP 3s ease-in-out infinite',
          }}/>
          <img
            src={leanaImg}
            alt="레아나"
            style={{
              position:'absolute',
              bottom: dboxHeight,
              left:'50%',
              transform:'translateX(-50%)',
              height: `calc(100% - ${dboxHeight + 34}px)`,
              width:'auto',
              maxWidth:'100%',
              objectFit:'contain',
              objectPosition:'center bottom',
              filter:'drop-shadow(0 0 28px rgba(201,149,106,.35))',
              animation:'charIn .8s cubic-bezier(.4,0,.2,1) forwards',
            }}
          />
        </div>
      )}

      {/* 레아나 소형 고스트 (일반 내레이션 씬) */}
      {!activeChar && !isFullscreenLeana && (
  <div style={{
    position:'absolute',bottom:dboxHeight+20,right:10, // 위치를 살짝 안쪽으로 조정
    width:150, height:150, // 네모난(Square) 크기 지정
    zIndex:5, opacity:.2, pointerEvents:'none',
    overflow: 'hidden', // 영역 밖으로 나가는 이미지 숨김
    // 마스크를 제거하거나, 상단 페이드만 남겨서 '네모난' 느낌을 살립니다.
    maskImage:'linear-gradient(180deg, black 80%, transparent 100%)',
    WebkitMaskImage:'linear-gradient(180deg, black 80%, transparent 100%)'
  }}>
    <img 
      src={leanaImg} 
      alt="" 
      style={{
        width:'100%', height:'100%', 
        objectFit:'cover', // 가로가 길어도 중앙을 기준으로 네모나게 채움
        display:'block'
      }}
    />
  </div>
)}

      {puzzle && (
        <PuzzleOverlay
          puzzleId={puzzle}
          flags={flags}
          onComplete={handlePuzzleComplete}
          onSkip={() => { setPuzzle(null); nextScene(); }}
        />
      )}

      <Toast toast={toast}/>

      <div style={{position:'absolute',top:0,left:0,right:0,zIndex:30,background:'rgba(6,4,15,.92)',backdropFilter:'blur(10px)',borderBottom:'1px solid rgba(201,149,106,.2)',padding:'7px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontFamily:'Cinzel',fontSize:7.5,color:'rgba(201,149,106,.6)',letterSpacing:'.08em',flex:1,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{chData?.title}</span>
        <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
          <EvidenceCounter count={flags.evidenceCount}/>
          <span style={{fontSize:7.5,color:stats.infamy>50?'#c44060':'rgba(201,149,106,.48)',fontFamily:'Cinzel'}}>{stats.infamy>50?'⚠ ':''}악명 {stats.infamy}</span>
        </div>
      </div>

      {activeChar && <CharDisplay charKey={activeChar} imgOverride={charImg} visible={charVis}/>}

      <div style={{position:'absolute',bottom:0,left:0,right:0,height:dboxHeight+80,zIndex:40,pointerEvents:'none',background:'linear-gradient(180deg,transparent 0%,rgba(6,4,15,.6) 45%,rgba(6,4,15,.97) 100%)'}}/>

      <div className="dbox">
        {ch && (
          <div style={{marginBottom:8,display:'flex',alignItems:'center',gap:7}}>
            <div style={{width:3,height:14,background:ch.color,borderRadius:2}}/>
            <span style={{fontFamily:'Cinzel',fontSize:11,color:ch.color,letterSpacing:'.1em'}}>{ch.name}</span>
          </div>
        )}
        <p key={textKey} style={{fontSize:13.5,lineHeight:1.88,marginBottom:visibleChoices?13:10,fontWeight:300,letterSpacing:'.02em',animation:'fadeIn .5s ease-out',color:'#ede0cc'}}>
          {displayText}
        </p>
        {visibleChoices && visibleChoices.length > 0 ? (
          <div>
            {visibleChoices.map((c, i) => {
              const rawLabel = typeof c.text === 'function' ? c.text(flags, stats, affinity) : c.text;
              const label = rawLabel.replace(/\s*✦.*$/, '').trim();
              return (
                <button key={c.id ?? i} className="btn-choice" onClick={() => runActs(c.acts)} style={{animationDelay:`${i*.07}s`,animation:'slideUp .4s ease-out both'}}>
                  <span style={{color:'rgba(201,149,106,.5)',marginRight:7,fontSize:10}}>▸</span>{label}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <button className="btn-next" onClick={nextScene}>계속 읽기 ›</button>
          </div>
        )}
      </div>

      <StatPanel affinity={affinity} stats={stats} open={panelOpen} setOpen={setPanelOpen} dboxHeight={dboxHeight}/>
    </div>
  );
}
