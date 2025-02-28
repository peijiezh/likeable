// Initialize variables
let currentQuestion = 0;
let answers = new Array(25).fill(3);  // Initialize all answers with 3

// Get the user's language from the HTML lang attribute
const userLang = document.documentElement.lang || 'en';

// Questions for each language
const questionsData = {
    en: [
        // Warmth Dimension
        "I enjoy making others feel welcome and comfortable",
        "I genuinely care about others' wellbeing",
        "People find it easy to confide in me",
        "I am known for being approachable and friendly",
        "I naturally tend to care for others",

        // Competence Dimension
        "I keep my promises consistently",
        "People can rely on me in difficult situations",
        "I handle challenges with confidence",
        "I find effective solutions to problems",
        "I take responsibility for my actions",

        // Emotional Intelligence Dimension
        "I easily understand others' emotions",
        "I regulate my own emotions well",
        "I am good at resolving conflicts",
        "I adapt well to different social situations",
        "I am aware of how my behavior affects others",

        // Charisma Dimension
        "I can inspire and motivate others",
        "I communicate ideas clearly and effectively",
        "I naturally draw attention in groups",
        "I make others feel valued and important",
        "I bring positive energy to social situations",

        // Authenticity Dimension
        "I stay true to my values and beliefs",
        "I am honest with myself about my strengths and weaknesses",
        "My actions align with my words",
        "I am authentic in my interactions with others",
        "I take responsibility for my mistakes"
    ],
    es: [
        // Spanish questions
        "Me gusta hacer que los demás se sientan bienvenidos",
        "Genuinamente me preocupo por el bienestar de los demás",
        "La gente encuentra fácil confiarme sus sentimientos",
        "Soy conocido por ser accesible y amable",
        "Tengo una tendencia natural a cuidar de los demás",

        "Cumplo mis promesas de manera consistente",
        "Soy confiable en situaciones difíciles",
        "Enfrento desafíos con confianza",
        "Encuentro soluciones efectivas a los problemas",
        "Asumo la responsabilidad de mis acciones",

        "Entiendo fácilmente las emociones de los demás",
        "Regulo bien mis propias emociones",
        "Resuelvo conflictos de manera efectiva",
        "Me adapto bien a diferentes situaciones sociales",
        "Soy consciente de cómo mi comportamiento afecta a otros",

        "Puedo inspirar y motivar a otros",
        "Comunico ideas de manera clara y efectiva",
        "Atraigo naturalmente la atención en grupos",
        "Hago que otros se sientan valorados",
        "Llevo energía positiva a situaciones sociales",

        "Mantengo mis valores y creencias",
        "Soy honesto sobre mis fortalezas y debilidades",
        "Mis acciones coinciden con mis palabras",
        "Actúo con autenticidad en mis interacciones",
        "Reconozco y aprendo de mis errores"
    ],
    fr: [
        // French questions
        "J'aime mettre les autres à l'aise",
        "Je me soucie sincèrement du bien-être des autres",
        "Les gens me confient facilement leurs sentiments",
        "Je suis connu(e) pour être accessible et amical(e)",
        "J'ai naturellement tendance à prendre soin des autres",

        "Je tiens mes promesses de manière constante",
        "Les gens peuvent compter sur moi dans les situations difficiles",
        "Je gère les défis avec confiance",
        "Je trouve des solutions efficaces aux problèmes",
        "Je prends la responsabilité de mes actions",

        "Je comprends facilement les émotions des autres",
        "Je régule bien mes propres émotions",
        "Je suis doué(e) pour résoudre les conflits",
        "Je m'adapte bien aux différentes situations sociales",
        "Je suis conscient(e) de l'impact de mon comportement sur les autres",

        "Je peux inspirer et motiver les autres",
        "Je communique les idées clairement et efficacement",
        "J'attire naturellement l'attention en groupe",
        "Je fais en sorte que les autres se sentent valorisés",
        "J'apporte une énergie positive aux situations sociales",

        "Je reste fidèle à mes valeurs et convictions",
        "Je suis honnête avec moi-même sur mes forces et faiblesses",
        "Mes actions sont en accord avec mes paroles",
        "Je suis authentique dans mes interactions",
        "J'assume la responsabilité de mes erreurs"
    ],
    de: [
        // German questions
        "Ich mag es, andere Menschen willkommen und wohl fühlen zu lassen",
        "Ich sorge mich aufrichtig um das Wohlergehen anderer",
        "Menschen finden es leicht, mir ihre Gefühle anzuvertrauen",
        "Ich bin bekannt für meine Zugänglichkeit und Freundlichkeit",
        "Ich neige von Natur aus dazu, mich um andere zu kümmern",

        "Ich halte meine Versprechen",
        "Man kann sich in schwierigen Situationen auf mich verlassen",
        "Ich gehe selbstbewusst mit Herausforderungen um",
        "Ich finde gute Lösungen für Probleme",
        "Ich übernehme Verantwortung für meine Handlungen",

        "Ich verstehe die Gefühle anderer leicht",
        "Ich kann meine eigenen Emotionen gut regulieren",
        "Ich bin gut darin, Konflikte zu lösen",
        "Ich passe mich gut an verschiedene soziale Situationen an",
        "Ich bin mir bewusst, wie mein Verhalten andere beeinflusst",

        "Ich kann andere inspirieren und motivieren",
        "Ich kommuniziere Ideen klar und effektiv",
        "Ich ziehe natürlich die Aufmerksamkeit von Gruppen auf mich",
        "Ich lasse andere sich geschätzt und wichtig fühlen",
        "Ich bringe positive Energie in soziale Situationen",

        "Ich bleibe meinen Werten und Überzeugungen treu",
        "Ich bin ehrlich zu mir selbst über meine Stärken und Schwächen",
        "Meine Worte und Taten stimmen überein",
        "Ich bin authentisch in meinen Interaktionen mit anderen",
        "Ich übernehme Verantwortung für meine Fehler"
    ],
    zh: [
        // Chinese questions
        "我喜欢让他人感到受欢迎和舒适",
        "我真诚关心他人的福祉",
        "人们觉得很容易向我倾诉",
        "我以平易近人和友善著称",
        "我天生倾向于关心他人",

        "我始终信守承诺",
        "在困难情况下人们可以依靠我",
        "我自信地应对挑战",
        "我能找到有效的解决方案",
        "我对自己的行为负责",

        "我容易理解他人的情绪",
        "我能很好地调节自己的情绪",
        "我善于解决冲突",
        "我能很好地适应不同的社交场合",
        "我意识到自己的行为如何影响他人",

        "我能激励和鼓舞他人",
        "我清晰有效地传达想法",
        "我自然而然地吸引群体注意",
        "我让他人感到被重视",
        "我为社交场合带来正能量",

        "我坚持自己的价值观和信念",
        "我诚实面对自己的优缺点",
        "我言行一致",
        "我在与他人互动时保持真实",
        "我为自己的错误承担责任"
    ]
};

