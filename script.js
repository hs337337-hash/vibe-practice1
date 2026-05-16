// 진단평가 원본 문항 데이터 세트
const allQuestions = [
    {
        question: "다음 대화의 빈칸에 알맞은 단어는?\n\nA: How ______ is this apple?\nB: It's one dollar.",
        options: ["many", "much", "old", "long"],
        answer: 1, 
        hint: "물건의 가격(돈)을 물어볼 때 쓰는 의문사 세트입니다."
    },
    {
        question: "다음 단어 중 '음식 재료'에 해당하지 않는 단어는?",
        options: ["garlic", "bacon", "seafood", "tourist"],
        answer: 3, 
        hint: "마지막 단어는 '관광객, 여행객'이라는 뜻을 가지고 있습니다."
    },
    {
        question: "다음 문장의 빈칸에 들어갈 알맞은 말은?\n\nI'm ______ to buy some snacks.",
        options: ["go", "goes", "going", "went"],
        answer: 2, 
        hint: "~할 예정이다라는 가까운 미래의 계획이나 의도를 나타낼 때 쓰는 기본 표현입니다."
    },
    {
        question: "다음 대화에서 B가 지불해야 할 금액은?\n\nA: Banana chips are $2 a bag. How many bags do you want?\nB: Three bags, please.",
        options: ["$2", "$3", "$5", "$6"],
        answer: 3, 
        hint: "한 봉지에 2달러인 바나나 칩을 3봉지 샀습니다. 곱셈을 해보세요!"
    },
    {
        question: "다음 중 '지금 일어나고 있는 행동(현재진행형)'을 바르게 나타낸 문장은?",
        options: ["I am watch a match.", "I watching a match.", "I am watching a match.", "I am watched a match."],
        answer: 2, 
        hint: "현재진행형은 [be동사(am/are/is) + 동사원형-ing]의 형태를 취합니다."
    },
    {
        question: "다음 중 단어의 뜻이 바르게 연결되지 않은 것은?",
        options: ["delicious - 맛있는", "celebrate - 축하하다/기념하다", "spicy - 달콤한", "harmony - 조화"],
        answer: 2, 
        hint: "떡볶이나 김치는 매운 음식입니다. 'spicy'의 진짜 뜻은 무엇일까요?"
    },
    {
        question: "문맥상 다음 빈칸에 가장 알맞은 단어는?\n\nPeople ______ different toppings to this pizza.",
        options: ["enjoy", "enjoys", "enjoyed", "to enjoy"],
        answer: 0, 
        hint: "주어가 복수 명사(People)일 때, 현재 시제 동사의 알맞은 형태를 고르세요."
    },
    {
        question: "다음 질문에 대한 답변으로 가장 적절한 것은?\n\nQ: What food do you like?",
        options: ["I like kimchi fried rice.", "It's five dollars.", "I'm at the market.", "Yes, I am."],
        answer: 0, 
        hint: "상대방이 어떤 '음식'을 좋아하는지 물었으므로 좋아하는 음식 종류를 답해야 합니다."
    },
    {
        question: "영어 문장에서 여러 개의 단어를 나열할 때 문장 부호와 접속사(and)의 쓰임이 바른 것은?",
        options: ["noodles, garlic, and oil", "noodles garlic and oil", "noodles, garlic, oil", "noodles, and garlic, and oil"],
        answer: 0, 
        hint: "3개 이상의 요소를 나열할 때는 A, B, and C 형태로 씁니다."
    },
    {
        question: "다음 빈칸에 공통으로 들어갈 알파벳으로 알맞은 것은?\n\n• f l a _  pan\n• _ a s t a",
        options: ["p", "b", "m", "f"],
        answer: 0, 
        hint: "교과서에 나오는 '평평한 냄비(flat pan)'와 이탈리아 국수 요리 '파스타'에 들어갈 단어입니다."
    }
];

// 상태 제어 변수
let activeQuestions = []; 
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = []; 
let isWrongOnlyMode = false;
let wrongIndexes = []; // 틀린 문항들의 원본 인덱스를 저장하는 배열

// DOM 요소 매핑
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewRetryBtn = document.getElementById('review-retry-btn'); 
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const hintToggleBtn = document.getElementById('hint-toggle-btn');
const hintBox = document.getElementById('hint-box');
const hintText = document.getElementById('hint-text');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const studyGuide = document.getElementById('study-guide');
const wrongAnswersList = document.getElementById('wrong-answers-list');

// 이벤트 연결
startBtn.addEventListener('click', () => startQuiz(false));
restartBtn.addEventListener('click', () => startQuiz(false)); 
reviewRetryBtn.addEventListener('click', () => startQuiz(true)); 
hintToggleBtn.addEventListener('click', toggleHint);

