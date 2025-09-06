// Quiz data about Maya civilization - Economy, Society, and Politics
const quizQuestions = [
    {
        question: "¿Cuál era la base principal de la economía maya?",
        options: [
            "La ganadería y cría de animales",
            "La agricultura, especialmente el cultivo de maíz",
            "La pesca y actividades marítimas",
            "La minería de metales preciosos"
        ],
        correct: 1,
        explanation: "Los mayas basaron su economía principalmente en la agricultura, siendo el maíz su cultivo más importante junto con frijoles y calabazas."
    },
    {
        question: "¿Cómo se organizaba la sociedad maya?",
        options: [
            "En una sociedad igualitaria sin clases sociales",
            "En castas cerradas sin movilidad social",
            "En una estructura jerárquica con nobles, sacerdotes, artesanos y campesinos",
            "Solo en dos clases: ricos y pobres"
        ],
        correct: 2,
        explanation: "La sociedad maya estaba estratificada en una pirámide social con el rey en la cima, seguido por nobles, sacerdotes, comerciantes, artesanos y campesinos."
    },
    {
        question: "¿Qué producto usaban los mayas como moneda en el comercio?",
        options: [
            "Semillas de cacao",
            "Plumas de quetzal",
            "Jade pulido",
            "Conchas marinas"
        ],
        correct: 0,
        explanation: "Las semillas de cacao eran la moneda principal de los mayas, además de ser muy valoradas para hacer chocolate, bebida sagrada."
    },
    {
        question: "¿Cómo era el sistema político maya?",
        options: [
            "Un gran imperio unificado bajo un solo emperador",
            "Ciudades-estado independientes con sus propios gobernantes",
            "Una república democrática con elecciones",
            "Un sistema comunal sin líderes centralizados"
        ],
        correct: 1,
        explanation: "Los mayas se organizaban en ciudades-estado independientes, cada una con su propio rey (k'uhul ajaw) que gobernaba su territorio."
    },
    {
        question: "¿Quién tenía el poder máximo en una ciudad-estado maya?",
        options: [
            "Los sacerdotes principales",
            "El consejo de ancianos",
            "El rey o k'uhul ajaw",
            "Los comerciantes más ricos"
        ],
        correct: 2,
        explanation: "El k'uhul ajaw (rey sagrado) tenía el poder político y religioso máximo en cada ciudad-estado maya."
    },
    {
        question: "¿Qué técnica agrícola desarrollaron los mayas para maximizar sus cultivos?",
        options: [
            "Agricultura de terrazas en las montañas",
            "Sistemas de riego por canales",
            "Campos elevados en pantanos y chinampas",
            "Todas las anteriores"
        ],
        correct: 3,
        explanation: "Los mayas desarrollaron múltiples técnicas agrícolas adaptadas a diferentes ambientes: terrazas, canales de riego y campos elevados."
    },
    {
        question: "¿Cuál era una de las principales actividades comerciales mayas?",
        options: [
            "Intercambio de sal, obsidiana y jade",
            "Venta de metales como hierro y bronce",
            "Comercio de ganado y productos lácteos",
            "Exportación de trigo y centeno"
        ],
        correct: 0,
        explanation: "Los mayas comerciaban principalmente sal, obsidiana para herramientas, jade para joyería y otros productos regionales."
    },
    {
        question: "¿Qué papel tenían las mujeres nobles en la sociedad maya?",
        options: [
            "No tenían ningún papel político importante",
            "Solo se dedicaban a las labores domésticas",
            "Podían ser gobernantas y participar en rituales importantes",
            "Estaban completamente excluidas de la vida pública"
        ],
        correct: 2,
        explanation: "Las mujeres nobles mayas podían ejercer poder político, algunas fueron gobernantas y participaban activamente en ceremonias religiosas."
    },
    {
        question: "¿Cómo se legitimaba el poder de los gobernantes mayas?",
        options: [
            "A través de elecciones populares",
            "Por herencia y conexión divina con los dioses",
            "Por conquista militar únicamente",
            "Por acumulación de riquezas"
        ],
        correct: 1,
        explanation: "Los gobernantes mayas legitimaban su poder a través del linaje real y su supuesta conexión divina, siendo considerados intermediarios entre dioses y humanos."
    },
    {
        question: "¿Qué acontecimiento marcó el declive de muchas ciudades mayas clásicas?",
        options: [
            "La llegada de los españoles",
            "Una gran epidemia de viruela",
            "El colapso maya clásico (800-900 d.C.)",
            "Una guerra civil generalizada"
        ],
        correct: 2,
        explanation: "El colapso maya clásico entre 800-900 d.C. llevó al abandono de muchas ciudades, posiblemente debido a sequías, guerras y crisis políticas."
    }
];

