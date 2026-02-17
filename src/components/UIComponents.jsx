import { useState } from 'react';
import { CHARS, STAT_CFG, IMG, ENDINGS } from '../data/assets.js';

// ─── 꽃잎 파티클 ──────────────────────────────────────────────────────────
export const Petals = () => {
  const ps = Array.from({length: 9}, (_, i) => ({
    id: i,
    left: `${12 + Math.random() * 76}%`,
    delay: `${Math.random() * 10}s`,
    dur: `${7 + Math.random() * 9}s`,
    size: `${6 + Math.random() * 5}px`,
    hue: `rgba(${(160 + Math.random() * 50)|0},${(30 + Math.random() * 20)|0},${(50 + Math.random() * 20)|0},.55)`,
  }));
  return (
    <>
      {ps.map(p => (
        <div key={p.id} style={{
          position: 'absolute', bottom: '-15px', left: p.left,
          width: p.size, height: p.size, zIndex: 3, pointerEvents: 'none',
          background: `radial-gradient(ellipse,${p.hue},transparent)`,
          borderRadius: '50% 0 50% 0',
          animation: `floatPetal ${p.dur} ${p.delay} linear infinite`,
        }}/>
      ))}
    </>
  );
};

// ─── 코너 장식 ────────────────────────────────────────────────────────────
export const Corners = () => (
  <>
    <div className="corner ctl"/>
    <div className="corner ctr"/>
    <div className="corner cbl"/>
    <div className="corner cbr"/>
  </>
);

// ─── 플래그 배지 ──────────────────────────────────────────────────────────
export const FlagBadge = ({ label, color }) => (
  <span className="flag-badge" style={{
    background: `${color}18`,
    border: `1px solid ${color}44`,
    color,
  }}>
    {label}
  </span>
);

// ─── 토스트 알림 ──────────────────────────────────────────────────────────
export const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div style={{
      position: 'absolute', top: 52, left: 16, right: 16, zIndex: 100,
      background: 'rgba(6,4,15,.95)',
      border: `1px solid ${toast.color}55`,
      borderRadius: 3, padding: '9px 13px',
      animation: 'flagPop .4s ease-out',
      fontFamily: 'Noto Serif KR', fontSize: 12, color: toast.color,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{fontSize: 14}}>✦</span>{toast.msg}
    </div>
  );
};

// ─── 캐릭터 표시 ──────────────────────────────────────────────────────────
export const CharDisplay = ({ charKey, imgOverride, visible }) => {
  const ch = CHARS[charKey];
  if (!ch) return null;
  const imgSrc = imgOverride ? IMG[imgOverride] : IMG[charKey];

  return (
    <div style={{
      position: 'absolute', top: 44, left: 0, right: 0, height: 420,
      zIndex: 10,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: visible ? 'charIn .65s cubic-bezier(.4,0,.2,1) forwards' : 'none',
      opacity: visible ? 1 : 0,
      '--char-glow': ch.glow,
    }}>
      {/* 글로우 */}
      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        width: 220, height: 300,
        background: `radial-gradient(ellipse at center bottom,${ch.glow} 0%,transparent 70%)`,
        animation: 'glowP 3s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>
      {/* 그림자 */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 160, height: 12,
        background: `radial-gradient(ellipse,${ch.color}33 0%,transparent 70%)`,
        borderRadius: '50%',
      }}/>
      {/* 이미지 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        zIndex: 2, pointerEvents: 'none',
      }}>
        <img src={imgSrc} alt={ch.name} className="char-img" style={{'--char-glow': ch.glow}}/>
      </div>
      {/* 이름 태그 */}
      <div style={{
        position: 'absolute', top: 10, left: 16,
        background: 'rgba(6,4,15,.92)',
        border: `1px solid ${ch.color}44`,
        borderRadius: 2, padding: '5px 13px',
        animation: 'slideR .5s ease-out', zIndex: 5,
      }}>
        <div style={{fontFamily:'Cinzel',fontSize:9,color:ch.color,letterSpacing:'.15em',marginBottom:1}}>
          {ch.title}
        </div>
        <div style={{fontFamily:'Noto Serif KR',fontSize:18,fontWeight:600,color:'#f0e6d3'}}>
          {ch.name}
        </div>
        <div style={{fontFamily:'Cinzel',fontSize:8,color:`${ch.color}77`,letterSpacing:'.2em',marginTop:1}}>
          {ch.tag}
        </div>
      </div>
    </div>
  );
};

