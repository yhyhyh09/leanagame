// ─── 이미지 ───────────────────────────────────────────────────────────────
export const IMG = {
  // 캐릭터 (기존)
  kael:          "https://i.imgur.com/6t0PSbP.jpeg",
  lucian:        "https://i.imgur.com/N5EnYpN.jpeg",
  arien:         "https://i.imgur.com/pWooogc.jpeg",
  dorian:        "https://i.imgur.com/XmvUdKP.jpeg",
  leana:         "https://i.imgur.com/1zHkFot.jpeg",
  leanaResolve:  "https://i.imgur.com/H24Zk0L.jpeg",
  leanaCrisis:   "https://i.imgur.com/UOdeXiE.jpeg",

  // 캐릭터 추가 표정 (나중에 imgur 링크로 교체)
  kaelSoft:      "https://i.imgur.com/6t0PSbP.jpeg",   // TODO: replace
  lucianDark:    "https://i.imgur.com/N5EnYpN.jpeg",   // TODO: replace
  dorianTrue:    "https://i.imgur.com/XmvUdKP.jpeg",   // TODO: replace

  // 배경 (기존)
  bgGarden:      "https://i.imgur.com/5KkP02I.png",
  bgBallroom:    "https://i.imgur.com/ZEAVXlN.jpeg",
  bgStudy:       "https://i.imgur.com/2wAexrc.png",
  bgLucian:      "https://i.imgur.com/ccbE6Fw.png",
  bgTower:       "https://i.imgur.com/TEOFmdM.jpeg",

  // 배경 추가
  bgDungeon:     "https://i.imgur.com/o7KXQMl.jpeg",
  bgThroneRoom:  "https://i.imgur.com/nh0MtZm.jpeg",
  bgLeanaRoom:   "https://i.imgur.com/LuNsJrp.jpeg",
  bgCorridor:    "https://i.imgur.com/Xhc2SnT.jpeg",
  bgRooftop:     "https://i.imgur.com/oTiN7tE.jpeg",

  // 엔딩 CG 이미지
  endingKael:    "https://i.imgur.com/BPj3cYb.jpeg",
  endingLucian:  "https://i.imgur.com/5fSJDcX.jpeg",
  endingArien:   "https://i.imgur.com/cLzBbSY.jpeg",
  endingDorian:  "https://i.imgur.com/BGYfj1v.jpeg",
  endingHidden:  "https://i.imgur.com/2sVw6Qf.jpeg",
  endingTrue:    "https://i.imgur.com/GNP6Zap.jpeg",
};

// ─── 캐릭터 메타 ──────────────────────────────────────────────────────────
export const CHARS = {
  kael: {
    name: '카엘',
    title: '황태자',
    tag: '냉철·도도',
    color: '#7ab8d4',
    glow: 'rgba(122,184,212,.42)',
    desc: '황실의 냉혹한 후계자. 감정을 드러내지 않지만 모든 것을 계산한다.',
  },
  lucian: {
    name: '루시안',
    title: '황제의 서자',
    tag: '위험·집착',
    color: '#c44060',
    glow: 'rgba(196,64,96,.42)',
    desc: '황위를 노리는 서자. 매력 뒤에 냉혹한 야망이 숨어있다.',
  },
  arien: {
    name: '아리엔',
    title: '궁정 마법사',
    tag: '무심·신비',
    color: '#a070d8',
    glow: 'rgba(160,112,216,.42)',
    desc: '마탑의 주인. 인간 관계에 무심하지만 진실에는 집착한다.',
  },
  dorian: {
    name: '도리안',
    title: '근위기사단장',
    tag: '다정·흑막',
    color: '#6ab88a',
    glow: 'rgba(106,184,138,.42)',
    desc: '완벽한 미소 뒤에 제국에서 가장 많은 비밀을 품은 남자.',
  },
};

// ─── 스탯 설정 ────────────────────────────────────────────────────────────
export const STAT_CFG = [
  { key: 'elegance', label: '우아함', color: '#c9956a', desc: '귀족 사교계에서의 품격' },
  { key: 'intel',    label: '지성',   color: '#7ab8d4', desc: '원작 지식과 분석력' },
  { key: 'magic',    label: '마력',   color: '#a070d8', desc: '레아나의 봉인된 힘' },
  { key: 'courage',  label: '담력',   color: '#6ab88a', desc: '위기 상황의 판단력' },
  { key: 'charm',    label: '매력',   color: '#d4a0c0', desc: '인간관계 장악력' },
  { key: 'infamy',   label: '악명',   color: '#c44060', desc: '황궁 내 위험 인지도' },
];

// ─── 챕터별 배경 ──────────────────────────────────────────────────────────
export const CHAPTER_BG = {
  0:  'bgLeanaRoom',  // Ch1: 레아나 침실
  1:  'bgBallroom',   // Ch2: 무도회장
  2:  'bgTower',      // Ch3: 마탑
  3:  'bgGarden',     // Ch4: 정원
  4:  'bgCorridor',   // Ch5: 황궁 복도 (음모)
  5:  'bgStudy',      // Ch6: 도서관 (밀약서)
  6:  'bgDungeon',    // Ch7: 지하 감옥 (누명)
  7:  'bgRooftop',    // Ch8: 망루 (선택)
  8:  null,           // Ch9: 루트별 처리
  9:  null,           // Ch10: 루트별 처리
};