// Game state
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let gameState = 'start'; // 'start', 'playing', 'results', 'review'

// DOM elements
const hero = document.querySelector('.hero');
const quizContainer = document.getElementById('quizContainer');
const resultsContainer = document.getElementById('resultsContainer');
const reviewContainer = document.getElementById('reviewContainer');
const startBtn = document.getElementById('startQuiz');
const questionCounter = document.getElementById('questionCounter');
const scoreCounter = document.getElementById('scoreCounter');
const progressBar = document.getElementById('progressBar');
const questionTitle = document.getElementById('questionTitle');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const resultsTitle = document.getElementById('resultsTitle');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById('scoreMessage');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const reviewList = document.getElementById('reviewList');
const backToResults = document.getElementById('backToResults');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
reviewBtn.addEventListener('click', showReview);
backToResults.addEventListener('click', showResults);

// Initialize the quiz
function startQuiz() {
    gameState = 'playing';
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    hero.style.display = 'none';
    quizContainer.style.display = 'block';
    resultsContainer.style.display = 'none';
    reviewContainer.style.display = 'none';
    
    showQuestion();
    updateUI();
}

// Display current question
function showQuestion() {
    const question = quizQuestions[currentQuestion];
    questionTitle.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index, button));
        optionsContainer.appendChild(button);
    });
    
    nextBtn.style.display = 'none';
    updateProgress();
}

// Handle answer selection
function selectAnswer(selectedIndex, selectedButton) {
    const question = quizQuestions[currentQuestion];
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all buttons
    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    // Store user answer
    userAnswers[currentQuestion] = {
        selected: selectedIndex,
        correct: question.correct,
        question: question.question,
        options: question.options,
        explanation: question.explanation
    };
    
    // Show correct/incorrect styling with animation
    setTimeout(() => {
        allButtons.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && selectedIndex !== question.correct) {
                btn.classList.add('incorrect');
            }
        });
        
        if (selectedIndex === question.correct) {
            score++;
            updateScoreDisplay();
            playCorrectAnimation();
        } else {
            playIncorrectAnimation();
        }
        
        setTimeout(() => {
            nextBtn.style.display = 'block';
        }, 1000);
        
    }, 300);
}

// Move to next question or show results
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
        updateUI();
    } else {
        showResults();
    }
}

// Update UI elements
function updateUI() {
    questionCounter.textContent = `Pregunta ${currentQuestion + 1} de ${quizQuestions.length}`;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    scoreCounter.textContent = `Respuestas correctas: ${score}`;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progress + '%';
}

// Show results screen
function showResults() {
    gameState = 'results';
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'flex';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    finalScore.textContent = `${score}/${quizQuestions.length} (${percentage}%)`;
    
    // Determine results message based on score
    let title, message;
    if (percentage >= 90) {
        title = "¡Eres un Experto Maya! 🏆";
        message = "¡Increíble! Conoces muy bien la civilización maya. Tu sabiduría es comparable a la de un sabio maya antiguo.";
    } else if (percentage >= 70) {
        title = "¡Buen Conocimiento! ⭐";
        message = "¡Muy bien! Tienes un buen entendimiento de la cultura maya. Solo necesitas repasar algunos detalles.";
    } else if (percentage >= 50) {
        title = "Conocimiento Básico 📚";
        message = "Tienes una base sólida, pero hay espacio para mejorar. ¡Sigue aprendiendo sobre esta fascinante civilización!";
    } else {
        title = "¡A Seguir Aprendiendo! 💪";
        message = "No te desanimes. Los mayas tenían un dicho: 'El conocimiento se construye paso a paso, como las pirámides'. ¡Inténtalo de nuevo!";
    }
    
    resultsTitle.textContent = title;
    scoreMessage.textContent = message;
    
    // Animate the results
    setTimeout(() => {
        resultsContainer.querySelector('.results-content').style.animation = 'cardAppear 0.8s ease-out';
    }, 100);
}

