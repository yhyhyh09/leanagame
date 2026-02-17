// ═══════════════════════════════════════════════════════════════════════════
// SCENARIO — Ch.1 ~ Ch.5
// 텍스트 함수 시그니처: (flags, stats, affinity) => string
// ═══════════════════════════════════════════════════════════════════════════

export const SCENARIO_1_5 = [

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 1 · 악녀로 눈을 뜨다
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 0,
    title: 'Chapter I  ·  악녀로 눈을 뜨다',
    subtitle: '모든 것이 낯설다',
    bg: 'bgLeanaRoom',
    scenes: [
      {
        id: 'c1s0',
        char: null,
        text: '눈을 뜨니 황금빛 천장이 보였다. 머리가 쪼개지듯 아프다. 손을 들었더니 — 손등에 작은 흉터가 있다. 이건 내 손이 아니다.',
      },
      {
        id: 'c1s1',
        char: null,
        fullscreenLeana: true,
        text: '침대에서 일어나 거울 앞에 섰다. 새벽빛 속에서 화려하고 창백한 얼굴이 나를 바라봤다. 그리고 나는 깨달았다 — 이 얼굴을 알고 있다. 소설에서 봤다. 처형당하는 악녀의 얼굴을.',
      },
      {
        id: 'c1s2',
        char: null,
        text: (fl) => `레아나 드 발로아. 황태자의 약혼녀이자 황궁에서 가장 증오받는 여인. 원작에서 그녀는 황태자에게 집착하다 역모죄로 처형당한다. ${fl.kaelFirstMeet !== 'none' ? '그 황태자와 이미 만났다.' : '무도회까지 — 원작 기준으로 약 2주가 남아 있다.'}`,
      },
      {
        id: 'c1s3',
        char: null,
        text: '기억을 정리했다. 원작 지식: ① 발로아 가문은 황실과 밀약 중 ② 황궁 내 2개 파벌 암투 ③ 레아나의 마력이 6개월 내 폭주 ④ 진짜 역모꾼은 따로 있다. 내가 가진 유일한 무기는 결말을 아는 것뿐이다.',
      },
      {
        id: 'c1s4',
        char: null,
        text: '문제가 하나 더 있다. 레아나의 몸에 봉인된 마력. 원작에서 이게 폭주해 황궁 서쪽 날개를 박살냈다. 처리 방법은 두 가지다 — 마탑의 아리엔에게 도움을 구하거나, 스스로 통제법을 찾거나. 어느 쪽이든 시간이 없다.',
      },
      {
        id: 'c1s5',
        char: null,
        text: '그리고 오늘 — 황궁 무도회. 원작에서 레아나가 황태자에게 공개적으로 망신당하고, 첫 번째 사고가 터지는 날이다. 어떻게 임할 것인가.',
        choices: [
          {
            id: 'c1_quiet',
            text: '존재감을 지운다. 조용히, 안전하게.  ✦ 지성+10',
            acts: [
              { type: 'stat',  k: 'intel',   v: 10 },
              { type: 'stat',  k: 'courage', v: -5 },
              { type: 'flag',  k: 'firstBallApproach', v: 'quiet' },
              { type: 'toast', msg: '원작의 흐름에서 벗어나기 시작했다.', color: '#7ab8d4' },
              { type: 'screen', v: 'wardrobe' },
            ],
          },
          {
            id: 'c1_bold',
            text: '선제적으로 기선을 제압한다. 악녀답게, 하지만 계산적으로.  ✦ 매력+10  담력+10  악명+5',
            acts: [
              { type: 'stat',  k: 'charm',   v: 10 },
              { type: 'stat',  k: 'courage', v: 10 },
              { type: 'stat',  k: 'infamy',  v:  5 },
              { type: 'flag',  k: 'firstBallApproach', v: 'bold' },
              { type: 'toast', msg: '황궁의 시선이 당신에게 집중되기 시작했다.', color: '#c9956a' },
              { type: 'screen', v: 'wardrobe' },
            ],
          },
          {
            id: 'c1_scheme',
            text: '무도회 전에 정보를 수집한다. 파벌 지도를 먼저 그린다.  ✦ 지성+15  우아함+5  담력-5',
            acts: [
              { type: 'stat',  k: 'intel',    v: 15 },
              { type: 'stat',  k: 'elegance', v:  5 },
              { type: 'stat',  k: 'courage',  v: -5 },
              { type: 'flag',  k: 'firstBallApproach', v: 'intel' },
              { type: 'flag',  k: 'factionMapKnown',   v: true },
              { type: 'toast', msg: '황궁 내 파벌 구도를 파악했다. 써먹을 때가 온다.', color: '#7ab8d4' },
              { type: 'screen', v: 'wardrobe' },
            ],
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 2 · 얼음과 불의 왈츠
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Chapter II  ·  얼음과 불의 왈츠',
    subtitle: '무도회장, 황궁 서관',
    bg: 'bgBallroom',
    scenes: [
      {
        id: 'c2s0',
        char: null,
        text: (fl) => fl.firstBallApproach === 'intel'
          ? '무도회장 입장 전, 복도에서 하녀들의 대화를 엿들었다. "황귀비 마마 측이 오늘 발로아 가문에 뭔가 시험을 한다더라." 예상보다 빨리 움직이고 있다.'
          : '샹들리에 불빛 아래 귀족들의 시선이 일제히 꽂혔다. "왔군, 발로아 공녀." 낮게 웅성이는 소리들. 이미 레아나는 적이 많다.',
      },
      {
        id: 'c2s1',
        char: null,
        text: '연회장 한쪽에서 황귀비 파벌의 귀족들이 모여 있다. 다른 쪽엔 중립파. 황태자 측은 아직 입장하지 않았다. 파벌 지도가 머릿속에 그려진다.',
      },
      {
        id: 'c2s2',
        char: null,
        text: '그때 — 입구가 조용해졌다. 냉기가 먼저 들어왔다. 그리고 카엘 황태자.',
        choices: [
          {
            id: 'c2_watch',
            text: '(시선을 피하며) 먼저 움직이지 않는다. 그가 오면 대응한다.',
            acts: [
              { type: 'stat', k: 'intel',    v:  8 },
              { type: 'stat', k: 'elegance', v:  5 },
              { type: 'flag', k: 'kaelApproach', v: 'passive' },
              { type: 'next' },
            ],
          },
          {
            id: 'c2_greet',
            text: '(먼저 인사하며) 약혼녀로서 자리를 지킨다. 우아하게, 계산적으로.',
            acts: [
              { type: 'stat', k: 'elegance', v: 12 },
              { type: 'aff',  k: 'kael',     v:  5 },
              { type: 'flag', k: 'kaelApproach', v: 'proactive' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c2s3',
        char: 'kael',
        text: (fl) => fl.kaelApproach === 'proactive'
          ? '"레아나." 그가 걸음을 멈췄다. 차가운 시선이 훑고 지나갔다. "…오늘은 달라 보이는군." 칭찬인지 경고인지 알 수 없는 말.'
          : '"레아나. 여기 있었군." 그가 마치 장애물을 확인하듯 말했다. "또 무슨 꿍꿍이인지."',
      },
      {
        id: 'c2s4',
        char: 'kael',
        text: '"약혼 관계는 아직 유효하다. 하지만 착각하지 마라 — 그것이 내가 너를 보호한다는 의미는 아니야."',
        choices: [
          {
            id: 'c2_graceful',
            text: '"약혼녀로서 의무를 다하러 왔을 뿐입니다, 전하." (완벽한 미소로)  ✦ 우아함+15  카엘♥+8',
            acts: [
              { type: 'stat', k: 'elegance', v: 15 },
              { type: 'aff',  k: 'kael',     v:  8 },
              { type: 'flag', k: 'kaelFirstMeet', v: 'graceful' },
              { type: 'toast', msg: '카엘이 당신의 태도 변화를 기억할 것이다.', color: '#7ab8d4' },
              { type: 'next' },
            ],
          },
          {
            id: 'c2_defiant',
            text: '"전하의 허락이 필요한 자리인가요?" (눈을 피하지 않으며)  ✦ 담력+15  카엘♥-5  악명+5',
            acts: [
              { type: 'stat', k: 'courage', v: 15 },
              { type: 'stat', k: 'infamy',  v:  5 },
              { type: 'aff',  k: 'kael',    v: -5 },
              { type: 'flag', k: 'kaelFirstMeet', v: 'defiant' },
              { type: 'toast', msg: '카엘의 눈이 처음으로 좁혀졌다.', color: '#7ab8d4' },
              { type: 'next' },
            ],
          },
          {
            id: 'c2_intel',
            text: '"전하, 황귀비 파벌이 오늘 저를 시험하려 한다는 정보가 있습니다." (낮게)  ✦ 지성+10  카엘♥+12',
            condition: (fl) => fl.factionMapKnown,
            acts: [
              { type: 'stat', k: 'intel',   v: 10 },
              { type: 'aff',  k: 'kael',    v: 12 },
              { type: 'flag', k: 'kaelFirstMeet', v: 'ally' },
              { type: 'flag', k: 'kaelSecret',    v: true },
              { type: 'toast', msg: '카엘이 처음으로 당신을 직접 바라봤다.', color: '#7ab8d4' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c2s5',
        char: 'kael',
        text: (fl) => {
          if (fl.kaelFirstMeet === 'ally') return '"…정보가 맞다." 그가 낮게 말했다. "어떻게 알았지?" 냉기가 잠깐 흔들렸다. 계산이 아닌 진짜 의문.'
          if (fl.kaelFirstMeet === 'graceful') return '카엘이 아무 말 없이 지나쳤다. 하지만 지나치는 순간 — 아주 낮게. "조심해라." 경고인지, 보호인지 알 수 없었다.'
          return '카엘이 차갑게 지나쳤다. 주변 귀족들이 안도의 한숨을 내쉬었다. 첫 만남은 최악이었다. 하지만 최악이 항상 끝은 아니다.'
        },
      },
      {
        id: 'c2s6',
        char: 'lucian',
        text: '카엘이 사라진 자리에 다른 기척이 왔다. 와인 향과 함께, 위험한 웃음소리.',
      },
      {
        id: 'c2s7',
        char: 'lucian',
        text: '"저런, 형님이 또 쌀쌀맞게 구셨나 보군요." 그가 잔을 기울이며 다가왔다. 루시안 황자. 원작에서 최종 보스에 가까운 인물. "레아나 공녀, 오늘 유독 달라 보이네요."',
      },
      {
        id: 'c2s8',
        char: 'lucian',
        text: '"춤 한 곡 어때요? 대가는 — 비밀 하나씩 교환하는 걸로." 위험한 제안. 하지만 루시안이 가진 정보망은 황궁 최고 수준이다.',
        choices: [
          {
            id: 'c2_refuse_lucian',
            text: '정중히 거절한다. 루시안은 너무 위험하다.  ✦ 지성+10  루시안♥-5',
            acts: [
              { type: 'stat', k: 'intel',  v: 10 },
              { type: 'aff',  k: 'lucian', v: -5 },
              { type: 'flag', k: 'lucianDance', v: 'refused' },
              { type: 'toast', msg: '루시안이 첫 정보 교환을 기억할 것이다.', color: '#c44060' },
              { type: 'next' },
            ],
          },
          {
            id: 'c2_dance_lucian',
            text: '받아들인다. 독은 독으로.  ✦ 매력+15  루시안♥+10  지성+5',
            acts: [
              { type: 'stat', k: 'charm',  v: 15 },
              { type: 'stat', k: 'intel',  v:  5 },
              { type: 'aff',  k: 'lucian', v: 10 },
              { type: 'flag', k: 'lucianDance', v: 'danced' },
              { type: 'flag', k: 'lucianInfo',  v: 1 },
              { type: 'toast', msg: '루시안에게서 황실 파벌 1급 정보를 얻었다.', color: '#c44060' },
              { type: 'next' },
            ],
          },
          {
            id: 'c2_counter_lucian',
            text: '"비밀 교환이라면 — 제가 먼저 드릴까요?" (선제적으로 패를 보인다)  ✦ 담력+15  루시안♥+18  악명+5',
            acts: [
              { type: 'stat', k: 'courage', v: 15 },
              { type: 'stat', k: 'infamy',  v:  5 },
              { type: 'aff',  k: 'lucian',  v: 18 },
              { type: 'flag', k: 'lucianDance', v: 'bold' },
              { type: 'flag', k: 'lucianInfo',  v: 2 },
              { type: 'flag', k: 'lucianPact',  v: true },
              { type: 'toast', msg: '루시안이 처음으로 진짜 눈빛을 보였다. "흥미롭군요."', color: '#c44060' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c2s9',
        char: 'lucian',
        text: (fl) => {
          if (fl.lucianDance === 'bold') return '"정보부가 발로아 가문을 노리고 있어요. 그리고—" 그가 잔을 내려놓았다. "배후는 황귀비가 아닙니다." 예상 밖의 정보. 진짜인지 미끼인지 알 수 없다.'
          if (fl.lucianDance === 'danced') return '"정보부가 발로아 가문을 목표로 삼고 있어요. 누군가 당신을 제물로 쓰려 한다는 거죠." 낮고 위험한 목소리. 진심인지 연기인지.'
          return '루시안이 우아하게 물러났다. "기회는 한 번뿐이에요, 공녀." 그리고 사라졌다. 놓친 정보가 얼마나 될지.'
        },
      },
      {
        id: 'c2s10',
        char: null,
        text: (fl) => {
          const bits = []
          if (fl.kaelFirstMeet === 'ally')   bits.push('카엘의 경계심을 흔들었다')
          if (fl.lucianInfo >= 1)             bits.push('루시안의 정보망 일부에 접근했다')
          if (fl.factionMapKnown)             bits.push('파벌 구도를 파악했다')
          return `첫 무도회가 끝났다. 수확: ${bits.length > 0 ? bits.join(', ') : '없음'}. 하지만 이건 서막에 불과하다. 시계는 돌아가고 있다.`
        },
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 3 · 보랏빛 탑의 주인
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: 'Chapter III  ·  보랏빛 탑의 주인',
    subtitle: '마탑, 황궁 북쪽 끝',
    bg: 'bgTower',
    scenes: [
      {
        id: 'c3s0',
        char: null,
        text: '마탑. 마력 폭주를 막으려면 반드시 거쳐야 할 곳이다. 계단을 오를수록 공기가 달라진다. 마도서들이 저절로 페이지를 넘기고, 빛이 없는 곳에서 불꽃이 피어난다.',
      },
      {
        id: 'c3s1',
        char: 'arien',
        text: '"발로아 공녀." 아리엔이 고개도 들지 않고 말했다. 책 더미에 둘러싸인 채. "돌아가. 여기는 호기심으로 올 곳이 아니야."',
      },
      {
        id: 'c3s2',
        char: 'arien',
        text: '"…잠깐." 그가 처음으로 시선을 올렸다. 황금빛 눈이 레아나를 훑었다. "마력 회로가 엉망이군. 이대로 두면 두 달 안에 폭주한다." 진단. 마치 날씨 얘기를 하듯.',
      },
      {
        id: 'c3s3',
        char: 'arien',
        text: '"내가 도와줄 이유를 납득시켜봐. 논리적으로."',
        choices: [
          {
            id: 'c3_knowledge',
            text: '마법 이론으로 설득한다. 원작에서 읽은 내용을 총동원한다.  ✦ 지성+20  아리엔♥+10',
            acts: [
              { type: 'stat', k: 'intel', v: 20 },
              { type: 'aff',  k: 'arien', v: 10 },
              { type: 'flag', k: 'arienProof',    v: 'knowledge' },
              { type: 'flag', k: 'arienTrust',    v: 1 },
              { type: 'toast', msg: '아리엔이 처음으로 지적 관심을 보였다.', color: '#a070d8' },
              { type: 'next' },
            ],
          },
          {
            id: 'c3_power',
            text: '마력을 일부 개방해 보여준다. 논리보다 증거.  ✦ 마력+25  아리엔♥+18  악명+5',
            acts: [
              { type: 'stat', k: 'magic',  v: 25 },
              { type: 'stat', k: 'infamy', v:  5 },
              { type: 'aff',  k: 'arien',  v: 18 },
              { type: 'flag', k: 'arienProof',    v: 'power' },
              { type: 'flag', k: 'arienTrust',    v: 2 },
              { type: 'toast', msg: '아리엔의 눈이 처음으로 빛났다. "이 마력은…"', color: '#a070d8' },
              { type: 'next' },
            ],
          },
          {
            id: 'c3_bargain',
            text: '"황궁 내 파벌 정보와 교환합시다." 정보로 거래한다.  ✦ 지성+15  아리엔♥+8  담력+10',
            condition: (fl) => fl.lucianInfo >= 1,
            acts: [
              { type: 'stat', k: 'intel',   v: 15 },
              { type: 'stat', k: 'courage', v: 10 },
              { type: 'aff',  k: 'arien',   v:  8 },
              { type: 'flag', k: 'arienProof',    v: 'bargain' },
              { type: 'flag', k: 'arienTrust',    v: 1 },
              { type: 'toast', msg: '아리엔이 황궁 정치에 드디어 관심을 보였다.', color: '#a070d8' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c3s4',
        char: 'arien',
        text: (fl) => {
          if (fl.arienProof === 'power')    return '"이 마력은 기록에 없는 고위 계통이야." 아리엔이 지팡이를 내려놓으며 말했다. "폭주 전에 안정시킬 수 있어. 하지만 조건이 있다." 처음으로 흥미롭다는 눈빛.'
          if (fl.arienProof === 'bargain')  return '"…정보의 신뢰도가 높군." 그가 마침내 책을 덮었다. "파벌 구도와 마력 회로 안정화, 맞교환하지. 단, 이후에도 정보가 있으면 나에게 먼저 와야 해."'
          return '"논리는 맞아." 아리엔이 고개를 끄덕였다. "쓸모가 있을 것 같군. 한 번은 봐주지." 차갑지만 진심 어린 동의.'
        },
      },
      {
        id: 'c3s5',
        char: 'arien',
        text: '"조건 — 마력 안정화 과정에서 네 마력 데이터를 기록한다. 이의 없지?"',
        choices: [
          {
            id: 'c3_accept_contract',
            text: '동의한다. 분석 자료가 되는 건 감수할 수 있다.  ✦ 아리엔♥+10  마력+10',
            acts: [
              { type: 'stat', k: 'magic', v: 10 },
              { type: 'aff',  k: 'arien', v: 10 },
              { type: 'flag', k: 'arienContract', v: true },
              { type: 'addEvidence', clue: 'magicPattern' },
              { type: 'toast', msg: '아리엔과 계약이 체결됐다. 마력 안정화가 시작된다.', color: '#a070d8' },
              { type: 'next' },
            ],
          },
          {
            id: 'c3_negotiate_contract',
            text: '"데이터 열람 권한은 공유. 단, 제3자에게 넘기지 않는다는 조건으로."  ✦ 지성+15  아리엔♥+15',
            acts: [
              { type: 'stat', k: 'intel', v: 15 },
              { type: 'aff',  k: 'arien', v: 15 },
              { type: 'flag', k: 'arienContract', v: true },
              { type: 'flag', k: 'arienTrust',    v: 3 },
              { type: 'addEvidence', clue: 'magicPattern' },
              { type: 'toast', msg: '아리엔이 처음으로 웃었다. "영리하군." 조건부 계약 성립.', color: '#a070d8' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c3s6',
        char: null,
        text: (fl) => `마탑을 나서며 새로운 사실을 알았다. 아리엔은 레아나의 마력 폭주 가능성을 ${fl.arienProof === 'power' ? '수년 전부터 알고 있었다. 그리고 아무에게도 말하지 않았다.' : '이미 감지하고 있었다. 그가 황궁 내부 정치에 무심한 이유가 있을 것이다.'}`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 4 · 상냥한 가면의 이면
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: 'Chapter IV  ·  상냥한 가면의 이면',
    subtitle: '황궁 정원, 동쪽 회랑',
    bg: 'bgGarden',
    scenes: [
      {
        id: 'c4s0',
        char: 'dorian',
        text: '황궁 정원. 도리안 카페이로가 마치 처음부터 거기 있었던 것처럼 서 있었다. 항상 완벽한 미소. 항상 완벽한 자리. 그래서 더 무섭다.',
      },
      {
        id: 'c4s1',
        char: 'dorian',
        text: '"레아나 영애, 마탑을 다녀오셨군요." 그의 정보망은 실시간이다. "아리엔 공과 거래가 성사됐다고 들었습니다. 대단하시군요."',
      },
      {
        id: 'c4s2',
        char: 'dorian',
        text: (fl) => fl.kaelFirstMeet === 'defiant'
          ? '"그리고 무도회에서 황태자 전하께 하신 말씀 — 황궁에서 화제였습니다." 눈은 웃지 않았다. "담대하시군요. 혹은 무모하시거나."'
          : '"무도회에서 품위 있게 대처하셨다 들었습니다." 칭찬 같지만 경계 같기도 한 어조. "역시 발로아 가문답습니다."',
      },
      {
        id: 'c4s3',
        char: 'dorian',
        text: '"영애 주변에서 묘한 소문이 돌고 있어요. 도움이 필요하시다면—" 그가 한 발짝 가까이 왔다. "저는 언제나 영애 편입니다."',
        choices: [
          {
            id: 'c4_naive',
            text: '감사히 받아들이며 경계를 푼다. (순진한 척 연기한다)  ✦ 매력+20  도리안♥+5',
            acts: [
              { type: 'stat', k: 'charm',   v: 20 },
              { type: 'aff',  k: 'dorian',  v:  5 },
              { type: 'flag', k: 'dorianGuard', v: 'submissive' },
              { type: 'toast', msg: '도리안이 당신을 다루기 쉬운 패로 분류했다.', color: '#6ab88a' },
              { type: 'next' },
            ],
          },
          {
            id: 'c4_confront',
            text: '"도리안 공, 솔직하게 여쭤봐도 될까요?" 당당하게 의중을 묻는다.  ✦ 담력+20  도리안♥+15',
            acts: [
              { type: 'stat', k: 'courage', v: 20 },
              { type: 'aff',  k: 'dorian',  v: 15 },
              { type: 'flag', k: 'dorianGuard', v: 'confronted' },
              { type: 'toast', msg: '도리안의 눈에 진짜 흥미가 스쳤다.', color: '#6ab88a' },
              { type: 'next' },
            ],
          },
          {
            id: 'c4_probe',
            text: '"도움이라면 — 기사단 내부 파벌 현황을 알 수 있을까요?" 정보를 요구한다.  ✦ 지성+15  담력+15  도리안♥+10',
            acts: [
              { type: 'stat', k: 'intel',   v: 15 },
              { type: 'stat', k: 'courage', v: 15 },
              { type: 'aff',  k: 'dorian',  v: 10 },
              { type: 'flag', k: 'dorianGuard', v: 'probing' },
              { type: 'flag', k: 'dorianAlly',  v: true },
              { type: 'addEvidence', clue: 'knightFaction' },
              { type: 'toast', msg: '도리안이 잠시 멈췄다. 그리고 — 실제 정보를 건넸다.', color: '#6ab88a' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c4s4',
        char: 'dorian',
        text: (fl) => {
          if (fl.dorianGuard === 'confronted') return '"하하." 그가 처음으로 진짜 웃었다. "역시 소문과 다르시군요, 영애. 좋습니다—" 미소가 바뀌었다. 작위적인 것이 아닌 진짜 감정. "솔직한 분을 저도 좋아합니다."'
          if (fl.dorianGuard === 'probing')    return '"기사단 내부를." 도리안이 잠시 생각했다. 그리고 실제로 이름 세 개를 적어서 건넸다. "이 셋이 황귀비 파벌입니다. 쓰실 때 출처는 밝히지 마세요."'
          return '"하하, 역시 영애는 다정하시군요." 부드러운 미소. 하지만 정원을 나서며 등골이 서늘해졌다. 이 남자에게 약점을 보인 게 아닐까.'
        },
      },
      {
        id: 'c4s5',
        char: null,
        text: (fl) => `정원을 나서며 생각했다. 도리안은 황궁에서 가장 위험한 변수다. ${fl.dorianGuard === 'confronted' || fl.dorianGuard === 'probing' ? '하지만 진심을 끌어내는 데 성공했다. 이 관계는 써먹을 수 있다.' : '가면 뒤를 보지 못했다. 다음 기회가 있을 것이다.'}`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // CHAPTER 5 · 균열 — 파벌의 칼날
  // ───────────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: 'Chapter V  ·  균열',
    subtitle: '황궁 야간 복도, 파벌의 칼날',
    bg: 'bgCorridor',
    scenes: [
      {
        id: 'c5s0',
        char: null,
        text: '밤. 황궁이 겉으로는 고요하지만, 복도마다 낮은 발소리가 오간다. 파벌전이 격화되고 있다. 황귀비 측이 황태자를 압박하기 시작했고, 발로아 가문은 그 사이에 끼었다.',
      },
      {
        id: 'c5s1',
        char: null,
        text: (fl) => fl.factionMapKnown
          ? '이미 파악해둔 파벌 지도가 맞아떨어지고 있다. 황귀비 측 세 명이 황태자 측 근위대장 교체를 요구했다. 다음 수순은 뻔하다 — 발로아 가문을 희생양으로 삼는 것.'
          : '정보가 부족한 상태로 움직이는 건 위험하다. 지금부터라도 복도를 오가는 말들을 수집해야 한다.',
      },
      {
        id: 'c5s2',
        char: null,
        text: '황궁 내 레아나를 음해하는 소문이 퍼지기 시작했다. "발로아 공녀가 마탑과 결탁해 황태자를 폐위시키려 한다." 근거 없는 말이 아닐 수도 있다. 배후가 있다.',
        choices: [
          {
            id: 'c5_investigate',
            text: '소문의 출처를 직접 추적한다.  ✦ 지성+15  담력+10  악명+5',
            acts: [
              { type: 'stat', k: 'intel',   v: 15 },
              { type: 'stat', k: 'courage', v: 10 },
              { type: 'stat', k: 'infamy',  v:  5 },
              { type: 'flag', k: 'rumorInvestigated', v: true },
              { type: 'addEvidence', clue: 'rumorSource' },
              { type: 'toast', msg: '소문의 진원지가 황귀비 측근 중 한 명임을 확인했다.', color: '#c9956a' },
              { type: 'next' },
            ],
          },
          {
            id: 'c5_ignore',
            text: '소문은 무시한다. 행동으로 반박한다.  ✦ 우아함+10  담력+5',
            acts: [
              { type: 'stat', k: 'elegance', v: 10 },
              { type: 'stat', k: 'courage',  v:  5 },
              { type: 'next' },
            ],
          },
          {
            id: 'c5_use_ally',
            text: (fl) => fl.lucianInfo >= 1
              ? '루시안에게 연락한다. 그의 정보망을 써야 할 때다.  ✦ 지성+10  루시안♥+10'
              : '도리안에게 기사단 정보망을 요청한다.  ✦ 지성+10  도리안♥+10',
            acts: [
              { type: 'stat', k: 'intel', v: 10 },
              { type: 'cond_aff', flagKey: 'lucianInfo', flagVal: 1, k: 'lucian', v: 10, elseStatK: null },
              { type: 'flag', k: 'usedAllyInfo', v: true },
              { type: 'addEvidence', clue: 'allyConfirmed' },
              { type: 'toast', msg: '동맹의 정보망이 소문의 배후를 좁혔다.', color: '#c9956a' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c5s3',
        char: 'lucian',
        text: '"소문의 출처를 알고 있어요." 루시안이 복도 끝에 기대어 말했다. 언제부터 거기 있었는지 알 수 없다. "황귀비 측근 중 한 명. 하지만 배후는 달라요."',
      },
      {
        id: 'c5s4',
        char: 'lucian',
        text: '"도와줄 수는 있어요. 대가는—" 그가 웃었다. 이 사람의 웃음은 항상 무언가를 숨긴다. "당신이 얻은 정보를 저와 공유하는 것."',
        choices: [
          {
            id: 'c5_lucian_deal',
            text: (fl) => fl.lucianDance === 'bold' || fl.lucianDance === 'danced'
              ? '"이미 우리는 교환을 한 사이예요." 기존 관계를 활용한다.  ✦ 루시안♥+15'
              : '"조건을 받아들이겠습니다." 협력한다.  ✦ 루시안♥+10  지성+5',
            acts: [
              { type: 'cond_aff', flagKey: 'lucianDance', flagVal: 'bold', k: 'lucian', v: 15, elseStatK: 'intel', elseStatV: 5 },
              { type: 'flag', k: 'lucianPact', v: true },
              { type: 'addEvidence', clue: 'lucianNetwork' },
              { type: 'toast', msg: '루시안과의 동맹이 공식화됐다. 그리고 위험해졌다.', color: '#c44060' },
              { type: 'next' },
            ],
          },
          {
            id: 'c5_solo',
            text: '거절한다. 혼자 해결한다.  ✦ 담력+15  루시안♥-15',
            acts: [
              { type: 'stat', k: 'courage', v: 15 },
              { type: 'aff',  k: 'lucian',  v: -15 },
              { type: 'flag', k: 'betrayedAnyone', v: true },
              { type: 'toast', msg: '루시안의 눈에서 웃음이 사라졌다.', color: '#c44060' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c5s5',
        char: null,
        text: (fl) => {
          const ev = fl.evidenceCount;
          const allies = [fl.lucianPact, fl.arienContract, fl.dorianAlly].filter(Boolean).length;
          return `밤이 깊어지면서 황궁은 조용해졌다. 지금까지 수집한 증거: ${ev}개. 확보한 동맹: ${allies}명. 시간이 줄어들고 있다.`
        },
      },
      {
        id: 'c5s6',
        char: null,
        text: '그리고 — 카엘에게서 쪽지가 왔다. "내일 집무실로 와라. 단독으로." 원작에서 이 만남은 없었다. 뭔가 달라지고 있다.',
        choices: [
          {
            id: 'c5_go_kael',
            text: '응한다. 카엘의 의도를 파악한다.  ✦ 카엘♥+10  담력+10',
            acts: [
              { type: 'stat', k: 'courage', v: 10 },
              { type: 'aff',  k: 'kael',    v: 10 },
              { type: 'flag', k: 'kaelMeeting', v: true },
              { type: 'next' },
            ],
          },
          {
            id: 'c5_decline_kael',
            text: '위험할 수 있다. 거절하고 다른 루트를 찾는다.  ✦ 지성+10  카엘♥-8',
            acts: [
              { type: 'stat', k: 'intel', v: 10 },
              { type: 'aff',  k: 'kael',  v: -8 },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c5s7',
        char: 'kael',
        text: (fl) => fl.kaelMeeting
          ? '집무실. 카엘은 지도를 펼쳐놓고 있었다. "정보부가 발로아 가문을 조사하고 있다. 내 권한으로 막아줄 수 있어—" 잠깐 멈췄다. "대가가 있지."'
          : null,
        condition: (fl) => fl.kaelMeeting,
      },
      {
        id: 'c5s8',
        char: 'kael',
        text: (fl) => fl.kaelMeeting
          ? '"내가 가진 정보를 네게 주겠다. 대신 — 발로아 가문이 나를 지지한다는 서약이 필요해." 처음으로 거래를 제안했다.'
          : null,
        condition: (fl) => fl.kaelMeeting,
        choices: [
          {
            id: 'c5_accept_kael',
            text: '서약한다. 카엘의 보호가 필요하다.  ✦ 카엘♥+20  우아함+10',
            condition: (fl) => fl.kaelMeeting,
            acts: [
              { type: 'stat', k: 'elegance', v: 10 },
              { type: 'aff',  k: 'kael',     v: 20 },
              { type: 'flag', k: 'kaelDebt', v: true },
              { type: 'addEvidence', clue: 'kaelProtection' },
              { type: 'toast', msg: '카엘의 보호 아래 들어갔다. 그리고 빚이 생겼다.', color: '#7ab8d4' },
              { type: 'next' },
            ],
          },
          {
            id: 'c5_counter_kael',
            text: '"서약 대신 — 구체적인 조건을 협상합시다." 대등하게 맞선다.  ✦ 지성+15  담력+15  카엘♥+12',
            condition: (fl) => fl.kaelMeeting,
            acts: [
              { type: 'stat', k: 'intel',   v: 15 },
              { type: 'stat', k: 'courage', v: 15 },
              { type: 'aff',  k: 'kael',    v: 12 },
              { type: 'flag', k: 'kaelDebt',   v: true },
              { type: 'flag', k: 'kaelSecret', v: true },
              { type: 'addEvidence', clue: 'kaelProtection' },
              { type: 'toast', msg: '카엘이 잠시 멈췄다. "…처음 보는 태도군." 조건부 동의.', color: '#7ab8d4' },
              { type: 'next' },
            ],
          },
        ],
      },
      {
        id: 'c5s9',
        char: null,
        text: '챕터 5가 끝났다. 파벌전은 가속되고 있고, 발로아 가문을 겨냥한 음모의 윤곽이 잡혀간다. 다음은 — 밀약서.',
      },
      // scenario_1_5.js의 c5s9 뒤에 추가
{
  id: 'c5s10',
  char: null,
  text: "쪽지를 태우고 창밖을 보았다. 정원 너머로 네 개의 시선이 느껴지는 듯했다. 지금까지 내가 맺어온 인연들이 헛되지 않았음을 직감한다.",
  choices: [
    {
      id: 'c5_shared_moment',
      text: "모두에게 보이지 않는 신뢰를 보낸다. ✦ 전원 호감도+15",
      acts: [
        { type: 'affs', values: { kael: 15, lucian: 15, arien: 15, dorian: 15 } },
        { type: 'toast', msg: '모든 인물과의 유대가 운명을 바꾸기 시작합니다.', color: '#f0d9b5' },
        { type: 'next' },
      ],
    },
  ],
},
    ],
  },
];
