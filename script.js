// ======================
// Enhanced Flashcard Data
// ======================
const flashcardDecks = {
    all: [
        {
            front: "What is the capital of France?",
            back: "Paris",
            category: "Geography",
            note: "France is located in Western Europe",
            difficulty: "easy"
        },
        {
            front: "What is the largest planet in our solar system?",
            back: "Jupiter",
            category: "Science",
            note: "Jupiter's mass is 2.5x that of all other planets combined",
            difficulty: "easy"
        },
        {
            front: "What year was JavaScript created?",
            back: "1995",
            category: "Programming",
            note: "Created by Brendan Eich in just 10 days",
            difficulty: "medium"
        },
        {
            front: "What does HTML stand for?",
            back: "HyperText Markup Language",
            category: "Programming",
            note: "First version created by Tim Berners-Lee in 1991",
            difficulty: "easy"
        },
        {
            front: "Who painted the Mona Lisa?",
            back: "Leonardo da Vinci",
            category: "Art",
            note: "Painted between 1503 and 1519",
            difficulty: "easy"
        },
        {
            front: "What is the chemical symbol for gold?",
            back: "Au",
            category: "Science",
            note: "From Latin 'aurum' meaning 'shining dawn'",
            difficulty: "easy"
        },
        {
            front: "What is React?",
            back: "A JavaScript library for building user interfaces",
            category: "Programming",
            note: "Maintained by Facebook and a community of developers",
            difficulty: "medium"
        },
        {
            front: "What is a closure in JavaScript?",
            back: "A function with access to its lexical scope",
            category: "Programming",
            note: "Closures are created every time a function is created",
            difficulty: "hard"
        },
        {
            front: "What is the Big O notation for binary search?",
            back: "O(log n)",
            category: "Programming",
            note: "Binary search works by repeatedly dividing the search interval in half",
            difficulty: "hard"
        }
    ],
    programming: [
        {
            front: "What is JavaScript?",
            back: "A programming language for the web",
            category: "Programming",
            note: "Not to be confused with Java",
            difficulty: "easy"
        },
        {
            front: "What is a closure?",
            back: "A function with access to its own scope + outer function's scope",
            category: "Programming",
            note: "Important concept in functional programming",
            difficulty: "hard"
        },
        {
            front: "What is CSS Flexbox?",
            back: "A layout model for responsive designs",
            category: "Programming",
            note: "Introduced in CSS3",
            difficulty: "medium"
        },
        {
            front: "What does API stand for?",
            back: "Application Programming Interface",
            category: "Programming",
            note: "Allows different software to communicate",
            difficulty: "medium"
        },
        {
            front: "What is the virtual DOM?",
            back: "A lightweight copy of the real DOM",
            category: "Programming",
            note: "Used by React to optimize updates",
            difficulty: "hard"
        }
    ],
    science: [
        {
            front: "What is the chemical symbol for water?",
            back: "H₂O",
            category: "Science",
            note: "Two hydrogen atoms and one oxygen atom",
            difficulty: "easy"
        },
        {
            front: "What is the powerhouse of the cell?",
            back: "Mitochondria",
            category: "Science",
            note: "Generates most of the cell's ATP",
            difficulty: "easy"
        },
        {
            front: "What is Newton's first law?",
            back: "An object in motion stays in motion",
            category: "Science",
            note: "Also called the law of inertia",
            difficulty: "medium"
        },
        {
            front: "What is photosynthesis?",
            back: "Process plants use to convert light energy to chemical energy",
            category: "Science",
            note: "Produces oxygen as a byproduct",
            difficulty: "medium"
        }
    ],
    geography: [
        {
            front: "What is the longest river in the world?",
            back: "The Nile",
            category: "Geography",
            note: "Approximately 6,650 km long",
            difficulty: "easy"
        },
        {
            front: "What country has the most time zones?",
            back: "France",
            category: "Geography",
            note: "Due to its overseas territories",
            difficulty: "medium"
        },
        {
            front: "What is the capital of Canada?",
            back: "Ottawa",
            category: "Geography",
            note: "Located in the province of Ontario",
            difficulty: "easy"
        },
        {
            front: "Which continent is the most populous?",
            back: "Asia",
            category: "Geography",
            note: "Home to about 60% of the world's population",
            difficulty: "easy"
        }
    ]
};