// Get questions for current language
const questions = questionsData[userLang] || questionsData.en;

// Translations for UI elements
const translations = {
    en: {
        next: 'Next',
        prev: 'Previous',
        finish: 'Finish',
        questionCounter: 'Question',
        stronglyDisagree: 'Strongly Disagree',
        stronglyAgree: 'Strongly Agree',
        pleaseSelect: 'Please select an answer before continuing.',
        score: 'Score',
        analysisTitle: 'Your Likability Analysis',
        overallScore: 'Your overall score is',
        strengths: 'Your Strengths',
        areasToImprove: 'Areas for Improvement',
        evaluationText: 'This evaluation indicates you have a',
        levelText: 'level of likability.',
        dimensions: {
            warmth: 'Warmth',
            competence: 'Competence',
            emotionalIntelligence: 'Emotional Intelligence',
            charisma: 'Charisma',
            authenticity: 'Authenticity'
        },
        ratings: {
            veryHigh: 'very high',
            high: 'high',
            medium: 'medium',
            developing: 'developing',
            basic: 'basic'
        },
        recommendations: {
            warmth: 'Try to show more empathy and kindness in your interactions.',
            competence: 'Focus on improving your skills and reliability.',
            emotionalIntelligence: 'Work on understanding and managing emotions better.',
            charisma: 'Practice engaging and inspiring others more effectively.',
            authenticity: 'Strive to be more authentic and consistent in your actions.',
            allGood: 'Continue maintaining your strengths across all dimensions.'
        }
    },
    zh: {
        next: '下一题',
        prev: '上一题',
        finish: '完成',
        questionCounter: '问题',
        stronglyDisagree: '完全不同意',
        stronglyAgree: '完全同意',
        pleaseSelect: '请先选择一个答案再继续。',
        score: '分数',
        analysisTitle: '您的个人魅力分析',
        overallScore: '您的总分是',
        strengths: '您的优势',
        areasToImprove: '需要改进的方面',
        evaluationText: '这个评估表明您具有',
        levelText: '水平的个人魅力。',
        dimensions: {
            warmth: '温暖',
            competence: '能力',
            emotionalIntelligence: '情商',
            charisma: '魅力',
            authenticity: '真诚'
        },
        ratings: {
            veryHigh: '非常高',
            high: '高',
            medium: '中等',
            developing: '发展中',
            basic: '基础'
        },
        recommendations: {
            warmth: '尝试在互动中表现出更多的同理心和善意。',
            competence: '专注于提高您的技能和可靠性。',
            emotionalIntelligence: '努力提高理解和管理情绪的能力。',
            charisma: '练习更有效地激励他人。',
            authenticity: '努力在行动中保持更多的真实性和一致性。',
            allGood: '继续保持您在各个方面的优势。'
        }
    },
    fr: {
        next: 'Suivant',
        prev: 'Précédent',
        finish: 'Terminer',
        questionCounter: 'Question',
        stronglyDisagree: 'Pas du tout d\'accord',
        stronglyAgree: 'Tout à fait d\'accord',
        pleaseSelect: 'Veuillez sélectionner une réponse avant de continuer.',
        score: 'Score',
        analysisTitle: 'Votre Analyse de Sympathie',
        overallScore: 'Votre score global est de',
        strengths: 'Vos Points Forts',
        areasToImprove: 'Points à Améliorer',
        evaluationText: 'Cette évaluation indique que vous avez un',
        levelText: 'niveau de sympathie.',
        dimensions: {
            warmth: 'Chaleur',
            competence: 'Compétence',
            emotionalIntelligence: 'Intelligence Émotionnelle',
            charisma: 'Charisme',
            authenticity: 'Authenticité'
        },
        ratings: {
            veryHigh: 'très élevé',
            high: 'élevé',
            medium: 'moyen',
            developing: 'en développement',
            basic: 'basique'
        },
        recommendations: {
            warmth: 'Essayez de montrer plus d\'empathie et de gentillesse dans vos interactions.',
            competence: 'Concentrez-vous sur l\'amélioration de vos compétences et de votre fiabilité.',
            emotionalIntelligence: 'Travaillez à mieux comprendre et gérer les émotions.',
            charisma: 'Pratiquez des façons plus efficaces d\'inspirer les autres.',
            authenticity: 'Efforcez-vous d\'être plus authentique et cohérent.',
            allGood: 'Continuez à maintenir vos points forts dans toutes les dimensions.'
        }
    },
    de: {
        next: 'Weiter',
        prev: 'Zurück',
        finish: 'Fertig',
        questionCounter: 'Frage',
        stronglyDisagree: 'Stimme überhaupt nicht zu',
        stronglyAgree: 'Stimme voll zu',
        pleaseSelect: 'Bitte wählen Sie eine Antwort aus, bevor Sie fortfahren.',
        score: 'Punktzahl',
        analysisTitle: 'Ihre Sympathie-Analyse',
        overallScore: 'Ihre Gesamtpunktzahl ist',
        strengths: 'Ihre Stärken',
        areasToImprove: 'Verbesserungsbereiche',
        evaluationText: 'Diese Auswertung zeigt, dass Sie ein',
        levelText: 'Niveau an Sympathie haben.',
        dimensions: {
            warmth: 'Wärme',
            competence: 'Kompetenz',
            emotionalIntelligence: 'Emotionale Intelligenz',
            charisma: 'Charisma',
            authenticity: 'Authentizität'
        },
        ratings: {
            veryHigh: 'sehr hohes',
            high: 'hohes',
            medium: 'mittleres',
            developing: 'sich entwickelndes',
            basic: 'grundlegendes'
        },
        recommendations: {
            warmth: 'Versuchen Sie, mehr Empathie und Freundlichkeit in Ihren Interaktionen zu zeigen.',
            competence: 'Konzentrieren Sie sich darauf, Ihre Fähigkeiten und Zuverlässigkeit zu verbessern.',
            emotionalIntelligence: 'Arbeiten Sie daran, Emotionen besser zu verstehen und zu handhaben.',
            charisma: 'Üben Sie, andere effektiver zu inspirieren.',
            authenticity: 'Bemühen Sie sich um mehr Authentizität und Konsistenz.',
            allGood: 'Behalten Sie Ihre Stärken in allen Dimensionen bei.'
        }
    },
    es: {
        next: 'Siguiente',
        prev: 'Anterior',
        finish: 'Finalizar',
        questionCounter: 'Pregunta',
        stronglyDisagree: 'Muy en desacuerdo',
        stronglyAgree: 'Muy de acuerdo',
        pleaseSelect: 'Por favor selecciona una respuesta antes de continuar.',
        score: 'Puntuación',
        analysisTitle: 'Tu Análisis de Simpatía',
        overallScore: 'Tu puntuación general es',
        strengths: 'Tus Fortalezas',
        areasToImprove: 'Áreas para Mejorar',
        evaluationText: 'Esta evaluación indica que tienes un',
        levelText: 'nivel de simpatía.',
        dimensions: {
            warmth: 'Calidez',
            competence: 'Competencia',
            emotionalIntelligence: 'Inteligencia Emocional',
            charisma: 'Carisma',
            authenticity: 'Autenticidad'
        },
        ratings: {
            veryHigh: 'muy alto',
            high: 'alto',
            medium: 'medio',
            developing: 'en desarrollo',
            basic: 'básico'
        },
        recommendations: {
            warmth: 'Intenta mostrar más empatía y amabilidad en tus interacciones.',
            competence: 'Enfócate en mejorar tus habilidades y confiabilidad.',
            emotionalIntelligence: 'Trabaja en entender y manejar mejor las emociones.',
            charisma: 'Practica formas más efectivas de inspirar a otros.',
            authenticity: 'Esfuérzate por ser más auténtico y consistente.',
            allGood: 'Continúa manteniendo tus fortalezas en todas las dimensiones.'
        }
    }
};

