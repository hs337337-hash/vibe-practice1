// 진단평가 문항 데이터 데이터베이스 (초등 연계 및 기초 어휘/어법 위주)
const questions = [
    {
        question: "다음 대화의 빈칸에 알맞은 단어는?\n\nA: How ______ is this apple?\nB: It's one dollar.",
        options: ["many", "much", "old", "long"],
        answer: 1, // much
        hint: "물건의 가격(돈)을 물어볼 때 쓰는 의문사 세트입니다."
    },
    {
        question: "다음 단어 중 '음식 재료'에 해당하지 않는 단어는?",
        options: ["garlic", "bacon", "seafood", "tourist"],
        answer: 3, // tourist
        hint: "마지막 단어는 '관광객, 여행객'이라는 뜻을 가지고 있습니다."
    },
    {
        question: "다음 문장의 빈칸에 들어갈 알맞은 말은?\n\nI'm ______ to buy some snacks.",
        options: ["go", "goes", "going", "went"],
        answer: 2, // going
        hint: "~할 예정이다라는 가까운 미래의 계획이나 의도를 나타낼 때 쓰는 기본 표현입니다."
    },
    {
        question: "다음 대화에서 B가 지불해야 할 금액은?\n\nA: Banana chips are $2 a bag. How many bags do you want?\nB: Three bags, please.",
        options: ["$2", "$3", "$5", "$6"],
        answer: 3, // $6
        hint: "한 봉지에 2달러인 바나나 칩을 3봉지 샀습니다. 곱셈을 해보세요!"
    },
    {
        question: "다음 중 '지금 일어나고 있는 행동(현재진행형)'을 바르게 나타낸 문장은?",
        options: ["I am watch a match.", "I watching a match.", "I am watching a match.", "I am watched a match."],
        answer: 2, // I am watching a match.
        hint: "현재진행형은 [be동사(am/are/is) + 동사원형-ing]의 형태를 취합니다."
    },
    {
        question: "다음 중 단어의 뜻이 바르게 연결되지 않은 것은?",
        options: ["delicious - 맛있는", "celebrate - 축하하다/기념하다", "spicy - 달콤한", "harmony - 조화"],
        answer: 2, // spicy
        hint: "떡볶이나 김치는 매운 음식입니다. 'spicy'의 진짜 뜻은 무엇일까요?"
    },
    {
        question: "문맥상 다음 빈칸에 가장 알맞은 단어는?\n\nPeople ______ different toppings to this pizza.",
        options: ["enjoy", "enjoys", "enjoyed", "to enjoy"],
        hint: "주어가 복수 명사(People)일 때, 현재 시제 동사의 알맞은 형태를 고르세요.",
        answer: 0 // enjoy
    },
    {
        question: "다음 질문에 대한 답변으로 가장 적절한 것은?\n\nQ: What food do you like?",
        options: ["I like kimchi fried rice.", "It's five dollars.", "I'm at the market.", "Yes, I am."],
        answer: 0, // I like kimchi fried rice.
        hint: "상대방이 어떤 '음식'을 좋아하는지 물었으므로 좋아하는 음식 종류를 답해야 합니다."
    },
    {
        question: "영어 문장에서 여러 개의 단어를 나열할 때 문장 부호와 접속사(and)의 쓰임이 바른 것은?",
        options: ["noodles, garlic, and oil", "noodles garlic and oil", "noodles, garlic, oil", "noodles, and garlic, and oil"],
        answer: 0, // noodles, garlic, and oil
        hint: "3개 이상의 요소를 나열할 때는 A, B, and C 형태로 씁니다."
    },
    {
        question: "다음 빈칸에 공통으로 들어갈 알파벳으로 알맞은 것은?\n\n• f l a _  pan\n• _ a s t a",
        options: ["p", "b", "m", "f"],
        answer: 0, // p (flat, pasta)
        hint: "교과서에 나오는 '평평한 냄비(flat pan)'와 이탈리아 국수 요리 '파스타'에 들어갈 단어입니다."
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM 요소
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
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

// 이벤트 리스너
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
hintToggleBtn.addEventListener('click', toggleHint);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    
    // 진행도 표시
    progressText.innerText = `문항 ${currentQuestionIndex + 1} / ${questions.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    
    // 문제 텍스트 및 힌트 세팅
    questionText.innerText = currentQuestion.question;
    hintText.innerText = currentQuestion.hint;
    
    // 선택지 버튼 생성
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
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score += 10; // 문항당 10점
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    scoreText.innerText = score;
    
    // 피드백 및 단원 학습 가이드 출력
    studyGuide.innerHTML = "";
    if (score >= 80) {
        feedbackText.innerText = "훌륭합니다! 기초 실력이 아주 탄탄하네요. 2단원의 다채로운 세계 음식 이야기를 흥미롭게 공부할 준비가 끝났습니다!";
        studyGuide.innerHTML = `
            <li>교과서 본문에 나오는 다양한 국가의 전통 음식 이름(Paella, Mie goreng 등)을 미리 읽어봅시다.</li>
            <li>[동명사(v-ing)] 표현을 활용해 내가 좋아하는 취미나 활동을 영어로 더 길게 말하는 연습을 해보세요.</li>
        `;
    } else if (score >= 50) {
        feedbackText.innerText = "좋습니다! 기본적인 어휘와 대화 표현을 잘 기억하고 있네요. 몇 가지 부족한 어법 규칙을 보완하면 수업을 더 잘 따라갈 수 있어요.";
        studyGuide.innerHTML = `
            <li><strong>How much is it? / It is ~ dollars.</strong> 가격 묻고 답하기 대화를 짝과 소리 내어 연습해보세요.</li>
            <li><strong>be동사 + 동사원형-ing</strong> 형태의 현재진행형 문장을 만드는 법을 교과서 Grammar 코너에서 미리 복습해 오면 좋습니다.</li>
        `;
    } else {
        feedbackText.innerText = "기초 단어와 문장 구조에 대한 복습이 필요합니다. 선생님, 친구들과 함께 차근차근 공부하면 금방 실력을 키울 수 있으니 걱정 마세요!";
        studyGuide.innerHTML = `
            <li>초등학교 때 배운 '숫자 읽기(가격 단위)'와 핵심 단어(buy, give, food, yummy 등)를 다시 확인하세요.</li>
            <li><strong>I'm going to + 동사원형</strong> 표현이 무엇을 계획할 때 쓰는 말인지 익히고, 본문 읽기 전 단어장을 먼저 읽어봅시다.</li>
        `;
    }
}
