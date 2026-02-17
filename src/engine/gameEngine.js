// ─── 초기 상태 ────────────────────────────────────────────────────────────
export const INITIAL_STATE = {
  stats: {
    elegance: 30,
    intel:    30,
    magic:    20,
    courage:  20,
    charm:    30,
    infamy:   10,
  },
  affinity: {
    kael:   10,
    lucian: 10,
    arien:  10,
    dorian: 10,
  },
  // 복합 플래그 시스템
  flags: {
    // 카엘 관련
    kaelFirstMeet:  'none',    // 'graceful' | 'defiant'
    kaelDebt:       false,     // 카엘에게 빚을 졌는가
    kaelSecret:     false,     // 카엘의 비밀을 알았는가
    betrayedKael:   false,

    // 루시안 관련
    lucianDance:    'none',    // 'refused' | 'danced'
    lucianPact:     false,     // 루시안과 정식 거래를 맺었는가
    lucianInfo:     0,         // 루시안에게서 얻은 정보 레벨 0~3

    // 아리엔 관련
    arienProof:     'none',    // 'knowledge' | 'power'
    arienContract:  false,     // 마력 데이터 제공 계약
    arienTrust:     0,         // 아리엔의 신뢰 레벨 0~3

    // 도리안 관련
    dorianGuard:    'none',    // 'submissive' | 'confronted'
    dorianSecret:   false,     // 도리안의 진짜 정체를 알았는가
    dorianAlly:     false,

    // 스토리 진행
    rumorSource:    'none',    // 'document' | 'lucian' | 'none'
    puzzleSolved:   false,     // 밀약서 해독 퍼즐 완료
    puzzleClues:    [],        // 수집한 단서들
    betrayedAnyone: false,
    allAllies:      false,

    // 회복 플래그 (나쁜 선택 후 회복 경로)
    kaelRepair:     false,
    lucianRepair:   false,

    // 누명 챕터 상태
    accusationPhase: 'none',   // 'none' | 'accused' | 'imprisoned' | 'escaped'
    evidenceCount:   0,        // 수집한 증거 수 (0~4)

    // 선택된 루트 (Ch8에서 결정)
    chosenRoute:    'none',    // 'kael' | 'lucian' | 'arien' | 'dorian'
  },
};

// ─── 스탯 클램프 ──────────────────────────────────────────────────────────
const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

// ─── 액션 실행기 ──────────────────────────────────────────────────────────
/**
 * acts 배열을 받아 state 업데이트 함수들의 배열을 반환
 * 컴포넌트에서 각 setter를 호출하는 구조
 */