// ─── 스탯 패널 (토글형, 다이얼로그 위) ───────────────────────────────────
export const StatPanel = ({ affinity, stats, open, setOpen, dboxHeight = 220 }) => (
  <div className="stat-panel" style={{bottom: dboxHeight}}>
    <button className="stat-panel-toggle" onClick={() => setOpen(p => !p)}>
      <span>STATUS</span>
      <span style={{fontSize: 8}}>{open ? '▾' : '▸'}</span>
    </button>
    {open && (
      <div className="stat-panel-body">
        {/* 호감도 */}
        <div style={{fontFamily:'Cinzel',fontSize:7,color:'rgba(201,149,106,.5)',letterSpacing:'.18em',marginBottom:5}}>
          AFFINITY
        </div>
        {Object.entries(affinity).map(([k, v]) => (
          <div key={k} style={{display:'flex',alignItems:'center',gap:4,marginBottom:4}}>
            <span style={{fontSize:7,color:'rgba(240,230,211,.38)',fontFamily:'Cinzel',width:24}}>{CHARS[k].name}</span>
            <span style={{color:CHARS[k].color,fontSize:9,display:'inline-block',animation:v>60?'hbeat 1s ease infinite':'none'}}>♥</span>
            <div className="sbar">
              <div className="sfill" style={{width:`${v}%`,background:`linear-gradient(90deg,${CHARS[k].color}66,${CHARS[k].color})`}}/>
            </div>
            <span style={{fontSize:7,color:CHARS[k].color,width:16,textAlign:'right',fontFamily:'Cinzel'}}>{v}</span>
          </div>
        ))}
        <div style={{height:1,background:'rgba(201,149,106,.15)',margin:'6px 0'}}/>
        {/* 스탯 */}
        <div style={{fontFamily:'Cinzel',fontSize:7,color:'rgba(201,149,106,.5)',letterSpacing:'.18em',marginBottom:5}}>
          STATUS
        </div>
        {STAT_CFG.map(s => (
          <div key={s.key} style={{display:'flex',alignItems:'center',gap:4,marginBottom:3}}>
            <span style={{fontSize:7,color:'rgba(240,230,211,.38)',width:24}}>{s.label}</span>
            <div className="sbar">
              <div className="sfill" style={{width:`${Math.min(100, stats[s.key])}%`,background:`linear-gradient(90deg,${s.color}44,${s.color})`}}/>
            </div>
            <span style={{fontSize:7,color:s.color,width:16,textAlign:'right',fontFamily:'Cinzel'}}>{stats[s.key]}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── 증거 카운터 (상단 헤더 보조) ────────────────────────────────────────
export const EvidenceCounter = ({ count }) => {
  if (count === 0) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      fontFamily: 'Cinzel', fontSize: 8, color: '#c9956a',
    }}>
      <span>◆</span>
      <span>{count}/4</span>
    </div>
  );
};

// ─── 엔딩 화면 ────────────────────────────────────────────────────────────
export const EndingScreen = ({ endingType, stats, affinity, flags, onRestart }) => {
  const e = ENDINGS[endingType] || ENDINGS.execution;
  const [showUI, setShowUI] = useState(true);
  const cgSrc = e.img ? IMG[e.img] : null;

  const badges = [
    flags.kaelFirstMeet === 'graceful'  && { label: '우아한 대처',     color: CHARS.kael.color   },
    flags.kaelFirstMeet === 'defiant'   && { label: '반박의 담력',     color: CHARS.kael.color   },
    flags.kaelFirstMeet === 'ally'      && { label: '카엘과 첫 동맹',  color: CHARS.kael.color   },
    flags.lucianDance === 'bold'        && { label: '루시안 선제 역공', color: CHARS.lucian.color },
    flags.lucianDance === 'danced'      && { label: '루시안과 왈츠',   color: CHARS.lucian.color },
    flags.lucianPact                    && { label: '루시안 협약',     color: CHARS.lucian.color },
    flags.arienProof === 'power'        && { label: '마력으로 증명',   color: CHARS.arien.color  },
    flags.arienProof === 'knowledge'    && { label: '지식으로 설득',   color: CHARS.arien.color  },
    flags.arienContract                 && { label: '마탑 계약',       color: CHARS.arien.color  },
    flags.dorianGuard === 'confronted'  && { label: '도리안에게 맞섬', color: CHARS.dorian.color },
    flags.dorianSecret                  && { label: '가면 뒤의 진실', color: CHARS.dorian.color },
    flags.rumorSource === 'document'    && { label: '밀약서 확보',     color: '#c9956a'          },
    flags.rumorSource === 'copy'        && { label: '밀약서 사본',     color: '#c9956a'          },
    flags.puzzleSolved                  && { label: '암호 해독',       color: '#a070d8'          },
    flags.kaelDebt                      && { label: '카엘의 보호',     color: CHARS.kael.color   },
    flags.evidenceCount >= 3            && { label: `증거 ${flags.evidenceCount}개`, color: '#6ab88a' },
    flags.betrayedAnyone                && { label: '배신의 흉터',     color: '#c44060'          },
  ].filter(Boolean);

  return (
    <div
      style={{position:'relative', zIndex:10, minHeight:700, cursor: cgSrc ? 'pointer' : 'default'}}
      onClick={() => cgSrc && setShowUI(p => !p)}
    >
      {/* CG 이미지 — 항상 풀스크린 배경 */}
      {cgSrc && (
        <div style={{position:'absolute', inset:0, zIndex:0}}>
          <img
            src={cgSrc}
            alt=""
            style={{
              width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'center top',
              display:'block',
              filter: showUI ? 'brightness(.55)' : 'brightness(1)',
              transition: 'filter .6s ease',
            }}
          />
          {/* UI 표시 중일 때만 그라디언트 오버레이 */}
          {showUI && (
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(180deg,rgba(6,4,15,.3) 0%,rgba(6,4,15,.75) 55%,rgba(6,4,15,.97) 100%)',
            }}/>
          )}
        </div>
      )}

      {/* 클릭 힌트 (CG 있고 UI 숨김 상태일 때) */}
      {cgSrc && !showUI && (
        <div style={{
          position:'absolute', bottom:20, left:0, right:0, textAlign:'center',
          fontFamily:'Cinzel', fontSize:8, letterSpacing:'.2em',
          color:'rgba(255,255,255,.35)', zIndex:5,
          animation:'pulse 2s ease-in-out infinite',
        }}>
          TAP TO RETURN
        </div>
      )}

      {/* UI 레이어 — 클릭 시 토글 */}
      {showUI && (
        <div style={{
          position:'relative', zIndex:5,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          minHeight:700, padding:'40px 28px', textAlign:'center',
          animation:'fadeIn 1s ease-out',
        }}>
          {/* 엔딩 아이콘 */}
          <div style={{
            fontSize:48, color:e.color, marginBottom:18,
            filter:`drop-shadow(0 0 18px ${e.color})`,
            animation:'glowP 2s ease-in-out infinite',
          }}>
            {e.icon}
          </div>

          <p style={{fontFamily:'Cinzel',fontSize:8,letterSpacing:'.4em',color:`${e.color}88`,marginBottom:8}}>
            {e.title}
          </p>
          <h2 style={{fontFamily:'Cormorant Garamond',fontSize:24,fontWeight:300,color:e.color,marginBottom:14,letterSpacing:'.05em'}}>
            {e.sub}
          </h2>
          <div className="gold-line" style={{width:108,marginBottom:20}}/>
          <p style={{fontSize:13.5,lineHeight:2,color:'rgba(240,230,211,.88)',marginBottom:26,fontWeight:300}}>
            {e.text}
          </p>

          {/* CG 있을 때 클릭 힌트 */}
          {cgSrc && (
            <p style={{fontFamily:'Cinzel',fontSize:7.5,color:`${e.color}55`,letterSpacing:'.18em',marginBottom:18}}>
              TAP IMAGE TO VIEW  ·  탭하면 일러스트만 표시
            </p>
          )}

          {/* 선택 기록 */}
          {badges.length > 0 && (
            <div style={{
              background:'rgba(6,4,15,.72)', border:`1px solid ${e.color}22`,
              borderRadius:4, padding:'12px 16px', marginBottom:14, width:'100%',
            }}>
              <p style={{fontFamily:'Cinzel',fontSize:7,color:`${e.color}66`,letterSpacing:'.2em',marginBottom:8}}>
                YOUR CHOICES
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {badges.map((b, i) => <FlagBadge key={i} label={b.label} color={b.color}/>)}
              </div>
            </div>
          )}

          {/* 최종 스탯 */}
          <div style={{
            background:'rgba(6,4,15,.72)', border:`1px solid ${e.color}30`,
            borderRadius:4, padding:'13px 20px', marginBottom:28, width:'100%',
          }}>
            <p style={{fontFamily:'Cinzel',fontSize:7,color:`${e.color}66`,letterSpacing:'.2em',marginBottom:9}}>
              FINAL RECORD
            </p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'6px 12px',marginBottom:10}}>
              {STAT_CFG.map(s => (
                <div key={s.key} style={{textAlign:'center'}}>
                  <div style={{fontFamily:'Cinzel',fontSize:16,color:s.color,fontWeight:700}}>{stats[s.key]}</div>
                  <div style={{fontSize:7,color:'rgba(240,230,211,.35)',marginTop:2}}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{height:1,background:`${e.color}18`,marginBottom:9}}/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'5px 10px'}}>
              {Object.entries(affinity).map(([k, v]) => (
                <div key={k} style={{display:'flex',alignItems:'center',gap:5}}>
                  <span style={{fontSize:7,color:'rgba(240,230,211,.35)',width:22}}>{CHARS[k].name}</span>
                  <div className="sbar" style={{flex:1}}>
                    <div className="sfill" style={{width:`${v}%`,background:`linear-gradient(90deg,${CHARS[k].color}55,${CHARS[k].color})`}}/>
                  </div>
                  <span style={{fontSize:7,color:CHARS[k].color,width:14,textAlign:'right',fontFamily:'Cinzel'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn-restart"
            onClick={e => { e.stopPropagation(); onRestart(); }}
          >
            다시 시작하다
          </button>
        </div>
      )}
    </div>
  );
};
