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
let gameState = 'start';

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
backToResults.addEventListener('click', backToResultsFromReview);

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
        showFinalResults();
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

// Show results screen with detailed feedback
function showFinalResults() {
    gameState = 'results';
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'flex';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    finalScore.textContent = `${score}/${quizQuestions.length} (${percentage}%)`;
    
    // Determine results message based on score with detailed summary
    let title, message, summary;
    
    if (score === 10) {
        title = "¡PERFECCIÓN MAYA ALCANZADA! 👑✨";
        message = "¡EXTRAORDINARIO! Has logrado la puntuación perfecta. Eres un verdadero sabio maya, comparable a los grandes astrónomos y matemáticos de Tikal y Chichen Itzá. Tu conocimiento sobre la economía del cacao, la estructura social jerárquica y el sistema político de ciudades-estado es impecable.";
        summary = "🏆 LOGRO DESBLOQUEADO: 'Sabio Maya Supremo' - Has demostrado un dominio total de la civilización maya. ¡Felicidades por este logro excepcional!";
        createCelebrationEffect();
    } else if (score >= 8) {
        title = score === 9 ? "¡CASI PERFECCIÓN MAYA! 🌟⚡" : "¡EXPERTO MAYA CERTIFICADO! 🏆📚";
        message = score === 9 ? 
            "¡IMPRESIONANTE! Con 9 respuestas correctas, estás a un paso de la perfección. Tu conocimiento sobre los sistemas agrícolas, la estructura social y las alianzas políticas mayas es excepcional. Solo un pequeño detalle te separa de ser un sabio maya completo." :
            "¡EXCELENTE! Has demostrado un conocimiento sólido y avanzado de la civilización maya. Entiendes muy bien cómo funcionaba su economía basada en agricultura, su sociedad estratificada y su complejo sistema político de ciudades-estado.";
        summary = score === 9 ? 
            "🥈 LOGRO DESBLOQUEADO: 'Sumo Sacerdote Maya' - Tu sabiduría rivaliza con los grandes líderes de Palenque y Copán." :
            "🥉 LOGRO DESBLOQUEADO: 'Noble Maya Distinguido' - Has alcanzado un nivel de conocimiento que te honra como un verdadero estudioso de esta gran civilización.";
        createSuccessEffect();
    } else if (percentage >= 70) {
        title = "¡Buen Conocimiento Maya! ⭐📖";
        message = `Con ${score} respuestas correctas, tienes una buena base sobre la civilización maya. Comprendes conceptos importantes sobre su economía agrícola, estructura social y organización política, pero hay algunos aspectos que puedes reforzar para dominar completamente el tema.`;
        summary = "📊 Resumen: Tienes una comprensión sólida de los fundamentos mayas. Te recomendamos repasar los detalles sobre el comercio, el papel de las mujeres nobles y los sistemas políticos para alcanzar la excelencia.";
    } else if (percentage >= 50) {
        title = "Conocimiento Básico Maya 📚🌱";
        message = `Has respondido correctamente ${score} preguntas. Tienes una base inicial sobre los mayas, pero hay mucho espacio para crecer. Los conceptos básicos sobre su economía, sociedad y política necesitan más estudio y práctica.`;
        summary = "📈 Resumen: Estás en el camino correcto para entender esta fascinante civilización. Enfócate en estudiar la importancia del maíz, la estructura social jerárquica y el sistema de ciudades-estado para mejorar tu puntuación.";
    } else {
        title = "¡A Seguir Aprendiendo Sobre los Mayas! 💪🏛️";
        message = `Con ${score} respuestas correctas, estás comenzando tu viaje de aprendizaje sobre los mayas. No te desanimes: esta civilización es compleja y fascinante. Cada gran arqueólogo comenzó desde cero.`;
        summary = "🔍 Resumen: Te recomendamos revisar los materiales de clase sobre economía maya (agricultura del maíz), sociedad (pirámide social) y política (ciudades-estado) antes de intentar nuevamente. ¡Los mayas construyeron sus pirámides piedra por piedra!";
    }
    
    resultsTitle.textContent = title;
    scoreMessage.innerHTML = `
        <div class="main-message">${message}</div>
        <div class="summary-message">${summary}</div>
    `;
    
    // Animate the results
    setTimeout(() => {
        resultsContainer.querySelector('.results-content').style.animation = 'cardAppear 0.8s ease-out';
    }, 100);
}

// Create special celebration effect for perfect score
function createCelebrationEffect() {
    console.log('Creating celebration effect for perfect score!');
    
    // Golden confetti explosion
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFloatingElements('🏆', '#D4AF37', 1);
            createFloatingElements('⭐', '#D4AF37', 1);
            createFloatingElements('✨', '#00A86B', 1);
        }, i * 100);
    }
    
    // Screen golden glow effect
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%);
        pointer-events: none;
        z-index: 1000;
        animation: celebrationGlow 3s ease-out;
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 3000);
    
    // Add crown effect to results
    setTimeout(() => {
        const crown = document.createElement('div');
        crown.textContent = '👑';
        crown.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 3rem;
            animation: crownBounce 2s ease-in-out infinite;
        `;
        resultsContainer.querySelector('.maya-symbol-large').appendChild(crown);
    }, 500);
}

// Create success effect for scores 8-9
function createSuccessEffect() {
    console.log('Creating success effect for high score!');
    
    // Victory stars
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingElements('⭐', '#D4AF37', 1);
            createFloatingElements('🌟', '#00A86B', 1);
        }, i * 150);
    }
    
    // Success glow
    const success = document.createElement('div');
    success.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(0, 168, 107, 0.2) 0%, rgba(0, 168, 107, 0.05) 70%, transparent 100%);
        pointer-events: none;
        z-index: 1000;
        animation: successGlow 2s ease-out;
    `;
    document.body.appendChild(success);
    
    setTimeout(() => success.remove(), 2000);
}

// Animation functions
function playCorrectAnimation() {
    createFloatingElements('✨', '#00A86B', 5);
    
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
    createFloatingElements('💫', '#dc3545', 3);
    
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
    
    progressBar.style.width = '0%';
    
    // Clean up any remaining effects
    document.querySelectorAll('[style*="position: fixed"]').forEach(el => {
        if (el.style.pointerEvents === 'none' && el.style.zIndex === '1000') {
            el.remove();
        }
    });
}

// Go back to results from review
function backToResultsFromReview() {
    reviewContainer.style.display = 'none';
    resultsContainer.style.display = 'flex';
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (gameState === 'playing') {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) {
            const buttons = optionsContainer.querySelectorAll('.option-btn');
            if (buttons[num - 1] && buttons[num - 1].style.pointerEvents !== 'none') {
                buttons[num - 1].click();
            }
        }
        if (e.key === 'Enter' && nextBtn.style.display === 'block') {
            nextBtn.click();
        }
    }
    
    if (e.key === 'Escape' && gameState !== 'start') {
        if (confirm('¿Estás seguro de que quieres reiniciar el quiz?')) {
            restartQuiz();
        }
    }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz Maya initialized!');
    
    // Add hover effects to buttons
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
    
    // Create background particles
    createBackgroundParticles();
});

// Create background particles
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
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--maya-gold);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: particleFloat ${Math.random() * 15 + 10}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}