export function resolveActs(acts, currentState) {
  const { flags: fl, stats: st, affinity: af } = currentState;

  const updates = {
    stats:    { ...st },
    affinity: { ...af },
    flags:    { ...fl },
    sideEffects: [],  // { type: 'toast'|'screen'|'goto'|'ending'|'next'|'puzzle', ...data }
  };

  for (const a of acts) {
    switch (a.type) {

      // 스탯 변경
      case 'stat':
        updates.stats[a.k] = clamp(updates.stats[a.k] + a.v);
        break;

      // 여러 스탯 한번에
      case 'stats':
        for (const [k, v] of Object.entries(a.values))
          updates.stats[k] = clamp(updates.stats[k] + v);
        break;

      // 호감도 변경
      case 'aff':
        updates.affinity[a.k] = clamp(updates.affinity[a.k] + a.v);
        break;

      // 조건부 호감도 (플래그 체크)
      case 'cond_aff': {
        const fv = updates.flags[a.flagKey];
        if (fv === a.flagVal) {
          updates.affinity[a.k] = clamp(updates.affinity[a.k] + a.v);
        } else if (a.elseStatK) {
          updates.stats[a.elseStatK] = clamp(updates.stats[a.elseStatK] + a.elseStatV);
        }
        break;
      }

      // 복수 캐릭터 호감도
      case 'affs':
        for (const [k, v] of Object.entries(a.values))
          updates.affinity[k] = clamp(updates.affinity[k] + v);
        break;

      // 플래그 설정
      case 'flag':
        updates.flags[a.k] = a.v;
        break;

      // 복수 플래그
      case 'flags':
        for (const [k, v] of Object.entries(a.values))
          updates.flags[k] = v;
        break;

      // 증거 수집
      case 'addEvidence':
        updates.flags.evidenceCount = Math.min(4, updates.flags.evidenceCount + 1);
        if (a.clue && !updates.flags.puzzleClues.includes(a.clue))
          updates.flags.puzzleClues = [...updates.flags.puzzleClues, a.clue];
        break;

      // 토스트 메시지
      case 'toast':
        updates.sideEffects.push({ type: 'toast', msg: a.msg, color: a.color });
        break;

      // 화면 전환
      case 'screen':
        updates.sideEffects.push({ type: 'screen', v: a.v });
        break;

      // 다음 씬
      case 'next':
        updates.sideEffects.push({ type: 'next' });
        break;

      // 특정 씬으로 점프
      case 'goto':
        updates.sideEffects.push({ type: 'goto', ch: a.ch, si: a.si, char: a.char ?? null });
        break;

      // 퍼즐 시작
      case 'puzzle':
        updates.sideEffects.push({ type: 'puzzle', puzzleId: a.puzzleId });
        break;

      // 엔딩 계산
      case 'ending':
        updates.sideEffects.push({ type: 'ending' });
        break;

      default:
        break;
    }
  }

  return updates;
}

// ─── 엔딩 판정 ────────────────────────────────────────────────────────────
export function calcEnding(stats, affinity, flags) {
  const af = affinity;
  const st = stats;
  const fl = flags;

  // 히든 엔딩: 모든 호감도 55+, 악명 25 미만, 지성 80+
  const allHigh = Object.values(af).every(v => v >= 55);
  if (allHigh && st.intel >= 80 && st.infamy < 25 && fl.puzzleSolved) {
    return 'hidden';
  }

  // 트루 엔딩: 밀약서 + 퍼즐 + 증거 3+ + 배신 없음
  if (fl.rumorSource === 'document' && fl.puzzleSolved && fl.evidenceCount >= 3 && !fl.betrayedAnyone) {
    return 'true';
  }

  // 루트별 해피 엔딩
  const route = fl.chosenRoute;
  if (route === 'kael'   && af.kael   >= 60 && fl.kaelDebt   && !fl.betrayedKael) return 'kael_happy';
  if (route === 'lucian' && af.lucian >= 65 && fl.lucianPact)                     return 'lucian_happy';
  if (route === 'arien'  && af.arien  >= 65 && st.magic >= 50)                    return 'arien_happy';
  if (route === 'dorian' && af.dorian >= 45 && fl.dorianSecret)                   return 'dorian_happy';

  // 배드 엔딩 2단계
  const totalAff = Object.values(af).reduce((s, v) => s + v, 0);
  if (totalAff < 120 || fl.betrayedAnyone) return 'execution';
  return 'exile';
}

// ─── 텍스트 리졸버 ────────────────────────────────────────────────────────
export function resolveText(scene, flags, stats, affinity) {
  if (!scene) return '';
  if (typeof scene.text === 'function') return scene.text(flags, stats, affinity);
  return scene.text;
}

// ─── 조건 체크 유틸 ──────────────────────────────────────────────────────
export function checkCondition(cond, flags, stats, affinity) {
  if (!cond) return true;
  
  // 함수 형태로 전달된 경우 직접 실행하여 결과 반환
  if (typeof cond === 'function') return cond(flags, stats, affinity);
  
  try {
    // 문자열 형태로 전달된 경우 기존 방식 유지
    return new Function('flags', 'stats', 'affinity', `return (${cond})`)(flags, stats, affinity);
  } catch {
    return true;
  }
}