// Get translations and questions for current language
const t = translations[userLang] || translations.en;

// Core functions
function showQuestion(index) {
    if (index >= 0 && index < questions.length) {
        document.getElementById('current-question').textContent = questions[index];
        document.getElementById('question-counter').textContent = `${t.questionCounter} ${index + 1}/${questions.length}`;
        document.getElementById('progress').style.width = `${((index + 1) / questions.length) * 100}%`;
        
        const radioButtons = document.querySelectorAll('input[name="answer"]');
        radioButtons.forEach(radio => {
            radio.checked = radio.value === answers[index].toString();
        });
        
        document.getElementById('prev-btn').disabled = index === 0;
        document.getElementById('next-btn').textContent = index === questions.length - 1 ? t.finish : t.next;
    }
}

function calculateResults() {
    const dimensionScores = {
        warmth: calculateDimensionAverage(0, 4),
        competence: calculateDimensionAverage(5, 9),
        emotionalIntelligence: calculateDimensionAverage(10, 14),
        charisma: calculateDimensionAverage(15, 19),
        authenticity: calculateDimensionAverage(20, 24)
    };

    document.getElementById('test-container').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');

    drawPentagonChart(dimensionScores);
    displayDimensionScores(dimensionScores);
    displayExplanation(dimensionScores);
}