// Show review of answers
function showReview() {
    gameState = 'review';
    resultsContainer.style.display = 'none';
    reviewContainer.style.display = 'block';
    
    reviewList.innerHTML = '';
    
    userAnswers.forEach((answer, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const isCorrect = answer.selected === answer.correct;
        const userAnswerText = answer.options[answer.selected];
        const correctAnswerText = answer.options[answer.correct];
        
        reviewItem.innerHTML = `
            <div class="review-question">
                <strong>Pregunta ${index + 1}:</strong> ${answer.question}
            </div>
            <div class="review-answer user-answer">
                <strong>Tu respuesta:</strong> ${userAnswerText} ${isCorrect ? '✅' : '❌'}
            </div>
            ${!isCorrect ? `<div class="review-answer correct">
                <strong>Respuesta correcta:</strong> ${correctAnswerText} ✅
            </div>` : ''}
            <div class="review-explanation">
                <strong>Explicación:</strong> ${answer.explanation}
            </div>
        `;
        
        reviewList.appendChild(reviewItem);
    });
}

// Restart the quiz
function restartQuiz() {
    gameState = 'start';
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    resultsContainer.style.display = 'none';
    reviewContainer.style.display = 'none';
    hero.style.display = 'flex';
    
    // Reset progress bar
    progressBar.style.width = '0%';
}

// Go back to results from review
function showResults() {
    reviewContainer.style.display = 'none';
    resultsContainer.style.display = 'flex';
}

// Animation functions
function playCorrectAnimation() {
    // Create floating success elements
    createFloatingElements('✨', '#00A86B', 5);
    
    // Add screen flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 168, 107, 0.1);
        pointer-events: none;
        z-index: 1000;
        animation: flashCorrect 0.5s ease-out;
    `;
    document.body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 500);
}

function playIncorrectAnimation() {
    // Create floating elements for incorrect answer
    createFloatingElements('💫', '#dc3545', 3);
    
    // Add screen shake effect
    document.body.style.animation = 'incorrectShake 0.6s ease';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 600);
}

function createFloatingElements(symbol, color, count) {
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.textContent = symbol;
        element.style.cssText = `
            position: fixed;
            font-size: 2rem;
            color: ${color};
            pointer-events: none;
            z-index: 1000;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatingElement 2s ease-out forwards;
        `;
        document.body.appendChild(element);
        
        setTimeout(() => element.remove(), 2000);
    }
}

// Add CSS animations dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes flashCorrect {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes floatingElement {
        0% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotate(0deg); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-100px) scale(1.5) rotate(360deg); 
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(styleSheet);

// Add some interactive sound effects (visual feedback)
function addVisualFeedback(element, type) {
    const originalTransform = element.style.transform;
    
    if (type === 'hover') {
        element.style.transform = 'scale(1.05)';
        element.style.transition = 'all 0.2s ease';
    } else if (type === 'click') {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, 150);
    }
}

// Add hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add interactive effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => addVisualFeedback(button, 'hover'));
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
        button.addEventListener('mousedown', () => addVisualFeedback(button, 'click'));
    });
    
    // Add particle effect to hero section
    createBackgroundParticles();
});

// Create background particles for extra visual appeal
function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--maya-gold);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }
`;
document.head.appendChild(particleStyle);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (gameState === 'playing') {
        // Allow number keys 1-4 to select answers
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
            const buttons = optionsContainer.querySelectorAll('.option-btn');
            if (buttons[num - 1] && buttons[num - 1].style.pointerEvents !== 'none') {
                buttons[num - 1].click();
            }
        }
        // Enter key for next question
        if (e.key === 'Enter' && nextBtn.style.display === 'block') {
            nextBtn.click();
        }
    }
    
    // Escape key to restart from anywhere
    if (e.key === 'Escape' && gameState !== 'start') {
        if (confirm('¿Estás seguro de que quieres reiniciar el quiz?')) {
            restartQuiz();
        }
    }
});

// Add loading animation for smooth transitions
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'loading-spinner';
    loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid var(--maya-stone);
        border-top: 3px solid var(--maya-gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 2000;
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => loader.remove(), 1000);
}

// Add spin animation for loader
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);