// ======================
// App State
// ======================
let currentDeck = 'all';
let currentCards = [];
let currentCardIndex = 0;
let knownCards = [];
let streak = 0;
let sessionCount = 0;
let totalCorrect = 0;
let totalReviews = 0;
let studyTime = 0; // in seconds
let isFlipped = false;
let darkMode = false;
let studyTimerInterval;
let startTime;
let settings = {
    flipAnimation: '3d',
    studyTimer: true,
    textToSpeech: false,
    defaultDeck: 'all'
};

// ======================
// DOM Elements
// ======================
const flashcardElement = document.getElementById('flashcard');
const frontContent = document.getElementById('card-front');
const backContent = document.getElementById('card-back');
const cardCategory = document.getElementById('card-category');
const cardNote = document.getElementById('card-note');
const progressFill = document.getElementById('progress-fill');
const cardsRemaining = document.getElementById('cards-remaining');
const masteryPercent = document.getElementById('mastery-percent');
const streakCount = document.getElementById('streak-count');
const knownCount = document.getElementById('known-count');
const sessionCountElement = document.getElementById('session-count');
const retentionRateElement = document.getElementById('retention-rate');
const totalCardsElement = document.getElementById('total-cards');
const studyTimeElement = document.getElementById('study-time');
const knowBtn = document.getElementById('know-btn');
const dontKnowBtn = document.getElementById('dont-know-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const settingsBtn = document.getElementById('settings-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cardPosition = document.getElementById('card-position');
const themeToggle = document.getElementById('theme-toggle');
const fabMenu = document.getElementById('fab-menu');
const deckSelector = document.getElementById('deck-selector');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const saveSettings = document.getElementById('save-settings');
const flipAnimationSelect = document.getElementById('flip-animation');
const studyTimerToggle = document.getElementById('study-timer');
const textToSpeechToggle = document.getElementById('text-to-speech');
const defaultDeckSelect = document.getElementById('default-deck');
const confettiCanvas = document.getElementById('confetti-canvas');

// ======================
// Initialization
// ======================
function init() {
    // Load saved progress and settings
    loadProgress();
    loadSettings();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load the initial deck
    loadDeck(currentDeck);
    
    // Start study timer if enabled
    if (settings.studyTimer) {
        startStudyTimer();
    }
    
    // Update UI
    updateUI();
    
    // Animate elements in sequence
    animateElements();
}

// Set up event listeners
function setupEventListeners() {
    // Card flip
    flashcardElement.addEventListener('click', toggleFlip);
    
    // Know/don't know buttons
    knowBtn.addEventListener('click', () => handleResponse(true));
    dontKnowBtn.addEventListener('click', () => handleResponse(false));
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousCard);
    nextBtn.addEventListener('click', showNextCard);
    
    // Shuffle button
    shuffleBtn.addEventListener('click', shuffleCurrentDeck);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // FAB menu
    fabMenu.addEventListener('click', toggleDeckSelector);
    
    // Deck selection
    document.querySelectorAll('.deck-option').forEach(option => {
        option.addEventListener('click', () => {
            const deck = option.dataset.deck;
            if (deck === 'custom') {
                showNotification("Custom deck creation coming soon!");
                return;
            }
            loadDeck(deck);
            toggleDeckSelector();
            showNotification(`Switched to ${deck === 'all' ? 'all cards' : deck + ' deck'}`);
        });
    });
    
    // Settings
    settingsBtn.addEventListener('click', openSettings);
    closeSettings.addEventListener('click', closeSettingsModal);
    saveSettings.addEventListener('click', saveSettingsHandler);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// ======================
// Core Flashcard Functions
// ======================
// Load a deck of cards
function loadDeck(deck) {
    currentDeck = deck;
    currentCards = [...flashcardDecks[deck]];
    currentCardIndex = 0;
    shuffleArray(currentCards);
    updateCard();
    updateUI();
    
    // Speak the first card if text-to-speech is enabled
    if (settings.textToSpeech) {
        speakCard();
    }
}

// Toggle card flip
function toggleFlip() {
    isFlipped = !isFlipped;
    flashcardElement.classList.toggle('flipped');
    
    // Speak the back content if text-to-speech is enabled and card is flipped
    if (settings.textToSpeech && isFlipped) {
        speakText(currentCards[currentCardIndex].back);
    }
}

// Show previous card
function showPreviousCard() {
    if (isFlipped) {
        flashcardElement.classList.remove('flipped');
        isFlipped = false;
    }
    
    currentCardIndex = (currentCardIndex - 1 + currentCards.length) % currentCards.length;
    updateCard();
    updateUI();
    
    if (settings.textToSpeech) {
        speakCard();
    }
}

// Show next card
function showNextCard() {
    if (isFlipped) {
        flashcardElement.classList.remove('flipped');
        isFlipped = false;
    }
    
    currentCardIndex = (currentCardIndex + 1) % currentCards.length;
    updateCard();
    updateUI();
    
    if (settings.textToSpeech) {
        speakCard();
    }
}

// Shuffle current deck
function shuffleCurrentDeck() {
    shuffleArray(currentCards);
    currentCardIndex = 0;
    updateCard();
    updateUI();
    showNotification("🔀 Deck shuffled!");
    
    if (settings.textToSpeech) {
        speakCard();
    }
}

// Handle user response
function handleResponse(know) {
    const cardId = currentCards[currentCardIndex].front;
    const cardDifficulty = currentCards[currentCardIndex].difficulty;
    
    // Update stats
    sessionCount++;
    totalReviews++;
    if (know) totalCorrect++;
    
    if (know) {
        // Add to known cards if not already there
        if (!knownCards.includes(cardId)) {
            knownCards.push(cardId);
            streak++;
            
            // Celebrate milestones
            if (streak % 5 === 0) {
                triggerConfetti();
                showNotification(`🔥 ${streak}-day streak! Keep going!`);
            }
        }
    } else {
        // Remove from known cards if it was there
        const index = knownCards.indexOf(cardId);
        if (index > -1) {
            knownCards.splice(index, 1);
        }
        streak = 0;
    }
    
    // Save progress
    saveProgress();
    
    // Move to next card (or loop back to start)
    showNextCard();
}

// Update current card display
function updateCard() {
    const card = currentCards[currentCardIndex];
    frontContent.textContent = card.front;
    backContent.textContent = card.back;
    cardCategory.textContent = card.category;
    cardNote.textContent = card.note || '';
    
    // Add difficulty indicator
    const difficultyIcon = card.difficulty === 'easy' ? '⭐' : 
                         card.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐';
    cardCategory.innerHTML = `${card.category} <span class="difficulty-indicator">${difficultyIcon}</span>`;
    
    // Update card position
    cardPosition.textContent = `${currentCardIndex + 1}/${currentCards.length}`;
    
    // Reset card state
    isFlipped = false;
    flashcardElement.classList.remove('flipped');
}

// Update all progress indicators
function updateUI() {
    // Calculate progress
    const knownInDeck = currentCards.filter(card => knownCards.includes(card.front)).length;
    const progress = (knownInDeck / currentCards.length) * 100;
    const retentionRate = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;
    
    // Update progress bar
    progressFill.style.width = `${progress}%`;
    
    // Change progress bar color based on mastery
    if (progress >= 80) {
        progressFill.style.background = 'linear-gradient(90deg, var(--success), var(--success-dark))';
    } else if (progress >= 50) {
        progressFill.style.background = 'linear-gradient(90deg, var(--primary), var(--primary-dark))';
    } else {
        progressFill.style.background = 'linear-gradient(90deg, var(--danger), var(--danger-dark))';
    }
    
    // Update text displays
    cardsRemaining.textContent = `${currentCardIndex + 1}/${currentCards.length}`;
    masteryPercent.textContent = `${Math.round(progress)}% Mastery`;
    streakCount.textContent = `${streak} day streak`;
    knownCount.textContent = `${knownInDeck} mastered`;
    sessionCountElement.textContent = sessionCount;
    retentionRateElement.textContent = `${retentionRate}%`;
    totalCardsElement.textContent = currentCards.length;
    
    // Format study time
    const minutes = Math.floor(studyTime / 60);
    const seconds = studyTime % 60;
    studyTimeElement.textContent = `${minutes}m ${seconds}s`;
}

// ======================
// Settings Functions
// ======================
function openSettings() {
    settingsModal.classList.add('show');
}

function closeSettingsModal() {
    settingsModal.classList.remove('show');
}

function saveSettingsHandler() {
    settings.flipAnimation = flipAnimationSelect.value;
    settings.studyTimer = studyTimerToggle.checked;
    settings.textToSpeech = textToSpeechToggle.checked;
    settings.defaultDeck = defaultDeckSelect.value;
    
    // Apply changes
    if (settings.studyTimer && !studyTimerInterval) {
        startStudyTimer();
    } else if (!settings.studyTimer && studyTimerInterval) {
        clearInterval(studyTimerInterval);
        studyTimerInterval = null;
    }
    
    // Save to localStorage
    localStorage.setItem('flashcardSettings', JSON.stringify(settings));
    
    showNotification("Settings saved successfully!");
    closeSettingsModal();
}

function loadSettings() {
    const savedSettings = localStorage.getItem('flashcardSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
        
        // Update UI to reflect settings
        flipAnimationSelect.value = settings.flipAnimation;
        studyTimerToggle.checked = settings.studyTimer;
        textToSpeechToggle.checked = settings.textToSpeech;
        defaultDeckSelect.value = settings.defaultDeck;
        
        // Set current deck from settings
        currentDeck = settings.defaultDeck;
    }
}

// ======================
// Study Timer
// ======================
function startStudyTimer() {
    startTime = new Date();
    studyTimerInterval = setInterval(() => {
        studyTime = Math.floor((new Date() - startTime) / 1000);
        updateUI();
    }, 1000);
}

// ======================
// Text-to-Speech
// ======================
function speakCard() {
    if (!settings.textToSpeech) return;
    
    const card = currentCards[currentCardIndex];
    const text = isFlipped ? card.back : card.front;
    speakText(text);
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

// ======================
// Progress Management
// ======================
function loadProgress() {
    const savedProgress = localStorage.getItem('flashcardProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        knownCards = progress.knownCards || [];
        streak = progress.streak || 0;
        sessionCount = progress.sessionCount || 0;
        totalCorrect = progress.totalCorrect || 0;
        totalReviews = progress.totalReviews || 0;
        studyTime = progress.studyTime || 0;
        darkMode = progress.darkMode || false;
        
        // Apply dark mode if enabled
        if (darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

function saveProgress() {
    localStorage.setItem('flashcardProgress', JSON.stringify({
        knownCards,
        streak,
        sessionCount,
        totalCorrect,
        totalReviews,
        studyTime,
        darkMode,
        lastReview: new Date().toISOString()
    }));
}

// ======================
// UI Effects
// ======================
function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    saveProgress();
}

function toggleDeckSelector() {
    deckSelector.classList.toggle('show');
    fabMenu.innerHTML = deckSelector.classList.contains('show') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-ellipsis-h"></i>';
}

function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function triggerConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    if (window.confetti) {
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#6c5ce7', '#5649c0', '#a29bfe', '#00b894', '#d63031', '#fdcb6e'],
            shapes: ['circle', 'square'],
            scalar: 1.2
        });
    }
}

function animateElements() {
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach((el, i) => {
        el.style.animationDelay = `${i * 0.1 + 0.1}s`;
    });
}

// ======================
// Utility Functions
// ======================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleKeyPress(e) {
    switch (e.key) {
        case ' ':
        case 'Enter':
            e.preventDefault();
            toggleFlip();
            break;
        case 'ArrowRight':
            nextBtn.click();
            break;
        case 'ArrowLeft':
            prevBtn.click();
            break;
        case 'Escape':
            if (deckSelector.classList.contains('show')) {
                toggleDeckSelector();
            }
            if (settingsModal.classList.contains('show')) {
                closeSettingsModal();
            }
            break;
    }
}

// ======================
// Initialize the app
// ======================
window.onload = function() {
    // Load confetti library dynamically
    const confettiScript = document.createElement('script');
    confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    confettiScript.onload = () => { window.confetti = window.confetti || confetti; };
    document.head.appendChild(confettiScript);
    
    // Initialize the app
    init();
};