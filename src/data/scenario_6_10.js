// ═══════════════════════════════════════════════════════════════════════════
// SCENARIO — Ch.6 ~ Ch.10
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIO_6_10 = [

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 6 · 밀약 — 도서관의 퍼즐
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: 'Chapter VI  ·  밀약',
    subtitle: '황궁 도서관, 독은 독으로',
    bg: 'bgStudy',
    scenes: [
      {
        id: 'c6s0',
        char: null,
        text: '황궁 도서관. 야심한 밤. 금서 구역 뒤편, 고문서들 사이에서 — 발로아 가문과 황실 간의 밀약서 사본이 나왔다. 손이 떨렸다.',
      },
      {
        id: 'c6s1',
        char: null,
        text: '밀약서의 내용: 발로아 가문이 황실에 정보를 제공하는 대신, 황실이 발로아의 부채를 탕감한다. 30년 전 선대 황제와 체결. 이걸 이용하면 협상 카드가 생긴다. 하지만—',
      },
      {
        id: 'c6s2',
        char: null,
        text: '문서 일부가 암호화되어 있다. 황실 고유의 암호 체계. 원작 지식을 뒤졌다 — 소설에서 이 암호 체계에 대한 언급이 있었다.',
        choices: [
          {
            id: 'c6_take_document',
            text: '문서를 확보한다. 해독은 나중에.  ✦ 담력+10  악명+5',
            acts: [
              { type: 'stat', k: 'courage', v: 10 },
              { type: 'stat', k: 'infamy',  v:  5 },
              { type: 'flag', k: 'rumorSource', v: 'document' },
              { type: 'addEvidence', clue: 'secretPact' },
              { type: 'toast', msg: '황실 밀약서 사본을 확보했다.', color: '#c9956a' },
              { type: 'puzzle', puzzleId: 'cipher' },
            ],
          },
          {
            id: 'c6_copy_only',
            text: '사본만 만든다. 원본은 그대로 둔다.  ✦ 지성+15  우아함+5',
            acts: [
              { type: 'stat', k: 'intel',    v: 15 },
              { type: 'stat', k: 'elegance', v:  5 },
              { type: 'flag', k: 'rumorSource', v: 'copy' },
              { type: 'addEvidence', clue: 'secretPact' },
              { type: 'toast', msg: '원본을 남겨뒀다. 흔적이 적다.', color: '#c9956a' },
              { type: 'puzzle', puzzleId: 'cipher' },
            ],
          },
          {
            id: 'c6_leave',
            text: '너무 위험하다. 모른 척하고 돌아간다.  ✦ 우아함+5',
            acts: [
              { type: 'stat', k: 'elegance', v: 5 },
              { type: 'toast', msg: '협상 카드를 포기했다.', color: '#8a7a6a' },
              { type: 'next' },
            ],
          },
        ],
      },
      // 퍼즐 완료 후 이어지는 씬
      {
        id: 'c6s3',
        char: null,
        text: (fl) => fl.puzzleSolved
          ? '암호가 풀렸다. 밀약서의 숨겨진 내용: 발로아 가문이 황귀비 파벌에 이중으로 정보를 팔았다는 기록. 이건 — 누명의 증거가 될 수도 있고, 발로아 가문을 무너뜨릴 수도 있다.'
          : '암호를 해독하지 못했다. 문서는 있지만 완전하지 않다. 아리엔에게 도움을 구해야 할 수도 있다.',
        condition: (fl) => fl.rumorSource !== 'none',
      },
      {
        id: 'c6s4',
        char: 'arien',
        text: (fl) => fl.arienContract && fl.rumorSource !== 'none'
          ? '마탑에서 연락이 왔다. "발로아 가문 관련 마력 조작 흔적을 발견했다. 네가 한 게 아니다." 아리엔이 마력 데이터를 분석한 결과였다.'
          : null,
        condition: (fl) => fl.arienContract,
      },
      {
        id: 'c6s5',
        char: 'arien',
        text: (fl) => fl.arienContract
          ? '"마력의 흔적은 지워지지 않아. 누군가 발로아 가문의 마력 특성을 모방해서 조작했어. 이건 — 계획적인 누명이야."'
          : null,
        condition: (fl) => fl.arienContract,
        choices: [
          {
            id: 'c6_arien_evidence',
            text: '아리엔에게 증거 확보를 부탁한다.  ✦ 아리엔♥+15  마력+10',
            condition: (fl) => fl.arienContract,
            acts: [
              { type: 'stat', k: 'magic', v: 10 },
              { type: 'aff',  k: 'arien', v: 15 },
              { type: 'addEvidence', clue: 'magicForgery' },
              { type: 'toast', msg: '마력 위조 증거를 확보했다. 결정적인 단서.', color: '#a070d8' },
              { type: 'next' },
            ],
          },
          {
            id: 'c6_solo_evidence',
            text: '혼자 처리한다. 아리엔을 더 끌어들이지 않는다.  ✦ 담력+10',
            condition: (fl) => fl.arienContract,
            acts: [
              { type: 'stat', k: 'courage', v: 10 },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c6s6',
        char: null,
        text: (fl) => {
          const ev = fl.evidenceCount;
          if (ev >= 3) return `준비가 됐다. 증거 ${ev}개. 동맹들. 그리고 밀약서. 폭풍이 오기 전에, 마지막 수를 준비해야 한다.`
          return `아직 부족하다. 증거 ${ev}개. 누명을 벗기엔 충분하지 않다. 더 많은 시간이 필요한데 — 시간이 없다.`
        },
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 7 · 추락 — 누명
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 6,
    title: 'Chapter VII  ·  추락',
    subtitle: '발로아 별궁, 누명',
    bg: 'bgDungeon',
    scenes: [
      {
        id: 'c7s0',
        char: null,
        text: '새벽 3시. 황궁 경비대가 발로아 별궁을 포위했다. 원작보다 3개월 이르다. 이쪽이 먼저 움직여서인지, 아니면 상대가 서두른 것인지.',
      },
      {
        id: 'c7s1',
        char: null,
        text: '"레아나 드 발로아가 황녀 전하 시해를 공모했다!" 정보부 수장의 목소리. 황궁이 술렁였다. 레아나를 미워하던 사람들이 기다렸다는 듯 고개를 끄덕이는 소리가 들렸다.',
      },
      {
        id: 'c7s2',
        char: null,
        text: (fl) => {
          const lines = []
          if (fl.rumorSource !== 'none') lines.push('밀약서가 있다. 협상 테이블에 올라갈 수 있다.')
          if (fl.evidenceCount >= 3)     lines.push(`증거 ${fl.evidenceCount}개가 있다.`)
          if (fl.arienContract)          lines.push('아리엔의 마력 분석이 있다.')
          if (fl.kaelDebt)               lines.push('카엘이 개입할 여지가 있다.')
          if (lines.length === 0) return '아무것도 없다. 증거도, 동맹도, 협상 카드도. 원작대로 흘러가고 있다.'
          return `가진 것들을 확인했다. ${lines.join(' ')} 아직 끝나지 않았다.`
        },
      },
      {
        id: 'c7s3',
        char: null,
        text: '구금됐다. 발로아 별궁 안에 갇혔다. 경비가 문 앞을 지킨다. 24시간 이내에 정식 재판 청구가 들어올 것이다. 지금 움직여야 한다.',
        choices: [
          {
            id: 'c7_escape',
            text: '자력으로 탈출 시도. 마력을 쓴다.  ✦ 마력+10  담력+10  악명+15',
            condition: (fl, st) => st.magic >= 40,
            acts: [
              { type: 'stat', k: 'magic',   v: 10 },
              { type: 'stat', k: 'courage', v: 10 },
              { type: 'stat', k: 'infamy',  v: 15 },
              { type: 'flag', k: 'accusationPhase', v: 'escaped' },
              { type: 'toast', msg: '마력으로 봉인을 해제했다. 하지만 황궁이 알아챘다.', color: '#a070d8' },
              { type: 'next' },
            ],
          },
          {
            id: 'c7_send_message',
            text: '동맹에게 전갈을 보낸다. 누구에게?',
            acts: [
              { type: 'flag', k: 'accusationPhase', v: 'accused' },
              { type: 'next' },
            ],
          },
          {
            id: 'c7_wait',
            text: '움직이지 않는다. 재판에서 싸운다.  ✦ 담력+15  우아함+10',
            acts: [
              { type: 'stat', k: 'courage',  v: 15 },
              { type: 'stat', k: 'elegance', v: 10 },
              { type: 'flag', k: 'accusationPhase', v: 'accused' },
              { type: 'toast', msg: '침착함을 유지했다. 하지만 시간이 없다.', color: '#c9956a' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c7s4',
        char: null,
        text: (fl) => fl.accusationPhase === 'escaped'
          ? '탈출에 성공했다. 하지만 이제 공식적인 지명수배 대상이다. 빠르게 움직여야 한다.'
          : '밤이 지나면 재판이 시작된다. 지금이 마지막 기회다. 누구에게 손을 내밀 것인가.',
      },
      {
        id: 'c7s5',
        char: null,
        text: '모든 것이 이 선택에 달려있다. 누구의 이름을 부를 것인가.',
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 8 · 선택 — 누구의 손을
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 7,
    title: 'Chapter VIII  ·  선택',
    subtitle: '망루, 누구의 손을 잡는가',
    bg: 'bgRooftop',
    scenes: [
      {
        id: 'c8s0',
        char: null,
        fullscreenLeana: true,
        text: '황궁 망루. 새벽빛이 도시를 물들이기 시작했다. 이 도시가 처형장이 될 수도, 내 무대가 될 수도 있다. 모든 것이 지금 이 선택에 달려있다.',
      },
      {
        id: 'c8s1',
        char: null,
        text: (fl) => {
          const available = []
          if (fl.kaelDebt)       available.push('카엘 — 그의 보호는 확실하지만, 빚의 무게가 따른다')
          if (fl.lucianPact)     available.push('루시안 — 위험한 동맹이지만, 그의 정보망은 제국 최고')
          if (fl.arienContract)  available.push('아리엔 — 마력의 증거가 있다, 진실을 밝힐 수 있다')
          if (fl.dorianAlly)     available.push('도리안 — 기사단을 움직일 수 있다')
          if (available.length === 0) return '아무도 없다. 혼자다. 그래도 방법을 찾아야 한다.'
          return `패를 확인했다. ${available.join('. ')}.`
        },
      },
      {
        id: 'c8s2',
        char: null,
        text: '누구를 선택하든 — 이 선택이 엔딩을 만든다.',
        choices: [
          {
            id: 'c8_kael',
            text: (fl) => fl.kaelDebt
              ? '카엘에게 간다. 그의 보호 아래, 진실을 밝힌다.'
              : '카엘에게 간다 — 가장 위험하지만, 가장 강한 패.',
            acts: [
              { type: 'aff',  k: 'kael', v: 20 },
              { type: 'flag', k: 'chosenRoute', v: 'kael' },
              { type: 'goto', ch: 8, si: 0, char: 'kael' },
            ],
          },
          {
            id: 'c8_lucian',
            text: (fl) => fl.lucianPact
              ? '루시안에게 간다. 이미 맺은 협약을 실행한다.'
              : '루시안에게 간다 — 위험한 도박.',
            acts: [
              { type: 'aff',  k: 'lucian', v: 20 },
              { type: 'flag', k: 'chosenRoute', v: 'lucian' },
              { type: 'goto', ch: 8, si: 8, char: 'lucian' },
            ],
          },
          {
            id: 'c8_arien',
            text: (fl) => fl.arienContract
              ? '아리엔에게 간다. 마력의 증거로 진실을 밝힌다.'
              : '아리엔에게 간다 — 마탑의 힘을 빌린다.',
            acts: [
              { type: 'aff',  k: 'arien', v: 20 },
              { type: 'flag', k: 'chosenRoute', v: 'arien' },
              { type: 'goto', ch: 8, si: 16, char: 'arien' },
            ],
          },
          {
            id: 'c8_dorian',
            text: (fl) => fl.dorianAlly
              ? '도리안에게 간다. 기사단의 칼날을 쓴다.'
              : '도리안에게 간다 — 가면 뒤의 진실을 건다.',
            acts: [
              { type: 'aff',  k: 'dorian', v: 20 },
              { type: 'flag', k: 'chosenRoute', v: 'dorian' },
              { type: 'goto', ch: 8, si: 24, char: 'dorian' },
            ],
          },
          {
            id: 'c8_alone',
            text: '혼자 간다. 모든 증거를 직접 황제 앞에 가져간다.',
            condition: (fl) => fl.evidenceCount >= 3 && fl.puzzleSolved,
            acts: [
              { type: 'flag', k: 'chosenRoute',   v: 'solo' },
              { type: 'flag', k: 'allAllies',     v: true },
              { type: 'goto', ch: 8, si: 32, char: null },
            ],
          },
        ],
      },

      // ── 카엘 루트 (si: 0~7) ────────────────────────────────────────────
      {
        id: 'c8_kael_0',
        char: 'kael',
        text: '황태자궁. 카엘이 서류를 내려다보다 고개를 들었다.',
      },
      {
        id: 'c8_kael_1',
        char: 'kael',
        text: (fl) => fl.kaelFirstMeet === 'ally'
          ? '"왔군." 그의 목소리는 차갑지 않았다. "이미 준비하고 있었어."'
          : fl.kaelFirstMeet === 'graceful'
          ? '"살려달라는 말 — 처음 듣는군, 레아나에게서." 냉기가 약간 흔들렸다.'
          : '"도움을 청하러 왔나." 그가 서류를 덮었다. "원하는 게 뭔지."',
      },
      {
        id: 'c8_kael_2',
        char: 'kael',
        text: '"누명이라는 걸 — 나는 알고 있어."',
      },
      {
        id: 'c8_kael_3',
        char: 'kael',
        text: (fl) => fl.rumorSource !== 'none'
          ? '"그리고 이 밀약서." 카엘이 문서를 받아들며 눈을 가늘게 떴다. "이걸 가지고 있었군. …생각보다 위험한 사람이야." 처음으로 진짜 시선으로 바라봤다.'
          : '"증거 없이는 내 손을 묶어." 카엘이 냉정하게 말했다. "공식적으로 개입할 수 없어."',
      },
      {
        id: 'c8_kael_4',
        char: 'kael',
        text: '"한 가지 조건이 있어." 그가 자리에서 일어났다. "내 편이 돼라. 완전하게. 그 대가로 — 내가 이 누명의 배후를 밝혀줄게."',
        choices: [
          {
            id: 'c8_kael_accept',
            text: '그의 손을 잡는다.  ✦ 카엘♥+20  →  엔딩 판정',
            acts: [
              { type: 'aff',  k: 'kael', v: 20 },
              { type: 'goto', ch: 9, si: 0, char: 'kael' },
            ],
          },
          {
            id: 'c8_kael_terms',
            text: '"조건을 바꾸죠. 내 편이 되는 대신 — 대등한 동맹."  ✦ 지성+15  담력+15  카엘♥+12',
            acts: [
              { type: 'stat', k: 'intel',   v: 15 },
              { type: 'stat', k: 'courage', v: 15 },
              { type: 'aff',  k: 'kael',    v: 12 },
              { type: 'flag', k: 'kaelSecret', v: true },
              { type: 'goto', ch: 9, si: 0, char: 'kael' },
            ],
          },
        ],
      },

      // ── 루시안 루트 (si: 8~15) ─────────────────────────────────────────
      {
        id: 'c8_lucian_0',
        char: 'lucian',
        text: '별궁. 루시안이 와인 잔을 들고 기다리고 있었다.',
      },
      {
        id: 'c8_lucian_1',
        char: 'lucian',
        text: '"결국 오셨군요." 그가 잔을 내려놓았다. 이번엔 웃지 않았다. "늦었지만, 안 온 것보다는 낫죠."',
      },
      {
        id: 'c8_lucian_2',
        char: 'lucian',
        text: (fl) => fl.lucianDance === 'bold' || fl.lucianDance === 'danced'
          ? '"우리가 나눴던 정보들 — 지금 다 써야 할 때가 됐어요." 그가 서류를 꺼냈다. "황귀비 측근의 이름, 거래 기록, 그리고 — 진짜 배후."'
          : '"제게 처음부터 왔더라면 더 쉬웠을 텐데." 루시안이 씁쓸하게 웃었다. "그래도, 가진 패를 같이 써봅시다."',
      },
      {
        id: 'c8_lucian_3',
        char: 'lucian',
        text: '"단 하나의 조건. 이 사건이 끝나면 — 당신이 내 편에 있어야 해요. 황위 계승, 그 게임에서."',
        choices: [
          {
            id: 'c8_lucian_accept',
            text: '동의한다. 루시안과 함께 황위 게임에 뛰어든다.  ✦ 루시안♥+20',
            acts: [
              { type: 'aff',  k: 'lucian', v: 20 },
              { type: 'flag', k: 'lucianPact', v: true },
              { type: 'goto', ch: 9, si: 8, char: 'lucian' },
            ],
          },
          {
            id: 'c8_lucian_partial',
            text: '"황위 게임은 나중에 얘기해요. 지금은 이것만."  ✦ 지성+15  루시안♥+10',
            acts: [
              { type: 'stat', k: 'intel',  v: 15 },
              { type: 'aff',  k: 'lucian', v: 10 },
              { type: 'goto', ch: 9, si: 8, char: 'lucian' },
            ],
          },
        ],
      },

      // ── 아리엔 루트 (si: 16~23) ────────────────────────────────────────
      {
        id: 'c8_arien_0',
        char: 'arien',
        text: '마탑 꼭대기. 아리엔이 창밖을 보고 있었다.',
      },
      {
        id: 'c8_arien_1',
        char: 'arien',
        text: '"오리라고 생각했어." 그가 돌아봤다. "네가 범인이 아니라는 건 마력의 흔적이 말해주고 있어."',
      },
      {
        id: 'c8_arien_2',
        char: 'arien',
        text: (fl) => fl.arienProof === 'power'
          ? '"네 마력의 고유 파동은 내가 기억하고 있어. 위조된 마력 흔적과 패턴이 달라." 그가 데이터를 펼쳤다. "법정 증거로 쓸 수 있어."'
          : '"마력 흔적 분석 결과, 위조가 있었어. 다만—" 아리엔이 잠깐 멈췄다. "법정에서 인정받으려면 더 많은 증거가 필요해."',
      },
      {
        id: 'c8_arien_3',
        char: 'arien',
        text: '"같이 가서 밝혀줄게. 단 — 마탑의 독립성을 황실이 보장하는 조건으로. 네가 서약을 받아와."',
        choices: [
          {
            id: 'c8_arien_accept',
            text: '동의한다. 마탑의 독립성을 보장하겠다.  ✦ 아리엔♥+20',
            acts: [
              { type: 'aff',  k: 'arien', v: 20 },
              { type: 'flag', k: 'arienContract', v: true },
              { type: 'goto', ch: 9, si: 16, char: 'arien' },
            ],
          },
          {
            id: 'c8_arien_data',
            text: '"마력 데이터 제공 계약, 10년 연장. 그 대신 마탑 독립은 내가 보장."  ✦ 지성+20  아리엔♥+15',
            acts: [
              { type: 'stat', k: 'intel', v: 20 },
              { type: 'aff',  k: 'arien', v: 15 },
              { type: 'flag', k: 'arienContract', v: true },
              { type: 'flag', k: 'arienTrust',    v: 3 },
              { type: 'goto', ch: 9, si: 16, char: 'arien' },
            ],
          },
        ],
      },

      // ── 도리안 루트 (si: 24~31) ────────────────────────────────────────
      {
        id: 'c8_dorian_0',
        char: 'dorian',
        text: '기사단장실. 도리안이 기다리고 있었다. 언제나처럼 부드러운 미소.',
      },
      {
        id: 'c8_dorian_1',
        char: 'dorian',
        text: '"레아나 님." 그가 일어섰다. "무고하다는 걸 알고 있었어요. 처음부터."',
      },
      {
        id: 'c8_dorian_2',
        char: 'dorian',
        text: (fl) => fl.dorianGuard === 'confronted'
          ? '"솔직한 분이라는 걸 알기에 — 저도 솔직하게." 그가 서류를 꺼냈다. "황귀비 측근의 자필 서신. 거래 기록. 그리고—" 잠깐 멈췄다. "진짜 배후의 이름."'
          : '"조건이 있어요." 다정한 미소 뒤로 싸늘한 눈빛이 스쳤다. "이후엔 저를 통해서만 움직이셔야 합니다. 언제나."',
      },
      {
        id: 'c8_dorian_3',
        char: 'dorian',
        text: '"제가 이 사건을 해결해드리겠습니다. 대가는 — 당신의 신뢰."',
        choices: [
          {
            id: 'c8_dorian_trust',
            text: '그의 손을 잡는다. 진심을 건다.  ✦ 도리안♥+20',
            acts: [
              { type: 'aff',  k: 'dorian', v: 20 },
              { type: 'flag', k: 'dorianAlly',   v: true },
              { type: 'flag', k: 'dorianSecret', v: true },
              { type: 'goto', ch: 9, si: 24, char: 'dorian' },
            ],
          },
          {
            id: 'c8_dorian_probe',
            text: '"당신의 진짜 목적을 먼저 말해줘요." 가면 뒤를 본다.  ✦ 담력+20  지성+15  도리안♥+15',
            acts: [
              { type: 'stat', k: 'courage', v: 20 },
              { type: 'stat', k: 'intel',   v: 15 },
              { type: 'aff',  k: 'dorian',  v: 15 },
              { type: 'flag', k: 'dorianSecret', v: true },
              { type: 'flag', k: 'dorianAlly',   v: true },
              { type: 'goto', ch: 9, si: 24, char: 'dorian' },
            ],
          },
        ],
      },

      // ── 솔로 루트 (si: 32~) ────────────────────────────────────────────
      {
        id: 'c8_solo_0',
        char: null,
        text: '혼자다. 그래도 — 여기까지 모은 것들이 있다. 증거, 밀약서, 마력 분석. 황제 앞에 직접 가져간다.',
      },
      {
        id: 'c8_solo_1',
        char: null,
        text: '레아나 드 발로아가 혼자 황궁을 가로질렀다. 도망치는 것도, 숨는 것도 아닌 — 앞으로.',
        choices: [
          {
            id: 'c8_solo_forward',
            text: '황제의 알현실로 향한다.  →  트루/히든 엔딩 판정',
            acts: [
              { type: 'flag', k: 'allAllies', v: true },
              { type: 'goto', ch: 9, si: 32, char: null },
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 9 · 결전 — 각 루트 전개
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 8,
    title: 'Chapter IX  ·  결전',
    subtitle: '각자의 방식으로',
    bg: null, // 루트별 처리
    scenes: [
      // ── 카엘 루트 (0~7) ────────────────────────────────────────────────
      {
        id: 'c9_kael_0',
        char: 'kael',
        text: '황제 알현실. 카엘이 먼저 들어갔다. 레아나는 그 뒤에 섰다. 처음으로 황태자의 "뒤"가 아닌 — "옆"이었다.',
        bg: 'bgThroneRoom',
      },
      {
        id: 'c9_kael_1',
        char: 'kael',
        text: '"폐하, 발로아 공녀의 누명에 대한 증거를 가져왔습니다." 카엘의 목소리는 흔들리지 않았다. "그리고 — 진짜 음모자의 이름도."',
        bg: 'bgThroneRoom',
      },
      {
        id: 'c9_kael_2',
        char: 'kael',
        text: (fl) => fl.rumorSource !== 'none'
          ? '밀약서와 증거들이 펼쳐졌다. 황궁이 술렁였다. 카엘은 한 발짝도 물러서지 않았다. 처음으로 — 그가 레아나를 위해 무언가를 걸었다.'
          : '증거가 충분하지 않았다. 카엘이 자신의 신뢰를 직접 담보로 걸었다. "내가 보증한다."',
        bg: 'bgThroneRoom',
      },
      {
        id: 'c9_kael_3',
        char: 'kael',
        text: '사건이 마무리됐다. 카엘이 돌아보며 처음으로 레아나의 이름을 호칭 없이 불렀다. "레아나."',
        bg: 'bgStudy',
      },
      {
        id: 'c9_kael_4',
        char: 'kael',
        text: (fl) => fl.kaelSecret
          ? '"당신은 — 처음 만났을 때부터 달랐어. 원작의 레아나가 아니라는 걸 알고 있었어." 처음으로 무너지는 냉기.'
          : '"오늘 일은 잊어라." 그가 시선을 돌렸다. "하지만 — 고맙다는 말은 하지."',
        bg: 'bgStudy',
        choices: [
          {
            id: 'c9_kael_ending',
            text: '그의 말에 답한다…  →  엔딩',
            acts: [{ type: 'ending' }],
          },
        ],
      },

      // ── 루시안 루트 (8~15) ────────────────────────────────────────────
      {
        id: 'c9_lucian_0',
        char: 'lucian',
        text: '루시안의 움직임은 빨랐다. 밤새 황귀비 측근 세 명을 압박했다. 새벽이 되기 전에 자백서가 나왔다.',
        bg: 'bgLucian',
      },
      {
        id: 'c9_lucian_1',
        char: 'lucian',
        text: '"생각보다 간단했어요." 루시안이 문서를 건넸다. "진짜 배후는 황귀비가 아니라 — 그 뒤에 있는 누군가예요."',
        bg: 'bgLucian',
      },
      {
        id: 'c9_lucian_2',
        char: 'lucian',
        text: (fl) => fl.lucianInfo >= 2
          ? '"그 누군가를 — 저는 알고 있었어요. 처음부터." 그가 처음으로 가면을 조금 내렸다. "하지만 당신이 필요했어요. 증인으로."'
          : '"이 게임, 생각보다 깊게 들어오셨군요." 루시안이 웃었다. 이번엔 진짜 웃음인지 알 수 없었다.',
        bg: 'bgLucian',
      },
      {
        id: 'c9_lucian_3',
        char: 'lucian',
        text: '"자, 이제 우리는 공모자예요. 빠져나갈 수 없는 관계죠." 그가 손을 내밀었다. "파트너?"',
        bg: 'bgCorridor',
        choices: [
          {
            id: 'c9_lucian_ending',
            text: '그의 손을 잡는다…  →  엔딩',
            acts: [{ type: 'ending' }],
          },
        ],
      },

      // ── 아리엔 루트 (16~23) ───────────────────────────────────────────
      {
        id: 'c9_arien_0',
        char: 'arien',
        text: '마탑이 움직였다. 아리엔이 황궁 재판정에 나타난 건 — 전례가 없는 일이었다.',
        bg: 'bgTower',
      },
      {
        id: 'c9_arien_1',
        char: 'arien',
        text: '"마력 조작 분석 결과를 제출한다." 법정이 조용해졌다. 마탑의 증언은 부인할 수 없었다.',
        bg: 'bgTower',
      },
      {
        id: 'c9_arien_2',
        char: 'arien',
        text: (fl) => fl.arienProof === 'power'
          ? '"레아나 드 발로아의 마력 파동과 현장의 흔적은 일치하지 않는다. 위조다." 단호하게. 의심의 여지가 없었다.'
          : '"마력 흔적 패턴 분석. 위조 가능성 94%." 데이터가 전부 말했다.',
        bg: 'bgTower',
      },
      {
        id: 'c9_arien_3',
        char: 'arien',
        text: '재판 후. 마탑으로 돌아가는 아리엔이 걸음을 멈췄다. "네 마력은 이제 완전히 안정됐어." 잠깐 침묵. "다음엔 — 마탑에 연구하러 와도 좋아."',
        bg: 'bgRooftop',
        choices: [
          {
            id: 'c9_arien_ending',
            text: '그의 초대에 답한다…  →  엔딩',
            acts: [{ type: 'ending' }],
          },
        ],
      },

      // ── 도리안 루트 (24~31) ───────────────────────────────────────────
      {
        id: 'c9_dorian_0',
        char: 'dorian',
        text: '기사단이 움직였다. 도리안의 명령 한 마디에 황궁 수비 체계가 재편됐다. 황귀비 측 인물들이 조용히 격리됐다.',
        bg: 'bgGarden',
      },
      {
        id: 'c9_dorian_1',
        char: 'dorian',
        text: '"이게 제가 할 수 있는 일이에요, 영애." 부드러운 미소. 하지만 이번엔 — 진짜인지 가짜인지 더 이상 중요하지 않았다.',
        bg: 'bgGarden',
      },
      {
        id: 'c9_dorian_2',
        char: 'dorian',
        text: (fl) => fl.dorianSecret
          ? '"그리고 — 제 진짜 목적이요." 그가 처음으로 미소를 거뒀다. "발로아 가문을 지키는 것. 항상 그랬어요. 이유는—" 잠깐 멈췄다. "나중에 말씀드릴게요."'
          : '"조건은 여전히 유효해요." 그가 레아나를 바라봤다. "저를 통해서만 움직이는 것. 대신 — 제가 항상 곁에 있을 테니."',
        bg: 'bgGarden',
      },
      {
        id: 'c9_dorian_3',
        char: 'dorian',
        text: '진심인지 연기인지. 그 경계가 이미 무의미해진 순간이었다.',
        bg: 'bgThroneRoom',
        choices: [
          {
            id: 'c9_dorian_ending',
            text: '그의 진심을 받아들인다…  →  엔딩',
            acts: [{ type: 'ending' }],
          },
        ],
      },

      // ── 솔로 루트 (32~) ───────────────────────────────────────────────
      {
        id: 'c9_solo_0',
        char: null,
        text: '황제의 알현실. 혼자 들어갔다. 경비들이 막으려 했다. 레아나는 멈추지 않았다.',
        bg: 'bgThroneRoom',
      },
      {
        id: 'c9_solo_1',
        char: null,
        text: '"폐하, 직접 여쭤볼 것이 있습니다." 황제가 놀란 기색을 보였다. 아무도 이렇게 들어온 적이 없었다.',
        bg: 'bgThroneRoom',
      },
      {
        id: 'c9_solo_2',
        char: null,
        text: '밀약서, 마력 분석, 파벌 구도, 수집한 증거 — 전부 펼쳤다. 레아나는 떨지 않았다.',
        bg: 'bgThroneRoom',
      },
      {
        id: 'c9_solo_3',
        char: null,
        text: '긴 침묵 끝에 — 황제가 입을 열었다. "…누가 이것을 준비했느냐." "저 스스로입니다, 폐하."',
        bg: 'bgThroneRoom',
        choices: [
          {
            id: 'c9_solo_ending',
            text: '황제의 답을 기다린다…  →  엔딩',
            acts: [{ type: 'ending' }],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 10 · 결말 — 레아나의 법칙
  // (엔딩은 calcEnding()으로 분기, 이 씬들은 엔딩 화면에서 처리)
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 9,
    title: 'Chapter X  ·  레아나의 법칙',
    subtitle: '결말',
    bg: null,
    scenes: [
      {
        id: 'c10_epilogue',
        char: null,
        text: '레아나 드 발로아. 처형당할 악녀. 하지만 그 결말은 — 당신이 써온 선택들이 바꿨다.',
      },
    ],
  },
];
