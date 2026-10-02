/* ==========================================================================
   망각곡선 보카 부스터 (Ebbinghaus Vocab Booster) Engine
   Spaced Repetition & Real-time Retention Curve Visualizer
   100% Client-Side Pure JavaScript (Zero Server Transmission)
   ========================================================================== */

(function () {
  'use strict';

  // --- High Quality Preset Vocabularies ---
  const PRESET_DECKS = {
    csat: [
      { id: 'c1', word: 'comprehensive', phonetic: '[ˌkɑːmprɪˈhensɪv]', pos: '형용사', meaning: '종합적인, 포괄적인', hint: 'com(완전히) + prehend(붙잡다) → 모든 세부사항을 완전히 아우르는', example: 'The government published a comprehensive report on climate change.', exampleKo: '정부는 기후 변화에 관한 종합적인 보고서를 발표했다.' },
      { id: 'c2', word: 'resilient', phonetic: '[rɪˈzɪliənt]', pos: '형용사', meaning: '회복력 있는, 탄력적인', hint: 're(다시) + salire(뛰어오르다) → 넘어져도 다시 튀어오르는', example: 'Children are often remarkably resilient in the face of difficulties.', exampleKo: '아이들은 종종 어려움에 직면했을 때 놀라울 정도로 뛰어난 회복력을 보인다.' },
      { id: 'c3', word: 'vulnerable', phonetic: '[ˈvʌlnərəbl]', pos: '형용사', meaning: '취약한, 상처받기 쉬운', hint: 'vulnerare(상처를 입히다) + able(가능한) → 쉽게 상처받는', example: 'Elderly people are particularly vulnerable to extreme winter weather.', exampleKo: '고령층은 혹독한 겨울 날씨에 특히 취약하다.' },
      { id: 'c4', word: 'pragmatic', phonetic: '[præɡˈmætɪk]', pos: '형용사', meaning: '실용적인, 실제적인', hint: 'pragma(일, 행동) → 이론에 치우치지 않고 행동/결과를 중시하는', example: 'We need to adopt a pragmatic approach to resolve this complex problem.', exampleKo: '우리는 이 복잡한 문제를 해결하기 위해 실용적인 접근 방식을 취해야 한다.' },
      { id: 'c5', word: 'obsolete', phonetic: '[ˌɑːbsəˈliːt]', pos: '형용사', meaning: '더 이상 쓸모없는, 구식의', hint: 'ob(떨어져) + solere(익숙하다) → 익숙한 자리에서 밀려나 버려진', example: 'New digital technologies quickly render older devices obsolete.', exampleKo: '새로운 디지털 기술은 구형 기기들을 빠르게 구식으로 만든다.' },
      { id: 'c6', word: 'ambiguous', phonetic: '[æmˈbɪɡjuəs]', pos: '형용사', meaning: '애매모호한, 다의적인', hint: 'ambi(둘 다) + agere(몰다) → 양쪽으로 해석될 수 있어 불분명한', example: 'The contractual terms were somewhat ambiguous and caused confusion.', exampleKo: '계약서 조항들이 다소 모호하여 혼란을 야기했다.' },
      { id: 'c7', word: 'inevitable', phonetic: '[ɪnˈevɪtəbl]', pos: '형용사', meaning: '불가피한, 피할 수 없는', hint: 'in(부정) + evitare(피하다) → 아무리 발버둥 쳐도 피할 수 없는', example: 'Change is an inevitable part of every growing organization.', exampleKo: '변화는 성장하는 모든 조직에 있어서 불가피한 과정이다.' },
      { id: 'c8', word: 'versatile', phonetic: '[ˈvɜːrsətl]', pos: '형용사', meaning: '다재다능한, 용도가 다양한', hint: 'vertere(돌리다) → 어느 방향으로든 척척 돌려 쓸 수 있는', example: 'Eggs are one of the most versatile ingredients in modern cooking.', exampleKo: '달걀은 현대 요리에서 가장 용도가 다양한 식재료 중 하나이다.' },
      { id: 'c9', word: 'persistent', phonetic: '[pərˈsɪstənt]', pos: '형용사', meaning: '끈질긴, 끊임없이 지속되는', hint: 'per(끝까지) + sistere(서 있다) → 어떤 시련에도 끝까지 서 있는', example: 'Persistent hard work is the key to mastering any new language.', exampleKo: '끈기 있는 꾸준한 노력이 새로운 언어를 숙달하는 핵심 열쇠이다.' },
      { id: 'c10', word: 'coherent', phonetic: '[koʊˈhɪrənt]', pos: '형용사', meaning: '일관성 있는, 논리정연한', hint: 'co(함께) + haerere(달라붙다) → 전후 문맥이 서로 꼭 맞아떨어지는', example: 'The applicant presented a very clear and coherent argument.', exampleKo: '지원자는 매우 명확하고 논리정연한 주장을 펼쳤다.' },
      { id: 'c11', word: 'plausible', phonetic: '[ˈplɔːzəbl]', pos: '형용사', meaning: '그럴듯한, 타당성 있는', hint: 'plaudere(박수를 치다) → 박수를 보낼 만큼 수긍이 가는', example: 'The scientist offered a highly plausible explanation for the anomaly.', exampleKo: '그 과학자는 특이 현상에 대해 대단히 그럴듯한 설명을 제시했다.' },
      { id: 'c12', word: 'profound', phonetic: '[prəˈfaʊnd]', pos: '형용사', meaning: '깊은, 심오한, 엄청난', hint: 'pro(앞으로) + fundus(바닥) → 바닥 깊숙한 곳까지 닿아 있는', example: 'The invention of the printing press had a profound impact on society.', exampleKo: '인쇄술의 발명은 사회 전반에 지대한 영향을 미쳤다.' },
      { id: 'c13', word: 'diminish', phonetic: '[dɪˈmɪnɪʃ]', pos: '동사', meaning: '줄어들다, 약화시키다', hint: 'di(완전히) + minuere(작게 만들다) → 크기나 가치가 작아지다', example: 'The patient\'s pain began to diminish after receiving medication.', exampleKo: '환자의 통증은 약물을 투여받은 후 점차 줄어들기 시작했다.' },
      { id: 'c14', word: 'arbitrary', phonetic: '[ˈɑːrbətreri]', pos: '형용사', meaning: '임의적인, 제멋대로인', hint: 'arbiter(중재인, 판사) → 객관적 기준 없이 개인 재량에 맡겨진', example: 'The committee was criticized for making completely arbitrary decisions.', exampleKo: '위원회는 전적으로 제멋대로인 결정을 내렸다는 비판을 받았다.' },
      { id: 'c15', word: 'intrinsic', phonetic: '[ɪnˈtrɪnzɪk]', pos: '형용사', meaning: '본질적인, 내재적인', hint: 'intrinsecus(내부에서) → 외부 조건과 상관없이 본래부터 지닌', example: 'Flexibility is an intrinsic quality of a truly creative mindset.', exampleKo: '유연성은 진정으로 창의적인 사고방식이 지닌 본질적인 특성이다.' }
    ],
    toeic: [
      { id: 't1', word: 'mandatory', phonetic: '[ˈmændətɔːri]', pos: '형용사', meaning: '의무적인, 필수의', hint: 'mandatum(명령) → 법이나 규정에 의해 강제되는', example: 'Attendance at the safety orientation is mandatory for all new hires.', exampleKo: '모든 신입 사원은 안전 오리엔테이션에 의무적으로 참석해야 합니다.' },
      { id: 't2', word: 'tentative', phonetic: '[ˈtentətɪv]', pos: '형용사', meaning: '잠정적인, 확정되지 않은', hint: 'tentare(시험해보다) → 확실하지 않아 일단 시도해보는 상태', example: 'We have reached a tentative agreement pending legal board review.', exampleKo: '우리는 이사회의 법률 검토를 기다리며 잠정적인 합의에 도달했습니다.' },
      { id: 't3', word: 'facilitate', phonetic: '[fəˈsɪlɪteɪt]', pos: '동사', meaning: '촉진하다, 용이하게 하다', hint: 'facilis(쉬운) → 일을 수월하고 쉽게 풀리도록 돕다', example: 'The new digital platform will facilitate international wire transfers.', exampleKo: '새로운 디지털 플랫폼은 해외 송금 업무를 크게 용이하게 해줄 것입니다.' },
      { id: 't4', word: 'substantial', phonetic: '[səbˈstænʃl]', pos: '형용사', meaning: '상당한, 실질적인', hint: 'substance(실체, 본질) → 눈에 보일 정도로 실체가 크고 확실한', example: 'The firm reported a substantial increase in quarterly operating profit.', exampleKo: '그 회사는 분기 영업이익이 상당 폭 증가했다고 보고했습니다.' },
      { id: 't5', word: 'preliminary', phonetic: '[prɪˈlɪmɪneri]', pos: '형용사', meaning: '예비의, 사전의', hint: 'pre(이전에) + limen(문턱) → 문턱을 넘기 전 사전 준비 단계의', example: 'Preliminary findings suggest that consumer demand remains strong.', exampleKo: '예비 조사 결과에 따르면 소비자 수요는 여전히 견고한 것으로 나타났습니다.' },
      { id: 't6', word: 'compliant', phonetic: '[kəmˈplaɪənt]', pos: '형용사', meaning: '규정을 준수하는, 따르는', hint: 'comply(따르다) + ant(형용사 접미사) → 법률/규정을 어기지 않고 맞춘', example: 'Our facilities are fully compliant with environmental protection laws.', exampleKo: '당사 시설은 환경보호 법률 및 규정을 완벽하게 준수하고 있습니다.' },
      { id: 't7', word: 'delegate', phonetic: '[ˈdelɪɡət]', pos: '동사', meaning: '위임하다, 파견하다', hint: 'de(아래로) + legare(보내다) → 권한을 하위 담당자에게 보내다', example: 'A good project manager knows when and how to delegate tasks.', exampleKo: '유능한 프로젝트 관리자는 언제 어떻게 업무를 위임할지 알고 있습니다.' },
      { id: 't8', word: 'discrepancy', phonetic: '[dɪˈskrepənsi]', pos: '명사', meaning: '불일치, 괴리, 차이', hint: 'dis(서로 다르게) + crepare(삐걱거리다) → 양쪽 숫자가 맞지 않아 삐걱거림', example: 'Auditors found an unexplained discrepancy in the balance sheet.', exampleKo: '감사인들은 대차대조표에서 설명되지 않은 불일치를 발견했습니다.' },
      { id: 't9', word: 'expedite', phonetic: '[ˈekspədaɪt]', pos: '동사', meaning: '신속히 처리하다, 진척시키다', hint: 'ex(밖으로) + pes(발) → 발에 걸린 족쇄를 풀어 속도를 내게 하다', example: 'Please pay an additional fee if you wish to expedite shipping.', exampleKo: '배송을 신속하게 처리하기를 원하시면 추가 요금을 지불해 주십시오.' },
      { id: 't10', word: 'lucrative', phonetic: '[ˈluːkrətɪv]', pos: '형용사', meaning: '수익성이 좋은, 돈벌이가 되는', hint: 'lucrum(이익, 이윤) → 투자 대비 큰돈을 벌어다 주는', example: 'The corporation entered into a highly lucrative overseas partnership.', exampleKo: '그 기업은 대단히 수익성이 좋은 해외 파트너십을 체결했습니다.' }
    ],
    basic: [
      { id: 'b1', word: 'curious', phonetic: '[ˈkjʊriəs]', pos: '형용사', meaning: '호기심이 많은, 알고 싶어 하는', hint: 'cura(관심, 돌봄) → 관심과 궁금증이 가득 차 있는', example: 'Children are naturally curious about the world around them.', exampleKo: '아이들은 선천적으로 주변 세계에 대해 호기심이 많다.' },
      { id: 'b2', word: 'essential', phonetic: '[ɪˈsenʃl]', pos: '형용사', meaning: '필수적인, 극히 중요한', hint: 'essence(본질) → 없으면 존재 자체가 성립할 수 없는', example: 'Clean water and fresh air are essential for human survival.', exampleKo: '깨끗한 물과 신선한 공기는 인간의 생존에 필수적이다.' },
      { id: 'b3', word: 'confident', phonetic: '[ˈkɑːnfɪdənt]', pos: '형용사', meaning: '자신감 있는, 확신하는', hint: 'con(완전히) + fidere(신뢰하다) → 자기 자신을 굳게 믿는', example: 'She felt confident that her presentation would persuade the jury.', exampleKo: '그녀는 자신의 발표가 심사위원을 설득할 수 있을 것이라 자신했다.' },
      { id: 'b4', word: 'generous', phonetic: '[ˈdʒenərəs]', pos: '형용사', meaning: '너그러운, 후한, 아낌없는', hint: 'genus(고귀한 혈통) → 귀족처럼 아량과 베풂이 넉넉한', example: 'Thank you very much for your generous support and donations.', exampleKo: '후한 지원과 기부에 깊이 감사드립니다.' },
      { id: 'b5', word: 'appreciate', phonetic: '[əˈpriːʃieɪt]', pos: '동사', meaning: '진가를 알아보다, 감사하다', hint: 'ad(향해) + pretium(가치) → 그 가치를 알아보고 고마워하다', example: 'I truly appreciate your thoughtful help during this difficult time.', exampleKo: '이 어려운 시기에 보내주신 사려 깊은 도움에 진심으로 감사드립니다.' },
      { id: 'b6', word: 'encourage', phonetic: '[ɪnˈkɜːrɪdʒ]', pos: '동사', meaning: '격려하다, 용기를 북돋우다', hint: 'en(넣다) + courage(용기) → 마음속에 용기를 듬뿍 불어넣어 주다', example: 'Teachers always encourage students to ask questions freely.', exampleKo: '선생님들은 항상 학생들이 자유롭게 질문하도록 격려한다.' },
      { id: 'b7', word: 'independent', phonetic: '[ˌɪndɪˈpendənt]', pos: '형용사', meaning: '독립적인, 자립적인', hint: 'in(부정) + depend(의존하다) → 타인에게 기대지 않고 스스로 서는', example: 'She strives to live an independent life and make her own decisions.', exampleKo: '그녀는 독립적인 삶을 살며 스스로 결정을 내리고자 노력한다.' },
      { id: 'b8', word: 'patient', phonetic: '[ˈpeɪʃnt]', pos: '형용사', meaning: '인내심 있는, 참을성 있는', hint: 'pati(고통을 겪다) → 힘들어도 불평 없이 묵묵히 견뎌내는', example: 'Learning to play the violin requires being very patient and dedicated.', exampleKo: '바이올린을 배우는 것은 많은 인내심과 헌신을 필요로 한다.' },
      { id: 'b9', word: 'reliable', phonetic: '[rɪˈlaɪəbl]', pos: '형용사', meaning: '믿을 수 있는, 신뢰할 만한', hint: 'rely(의지하다) + able(가능한) → 든든하게 믿고 기댈 수 있는', example: 'He has always been a reliable friend whenever I needed advice.', exampleKo: '그는 내가 조언이 필요할 때마다 언제나 믿음직한 친구였다.' },
      { id: 'b10', word: 'precious', phonetic: '[ˈpreʃəs]', pos: '형용사', meaning: '귀중한, 소중한', hint: 'price(값비싼) → 값을 매길 수 없을 만큼 소중하고 값진', example: 'Time spent with loving family is truly precious and irreplaceable.', exampleKo: '사랑하는 가족과 함께 보내는 시간은 참으로 소중하고 무엇과도 바꿀 수 없다.' }
    ]
  };

  // --- Audio Synthesis via Web Audio API ---
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'flip') {
        // Soft paper/tick flip sound (400Hz -> 650Hz quick burst)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'success') {
        // Cheerful dual chime (C5 523Hz + G5 784Hz)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'again') {
        // Low reset chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      // Audio context might fail silently in restricted environments
    }
  }

  // Native English TTS via Web Speech API
  function speakEnglish(text) {
    if (!state.soundEnabled) return;
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.9; // Natural learning speed
      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }

  // --- Local Storage & State Management ---
  const STORAGE_KEY = 'ebbinghaus_vocab_v1';
  let state = {
    deckKey: 'csat',
    customCards: [],
    cardMeta: {}, // { [wordId]: { reps, stability, lastReviewed, nextDue, rating } }
    streakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    soundEnabled: true,
    currentIndex: 0,
    isFlipped: false
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
        
        // Streak calculation
        const today = new Date().toISOString().split('T')[0];
        if (state.lastActiveDate) {
          const diffDays = Math.floor((new Date(today) - new Date(state.lastActiveDate)) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            state.streakDays += 1;
            state.lastActiveDate = today;
          } else if (diffDays > 1) {
            state.streakDays = 1;
            state.lastActiveDate = today;
          }
        } else {
          state.lastActiveDate = today;
        }
      }
    } catch (e) {
      console.error('Failed to load state:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        deckKey: state.deckKey,
        customCards: state.customCards,
        cardMeta: state.cardMeta,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        soundEnabled: state.soundEnabled,
        currentIndex: state.currentIndex
      }));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  function getActiveDeck() {
    if (state.deckKey === 'custom') {
      return state.customCards.length > 0 ? state.customCards : [
        {
          id: 'custom_sample',
          word: 'resilience',
          phonetic: '[rɪˈzɪliəns]',
          pos: '명사',
          meaning: '회복탄력성, 극복하는 힘',
          hint: '우측 하단 폼에서 나만의 단어를 직접 추가해보세요!',
          example: 'Building mental resilience is vital for overcoming life challenges.',
          exampleKo: '정신적 회복탄력성을 기르는 것은 삶의 도전을 극복하는 데 필수적이다.'
        }
      ];
    }
    return PRESET_DECKS[state.deckKey] || PRESET_DECKS.csat;
  }

  function getCurrentCard() {
    const deck = getActiveDeck();
    if (state.currentIndex >= deck.length) state.currentIndex = 0;
    return deck[state.currentIndex];
  }

  function getCardMeta(cardId) {
    if (!state.cardMeta[cardId]) {
      state.cardMeta[cardId] = {
        reps: 0,
        stability: 1.0, // Initial stability
        lastReviewed: null,
        nextDue: null,
        lastRating: null
      };
    }
    return state.cardMeta[cardId];
  }

  // --- UI Elements ---
  const elDeckSelect = document.getElementById('deck-select');
  const elStreakDays = document.getElementById('streak-days');
  const elBtnSoundToggle = document.getElementById('btn-sound-toggle');
  
  const elFlashcard = document.getElementById('flashcard');
  const elCardFrontPos = document.getElementById('card-front-pos');
  const elCardBackPos = document.getElementById('card-back-pos');
  const elCardProgressText = document.getElementById('card-progress-text');
  const elCardStageText = document.getElementById('card-stage-text');
  const elCardWord = document.getElementById('card-word');
  const elCardPhonetic = document.getElementById('card-phonetic');
  const elCardFrontExample = document.getElementById('card-front-example');
  const elCardMeaning = document.getElementById('card-meaning');
  const elCardHint = document.getElementById('card-hint');
  const elCardBackExample = document.getElementById('card-back-example');
  const elCardBackExampleKo = document.getElementById('card-back-example-ko');
  
  const elBtnSpeakFront = document.getElementById('btn-speak-front');
  const elBtnPrev = document.getElementById('btn-prev-card');
  const elBtnNext = document.getElementById('btn-next-card');
  const elBtnShuffle = document.getElementById('btn-shuffle-deck');
  
  const elRetentionPct = document.getElementById('retention-pct');
  const elRetentionDesc = document.getElementById('retention-desc');
  const elStatDue = document.getElementById('stat-due');
  const elStatLearning = document.getElementById('stat-learning');
  const elStatMastered = document.getElementById('stat-mastered');

  const elPointCurrent = document.getElementById('point-current');
  const elPathBoost = document.getElementById('path-boost');
  const elPathBoostFill = document.getElementById('path-boost-fill');

  const elFormQuickAdd = document.getElementById('form-quick-add');
  const elInputNewWord = document.getElementById('input-new-word');
  const elInputNewMeaning = document.getElementById('input-new-meaning');
  const elInputNewExample = document.getElementById('input-new-example');

  // --- Render Functions ---
  function renderCard() {
    const card = getCurrentCard();
    const deck = getActiveDeck();
    const meta = getCardMeta(card.id);

    // Front View
    elCardWord.textContent = card.word;
    elCardPhonetic.textContent = card.phonetic || '';
    elCardFrontPos.textContent = card.pos || '단어';
    elCardProgressText.textContent = `${state.currentIndex + 1} / ${deck.length}`;
    
    // Mask word in front example for active recall
    const regex = new RegExp(card.word.slice(0, Math.max(3, card.word.length - 2)), 'gi');
    const blankedExample = card.example ? card.example.replace(regex, '________') : '단어 뜻을 먼저 머릿속으로 떠올려보세요.';
    elCardFrontExample.textContent = `"${blankedExample}"`;

    // Back View
    elCardBackPos.textContent = card.pos || '단어';
    elCardMeaning.textContent = card.meaning;
    elCardHint.innerHTML = `💡 <strong>어원·연상 힌트:</strong> ${card.hint || '반복 인출을 통해 장기기억으로 연결하세요.'}`;
    elCardBackExample.innerHTML = `"${card.example ? card.example.replace(new RegExp(card.word, 'gi'), `<strong>$&</strong>`) : ''}"`;
    elCardBackExampleKo.textContent = card.exampleKo ? `"${card.exampleKo}"` : '';

    const reps = meta.reps || 0;
    if (reps === 0) {
      elCardStageText.textContent = '신규 단어';
    } else if (reps < 3) {
      elCardStageText.textContent = `${reps}차 복습 중`;
    } else {
      elCardStageText.textContent = `장기기억 고착 (${reps}회 완독)`;
    }

    // Flip reset
    state.isFlipped = false;
    elFlashcard.classList.remove('flipped');

    // Update retention & chart
    renderChartAndStats(card, meta);
  }

  function renderChartAndStats(card, meta) {
    const reps = meta.reps || 0;
    const stability = meta.stability || 1.0;

    // Estimate current retention based on time & stability
    let retention = 100;
    if (meta.lastReviewed) {
      const elapsedHours = (Date.now() - new Date(meta.lastReviewed).getTime()) / (1000 * 60 * 60);
      retention = Math.max(20, Math.round(100 * Math.exp(-elapsedHours / (stability * 24))));
    } else {
      retention = 100;
    }

    elRetentionPct.textContent = `${retention}%`;
    if (retention >= 90) {
      elRetentionDesc.textContent = '상태: 기억 생생함 (안정 구간)';
      elRetentionPct.style.color = '#10b981';
    } else if (retention >= 60) {
      elRetentionDesc.textContent = '상태: 최적 복습 타이밍 (골든 타임)';
      elRetentionPct.style.color = '#ea580c';
    } else {
      elRetentionDesc.textContent = '상태: 망각 위험 단계 (즉시 복습 필요)';
      elRetentionPct.style.color = '#ef4444';
    }

    // Update Dynamic Boost SVG Curve
    // Baseline y=185 is 0%, y=30 is 100% (height = 155px, each 1% = 1.55px)
    // As stability increases, curve flattens!
    const decayY = Math.min(180, Math.max(35, 185 - (retention * 1.55)));
    elPointCurrent.setAttribute('cy', decayY);

    // Boost curve formula
    const boostK = Math.min(reps * 0.25, 0.85); // 0 to 0.85 flatness
    const cp1Y = 30 + (1 - boostK) * 20;
    const cp2Y = 30 + (1 - boostK) * 35;
    const endY = 30 + (1 - boostK) * 65;

    const boostD = `M 50 30 Q 150 ${cp1Y}, 300 ${cp2Y} T 480 ${endY}`;
    elPathBoost.setAttribute('d', boostD);
    elPathBoostFill.setAttribute('d', `${boostD} L 480 185 L 50 185 Z`);

    // Aggregate deck stats
    const deck = getActiveDeck();
    let dueCount = 0;
    let learningCount = 0;
    let masteredCount = 0;

    const now = Date.now();
    deck.forEach(c => {
      const m = state.cardMeta[c.id];
      if (!m || m.reps === 0) {
        learningCount++;
      } else if (m.reps >= 4 && (m.stability || 1) >= 4) {
        masteredCount++;
      } else {
        if (m.nextDue && new Date(m.nextDue).getTime() <= now) {
          dueCount++;
        } else {
          learningCount++;
        }
      }
    });

    elStatDue.textContent = dueCount;
    elStatLearning.textContent = learningCount;
    elStatMastered.textContent = masteredCount;
  }

  // --- Evaluation Logic (Spaced Repetition Algorithm) ---
  function evaluateCard(rating) {
    const card = getCurrentCard();
    const meta = getCardMeta(card.id);
    const now = new Date();

    let stability = meta.stability || 1.0;
    let reps = meta.reps || 0;
    let nextMinutes = 1;

    if (rating === 'again') {
      reps = 0;
      stability = 0.5;
      nextMinutes = 1; // 1 min later
      playSound('again');
    } else if (rating === 'hard') {
      reps += 1;
      stability = Math.max(1.0, stability * 1.2);
      nextMinutes = 60 * 24; // 1 day
      playSound('flip');
    } else if (rating === 'good') {
      reps += 1;
      stability = Math.max(2.0, stability * 2.2);
      nextMinutes = 60 * 24 * 3; // 3 days
      playSound('success');
    } else if (rating === 'easy') {
      reps += 1;
      stability = Math.max(3.5, stability * 3.5);
      nextMinutes = 60 * 24 * 7; // 7 days
      playSound('success');
    }

    meta.reps = reps;
    meta.stability = parseFloat(stability.toFixed(2));
    meta.lastReviewed = now.toISOString();
    meta.nextDue = new Date(now.getTime() + nextMinutes * 60000).toISOString();
    meta.lastRating = rating;

    saveState();

    // Auto Advance with smooth transition
    setTimeout(() => {
      nextCard();
    }, 280);
  }

  function nextCard() {
    const deck = getActiveDeck();
    state.currentIndex = (state.currentIndex + 1) % deck.length;
    saveState();
    renderCard();
  }

  function prevCard() {
    const deck = getActiveDeck();
    state.currentIndex = (state.currentIndex - 1 + deck.length) % deck.length;
    saveState();
    renderCard();
  }

  function shuffleDeck() {
    const deck = getActiveDeck();
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    state.currentIndex = 0;
    saveState();
    renderCard();
    playSound('flip');
  }

  // --- Event Bindings ---
  function initEvents() {
    // Card Flip
    elFlashcard.addEventListener('click', () => {
      state.isFlipped = !state.isFlipped;
      elFlashcard.classList.toggle('flipped', state.isFlipped);
      playSound('flip');
    });

    elFlashcard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elFlashcard.click();
      }
    });

    // Pronunciation button
    elBtnSpeakFront.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = getCurrentCard();
      speakEnglish(card.word);
    });

    // Deck Selector
    elDeckSelect.addEventListener('change', (e) => {
      state.deckKey = e.target.value;
      state.currentIndex = 0;
      saveState();
      renderCard();
    });

    // Sound Toggle
    elBtnSoundToggle.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      elBtnSoundToggle.textContent = state.soundEnabled ? '🔊 발음 소리 켬' : '🔇 발음 소리 끔';
      saveState();
    });

    // Nav buttons
    elBtnNext.addEventListener('click', nextCard);
    elBtnPrev.addEventListener('click', prevCard);
    elBtnShuffle.addEventListener('click', shuffleDeck);

    // Evaluation Buttons
    document.querySelectorAll('.btn-eval').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rating = btn.getAttribute('data-rating');
        evaluateCard(rating);
      });
    });

    // Keyboard Shortcuts (1: Again, 2: Hard, 3: Good, 4: Easy, Space: Flip)
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        elFlashcard.click();
      } else if (e.key === '1') {
        evaluateCard('again');
      } else if (e.key === '2') {
        evaluateCard('hard');
      } else if (e.key === '3') {
        evaluateCard('good');
      } else if (e.key === '4') {
        evaluateCard('easy');
      } else if (e.key === 'ArrowRight') {
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        prevCard();
      }
    });

    // Quick Add Form
    elFormQuickAdd.addEventListener('submit', (e) => {
      e.preventDefault();
      const word = elInputNewWord.value.trim();
      const meaning = elInputNewMeaning.value.trim();
      const example = elInputNewExample.value.trim();

      if (!word || !meaning) return;

      const newCard = {
        id: 'user_' + Date.now(),
        word: word,
        phonetic: '',
        pos: '단어',
        meaning: meaning,
        hint: '내가 직접 등록한 맞춤 복습 단어',
        example: example || `Reviewing "${word}" for long-term retention.`,
        exampleKo: meaning
      };

      state.customCards.push(newCard);
      state.deckKey = 'custom';
      elDeckSelect.value = 'custom';
      state.currentIndex = state.customCards.length - 1;

      elInputNewWord.value = '';
      elInputNewMeaning.value = '';
      elInputNewExample.value = '';

      saveState();
      renderCard();
      playSound('success');
      alert(`단어 "${word}" 가 나만의 단어장에 저장되었습니다!`);
    });
  }

  // --- Initial Launch ---
  function init() {
    loadState();
    elDeckSelect.value = state.deckKey;
    elStreakDays.textContent = state.streakDays || 1;
    elBtnSoundToggle.textContent = state.soundEnabled ? '🔊 발음 소리 켬' : '🔇 발음 소리 끔';
    initEvents();
    renderCard();
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
