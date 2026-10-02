/* ==========================================================================
   망각곡선 보카 부스터 (Ebbinghaus Vocab Booster) Engine
   Spaced Repetition & Real-time Retention Curve Visualizer
   100% Client-Side Pure JavaScript (Zero Server Transmission)
   ========================================================================== */

(function () {
  'use strict';

  // --- High Quality Preset Vocabularies (50 items per deck = 150 total) ---
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
      { id: 'c15', word: 'intrinsic', phonetic: '[ɪnˈtrɪnzɪk]', pos: '형용사', meaning: '본질적인, 내재적인', hint: 'intrinsecus(내부에서) → 외부 조건과 상관없이 본래부터 지닌', example: 'Flexibility is an intrinsic quality of a truly creative mindset.', exampleKo: '유연성은 진정으로 창의적인 사고방식이 지닌 본질적인 특성이다.' },
      { id: 'c16', word: 'unprecedented', phonetic: '[ʌnˈpresɪdentɪd]', pos: '형용사', meaning: '전례 없는, 유례없는', hint: 'un(부정) + precedent(선례) → 과거 역사상 전례가 한 번도 없던', example: 'The global economy experienced an unprecedented level of disruption.', exampleKo: '세계 경제는 전례 없는 수준의 혼란을 겪었다.' },
      { id: 'c17', word: 'tangible', phonetic: '[ˈtændʒəbl]', pos: '형용사', meaning: '실체적인, 만질 수 있는, 명백한', hint: 'tangere(만지다) + ible(가능한) → 손으로 직접 만져 확인할 수 있는', example: 'We need tangible evidence before making such a serious accusation.', exampleKo: '그처럼 중대한 고발을 하기 전에 우리는 명백한 실체적 증거가 필요하다.' },
      { id: 'c18', word: 'prevalent', phonetic: '[ˈprevələnt]', pos: '형용사', meaning: '널리 퍼진, 지배적인', hint: 'prae(앞서) + valere(강하다) → 다른 모든 것을 제치고 널리 퍼진', example: 'Remote work has become increasingly prevalent across tech industries.', exampleKo: '원격 근무는 IT 기술 산업 전반에 걸쳐 점차 지배적인 형태로 자리 잡았다.' },
      { id: 'c19', word: 'scrutinize', phonetic: '[ˈskruːtənaɪz]', pos: '동사', meaning: '면밀히 조사하다, 철저히 검토하다', hint: 'scrutari(샅샅이 뒤지다) → 작은 결점까지 돋보기로 꼼꼼히 살피다', example: 'Regulators plan to scrutinize the proposed financial merger thoroughly.', exampleKo: '규제 당국은 제안된 금융 합병 안건을 철저히 면밀히 검토할 계획이다.' },
      { id: 'c20', word: 'obscure', phonetic: '[əbˈskjʊr]', pos: '형용사', meaning: '모호한, 잘 알려지지 않은', hint: 'ob(덮다) + scurus(어두운) → 어둠에 가려져 흐릿하고 불분명한', example: 'The author quoted an obscure poem from seventeenth-century literature.', exampleKo: '작가는 17세기 문학에서 잘 알려지지 않은 모호한 시를 인용했다.' },
      { id: 'c21', word: 'detrimental', phonetic: '[ˌdetrɪˈmentl]', pos: '형용사', meaning: '해로운, 유해한', hint: 'de(아래로) + terere(문지르다) → 조금씩 깎아내려 치명적 해를 끼치는', example: 'Lack of sleep has a detrimental impact on cognitive functioning.', exampleKo: '수면 부족은 인지 기능에 대단히 유해한 영향을 미친다.' },
      { id: 'c22', word: 'perpetual', phonetic: '[pərˈpetʃuəl]', pos: '형용사', meaning: '영구적인, 끊임없는', hint: 'per(내내) + petere(향하다) → 시간이 흘러도 멈춤 없이 계속되는', example: 'The region lives in perpetual fear of devastating seismic activity.', exampleKo: '그 지역 주민들은 치명적인 지진 활동에 대한 끊임없는 공포 속에 살고 있다.' },
      { id: 'c23', word: 'reluctant', phonetic: '[rɪˈlʌktənt]', pos: '형용사', meaning: '꺼리는, 주저하는', hint: 're(뒤로) + luctari(씨름하다) → 속으로 내키지 않아 망설이고 주저하는', example: 'He was reluctant to invest savings in such a risky commercial venture.', exampleKo: '그는 위험한 상업적 벤처 기업에 저축액을 투자하기를 꺼렸다.' },
      { id: 'c24', word: 'subtle', phonetic: '[ˈsʌtl]', pos: '형용사', meaning: '미묘한, 감지하기 힘든', hint: 'sub(아래에) + tela(베틀의 실) → 가늘게 엮여 눈에 잘 띄지 않는', example: 'There is a subtle difference between healthy self-confidence and sheer arrogance.', exampleKo: '건전한 자신감과 단순한 오만함 사이에는 대단히 미묘한 차이가 존재한다.' },
      { id: 'c25', word: 'unanimous', phonetic: '[juˈnænɪməs]', pos: '형용사', meaning: '만장일치의', hint: 'unus(하나의) + animus(마음) → 모든 이의 마음이 하나로 합쳐진', example: 'The city council reached a unanimous decision to build a new public library.', exampleKo: '시의회는 새 공공도서관 건립에 대해 전원 만장일치의 결정을 내렸다.' },
      { id: 'c26', word: 'synthesize', phonetic: '[ˈsɪnθəsaɪz]', pos: '동사', meaning: '종합하다, 합성하다', hint: 'syn(함께) + tithenai(놓다) → 여러 요소들을 한데 엮어 결합하다', example: 'Students must learn how to synthesize evidence from multiple primary sources.', exampleKo: '학생들은 여러 일차 사료로부터 얻은 증거들을 종합하는 방법을 배워야 한다.' },
      { id: 'c27', word: 'alleviate', phonetic: '[əˈliːvieɪt]', pos: '동사', meaning: '완화하다, 덜어주다', hint: 'ad(향해) + levis(가벼운) → 무거운 짐이나 통증을 가볍게 덜어주다', example: 'New fiscal policies aim to alleviate the financial burden on middle-class families.', exampleKo: '새로운 재정 정책은 중산층 가정의 경제적 부담을 덜어주는 것을 목표로 한다.' },
      { id: 'c28', word: 'fluctuate', phonetic: '[ˈflʌktʃueɪt]', pos: '동사', meaning: '변동하다, 요동치다', hint: 'fluere(흐르다) + unda(물결) → 파도처럼 위아래로 출렁이다', example: 'Currency exchange rates fluctuate constantly throughout every trading day.', exampleKo: '환율은 모든 거래일 내내 끊임없이 변동을 거듭한다.' },
      { id: 'c29', word: 'cultivate', phonetic: '[ˈkʌltɪveɪt]', pos: '동사', meaning: '기르다, 함양하다, 경작하다', hint: 'colere(가꾸다, 돌보다) → 씨앗을 심고 정성을 다해 키워내다', example: 'Reading challenging literature helps cultivate deep and critical thinking skills.', exampleKo: '어려운 고전문학을 읽는 것은 깊고 비판적인 사고력을 함양하는 데 도움이 된다.' },
      { id: 'c30', word: 'authentic', phonetic: '[ɔːˈθentɪk]', pos: '형용사', meaning: '진짜의, 진정한, 신뢰할 만한', hint: 'authentikos(직접 손으로 만든 원작) → 모조품이 아닌 진품의', example: 'Historians confirmed that the ancient parchment was an authentic artifact.', exampleKo: '역사가들은 그 고대 양피지가 진품 유물임을 공식 확인했다.' },
      { id: 'c31', word: 'distort', phonetic: '[dɪˈstɔːrt]', pos: '동사', meaning: '왜곡하다, 비틀다', hint: 'dis(비뚤어지게) + torquere(비틀다) → 진실이나 형태를 뒤틀다', example: 'Sensational headlines often distort the truth behind complex scientific studies.', exampleKo: '선정적인 기사 헤드라인은 종종 복잡한 과학 연구의 진실을 왜곡한다.' },
      { id: 'c32', word: 'paradox', phonetic: '[ˈpærədɑːks]', 명사: '명사', meaning: '역설, 모순된 상황', hint: 'para(벗어난) + doxa(의견) → 상식에 어긋나 보이지만 실은 진실을 담은', example: 'The paradox of modern hyperconnectivity is that people often feel lonelier.', exampleKo: '현대 초연결 사회의 역설은 사람들이 종종 더 큰 고독을 느낀다는 점이다.' },
      { id: 'c33', word: 'feasible', phonetic: '[ˈfiːzəbl]', pos: '형용사', meaning: '실현 가능한, 타당한', hint: 'facere(하다, 만들다) + ible(가능한) → 실행에 옮길 수 있는', example: 'Engineers concluded that constructing the high-speed rail was commercially feasible.', exampleKo: '엔지니어들은 고속철도 건설이 상업적으로 실현 가능하다고 결론지었다.' },
      { id: 'c34', word: 'skeptical', phonetic: '[ˈskeptɪkl]', pos: '형용사', meaning: '회의적인, 의심 많은', hint: 'skeptikos(의심하여 살피는) → 맹신하지 않고 비판적으로 검토하는', example: 'Many investors remained skeptical about the bold claims made by the startup.', exampleKo: '많은 투자자들은 그 스타트업이 내세운 파격적인 주장에 회의적인 태도를 보였다.' },
      { id: 'c35', word: 'reinforce', phonetic: '[ˌriːɪnˈfɔːrs]', pos: '동사', meaning: '강화하다, 보강하다', hint: 're(다시) + in(안에) + force(힘) → 다시 힘을 불어넣어 단단하게 만들다', example: 'Regular constructive feedback reinforces positive learning behaviors in pupils.', exampleKo: '정기적인 건설적 피드백은 학생들의 긍정적인 학습 습관을 더욱 강화한다.' },
      { id: 'c36', word: 'illuminate', phonetic: '[ɪˈluːmɪneɪt]', pos: '동사', meaning: '명백히 밝히다, 비추다', hint: 'in(안에) + lumen(빛) → 빛을 비추어 숨겨진 원리를 환히 드러내다', example: 'The ground-breaking research illuminates the molecular basis of cellular aging.', exampleKo: '그 획기적인 연구는 세포 노화의 분자생물학적 메커니즘을 명백히 밝혀냈다.' },
      { id: 'c37', word: 'innovate', phonetic: '[ˈɪnəveɪt]', pos: '동사', meaning: '혁신하다, 새로 도입하다', hint: 'in(새롭게) + novus(새로운) → 낡은 방식을 버리고 새로움을 추구하다', example: 'Legacy enterprises must continuously innovate to survive global competition.', exampleKo: '전통 기업들은 글로벌 경쟁에서 살아남기 위해 끊임없이 혁신해야 한다.' },
      { id: 'c38', word: 'compensate', phonetic: '[ˈkɑːmpənseɪt]', pos: '동사', meaning: '보상하다, 벌충하다', hint: 'com(서로) + pensare(저울질하다) → 손해와 대등하게 저울을 맞추다', example: 'Employers must compensate workers fairly for mandatory overtime shifts.', exampleKo: '고용주는 의무적 초과 근무에 대해 근로자에게 공정하게 보상해야 한다.' },
      { id: 'c39', word: 'eradicate', phonetic: '[ɪˈrædɪkeɪt]', pos: '동사', meaning: '근절하다, 뿌리뽑다', hint: 'e(밖으로) + radix(뿌리) → 뿌리째 뽑아 완전히 없애버리다', example: 'Global vaccination initiatives helped eradicate smallpox worldwide.', exampleKo: '글로벌 백신 접종 이니셔티브는 전 세계적으로 천연두를 완전히 박멸하는 데 기여했다.' },
      { id: 'c40', word: 'spontaneous', phonetic: '[spɑːnˈteɪniəs]', pos: '형용사', meaning: '자발적인, 즉흥적인', hint: 'sponte(스스로의 뜻으로) → 강요 없이 본능적이고 자연스럽게 일어나는', example: 'The audience broke into spontaneous applause after the brilliant performance.', exampleKo: '훌륭한 연주가 끝나자 관객들은 자발적으로 터져 나오는 박수갈채를 보냈다.' },
      { id: 'c41', word: 'adhere', phonetic: '[ədˈhɪr]', pos: '동사', meaning: '고수하다, 달라붙다', hint: 'ad(향해) + haerere(달라붙다) → 원칙이나 기준에 꼭 달라붙어 지키다', example: 'All laboratory personnel must strictly adhere to biosafety protocols.', exampleKo: '모든 실험실 연구 인력은 생물안전 수칙을 엄격히 고수해야 한다.' },
      { id: 'c42', word: 'consensus', phonetic: '[kənˈsensəs]', pos: '명사', meaning: '합의, 일치된 의견', hint: 'con(함께) + sentire(느끼다) → 모든 구성원이 함께 공감하고 동의함', example: 'Scientists reached a broad consensus on human-induced climatic change.', exampleKo: '과학자들은 인간의 활동이 야기한 기후 변화에 대해 폭넓은 합의에 도달했다.' },
      { id: 'c43', word: 'empirical', phonetic: '[ɪmˈpɪrɪkl]', pos: '형용사', meaning: '실증적인, 경험에 따른', hint: 'en(안에) + peira(시도, 경험) → 이론에 그치지 않고 실제 관측/실험에 근거한', example: 'The hypothesis is firmly supported by solid empirical laboratory data.', exampleKo: '그 가설은 탄탄한 실험실 실증 데이터에 의해 확고하게 뒷받침된다.' },
      { id: 'c44', word: 'foster', phonetic: '[ˈfɔːstər]', pos: '동사', meaning: '육성하다, 촉진하다', hint: 'foster(음식을 먹여 키우다) → 환경을 조성하여 성장하도록 돕다', example: 'Good organizational cultures foster open communication and trust.', exampleKo: '훌륭한 조직 문화는 열린 소통과 상호 신뢰를 육성하고 촉진한다.' },
      { id: 'c45', word: 'hierarchy', phonetic: '[ˈhaɪərɑːrki]', pos: '명사', meaning: '계층 구조, 위계질서', hint: 'hieros(신성한) + archein(지배하다) → 서열과 계급으로 나뉜 계통 구조', example: 'The company flattened its corporate hierarchy to speed up strategic decisions.', exampleKo: '그 회사는 전략적 의사결정을 가속화하기 위해 기업 위계구조를 수평화했다.' },
      { id: 'c46', word: 'implicit', phonetic: '[ɪmˈplɪsɪt]', pos: '형용사', meaning: '암묵적인, 내포된', hint: 'im(안에) + plicare(접다) → 겉으로 드러나지 않고 속으로 접혀 있는', example: 'There was an implicit understanding between the veteran diplomats.', exampleKo: '노련한 외교관들 사이에는 말하지 않아도 통하는 암묵적인 이해가 있었다.' },
      { id: 'c47', word: 'prone', phonetic: '[proʊn]', pos: '형용사', meaning: '~하기 쉬운, 당하기 쉬운', hint: 'pro(앞으로) → 앞쪽으로 기울어져 있어 특정 상황에 취약한', example: 'Wooden structures in arid climates are highly prone to wild brushfires.', exampleKo: '건조한 기후의 목조 건물들은 거친 산불 피해를 입기 대단히 쉽다.' },
      { id: 'c48', word: 'qualitative', phonetic: '[ˈkwɑːlɪteɪtɪv]', pos: '형용사', meaning: '질적인', hint: 'quality(품질, 질) + ative(형용사 접미사) → 수량이 아닌 가치/특성에 초점 맞춘', example: 'The research team conducted in-depth qualitative interviews with patients.', exampleKo: '연구팀은 환자들을 대상으로 심층적인 질적 인터뷰를 진행했다.' },
      { id: 'c49', word: 'quantitative', phonetic: '[ˈkwɑːntɪteɪtɪv]', pos: '형용사', meaning: '양적인, 수량적인', hint: 'quantity(수량) + ative(형용사 접미사) → 숫자로 측정하고 계산 가능한', example: 'Quantitative analysis revealed statistically significant improvements in speed.', exampleKo: '양적 통계 분석을 통해 속도 측면에서 유의미한 개선이 입증되었다.' },
      { id: 'c50', word: 'subsequent', phonetic: '[ˈsʌbsɪkwənt]', pos: '형용사', meaning: '그 다음의, 차후의', hint: 'sub(아래, 뒤에) + sequi(따르다) → 시간적 순서상 바로 뒤따라 일어나는', example: 'Subsequent experimental trials confirmed the validity of the first discovery.', exampleKo: '차후에 이어진 후속 실험들을 통해 최초 발견의 타당성이 입증되었다.' }
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
      { id: 't10', word: 'lucrative', phonetic: '[ˈluːkrətɪv]', pos: '형용사', meaning: '수익성이 좋은, 돈벌이가 되는', hint: 'lucrum(이익, 이윤) → 투자 대비 큰돈을 벌어다 주는', example: 'The corporation entered into a highly lucrative overseas partnership.', exampleKo: '그 기업은 대단히 수익성이 좋은 해외 파트너십을 체결했습니다.' },
      { id: 't11', word: 'collaborate', phonetic: '[kəˈlæbəreɪt]', pos: '동사', meaning: '협력하다, 공동 작업하다', hint: 'col(함께) + labor(노동하다) → 서로 힘을 합쳐 함께 일하다', example: 'Our marketing unit will collaborate with the design team on this rollout.', exampleKo: '당사 마케팅 부서는 이번 신제품 출시에 디자인 팀과 긴밀히 협력할 것입니다.' },
      { id: 't12', word: 'optimize', phonetic: '[ˈɑːptɪmaɪz]', pos: '동사', meaning: '최적화하다, 최대로 활용하다', hint: 'optimus(가장 좋은) → 최고의 효율을 내도록 세팅을 맞추다', example: 'The IT team upgraded servers to optimize website loading speeds.', exampleKo: 'IT 부서는 웹사이트 로딩 속도를 최적화하기 위해 서버를 업그레이드했습니다.' },
      { id: 't13', word: 'streamline', phonetic: '[ˈstriːmlaɪn]', pos: '동사', meaning: '합리화하다, 간소화하다', hint: 'stream(흐름) + line(선) → 군더더기를 깎아 매끄러운 흐름을 만들다', example: 'Management introduced new software to streamline the procurement process.', exampleKo: '경영진은 조달 프로세스를 간소화하기 위해 새 소프트웨어를 도입했습니다.' },
      { id: 't14', word: 'implement', phonetic: '[ˈɪmplɪment]', pos: '동사', meaning: '시행하다, 실행에 옮기다', hint: 'in(안에) + plere(채우다) → 계획을 빈 구석 없이 실제로 채워 실행하다', example: 'We plan to implement flexible work hours starting next month.', exampleKo: '우리는 다음 달부터 유연 근무제를 본격적으로 시행할 계획입니다.' },
      { id: 't15', word: 'allocate', phonetic: '[ˈæləkeɪt]', pos: '동사', meaning: '할당하다, 배분하다', hint: 'ad(향해) + locus(장소) → 각 목적에 맞게 몫과 예산을 배정하다', example: 'The finance committee voted to allocate extra budget to research and development.', exampleKo: '재정위원회는 연구개발 부서에 추가 예산을 배정하기로 결의했습니다.' },
      { id: 't16', word: 'revenue', phonetic: '[ˈrevənuː]', pos: '명사', meaning: '수익, 총매출', hint: 're(되돌아) + venire(오다) → 제품/서비스 판매를 통해 금고로 돌아오는 돈', example: 'Quarterly revenue exceeded market projections by seven percent.', exampleKo: '분기 총수익은 시장 전망치를 7% 이상 상회했습니다.' },
      { id: 't17', word: 'inventory', phonetic: '[ˈɪnvəntɔːri]', pos: '명사', meaning: '재고, 품목 명세서', hint: 'invenire(발견하다, 찾다) → 창고에 있는 모든 물품을 파악해 적은 목록', example: 'Warehouse managers conduct monthly inventory checks to minimize waste.', exampleKo: '창고 관리자들은 재고 손실을 최소화하기 위해 매월 재고 실사를 진행합니다.' },
      { id: 't18', word: 'terminate', phonetic: '[ˈtɜːrmɪneɪt]', pos: '동사', meaning: '종료하다, 해지하다', hint: 'terminus(끝, 경계) → 계약이나 서비스의 마침표를 찍다', example: 'Either party may terminate the vendor contract with sixty days advance written notice.', exampleKo: '양 당사자는 60일 전 서면 통지를 통해 공급 계약을 해지할 수 있습니다.' },
      { id: 't19', word: 'confidential', phonetic: '[ˌkɑːnfɪˈdenʃl]', pos: '형용사', meaning: '기밀의, 대외비의', hint: 'con(완전히) + fidere(신뢰하다) → 절대 신뢰할 수 있는 소수에게만 허용된', example: 'All employee payroll records are kept strictly confidential.', exampleKo: '모든 직원의 급여 내역은 철저히 기밀로 유지 및 보관됩니다.' },
      { id: 't20', word: 'negotiate', phonetic: '[nɪˈɡoʊʃieɪt]', pos: '동사', meaning: '협상하다, 절충하다', hint: 'neg(부정) + otium(여가) → 쉬지 않고 머리를 맞대며 합의점을 찾다', example: 'The executive flew to Tokyo to negotiate favorable contract terms.', exampleKo: '경영진은 유리한 계약 조건을 협상하기 위해 도쿄로 출장을 떠났습니다.' },
      { id: 't21', word: 'oversee', phonetic: '[ˌoʊvərˈsiː]', pos: '동사', meaning: '감독하다, 총괄하다', hint: 'over(위에서) + see(바라보다) → 높은 곳에서 전체 작업 진행을 내려다보며 챙기다', example: 'The director will oversee the construction of our new distribution center.', exampleKo: '이사님께서 신규 물류 배송 센터의 건설 과정을 총괄 감독하실 예정입니다.' },
      { id: 't22', word: 'reimburse', phonetic: '[ˌriːɪmˈbɜːrs]', pos: '동사', meaning: '변제하다, 상환하다', hint: 're(다시) + in + bursa(지갑) → 사비로 쓴 돈을 직원의 지갑에 다시 채워주다', example: 'The company will reimburse travel expenses within five business days.', exampleKo: '회사는 영업일 기준 5일 이내에 출장 경비를 전액 변제해 드릴 것입니다.' },
      { id: 't23', word: 'specification', phonetic: '[ˌspesɪfɪˈkeɪʃn]', pos: '명사', meaning: '사양서, 상세 명세', hint: 'species(종류) + facere(만들다) → 치수, 재질, 규격을 정확하게 명시함', example: 'The manufactured parts failed to meet our strict technical specifications.', exampleKo: '제조된 부품들이 당사의 엄격한 기술 사양 기준을 충족하지 못했습니다.' },
      { id: 't24', word: 'acquire', phonetic: '[əˈkwaɪər]', pos: '동사', meaning: '인수하다, 획득하다', hint: 'ad(향해) + quaerere(구하다) → 기업의 자산이나 지분을 사들여 내 것으로 만들다', example: 'The telecom giant announced plans to acquire a rising tech startup.', exampleKo: '그 통신 대기업은 유망 기술 스타트업을 인수할 계획을 발표했습니다.' },
      { id: 't25', word: 'merger', phonetic: '[ˈmɜːrdʒər]', pos: '명사', meaning: '기업 합병', hint: 'mergere(합치다, 잠기다) → 둘 이상의 회사가 하나로 합쳐지는 것', example: 'The proposed corporate merger is expected to yield tremendous cost savings.', exampleKo: '제안된 기업 합병은 막대한 비용 절감 효과를 창출할 것으로 기대됩니다.' },
      { id: 't26', word: 'dividend', phonetic: '[ˈdɪvɪdend]', pos: '명사', meaning: '주주 배당금', hint: 'dividere(나누다) → 회사의 이익금을 주주들에게 공평하게 분배하는 몫', example: 'Shareholders voted to approve a quarterly dividend payout of fifty cents per share.', exampleKo: '주주들은 주당 50센트의 분기 배당금 지급안을 승인 의결했습니다.' },
      { id: 't27', word: 'deficit', phonetic: '[ˈdefɪsɪt]', pos: '명사', meaning: '적자, 결손액', hint: 'deficere(부족하다) → 지출이 수입을 초과하여 마이너스가 난 상태', example: 'The municipal government took emergency measures to close its budget deficit.', exampleKo: '지방정부는 재정 적자를 메우기 위해 긴급 조치를 단행했습니다.' },
      { id: 't28', word: 'audit', phonetic: '[ˈɔːdɪt]', pos: '명사', meaning: '회계 감사, 심사', hint: 'audire(듣다) → 옛날에 장부를 소리 내어 읽어주면 귀로 듣고 검사하던 것에서 유래', example: 'Independent certified accountants conduct an annual external financial audit.', exampleKo: '공인회계사들이 매년 독립적인 외부 회계 감사를 수행합니다.' },
      { id: 't29', word: 'benchmark', phonetic: '[ˈbentʃmɑːrk]', pos: '명사', meaning: '기준점, 척도', hint: 'bench(작업대) + mark(눈금) → 작업대에 그어놓은 측정 기준 눈금', example: 'Our product performance sets the industry benchmark for energy efficiency.', exampleKo: '당사 제품 성능은 에너지 효율 부문에서 업계의 표준 벤치마크가 되고 있습니다.' },
      { id: 't30', word: 'logistics', phonetic: '[ləˈdʒɪstɪks]', pos: '명사', meaning: '물류, 유통 체계', hint: 'logiste(숙소/보급을 담당하는 관리) → 화물의 보관, 운송, 배송 전체 시스템', example: 'E-commerce firms heavily invest in automated logistics infrastructure.', exampleKo: '전자상거래 기업들은 자동화된 물류 유통 인프라에 대규모 투자를 단행하고 있습니다.' },
      { id: 't31', word: 'vendor', phonetic: '[ˈvendər]', pos: '명사', meaning: '공급업체, 판매사', hint: 'vendere(팔다) → 기업에 원자재나 서비스를 납품하는 외부 거래처', example: 'We evaluated several prospective software vendors before making our choice.', exampleKo: '우리는 최종 결정을 내리기 전에 유력한 여러 소프트웨어 공급업체를 평가했습니다.' },
      { id: 't32', word: 'clause', phonetic: '[klɔːz]', pos: '명사', meaning: '계약 조항, 조목', hint: 'claudere(닫다) → 계약서 안의 각 항목을 하나씩 닫아 규정한 조항', example: 'The legal department added an indemnity clause to the licensing contract.', exampleKo: '법무팀은 라이선스 계약서에 손해배상 면책 조항을 새롭게 추가했습니다.' },
      { id: 't33', word: 'warranty', phonetic: '[ˈwɔːrənti]', pos: '명사', meaning: '품질 보증서, 하자 보증', hint: 'warrant(보증하다, 책임지다) → 고장이나 결함 발생 시 무상 수리를 약속함', example: 'The commercial appliance comes with a comprehensive three-year warranty.', exampleKo: '해당 상업용 가전제품은 3년간의 포괄적 무상 품질 보증이 제공됩니다.' },
      { id: 't34', word: 'banquet', phonetic: '[ˈbæŋkwɪt]', pos: '명사', meaning: '공식 연회, 만찬', hint: 'banc(긴 의자) → 긴 의자에 둘러앉아 정성스레 식사를 즐기는 공식 행사', example: 'The annual corporate awards banquet will take place at the grand hotel ballroom.', exampleKo: '연례 기업 시상 만찬 행사는 호텔 대연회장에서 개최될 예정입니다.' },
      { id: 't35', word: 'patron', phonetic: '[ˈpeɪtrən]', pos: '명사', meaning: '단골 고객, 후원자', hint: 'pater(아버지) → 아버지처럼 믿고 지지하며 매장을 자주 찾는 고객', example: 'The downtown boutique offers exclusive discount rewards for loyal patrons.', exampleKo: '시내 부티크 매장은 단골 우수 고객을 위한 특별 할인 혜택을 제공합니다.' },
      { id: 't36', word: 'complimentary', phonetic: '[ˌkɑːmplɪˈmentri]', pos: '형용사', meaning: '무료의, 서비스로 제공되는', hint: 'compliment(칭찬, 예의) → 손님에 대한 감사의 마음으로 무상 증정하는', example: 'Hotel guests enjoy complimentary breakfast and high-speed Wi-Fi access.', exampleKo: '호텔 투숙객에게는 무료 조식 뷔페와 초고속 와이파이 접속이 제공됩니다.' },
      { id: 't37', word: 'questionnaire', phonetic: '[ˌkwestʃəˈner]', pos: '명사', meaning: '설문지, 설문 조사', hint: 'question(질문) + aire(모음집) → 고객 피드백을 수집하기 위한 질문 양식', example: 'Please take a few moments to fill out our short customer feedback questionnaire.', exampleKo: '잠시 시간을 내어 당사의 간단한 고객 만족도 설문지를 작성해 주시기 바랍니다.' },
      { id: 't38', word: 'reiterate', phonetic: '[riˈɪtəreɪt]', pos: '동사', meaning: '되풀이하다, 거듭 강조하다', hint: 're(다시) + iterare(반복하다) → 중요한 요점을 명확히 하기 위해 다시 말하다', example: 'The spokesperson reiterated the company’s absolute commitment to product safety.', exampleKo: '대변인은 제품 안전에 대한 회사의 확고한 약속을 거듭 강조했습니다.' },
      { id: 't39', word: 'liability', phonetic: '[ˌlaɪəˈbɪləti]', pos: '명사', meaning: '법적 책임, 부채', hint: 'ligare(묶다) + able → 법적으로 묶여 갚거나 물어내야 할 의무', example: 'The manufacturer denied any legal liability for improper product misuse.', exampleKo: '제조사는 소비자의 부적절한 오용으로 인한 법적 책임을 전면 부인했습니다.' },
      { id: 't40', word: 'fiscal', phonetic: '[ˈfɪskl]', pos: '형용사', meaning: '회계의, 국가 재정의', hint: 'fiscus(돈주머니, 국고) → 회사의 1년 회계연도 또는 국가 예산에 관한', example: 'Our next fiscal year begins promptly on the first day of April.', exampleKo: '당사의 다음 회계연도는 4월 1일부로 본격 시작됩니다.' },
      { id: 't41', word: 'quota', phonetic: '[ˈkwoʊtə]', pos: '명사', meaning: '할당량, 판매 목표량', hint: 'quot(얼마나 많은가) → 각 영업사원이나 부서에 배정된 목표 수치', example: 'The regional sales division successfully met its demanding sales quota early.', exampleKo: '지역 영업 부서는 도전적인 판매 할당 목표량을 조기에 달성했습니다.' },
      { id: 't42', word: 'restructure', phonetic: '[ˌriːˈstrʌktʃər]', pos: '동사', meaning: '구조조정하다, 개편하다', hint: 're(다시) + structure(구조) → 비효율을 없애기 위해 조직의 틀을 다시 짜다', example: 'The enterprise intends to restructure operations around high-margin business lines.', exampleKo: '그 기업은 고수익 사업군을 중심으로 조직 운영을 개편할 계획입니다.' },
      { id: 't43', word: 'itinerary', phonetic: '[aɪˈtɪnəreri]', pos: '명사', meaning: '출장·여행 일정표', hint: 'iter(여행, 길) → 출발부터 귀국까지 시간대별로 정리한 세부 여정', example: 'Please review the attached conference itinerary before our group departure.', exampleKo: '단체 출발 전에 첨부된 콘퍼런스 세부 일정표를 검토해 주시기 바랍니다.' },
      { id: 't44', word: 'credential', phonetic: '[krəˈdenʃl]', pos: '명사', meaning: '자격증, 신원 증명서', hint: 'credere(믿다) → 그 사람의 전문적 실력과 신분을 신뢰할 수 있게 해주는 증표', example: 'Applicants must possess proper teaching credentials and verified references.', exampleKo: '지원자는 적합한 교수 자격 증명서와 검증된 추천서를 소지해야 합니다.' },
      { id: 't45', word: 'consensus', phonetic: '[kənˈsensəs]', pos: '명사', meaning: '총의, 일치된 합의', hint: 'con(함께) + sensus(느낌) → 이사회나 팀원 전원이 한마음으로 동의함', example: 'The board reached a consensus to greenlight the major capital expenditure.', exampleKo: '이사회는 대규모 자본 지출을 최종 승인하기로 합의에 도달했습니다.' },
      { id: 't46', word: 'fluctuation', phonetic: '[ˌflʌktʃuˈeɪʃn]', pos: '명사', meaning: '변동, 등락', hint: 'fluct(물결치다) → 유가나 환율, 원자재 가격이 요동치는 현상', example: 'Hedging contracts help businesses shield against sharp price fluctuations.', exampleKo: '헤지 계약은 기업들이 급격한 가격 등락 위험으로부터 보호받도록 돕습니다.' },
      { id: 't47', word: 'patronize', phonetic: '[ˈpeɪtrənaɪz]', pos: '동사', meaning: '애용하다, 정기적으로 찾다', hint: 'patron(고객) + ize(동사화) → 단골로서 특정 상점을 꾸준히 이용하다', example: 'We warmly thank all local residents who generously patronize our family cafe.', exampleKo: '저희 가족 카페를 변함없이 애용해 주시는 모든 지역 주민들께 감사드립니다.' },
      { id: 't48', word: 'prospective', phonetic: '[prəˈspektɪv]', pos: '형용사', meaning: '가망 있는, 장래의', hint: 'pro(앞을) + spect(바라보다) → 앞으로 우리 고객이나 바이어가 될 가능성이 큰', example: 'Sales reps will deliver a presentation to prospective client executives.', exampleKo: '영업 담당자들은 잠재 고객사 임원진을 대상으로 프리젠테이션을 진행할 것입니다.' },
      { id: 't49', word: 'remuneration', phonetic: '[rɪˌmjuːnəˈreɪʃn]', pos: '명사', meaning: '보수, 급여, 보상', hint: 're(되돌려) + munus(선물, 보답) → 제공한 노동과 전문성에 합당하게 돌려주는 보수', example: 'The executive compensation package includes generous annual remuneration and stocks.', exampleKo: '임원 보상 패키지에는 넉넉한 연봉 보수와 주식매수선택권이 포함되어 있습니다.' },
      { id: 't50', word: 'consolidate', phonetic: '[kənˈsɑːlɪdeɪt]', pos: '동사', meaning: '통합하다, 굳히다', hint: 'con(함께) + solid(단단한) → 흩어져 있는 부서나 채무를 단단하게 하나로 뭉치다', example: 'The retail chain decided to consolidate regional offices into a central hub.', exampleKo: '그 유통 체인은 지역 사무소들을 하나의 중앙 거점 허브로 통합하기로 결정했습니다.' }
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
      { id: 'b10', word: 'precious', phonetic: '[ˈpreʃəs]', pos: '형용사', meaning: '귀중한, 소중한', hint: 'price(값비싼) → 값을 매길 수 없을 만큼 소중하고 값진', example: 'Time spent with loving family is truly precious and irreplaceable.', exampleKo: '사랑하는 가족과 함께 보내는 시간은 참으로 소중하고 무엇과도 바꿀 수 없다.' },
      { id: 'b11', word: 'creative', phonetic: '[kriˈeɪtɪv]', pos: '형용사', meaning: '창의적인, 독창적인', hint: 'create(창조하다) + ive → 남다른 상상력으로 새로운 것을 빚어내는', example: 'Art classes encourage young minds to explore creative ideas.', exampleKo: '미술 수업은 어린이들이 독창적인 아이디어를 탐구하도록 돕는다.' },
      { id: 'b12', word: 'energetic', phonetic: '[ˌenərˈdʒetɪk]', pos: '형용사', meaning: '활기찬, 에너지가 넘치는', hint: 'energy(에너지) + ic → 지치지 않고 생기와 열정이 솟구치는', example: 'The energetic puppies played happily in the green yard all afternoon.', exampleKo: '활기 넘치는 강아지들은 오후 내내 잔디 마당에서 신나게 뛰어놀았다.' },
      { id: 'b13', word: 'polite', phonetic: '[pəˈlaɪt]', pos: '형용사', meaning: '예의 바른, 공손한', hint: 'polire(다듬다, 윤내다) → 모난 구석 없이 매너 있게 다듬어진', example: 'It is always polite to say thank you when receiving a gift.', exampleKo: '선물을 받았을 때 감사 인사를 건네는 것은 언제나 예의 바른 태도이다.' },
      { id: 'b14', word: 'honest', phonetic: '[ˈɑːnɪst]', pos: '형용사', meaning: '정직한, 솔직한', hint: 'honor(명예) → 명예를 걸고 거짓이나 속임수가 없는', example: 'Honest communication builds strong and lasting trust in any relationship.', exampleKo: '솔직하고 정직한 대화는 모든 인간관계에서 굳건하고 지속적인 신뢰를 구축한다.' },
      { id: 'b15', word: 'cheerful', phonetic: '[ˈtʃɪrfl]', pos: '형용사', meaning: '쾌활한, 명랑한', hint: 'cheer(환호, 기쁨) + ful(가득한) → 밝은 웃음과 기쁨이 넘쳐나는', example: 'Her cheerful greeting instantly brightened the whole classroom.', exampleKo: '그녀의 명랑한 아침 인사는 교실 전체를 순식간에 환하게 밝혔다.' },
      { id: 'b16', word: 'gentle', phonetic: '[ˈdʒentl]', pos: '형용사', meaning: '온화한, 다정한, 부드러운', hint: 'gentle(품위 있는 출생) → 거칠지 않고 따스하며 상냥한', example: 'The nurse had a calm voice and gentle hands when caring for patients.', exampleKo: '그 간호사는 환자들을 돌볼 때 차분한 목소리와 다정한 손길을 지니고 있었다.' },
      { id: 'b17', word: 'accurate', phonetic: '[ˈækjərət]', pos: '형용사', meaning: '정확한, 오차 없는', hint: 'ad(향해) + cura(주의) → 각별한 주의를 기울여 한 치의 틀림도 없는', example: 'The digital scale provides extremely accurate weight measurements.', exampleKo: '이 디지털 전자저울은 대단히 정밀하고 정확한 무게 측정을 제공한다.' },
      { id: 'b18', word: 'convenient', phonetic: '[kənˈviːniənt]', pos: '형용사', meaning: '편리한, 간편한', hint: 'con(함께) + venire(오다) → 손 뻗으면 닿는 자리에 있어 쓰기 좋은', example: 'Living near a subway station is wonderfully convenient for commuters.', exampleKo: '지하철역 근처에 거주하는 것은 출퇴근 통근자들에게 대단히 편리하다.' },
      { id: 'b19', word: 'delicate', phonetic: '[ˈdelɪkət]', pos: '형용사', meaning: '섬세한, 부서지기 쉬운', hint: 'deliciae(매혹적인 기쁨) → 매우 가볍고 연약하여 조심스럽게 다뤄야 하는', example: 'Handle the antique porcelain teacups with delicate and careful touch.', exampleKo: '골동품 도자기 찻잔은 연약하므로 대단히 섬세하고 조심스럽게 다루어야 한다.' },
      { id: 'b20', word: 'dramatic', phonetic: '[drəˈmætɪk]', pos: '형용사', meaning: '극적인, 인상적인', hint: 'drama(연극) + ic → 한 편의 드라마처럼 눈에 띄게 펼쳐지는', example: 'Sunset over the mountain peaks produced dramatic bursts of crimson and gold.', exampleKo: '산봉우리 너머로 지는 일몰은 붉은빛과 황금빛의 극적인 장관을 연출했다.' },
      { id: 'b21', word: 'efficient', phonetic: '[ɪˈfɪʃnt]', pos: '형용사', meaning: '효율적인, 능률적인', hint: 'ex(밖으로) + facere(만들다) → 적은 시간과 노력으로 최대의 성과를 내는', example: 'Solar panels provide a remarkably efficient way to harvest renewable energy.', exampleKo: '태양광 패널은 재생 가능 에너지를 수확하는 매우 효율적인 방식을 제공한다.' },
      { id: 'b22', word: 'familiar', phonetic: '[fəˈmɪliər]', pos: '형용사', meaning: '익숙한, 친숙한', hint: 'familia(가족) → 한 가족처럼 자주 보아 낯설지 않고 잘 아는', example: 'I recognized that sweet, familiar melody from my childhood years.', exampleKo: '나는 어린 시절부터 들어온 그 달콤하고 친숙한 멜로디를 금방 알아챘다.' },
      { id: 'b23', word: 'grateful', phonetic: '[ˈɡreɪtfl]', pos: '형용사', meaning: '고마워하는, 감사하는', hint: 'gratus(기쁜, 은혜로운) + ful → 베풀어준 온정에 고마운 마음이 가득한', example: 'We are truly grateful for all the warm encouragement sent our way.', exampleKo: '저희에게 보내주신 모든 따뜻한 격려에 진심으로 깊이 감사드립니다.' },
      { id: 'b24', word: 'magnificent', phonetic: '[mæɡˈnɪfɪsnt]', pos: '형용사', meaning: '웅장한, 대단히 훌륭한', hint: 'magnus(거대한) + facere(만들다) → 규모와 아름다움이 입이 떡 벌어지는', example: 'The travelers stood gazing at the magnificent ancient palace architecture.', exampleKo: '여행자들은 웅장하고 아름다운 고대 궁궐 건축물을 넋을 잃고 바라보았다.' },
      { id: 'b25', word: 'ordinary', phonetic: '[ˈɔːrdneri]', pos: '형용사', meaning: '평범한, 일상적인', hint: 'ordo(순서, 규범) → 통상적인 순서와 규칙을 따르는 보통의 상태', example: 'Even seemingly ordinary daily moments can become cherished memories.', exampleKo: '겉보기에 평범한 일상의 순간들조차 소중한 추억으로 남을 수 있다.' },
      { id: 'b26', word: 'pleasant', phonetic: '[ˈpleznt]', pos: '형용사', meaning: '유쾌한, 기분 좋은', hint: 'plaisir(기쁨을 주다) → 마주하면 미소가 절로 지어지는 상쾌함', example: 'We enjoyed a very pleasant stroll along the breezy seaside promenade.', exampleKo: '우리는 산들바람 부는 해변 산책로를 따라 매우 기분 좋은 산책을 즐겼다.' },
      { id: 'b27', word: 'remarkable', phonetic: '[rɪˈmɑːrkəbl]', pos: '형용사', meaning: '놀라운, 주목할 만한', hint: 're(다시) + mark(표시하다) → 다시 언급할 가치가 있을 만큼 뛰어난', example: 'The student made remarkable progress in science over just one semester.', exampleKo: '그 학생은 불과 한 학기 만에 과학 과목에서 괄목할 만한 놀라운 발전을 이루었다.' },
      { id: 'b28', word: 'sensible', phonetic: '[ˈsensəbl]', pos: '형용사', meaning: '분별 있는, 현명한', hint: 'sensus(감각, 이성) → 감정에 휩쓸리지 않고 이성적 판단을 내리는', example: 'Saving a portion of your monthly allowance is a sensible financial habit.', exampleKo: '매달 용돈의 일부를 저축하는 것은 대단히 현명하고 분별 있는 경제 습관이다.' },
      { id: 'b29', word: 'terrific', phonetic: '[təˈrɪfɪk]', pos: '형용사', meaning: '아주 멋진, 훌륭한', hint: 'terrere(원래는 압도적 공포였으나 현대 구어에서 엄청나게 멋진 뜻으로 전환)', example: 'You did a terrific job organizing the charity fund-raiser event.', exampleKo: '당신은 이번 자선 모금 행사를 정말 대단하고 훌륭하게 기획해 냈습니다.' },
      { id: 'b30', word: 'urgent', phonetic: '[ˈɜːrdʒənt]', pos: '형용사', meaning: '긴급한, 시급한', hint: 'urgere(몰아세우다) → 지체할 틈 없이 당장 조치를 취해야 하는', example: 'The clinic issued an urgent public appeal for whole-blood donations.', exampleKo: '그 병원은 긴급 전혈 헌혈 동참을 호소하는 대국민 안내문을 발표했다.' },
      { id: 'b31', word: 'wonder', phonetic: '[ˈwʌndər]', pos: '동사', meaning: '궁금해하다, 경탄하다', hint: 'wonder(기이한 기적) → 신기해서 마음속으로 물음표를 던지다', example: 'I often wonder what life on other distant planets might look like.', exampleKo: '나는 다른 먼 외계 행성의 생명체는 과연 어떤 모습일지 종종 궁금해한다.' },
      { id: 'b32', word: 'achieve', phonetic: '[əˈtʃiːv]', pos: '동사', meaning: '달성하다, 성취하다', hint: 'a(향해) + chef(머리, 정상) → 산 정상을 향해 올라 목표를 끝내 이루다', example: 'Dedication and daily practice will help you achieve your goals.', exampleKo: '헌신과 매일의 꾸준한 연습은 당신이 목표를 달성하도록 도와줄 것이다.' },
      { id: 'b33', word: 'belong', phonetic: '[bɪˈlɔːŋ]', pos: '동사', meaning: '속하다, 제자리에 있다', hint: 'be(완전히) + long(알맞게 적합하다) → 자신이 있어야 할 자리에 꼭 맞게 속함', example: 'Every child deserves to feel loved and know that they truly belong.', exampleKo: '모든 아이는 사랑받고 자신이 온전히 속해 있음을 느낄 자격이 있다.' },
      { id: 'b34', word: 'celebrate', phonetic: '[ˈselɪbreɪt]', pos: '동사', meaning: '기념하다, 축하하다', hint: 'celeber(많은 사람이 모인) → 기쁜 일을 기념하기 위해 함께 모여 축하함', example: 'The whole neighborhood gathered in the park to celebrate the harvest.', exampleKo: '동네 주민 전체가 풍요로운 수확을 축하하기 위해 공원에 모였다.' },
      { id: 'b35', word: 'discover', phonetic: '[dɪˈskʌvər]', pos: '동사', meaning: '발견하다, 알아내다', hint: 'dis(벗기다) + cover(덮개) → 덮개를 벗겨내어 감춰졌던 것을 찾다', example: 'Curious kids love to discover hidden shells along the sandy shore.', exampleKo: '호기심 많은 아이들은 모래사장에 숨겨진 조개껍데기를 발견하는 것을 좋아한다.' },
      { id: 'b36', word: 'entertain', phonetic: '[ˌentərˈteɪn]', pos: '동사', meaning: '즐겁게 해 주다, 대접하다', hint: 'entre(사이에) + tenir(붙잡다) → 사람들의 마음을 사로잡아 유쾌하게 해주다', example: 'The street magician knew how to entertain pedestrians with card tricks.', exampleKo: '그 거리 마술사는 카드 묘기로 행인들을 유쾌하게 즐겁게 만드는 법을 알고 있었다.' },
      { id: 'b37', word: 'forgive', phonetic: '[fərˈɡɪv]', pos: '동사', meaning: '용서하다', hint: 'for(완전히) + give(주다) → 원망의 마음을 완전히 주어버리고 털어내다', example: 'True inner peace begins when you learn to forgive past mistakes.', exampleKo: '진정한 내면의 평화는 과거의 실수를 너그럽게 용서하는 법을 배울 때 시작된다.' },
      { id: 'b38', word: 'imagine', phonetic: '[ɪˈmædʒɪn]', pos: '동사', meaning: '상상하다, 떠올리다', hint: 'imago(이미지, 형상) → 머릿속 스크린에 그림을 그리듯 상상하다', example: 'Try to imagine stepping foot on the dusty red surface of Mars.', exampleKo: '붉고 먼지 날리는 화성의 대지 위에 첫 발을 내딛는 순간을 상상해 보라.' },
      { id: 'b39', word: 'journey', phonetic: '[ˈdʒɜːrni]', pos: '명사', meaning: '여정, 긴 여행', hint: 'journée(하루 치의 길) → 하루하루 발걸음을 내딛으며 나아가는 긴 인생길', example: 'Graduation marks the beginning of an exciting lifelong career journey.', exampleKo: '졸업은 가슴 뛰는 평생의 커리어 여정이 본격 시작되는 출발점이다.' },
      { id: 'b40', word: 'memory', phonetic: '[ˈmeməri]', pos: '명사', meaning: '기억, 추억', hint: 'memor(기억하는) → 마음속에 깊이 새겨져 잊혀지지 않는 소중한 흔적', example: 'Looking at old photo albums brought back a fond childhood memory.', exampleKo: '빛바랜 옛 사진첩을 들여다보니 다정한 유년 시절의 추억이 되살아났다.' },
      { id: 'b41', word: 'notice', phonetic: '[ˈnoʊtɪs]', pos: '동사', meaning: '알아차리다, 주목하다', hint: 'notus(알려진) → 오감으로 변화를 인지하고 눈치채다', example: 'Did you notice the subtle green tint in the evening clouds?', exampleKo: '너는 저녁 구름 속에 은은하게 감도는 초록빛 색조를 알아차렸니?' },
      { id: 'b42', word: 'promise', phonetic: '[ˈprɑːmɪs]', pos: '명사', meaning: '약속, 서약', hint: 'pro(앞으로) + mittere(보내다) → 미래에 반드시 지키겠노라 앞으로 보낸 말', example: 'A sincere promise kept builds deep and lasting personal respect.', exampleKo: '성실하게 지켜진 약속은 깊고 영속적인 상호 존중을 낳는다.' },
      { id: 'b43', word: 'realize', phonetic: '[ˈriːəlaɪz]', pos: '동사', meaning: '깨닫다, 실현하다', hint: 'real(실제) + ize → 머릿속 생각이 실체화되거나 진실을 명확히 알아채다', example: 'She did not realize how quickly the afternoon hours had slipped by.', exampleKo: '그녀는 오후 시간이 얼마나 빠르게 쏜살같이 지나갔는지 미처 깨닫지 못했다.' },
      { id: 'b44', word: 'remind', phonetic: '[rɪˈmaɪnd]', pos: '동사', meaning: '상기시키다, 다시 떠올리게 하다', hint: 're(다시) + mind(마음) → 잊었던 기억을 마음속에 다시 끄집어내 주다', example: 'The chime sound is set to remind you of your scheduled study review.', exampleKo: '차임 벨소리는 당신이 계획된 복습 학습을 잊지 않도록 상기시켜 줍니다.' },
      { id: 'b45', word: 'satisfy', phonetic: '[ˈsætɪsfaɪ]', pos: '동사', meaning: '만족시키다, 충족하다', hint: 'satis(충분한) + facere(만들다) → 부족함 없이 충분히 채워 흡족하게 하다', example: 'A hearty bowl of warm vegetable stew will satisfy your hunger.', exampleKo: '푸짐하고 따스한 채소 스튜 한 그릇이 당신의 굶주림을 든든하게 채워줄 것이다.' },
      { id: 'b46', word: 'treasure', phonetic: '[ˈtreʒər]', pos: '명사', meaning: '보물, 소중히 여기다', hint: 'thesauros(보물 창고) → 금은보화처럼 아끼고 귀중하게 간직하는 존재', example: 'True lifelong friendships are rare treasures that we should always cherish.', exampleKo: '평생을 함께하는 진정한 우정은 언제나 아끼고 지켜야 할 드문 보물이다.' },
      { id: 'b47', word: 'whisper', phonetic: '[ˈwɪspər]', pos: '동사', meaning: '속삭이다, 귓속말하다', hint: '소리를 낮추어 바람처럼 사르락거리는 소리를 내다', example: 'The mother leaned down to whisper a gentle bedtime story.', exampleKo: '어머니는 몸을 기울여 아이에게 다정한 자장가 이야기를 나지막이 속삭였다.' },
      { id: 'b48', word: 'respect', phonetic: '[rɪˈspekt]', pos: '명사', meaning: '존경, 존중', hint: 're(다시) + spect(바라보다) → 가볍게 보지 않고 공경하는 마음으로 다시 우러러봄', example: 'Mutual respect between colleagues creates a truly supportive workplace.', exampleKo: '동료 간의 상호 존중은 서로를 진정으로 지지해 주는 일터를 만들어낸다.' },
      { id: 'b49', word: 'courage', phonetic: '[ˈkɜːrɪdʒ]', pos: '명사', meaning: '용기, 담력', hint: 'cor(심장, 가슴) → 두려움 속에서도 가슴 깊은 곳의 심장이 뛰며 나아가는 힘', example: 'It takes moral courage to stand up and speak the truth.', exampleKo: '옳은 진실을 당당히 말하기 위해서는 도덕적인 용기가 필요하다.' },
      { id: 'b50', word: 'freedom', phonetic: '[ˈfriːdəm]', pos: '명사', meaning: '자유, 해방', hint: 'free(자유로운) + dom(상태) → 억압과 속박에서 벗어나 스스로 선택하는 상태', example: 'Freedom of expression is a fundamental bedrock of democratic societies.', exampleKo: '표현의 자유는 민주주의 사회를 지탱하는 가장 근본적인 주춧돌이다.' }
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
