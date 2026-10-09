/* ==========================================================================
   망각곡선 보카 부스터 (Ebbinghaus Vocab Booster) Engine v2.0
   3,000 대한민국 교육부 공식 초·중·고 전수 수록 & 75일 완성 진도 관리 시스템
   100% Client-Side Pure JavaScript (Zero Server Transmission)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'ebbinghaus_vocab_v2_state';

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
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'again') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function speakEnglish(text) {
    if (!state.soundEnabled) return;
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS error:', e);
    }
  }

  // --- State Management ---
  const state = {
    levelKey: 'elem', // 'elem', 'mid', 'high', 'all', 'custom'
    selectedDay: 1,   // integer 1..75, or 'all'
    currentIndex: 0,
    isFlipped: false,
    soundEnabled: true,
    streakDays: 1,
    lastActiveDate: null,
    cardMeta: {},     // cardId -> { reps, stability, lastReviewed, nextDue, lastRating }
    customCards: []
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.levelKey) state.levelKey = parsed.levelKey;
        if (parsed.selectedDay !== undefined) state.selectedDay = parsed.selectedDay;
        if (parsed.currentIndex !== undefined) state.currentIndex = parsed.currentIndex;
        if (parsed.cardMeta) state.cardMeta = parsed.cardMeta;
        if (parsed.customCards) state.customCards = parsed.customCards;
        if (parsed.soundEnabled !== undefined) state.soundEnabled = parsed.soundEnabled;
        if (parsed.streakDays) state.streakDays = parsed.streakDays;
        
        // Streak calculation
        const today = new Date().toISOString().slice(0, 10);
        if (parsed.lastActiveDate) {
          const lastDate = new Date(parsed.lastActiveDate);
          const currDate = new Date(today);
          const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
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
        levelKey: state.levelKey,
        selectedDay: state.selectedDay,
        currentIndex: state.currentIndex,
        cardMeta: state.cardMeta,
        customCards: state.customCards,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        soundEnabled: state.soundEnabled
      }));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  // Fallback sample if VOCAB_3000_DATA is not ready
  const FALLBACK_DATA = [
    { id: 1, word: 'ability', phonetic: '[əˈbɪləti]', pos: '명사', meaning: '능력, 재능', level: 'elem', day: 1, cefr: 'A2' },
    { id: 2, word: 'able', phonetic: '[ˈeɪbl]', pos: '형용사', meaning: '~할 수 있는', level: 'elem', day: 1, cefr: 'A1' }
  ];

  function getAllVocab() {
    return (window.VOCAB_3000_DATA && window.VOCAB_3000_DATA.length > 0) ? window.VOCAB_3000_DATA : FALLBACK_DATA;
  }

  function getActiveDeck() {
    if (state.levelKey === 'custom') {
      return state.customCards.length > 0 ? state.customCards : [
        {
          id: 'custom_sample',
          word: 'resilience',
          phonetic: '[rɪˈzɪliəns]',
          pos: '명사',
          meaning: '회복탄력성, 극복하는 힘',
          level: 'custom',
          day: 1,
          cefr: 'B2'
        }
      ];
    }

    const all = getAllVocab();
    let filtered = all;

    if (state.levelKey !== 'all') {
      filtered = filtered.filter(item => item.level === state.levelKey);
    }

    if (state.selectedDay !== 'all') {
      const d = parseInt(state.selectedDay, 10);
      filtered = filtered.filter(item => item.day === d);
    }

    return filtered.length > 0 ? filtered : all.slice(0, 40);
  }

  function getCurrentCard() {
    const deck = getActiveDeck();
    if (state.currentIndex >= deck.length) state.currentIndex = 0;
    if (state.currentIndex < 0) state.currentIndex = 0;
    return deck[state.currentIndex];
  }

  function getCardMeta(cardId) {
    if (!state.cardMeta[cardId]) {
      state.cardMeta[cardId] = {
        reps: 0,
        stability: 1.0,
        lastReviewed: null,
        nextDue: null,
        lastRating: null
      };
    }
    return state.cardMeta[cardId];
  }

  // --- UI Elements ---
  const elLevelSelect = document.getElementById('level-select');
  const elDaySelectWrap = document.getElementById('day-select-wrap');
  const elDaySelect = document.getElementById('day-select');
  const elStreakDays = document.getElementById('streak-days');
  const elBtnSoundToggle = document.getElementById('btn-sound-toggle');

  const elScopeProgressText = document.getElementById('scope-progress-text');
  const elTotalMasteryText = document.getElementById('total-mastery-text');
  const elScopeProgressFill = document.getElementById('scope-progress-fill');
  const elCntMastered = document.getElementById('cnt-mastered');
  const elCntLearning = document.getElementById('cnt-learning');
  const elCntDue = document.getElementById('cnt-due');
  const elCntNew = document.getElementById('cnt-new');

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

  const elFormQuickAdd = document.getElementById('form-quick-add');
  const elInputNewWord = document.getElementById('input-new-word');
  const elInputNewMeaning = document.getElementById('input-new-meaning');
  const elInputNewExample = document.getElementById('input-new-example');

  // --- Day Dropdown Populator ---
  function populateDaySelect() {
    elDaySelect.innerHTML = '';

    if (state.levelKey === 'custom') {
      elDaySelectWrap.style.display = 'none';
      return;
    }
    elDaySelectWrap.style.display = 'flex';

    let startDay = 1, endDay = 75;
    if (state.levelKey === 'elem') {
      startDay = 1; endDay = 20;
    } else if (state.levelKey === 'mid') {
      startDay = 21; endDay = 45;
    } else if (state.levelKey === 'high') {
      startDay = 46; endDay = 75;
    }

    // "All in level" option
    const optAll = document.createElement('option');
    optAll.value = 'all';
    optAll.textContent = `[해당 레벨 전체 단어 순환]`;
    elDaySelect.appendChild(optAll);

    for (let d = startDay; d <= endDay; d++) {
      const opt = document.createElement('option');
      opt.value = d;
      const startNum = (d - 1) * 40 + 1;
      const endNum = Math.min(3000, d * 40);
      opt.textContent = `Day ${String(d).padStart(2, '0')} (${startNum}~${endNum}번)`;
      elDaySelect.appendChild(opt);
    }

    // Set value
    if (state.selectedDay === 'all') {
      elDaySelect.value = 'all';
    } else {
      const dNum = parseInt(state.selectedDay, 10);
      if (dNum >= startDay && dNum <= endDay) {
        elDaySelect.value = dNum;
      } else {
        state.selectedDay = startDay;
        elDaySelect.value = startDay;
      }
    }
  }

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

    // Prompt hint
    elCardFrontExample.textContent = `단어의 뜻을 떠올려보세요 (CEFR ${card.cefr || '기본'} · Day ${card.day || 1})`;

    // Back View
    elCardBackPos.textContent = card.pos || '단어';
    elCardMeaning.textContent = card.meaning;
    elCardHint.innerHTML = `💡 <strong>단어 상세:</strong> 고유번호 #${card.id} · ${card.pos} · Day ${card.day} · CEFR ${card.cefr || '기초'}`;
    elCardBackExample.innerHTML = `"${card.word} : ${card.meaning}"`;
    elCardBackExampleKo.textContent = `발음: ${card.phonetic || card.word}`;

    const reps = meta.reps || 0;
    const stab = meta.stability || 1.0;
    if (reps === 0) {
      elCardStageText.textContent = '신규 단어 ✨';
    } else if (reps >= 3 && stab >= 3.0) {
      elCardStageText.textContent = `장기기억 마스터 🏆 (${reps}회 완독)`;
    } else {
      elCardStageText.textContent = `${reps}차 복습 중 🔄`;
    }

    // Flip reset
    state.isFlipped = false;
    elFlashcard.classList.remove('flipped');

    // Update Mastery Dashboard
    renderMasteryDashboard();
  }

  function renderMasteryDashboard() {
    const all = getAllVocab();
    let totalMastered = 0;
    let totalLearning = 0;
    let totalDue = 0;
    let totalNew = 0;
    const now = Date.now();

    all.forEach(card => {
      const meta = state.cardMeta[card.id];
      if (!meta || meta.reps === 0) {
        totalNew++;
      } else if (meta.reps >= 3 && meta.stability >= 3.0) {
        totalMastered++;
      } else {
        totalLearning++;
      }

      if (meta && meta.nextDue && meta.nextDue <= now) {
        totalDue++;
      }
    });

    // Update chips
    elCntMastered.textContent = totalMastered.toLocaleString();
    elCntLearning.textContent = totalLearning.toLocaleString();
    elCntDue.textContent = totalDue.toLocaleString();
    elCntNew.textContent = totalNew.toLocaleString();

    // Total mastery label
    const totalPct = ((totalMastered / all.length) * 100).toFixed(1);
    elTotalMasteryText.textContent = `${totalMastered.toLocaleString()} / ${all.length.toLocaleString()} (${totalPct}%)`;

    // Active scope progress
    const activeDeck = getActiveDeck();
    let reviewedInScope = 0;
    activeDeck.forEach(card => {
      const m = state.cardMeta[card.id];
      if (m && m.reps >= 1) reviewedInScope++;
    });

    const scopePct = activeDeck.length > 0 ? ((reviewedInScope / activeDeck.length) * 100).toFixed(0) : 0;
    elScopeProgressText.textContent = `${reviewedInScope} / ${activeDeck.length} (${scopePct}%)`;
    elScopeProgressFill.style.width = `${scopePct}%`;

    // Retention score
    const avgRetention = Math.min(100, Math.round(55 + (totalMastered / Math.max(1, totalMastered + totalLearning)) * 40));
    if (elRetentionPct) elRetentionPct.textContent = `${avgRetention}%`;
    if (elStatDue) elStatDue.textContent = totalDue;
    if (elStatLearning) elStatLearning.textContent = totalLearning;
    if (elStatMastered) elStatMastered.textContent = totalMastered;
  }

  // --- Rating Logic (Spaced Repetition) ---
  function handleEvaluation(rating) {
    const card = getCurrentCard();
    const meta = getCardMeta(card.id);
    const now = Date.now();

    meta.lastReviewed = now;
    meta.lastRating = rating;

    if (rating === 'again') {
      meta.reps = 0;
      meta.stability = Math.max(0.6, meta.stability * 0.5);
      meta.nextDue = now + 10 * 60 * 1000; // 10 minutes
      playSound('again');
    } else if (rating === 'hard') {
      meta.reps += 1;
      meta.stability = meta.stability * 1.2;
      meta.nextDue = now + 1 * 24 * 3600 * 1000; // 1 day
      playSound('flip');
    } else if (rating === 'good') {
      meta.reps += 1;
      meta.stability = meta.stability * 2.2;
      meta.nextDue = now + Math.round(meta.stability * 2.2) * 24 * 3600 * 1000;
      playSound('success');
    } else if (rating === 'easy') {
      meta.reps += 1;
      meta.stability = meta.stability * 3.5;
      meta.nextDue = now + Math.round(meta.stability * 3.5) * 24 * 3600 * 1000;
      playSound('success');
    }

    saveState();

    // Next Card Animation
    state.currentIndex++;
    const deck = getActiveDeck();
    if (state.currentIndex >= deck.length) {
      state.currentIndex = 0;
      alert(`🎉 축하합니다! 선택한 Day의 ${deck.length}단어를 모두 완독하셨습니다!`);
    }

    renderCard();
  }

  // --- Events Setup ---
  function initEvents() {
    // Level Select
    elLevelSelect.value = state.levelKey;
    elLevelSelect.addEventListener('change', (e) => {
      state.levelKey = e.target.value;
      state.currentIndex = 0;
      populateDaySelect();
      saveState();
      renderCard();
    });

    // Day Select
    elDaySelect.addEventListener('change', (e) => {
      state.selectedDay = e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10);
      state.currentIndex = 0;
      saveState();
      renderCard();
    });

    // Card Flip
    elFlashcard.addEventListener('click', () => {
      state.isFlipped = !state.isFlipped;
      elFlashcard.classList.toggle('flipped', state.isFlipped);
      playSound('flip');
    });

    // Navigation Buttons
    elBtnPrev.addEventListener('click', () => {
      const deck = getActiveDeck();
      state.currentIndex = (state.currentIndex - 1 + deck.length) % deck.length;
      renderCard();
    });

    elBtnNext.addEventListener('click', () => {
      const deck = getActiveDeck();
      state.currentIndex = (state.currentIndex + 1) % deck.length;
      renderCard();
    });

    elBtnShuffle.addEventListener('click', () => {
      const deck = getActiveDeck();
      state.currentIndex = Math.floor(Math.random() * deck.length);
      renderCard();
    });

    // Audio Buttons
    elBtnSoundToggle.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      elBtnSoundToggle.textContent = state.soundEnabled ? '🔊 발음 소리 켬' : '🔇 소리 끔';
      saveState();
    });

    elBtnSpeakFront.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = getCurrentCard();
      speakEnglish(card.word);
    });

    // Evaluation Buttons
    document.querySelectorAll('.btn-eval').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rating = btn.dataset.rating;
        handleEvaluation(rating);
      });
    });

    // Quick Add
    if (elFormQuickAdd) {
      elFormQuickAdd.addEventListener('submit', (e) => {
        e.preventDefault();
        const word = elInputNewWord.value.trim();
        const meaning = elInputNewMeaning.value.trim();
        if (!word || !meaning) return;

        const newCard = {
          id: `custom_${Date.now()}`,
          word: word,
          phonetic: '',
          pos: '명사',
          meaning: meaning,
          level: 'custom',
          day: 1,
          cefr: 'User'
        };

        state.customCards.push(newCard);
        state.levelKey = 'custom';
        elLevelSelect.value = 'custom';
        state.currentIndex = state.customCards.length - 1;
        saveState();
        populateDaySelect();
        renderCard();

        elInputNewWord.value = '';
        elInputNewMeaning.value = '';
        alert(`나만의 단어 '${word}'가 단어장에 추가되었습니다!`);
      });
    }

    // 🔗 URL 단어장 무서버 공유
    const btnShare = document.getElementById('btnShareCustomVocab');
    if (btnShare) {
      btnShare.addEventListener('click', shareCustomVocabUrl);
    }

    // 💾 JSON 백업 다운로드
    const btnExport = document.getElementById('btnExportVocab');
    if (btnExport) {
      btnExport.addEventListener('click', exportVocabJson);
    }

    // 📂 JSON 복원
    const btnImport = document.getElementById('btnImportVocab');
    const fileInput = document.getElementById('vocabFileInput');
    if (btnImport && fileInput) {
      btnImport.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          importVocabFile(e.target.files[0]);
        }
      });
    }

    window.addEventListener('hashchange', checkUrlHash);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;
      if (e.code === 'Space') {
        e.preventDefault();
        elFlashcard.click();
      } else if (e.code === 'ArrowRight') {
        elBtnNext.click();
      } else if (e.code === 'ArrowLeft') {
        elBtnPrev.click();
      } else if (['Digit1', 'Numpad1'].includes(e.code)) {
        handleEvaluation('again');
      } else if (['Digit2', 'Numpad2'].includes(e.code)) {
        handleEvaluation('hard');
      } else if (['Digit3', 'Numpad3'].includes(e.code)) {
        handleEvaluation('good');
      } else if (['Digit4', 'Numpad4'].includes(e.code)) {
        handleEvaluation('easy');
      }
    });
  }

  async function ensurePersistedStorage() {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      if (!isPersisted) {
        await navigator.storage.persist();
      }
    }
  }

  // 🔗 무서버 URL 상태 공유 (CompressionStream & Base64URL)
  async function shareCustomVocabUrl() {
    const cardsToShare = (state.customCards && state.customCards.length > 0)
      ? state.customCards
      : getCurrentDeckCards().slice(0, 30);

    if (cardsToShare.length === 0) {
      alert("공유할 단어 데이터가 없습니다.");
      return;
    }

    try {
      const stateObj = {
        title: "공유된 영단어장",
        cards: cardsToShare.map(c => ({
          word: c.word,
          meaning: c.meaning,
          phonetic: c.phonetic || '',
          pos: c.pos || '명사'
        })),
        createdAt: new Date().toISOString()
      };

      const jsonStr = JSON.stringify(stateObj);
      const stream = new Blob([jsonStr]).stream();
      const compressedStream = stream.pipeThrough(new CompressionStream('deflate'));
      const response = await new Response(compressedStream);
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const shareUrl = `${window.location.origin}${window.location.pathname}#data=${base64}`;
      await navigator.clipboard.writeText(shareUrl);
      window.location.hash = `data=${base64}`;
      alert(`🎉 나만의 단어장(${cardsToShare.length}단어) 공유 링크가 클립보드에 복사되었습니다!\n\n${shareUrl}`);
    } catch (err) {
      alert("공유 링크 생성 실패: " + err.message);
    }
  }

  // URL 해시 복원
  async function checkUrlHash() {
    const hash = window.location.hash;
    if (!hash.startsWith('#data=')) return false;

    try {
      const base64 = hash.replace('#data=', '')
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const stream = new Blob([bytes]).stream();
      const decompressedStream = stream.pipeThrough(new DecompressionStream('deflate'));
      const response = await new Response(decompressedStream);
      const jsonStr = await response.text();
      const stateObj = JSON.parse(jsonStr);

      if (stateObj && Array.isArray(stateObj.cards) && stateObj.cards.length > 0) {
        state.customCards = stateObj.cards.map((c, i) => ({
          id: `shared_${i}_${Date.now()}`,
          word: c.word,
          meaning: c.meaning,
          phonetic: c.phonetic || '',
          pos: c.pos || '명사',
          level: 'custom',
          day: 1,
          cefr: 'Shared'
        }));
        state.levelKey = 'custom';
        elLevelSelect.value = 'custom';
        state.currentIndex = 0;
        saveState();
        populateDaySelect();
        renderCard();
        alert(`🎉 공유받은 단어장(${state.customCards.length}단어)이 성공적으로 로드되었습니다!`);
        return true;
      }
    } catch (err) {
      console.error("URL 해시 복원 실패:", err);
    }
    return false;
  }

  // 💾 JSON 표준 백업 다운로드
  function exportVocabJson() {
    const backupData = {
      schemaVersion: "1.0.0",
      appIdentifier: "ebbinghaus-vocab-engine",
      exportedAt: new Date().toISOString(),
      payload: {
        customCards: state.customCards,
        cardMeta: state.cardMeta,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `vocab_mastery_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 📂 JSON 파일 가져오기
  function importVocabFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.payload) {
          if (Array.isArray(parsed.payload.customCards)) {
            state.customCards = parsed.payload.customCards;
          }
          if (parsed.payload.cardMeta) {
            state.cardMeta = Object.assign({}, state.cardMeta, parsed.payload.cardMeta);
          }
          if (parsed.payload.streakDays) {
            state.streakDays = parsed.payload.streakDays;
            elStreakDays.textContent = state.streakDays;
          }
        } else if (Array.isArray(parsed)) {
          state.customCards = parsed;
        }

        saveState();
        populateDaySelect();
        renderCard();
        alert(`📂 '${file.name}' 단어 학습 데이터가 성공적으로 복원되었습니다!`);
      } catch (err) {
        alert("백업 파일 복원 실패: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // --- Bootstrap ---
  document.addEventListener('DOMContentLoaded', async () => {
    loadState();
    await ensurePersistedStorage();
    elStreakDays.textContent = state.streakDays;
    elBtnSoundToggle.textContent = state.soundEnabled ? '🔊 발음 소리 켬' : '🔇 소리 끔';

    populateDaySelect();
    initEvents();

    const hashLoaded = await checkUrlHash();
    if (!hashLoaded) {
      renderCard();
    }
  });
})();