// 캐릭터 루트별 Ch9~10 배경
export const ROUTE_BG = {
  kael:   { ch9: 'bgThroneRoom', ch10: 'bgStudy'    },
  lucian: { ch9: 'bgLucian',     ch10: 'bgCorridor' },
  arien:  { ch9: 'bgTower',      ch10: 'bgRooftop'  },
  dorian: { ch9: 'bgGarden',     ch10: 'bgThroneRoom'},
};

// ─── 엔딩 정의 ────────────────────────────────────────────────────────────
export const ENDINGS = {
  // 루트별 해피 엔딩
  kael_happy: {
    title: 'KAEL ENDING',
    sub: '빙점 아래의 온기',
    text: '카엘은 레아나에게 처음으로 진심을 보였다. "당신은 내가 알던 어떤 사람과도 다르다." 차가운 황궁 안에서, 두 사람만의 조용한 동맹이 시작되었다.',
    color: '#7ab8d4', icon: '❄', img: 'endingKael',
    condition: 'affinity.kael >= 75 && flags.kaelDebt && !flags.betrayedKael',
  },
  lucian_happy: {
    title: 'LUCIAN ENDING',
    sub: '위험한 공모자',
    text: '루시안은 레아나의 손을 잡으며 웃었다. "우리 둘 다 이 게임의 규칙을 알고 있잖아요." 황실의 권력 구도가 조용히, 그러나 완전히 뒤집혔다.',
    color: '#c44060', icon: '♟', img: 'endingLucian',
    condition: 'affinity.lucian >= 75 && flags.lucianPact',
  },
  arien_happy: {
    title: 'ARIEN ENDING',
    sub: '마력의 공명',
    text: '아리엔이 처음으로 마법서를 덮었다. "네 마력은 이제 안정됐어. 하지만..." 그가 말을 멈췄다. "아직 연구할 게 많이 남아 있군." 그것이 그의 방식의 고백이었다.',
    color: '#a070d8', icon: '✦', img: 'endingArien',
    condition: 'affinity.arien >= 75 && flags.arienProof === "power" && stats.magic >= 60',
  },
  dorian_happy: {
    title: 'DORIAN ENDING',
    sub: '가면 뒤의 진실',
    text: '도리안이 처음으로 미소를 거뒀다. "레아나 님은 처음부터 제 가면을 보고 있었군요." 제국에서 가장 위험한 남자가 자신의 진심을 내보인 순간이었다.',
    color: '#6ab88a', icon: '⚔', img: 'endingDorian',
    condition: 'affinity.dorian >= 75 && flags.dorianGuard === "confronted" && flags.dorianSecret',
  },
  // 트루 엔딩
  true: {
    title: 'TRUE ENDING',
    sub: '레아나의 법칙',
    text: '누명의 배후를 스스로 밝혀냈다. 황실 밀약서, 마력의 증거, 그리고 네 남자의 증언. 레아나 드 발로아는 처형당할 악녀가 아니라, 제국을 구한 여인으로 역사에 기록되었다.',
    color: '#f0d9b5', icon: '♛', img: 'endingTrue',
    condition: 'flags.rumorSource === "document" && flags.puzzleSolved && !flags.betrayedAnyone && flags.allAllies',
  },
  // 히든 엔딩
  hidden: {
    title: 'HIDDEN ENDING',
    sub: '황녀, 혹은 여왕',
    text: '네 남자 모두를 당신의 손안에 뒀다. 황태자의 권력, 서자의 야망, 마법사의 힘, 기사단장의 칼날. 원작의 악녀는 죽었다. 지금 이곳에 서 있는 건 — 제국 자체를 손에 넣은 여왕이다.',
    color: '#c9956a', icon: '◈', img: 'endingHidden',
    condition: 'Object.values(affinity).every(v => v >= 70) && stats.intel >= 80 && stats.infamy < 25',
  },
  // 배드 엔딩들
  exile: {
    title: 'BAD ENDING',
    sub: '추방',
    text: '황실은 처형 대신 추방을 선택했다. 발로아 가문의 문장이 지워지고, 레아나는 제국의 끝으로 사라졌다. 원작보다는 나은 결말. 하지만 이것이 생존이라고 할 수 있을까.',
    color: '#8a7a6a', icon: '↗',
    condition: 'default bad (mid)',
  },
  execution: {
    title: 'BAD ENDING',
    sub: '예정된 파멸',
    text: '원작의 운명을 거스르지 못했다. 단두대의 이슬로 사라진 레아나 드 발로아. 그녀가 가지고 갔던 현대의 기억과 함께.',
    color: '#c44060', icon: '†',
    condition: 'worst case',
  },
};