function startQuiz(isWrongOnly = false) {
    currentQuestionIndex = 0;
    score = 0;
    isWrongOnlyMode = isWrongOnly;
    userAnswers = []; 

    if (isWrongOnlyMode) {
        // 오답 노트 모드일 경우: 이전에 추출해 둔 wrongIndexes 기반으로 문제집 재구성
        let tempWrongSet = [];
        wrongIndexes.forEach(idx => {
            tempWrongSet.push(allQuestions[idx]);
        });
        activeQuestions = tempWrongSet;
    } else {
        // 처음부터 풀기 모드일 경우: 원본 10문제 전체 세팅
        activeQuestions = [...allQuestions];
        wrongIndexes = [];
    }

    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = activeQuestions[currentQuestionIndex];
    
    progressText.innerText = `문항 ${currentQuestionIndex + 1} / ${activeQuestions.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%`;
    
    questionText.innerText = currentQuestion.question;
    hintText.innerText = currentQuestion.hint;
    
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    hintBox.classList.add('hide');
    hintToggleBtn.innerText = "힌트 보기";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function toggleHint() {
    if (hintBox.classList.contains('hide')) {
        hintBox.classList.remove('hide');
        hintToggleBtn.innerText = "힌트 숨기기";
    } else {
        hintBox.classList.add('hide');
        hintToggleBtn.innerText = "힌트 보기";
    }
}

function selectAnswer(selectedIndex) {
    userAnswers.push(selectedIndex);
    const currentQuestion = activeQuestions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.answer) {
        score++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < activeQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    // 점수 백분율 계산
    const finalScore = Math.round((score / activeQuestions.length) * 100);
    scoreText.innerText = finalScore;
    
    if (isWrongOnlyMode) {
        feedbackText.innerText = "오답 재도전이 끝났습니다! 힌트를 확인하고 다시 풀어보니 어땠나요? 실력이 쑥쑥 늘고 있어요!";
    } else {
        if (finalScore >= 80) {
            feedbackText.innerText = "훌륭합니다! 기초 실력이 아주 탄탄하네요. 2단원의 다채로운 세계 음식 이야기를 흥미롭게 공부할 준비가 끝났습니다!";
        } else if (finalScore >= 50) {
            feedbackText.innerText = "좋습니다! 기본적인 어휘와 대화 표현을 잘 기억하고 있네요. 몇 가지 부족한 어법 규칙을 보완하면 수업을 더 잘 따라갈 수 있어요.";
        } else {
            feedbackText.innerText = "기초 단어와 문장 구조에 대한 복습이 필요합니다. 선생님, 친구들과 함께 차근차근 공부하면 금방 실력을 키울 수 있으니 걱정 마세요!";
        }
    }

    studyGuide.innerHTML = `
        <li><strong>How much is it? / It is ~ dollars.</strong> 가격 묻고 답하기 대화를 짝과 소리 내어 연습해보세요.</li>
        <li><strong>be동사 + 동사원형-ing</strong> 형태의 현재진행형 문장을 만드는 법을 교과서 Grammar 코너에서 미리 복습하세요.</li>
    `;

    wrongAnswersList.innerHTML = ""; 
    let currentWrongCount = 0;
    let newWrongIndexes = []; // 이번 라운드에서 새로 틀린 문제들의 원본 인덱스 저장소

    activeQuestions.forEach((question, index) => {
        const uAns = userAnswers[index];
        const cAns = question.answer;

        if (uAns !== cAns) {
            currentWrongCount++;
            
            // 전 회차 모드에 따른 정확한 원본 문항 인덱스 추출
            let originalIndex = isWrongOnlyMode ? wrongIndexes[index] : index;
            newWrongIndexes.push(originalIndex);

            const wrongItem = document.createElement('div');
            wrongItem.classList.add('wrong-item');
            const formattedQuestion = question.question.split('\n').join('<br>');

            // [수정 핵심]: 정답 노출 코드를 제거하고, 학생의 선택 오답과 힌트박스만 노출
            wrongItem.innerHTML = `
                <div class="q-title">📌 틀린 문항</div>
                <div style="font-size:0.95rem; line-height:1.4; color:#555; margin-bottom:8px;">${formattedQuestion}</div>
                <div class="answer-info">
                    <span class="my-ans">❌ 내가 고른 오답: ${question.options[uAns]}</span>
                    <div class="review-hint">💡 힌트 코멘트: ${question.hint}</div>
                </div>
            `;
            wrongAnswersList.appendChild(wrongItem);
        }
    });

    // 다음 시도를 위해 오답 인덱스 목록 갱신
    wrongIndexes = newWrongIndexes;

    // 틀린 문제가 하나라도 남아있다면 오답 전용 재도전 버튼을 보여줌
    if (currentWrongCount > 0) {
        reviewRetryBtn.classList.remove('hide');
        reviewRetryBtn.innerText = `❌ 틀린 문제 (${currentWrongCount}개) 다시 도전하기`;
    } else {
        reviewRetryBtn.classList.add('hide');
        wrongAnswersList.innerHTML = `<div class="all-correct-msg">🎉 완벽합니다! 모든 문제를 다 맞혔습니다!</div>`;
    }
}
