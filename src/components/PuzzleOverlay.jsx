import { useState } from "react";

// 암호 해독 퍼즐: 황실 고유 치환 암호
// 단서 3개를 조합해 4자리 코드를 맞추는 구조

const PUZZLE_DATA = {
  cipher: {
    title: '황실 밀약서 해독',
    description: '발로아 가문 밀약서의 암호화된 부분. 황실 고유 치환 암호 체계. 단서를 조합해 4자리 열쇠를 찾아라.',
    clues: [
      {
        id: 'clue1',
        text: '문서 여백에 적힌 메모: "황제의 생일, 봄의 첫날 — 셋째 달, 그 달의 처음."',
        hint: '황제 생일 = 3월 1일 → 첫 두 자리: 3, 1',
      },
      {
        id: 'clue2',
        text: '문서 하단 인장: 별자리 문양 두 개. 궁수자리(9번째)와 천칭자리(7번째).',
        hint: '별자리 순번 → 뒤 두 자리: 9, 7',
      },
      {
        id: 'clue3',
        text: '선대 황제 즉위 기록지: "재위 31년, 봄. 밀약 체결."',
        hint: '재위 31년 → 확인: 앞 두 자리가 3, 1 맞음',
      },
    ],
    answer: '3197',
    successText: '암호가 풀렸다. 숨겨진 내용이 드러났다 — 발로아 가문이 황귀비 파벌에 이중으로 정보를 팔았다는 기록. 이건 양날의 검이다.',
    failText: '코드가 맞지 않는다. 단서를 다시 검토해야 한다.',
  },
};

const css = `
  .puzzle-wrap {
    position: absolute;
    inset: 0;
    background: rgba(6,4,15,.97);
    backdrop-filter: blur(20px);
    z-index: 200;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-y: auto;
  }
  .puzzle-header {
    background: linear-gradient(135deg, rgba(201,149,106,.08), rgba(139,26,58,.1));
    border-bottom: 1px solid rgba(201,149,106,.25);
    padding: 16px 20px;
  }
  .puzzle-body { padding: 16px 20px; flex: 1; }
  .clue-card {
    background: rgba(201,149,106,.04);
    border: 1px solid rgba(201,149,106,.2);
    border-radius: 4px;
    padding: 13px 15px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all .25s;
  }
  .clue-card.open {
    border-color: rgba(201,149,106,.55);
    background: rgba(201,149,106,.08);
  }
  .clue-card:hover { border-color: rgba(201,149,106,.4); }
  .hint-text {
    font-size: 11px;
    color: rgba(201,149,106,.65);
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(201,149,106,.15);
    font-family: 'Cinzel', serif;
    letter-spacing: .05em;
  }
  .code-input {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 20px 0;
  }
  .code-digit {
    width: 52px;
    height: 64px;
    background: rgba(6,4,15,.8);
    border: 1px solid rgba(201,149,106,.35);
    border-radius: 3px;
    color: #f0d9b5;
    font-family: 'Cinzel', serif;
    font-size: 26px;
    text-align: center;
    outline: none;
    transition: border-color .2s;
    caret-color: #c9956a;
  }
  .code-digit:focus { border-color: #c9956a; box-shadow: 0 0 12px rgba(201,149,106,.25); }
  .btn-solve {
    width: 100%;
    background: linear-gradient(135deg, rgba(139,26,58,.85), rgba(60,8,22,.95));
    border: 1px solid rgba(201,149,106,.55);
    color: #f0d9b5;
    font-family: 'Cinzel', serif;
    font-size: 12px;
    letter-spacing: .2em;
    padding: 13px;
    border-radius: 2px;
    cursor: pointer;
    transition: all .3s;
  }
  .btn-solve:hover { box-shadow: 0 4px 20px rgba(139,26,58,.4); transform: translateY(-1px); }
  .btn-skip {
    background: transparent;
    border: 1px solid rgba(201,149,106,.25);
    color: rgba(201,149,106,.5);
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: .15em;
    padding: 9px;
    border-radius: 2px;
    cursor: pointer;
    transition: all .25s;
    width: 100%;
    margin-top: 8px;
  }
  .btn-skip:hover { border-color: rgba(201,149,106,.45); color: rgba(201,149,106,.8); }
  .result-box {
    border-radius: 4px;
    padding: 14px 16px;
    margin-top: 14px;
    font-size: 13px;
    line-height: 1.75;
    animation: fadeIn .4s ease-out;
  }
  .result-success { background: rgba(106,184,138,.08); border: 1px solid rgba(106,184,138,.35); color: #a0d4b0; }
  .result-fail    { background: rgba(196,64,96,.08);   border: 1px solid rgba(196,64,96,.3);   color: #d4808a; }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
  .shake { animation: shake .4s ease-out; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
`;