function calculateDimensionAverage(start, end) {
    const dimensionAnswers = answers.slice(start, end + 1);
    return dimensionAnswers.reduce((a, b) => a + b, 0) / dimensionAnswers.length;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize first question
    showQuestion(0);
    
    // Add radio button listeners
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', () => {
            answers[currentQuestion] = parseInt(radio.value);
        });
    });

    // Add navigation button listeners
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            calculateResults();
        }
    });

    // Add retest button listener
    document.getElementById('retest-btn').addEventListener('click', function() {
        answers = new Array(25).fill(3);
        currentQuestion = 0;
        
        document.getElementById('progress').style.width = '4%';
        document.getElementById('question-counter').textContent = `${t.questionCounter} 1/25`;
        document.getElementById('next-btn').textContent = t.next;
        document.getElementById('prev-btn').disabled = true;
        
        document.getElementById('results-section').classList.add('hidden');
        document.getElementById('test-container').classList.remove('hidden');
        
        showQuestion(0);
        
        document.querySelectorAll('input[name="answer"]').forEach(radio => {
            radio.checked = radio.value === '3';
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function drawPentagonChart(scores) {
    const canvas = document.getElementById('pentagon-chart');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 50;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pentagon background
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#ddd';
    ctx.stroke();

    // Draw score pentagon
    const scoreValues = Object.values(scores);
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
        const score = scoreValues[i] / 5; // Normalize to 0-1
        const x = centerX + radius * score * Math.cos(angle);
        const y = centerY + radius * score * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(39, 174, 96, 0.2)';
    ctx.fill();
    ctx.strokeStyle = '#27ae60';
    ctx.stroke();

    // Draw labels using translations
    const labels = [
        t.dimensions.warmth,
        t.dimensions.competence,
        t.dimensions.emotionalIntelligence,
        t.dimensions.charisma,
        t.dimensions.authenticity
    ];
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
        const x = centerX + (radius + 30) * Math.cos(angle);
        const y = centerY + (radius + 30) * Math.sin(angle);
        ctx.fillText(labels[i], x, y);
    }
}

function displayDimensionScores(scores) {
    const dimensionScores = document.getElementById('dimension-scores');
    dimensionScores.innerHTML = '';

    const dimensions = {
        warmth: t.dimensions.warmth,
        competence: t.dimensions.competence,
        emotionalIntelligence: t.dimensions.emotionalIntelligence,
        charisma: t.dimensions.charisma,
        authenticity: t.dimensions.authenticity
    };

    for (const [key, label] of Object.entries(dimensions)) {
        const score = scores[key];
        const div = document.createElement('div');
        div.className = 'dimension-score';
        div.innerHTML = `
            <h3>${label}</h3>
            <p>${t.score}: ${score}/5</p>
        `;
        dimensionScores.appendChild(div);
    }
}

function displayExplanation(scores) {
    const explanation = document.getElementById('result-explanation');
    const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / 5;
    
    let strengthsText = '';
    let areasForImprovement = '';
    
    const dimensions = {
        warmth: t.dimensions.warmth,
        competence: t.dimensions.competence,
        emotionalIntelligence: t.dimensions.emotionalIntelligence,
        charisma: t.dimensions.charisma,
        authenticity: t.dimensions.authenticity
    };
    
    for (const [key, label] of Object.entries(dimensions)) {
        if (scores[key] >= 4) {
            strengthsText += `${label}, `;
        } else if (scores[key] <= 3) {
            areasForImprovement += `${label}, `;
        }
    }

    // Remove trailing commas
    strengthsText = strengthsText.replace(/, $/, '');
    areasForImprovement = areasForImprovement.replace(/, $/, '');

    explanation.innerHTML = `
        <h3>${t.analysisTitle}</h3>
        <p>${t.overallScore} ${averageScore.toFixed(1)}/5.</p>
        ${strengthsText ? `<p><strong>${t.strengths}:</strong> ${strengthsText}</p>` : ''}
        ${areasForImprovement ? `<p><strong>${t.areasToImprove}:</strong> ${areasForImprovement}</p>` : ''}
        <p>${t.evaluationText} ${getOverallRating(averageScore)} ${t.levelText}
        ${getRecommendations(scores)}</p>
    `;
}

function getOverallRating(score) {
    if (score >= 4.5) return t.ratings.veryHigh;
    if (score >= 4) return t.ratings.high;
    if (score >= 3) return t.ratings.medium;
    if (score >= 2) return t.ratings.developing;
    return t.ratings.basic;
}

function getRecommendations(scores) {
    let recommendations = '';
    
    if (scores.warmth <= 3) {
        recommendations += t.recommendations.warmth + ' ';
    }
    if (scores.competence <= 3) {
        recommendations += t.recommendations.competence + ' ';
    }
    if (scores.emotionalIntelligence <= 3) {
        recommendations += t.recommendations.emotionalIntelligence + ' ';
    }
    if (scores.charisma <= 3) {
        recommendations += t.recommendations.charisma + ' ';
    }
    if (scores.authenticity <= 3) {
        recommendations += t.recommendations.authenticity + ' ';
    }

    return recommendations || t.recommendations.allGood;
}