export default function PuzzleOverlay({ puzzleId, onComplete, onSkip, flags }) {
  const puzzle = PUZZLE_DATA[puzzleId];
  const [openClues, setOpenClues]   = useState([]);
  const [digits,    setDigits]      = useState(['', '', '', '']);
  const [result,    setResult]      = useState(null); // null | 'success' | 'fail'
  const [attempts,  setAttempts]    = useState(0);
  const [shake,     setShake]       = useState(false);

  if (!puzzle) return null;

  const toggleClue = (id) => {
    setOpenClues(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val.slice(-1);
    setDigits(next);
    // 자동 다음 칸 포커스
    if (val && i < 3) {
      document.getElementById(`digit-${i+1}`)?.focus();
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      document.getElementById(`digit-${i-1}`)?.focus();
    }
  };

  const handleSolve = () => {
    const code = digits.join('');
    setAttempts(a => a + 1);
    if (code === puzzle.answer) {
      setResult('success');
      setTimeout(() => onComplete(true), 1800);
    } else {
      setResult('fail');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (attempts >= 2) {
        // 3번 실패 시 힌트 자동 공개
        setOpenClues(puzzle.clues.map(c => c.id));
      }
    }
  };

  const allFilled = digits.every(d => d !== '');

  return (
    <div className="puzzle-wrap">
      <style>{css}</style>

      {/* 헤더 */}
      <div className="puzzle-header">
        <div style={{fontFamily:'Cinzel',fontSize:8,color:'rgba(201,149,106,.5)',letterSpacing:'.3em',marginBottom:6}}>
          DECRYPTION PUZZLE
        </div>
        <div style={{fontFamily:'Noto Serif KR',fontSize:17,fontWeight:600,color:'#f0d9b5',marginBottom:4}}>
          {puzzle.title}
        </div>
        <div style={{fontSize:12,color:'rgba(240,230,211,.45)',lineHeight:1.65}}>
          {puzzle.description}
        </div>
      </div>

      <div className="puzzle-body">

        {/* 단서 카드들 */}
        <div style={{fontFamily:'Cinzel',fontSize:8,color:'rgba(201,149,106,.5)',letterSpacing:'.2em',marginBottom:10}}>
          CLUES — 단서를 클릭해 분석하라
        </div>
        {puzzle.clues.map((clue, idx) => {
          const isOpen = openClues.includes(clue.id);
          return (
            <div key={clue.id} className={`clue-card ${isOpen ? 'open' : ''}`} onClick={() => toggleClue(clue.id)}>
              <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
                <div style={{
                  fontFamily:'Cinzel',fontSize:9,color:'rgba(201,149,106,.6)',
                  background:'rgba(201,149,106,.1)',border:'1px solid rgba(201,149,106,.25)',
                  borderRadius:2,padding:'2px 7px',flexShrink:0,marginTop:1
                }}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <div>
                  <div style={{fontSize:12.5,color:'rgba(240,230,211,.82)',lineHeight:1.7}}>
                    {clue.text}
                  </div>
                  {isOpen && (
                    <div className="hint-text">
                      ✦ {clue.hint}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* 코드 입력 */}
        <div style={{marginTop:20}}>
          <div style={{fontFamily:'Cinzel',fontSize:8,color:'rgba(201,149,106,.5)',letterSpacing:'.2em',marginBottom:14,textAlign:'center'}}>
            4-DIGIT CODE
          </div>
          <div className={`code-input ${shake ? 'shake' : ''}`}>
            {digits.map((d, i) => (
              <input
                key={i}
                id={`digit-${i}`}
                className="code-digit"
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleDigit(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
              />
            ))}
          </div>
          {attempts > 0 && (
            <div style={{textAlign:'center',fontFamily:'Cinzel',fontSize:9,color:'rgba(201,149,106,.4)',marginBottom:10}}>
              시도: {attempts}회{attempts >= 2 ? ' — 단서가 모두 공개됐다' : ''}
            </div>
          )}
        </div>

        {/* 결과 메시지 */}
        {result && (
          <div className={`result-box result-${result}`}>
            {result === 'success' ? puzzle.successText : puzzle.failText}
          </div>
        )}

        {/* 버튼들 */}
        {result !== 'success' && (
          <>
            <button
              className="btn-solve"
              onClick={handleSolve}
              disabled={!allFilled}
              style={{opacity: allFilled ? 1 : 0.45, cursor: allFilled ? 'pointer' : 'default', marginTop: 16}}
            >
              DECODE  ›  해독하다
            </button>
            <button className="btn-skip" onClick={() => onSkip()}>
              건너뛰기 (퍼즐 없이 진행, 보상 없음)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
