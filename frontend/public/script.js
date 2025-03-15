// Main navigation function
function redirectToExam(examType) {
    localStorage.setItem('currentExamType', examType);
    window.location.href = `${examType}.html`;
}

// MCQ exam data
const mcqQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: [
            "Django",
            "Flask",
            "React",
            "Laravel"
        ],
        answer: 2
    },
    {
        question: "Which CSS property is used to control the spacing between elements?",
        options: [
            "space",
            "margin",
            "indent",
            "padding"
        ],
        answer: 1
    },
    {
        question: "Which HTTP method is used to update data on a server?",
        options: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        answer: 2
    },
    {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
            "<script href='script.js'>",
            "<script name='script.js'>",
            "<script src='script.js'>",
            "<script file='script.js'>"
        ],
        answer: 2
    },
    {
        question: "Which property is used to change the font of an element?",
        options: [
            "font-style",
            "font-weight",
            "font-family",
            "font-size"
        ],
        answer: 2
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: [
            "onmouseover",
            "onchange",
            "onclick",
            "onmouseclick"
        ],
        answer: 2
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        options: [
            "var colors = 'red', 'green', 'blue'",
            "var colors = ['red', 'green', 'blue']",
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"
        ],
        answer: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: [
            "text-style",
            "font-size",
            "text-size",
            "font-style"
        ],
        answer: 1
    },
    {
        question: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Application Process Integration",
            "Automated Programming Interface",
            "Application Protocol Interface"
        ],
        answer: 0
    }
];

// Subjective exam data
const subjectiveQuestions = [
    {
        question: "Explain the concept of responsive web design and its importance."
    },
    {
        question: "Describe the difference between synchronous and asynchronous programming in JavaScript."
    },
    {
        question: "Explain the box model in CSS and how it affects layout."
    },
    {
        question: "What are closures in JavaScript and how are they useful?"
    },
    {
        question: "Describe the difference between == and === operators in JavaScript."
    },
    {
        question: "Explain how event bubbling works in DOM manipulation."
    },
    {
        question: "What is REST architecture and why is it important for web development?"
    },
    {
        question: "Explain the concept of CSS specificity and how it affects styling."
    },
    {
        question: "Describe how local storage and session storage work in web browsers."
    },
    {
        question: "What are promises in JavaScript and how do they help manage asynchronous operations?"
    }
];

// Coding exam data
const codingQuestions = [
    {
        question: "Write a function to find the maximum sum subarray of a given array.",
        starterCode: "function maxSubArraySum(arr) {\n  // Your code here\n\n}"
    },
    {
        question: "Implement a function to check if a string is a palindrome.",
        starterCode: "function isPalindrome(str) {\n  // Your code here\n\n}"
    },
    {
        question: "Write a function to reverse a linked list.",
        starterCode: "function reverseLinkedList(head) {\n  // Your code here\n\n}"
    },
    {
        question: "Create a function to find all pairs in an array that sum up to a given target.",
        starterCode: "function findPairs(arr, target) {\n  // Your code here\n\n}"
    },
    {
        question: "Implement a binary search algorithm.",
        starterCode: "function binarySearch(arr, target) {\n  // Your code here\n\n}"
    },
    {
        question: "Write a function to check if a binary tree is balanced.",
        starterCode: "function isBalanced(root) {\n  // Your code here\n\n}"
    },
    {
        question: "Implement a function to find the longest common subsequence of two strings.",
        starterCode: "function longestCommonSubsequence(str1, str2) {\n  // Your code here\n\n}"
    },
    {
        question: "Create a function to implement a queue using two stacks.",
        starterCode: "class QueueUsingStacks {\n  constructor() {\n    // Your code here\n  }\n\n  enqueue(val) {\n    // Your code here\n  }\n\n  dequeue() {\n    // Your code here\n  }\n}"
    },
    {
        question: "Write a function to find the kth smallest element in a binary search tree.",
        starterCode: "function kthSmallest(root, k) {\n  // Your code here\n\n}"
    },
    {
        question: "Implement a function to detect a cycle in a linked list.",
        starterCode: "function hasCycle(head) {\n  // Your code here\n\n}"
    }
];

// Initialization for MCQ exam page
function initMCQExam() {
    let currentQuestion = 0;
    const answers = new Array(mcqQuestions.length).fill(-1);
    
    function loadQuestion(index) {
        const questionElement = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const questionCountElement = document.getElementById('question-count');
        
        // Update question text and count
        questionElement.textContent = mcqQuestions[index].question;
        questionCountElement.textContent = `Question ${index + 1} of ${mcqQuestions.length}`;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add options
        mcqQuestions[index].options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = `option ${answers[index] === i ? 'selected' : ''}`;
            optionElement.textContent = option;
            optionElement.onclick = () => {
                // Remove selected class from all options
                document.querySelectorAll('.option').forEach(el => {
                    el.classList.remove('selected');
                });
                // Add selected class to clicked option
                optionElement.classList.add('selected');
                // Save answer
                answers[index] = i;
            };
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        document.getElementById('prev-btn').disabled = index === 0;
        
        if (index === mcqQuestions.length - 1) {
            document.getElementById('next-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'block';
        } else {
            document.getElementById('next-btn').style.display = 'block';
            document.getElementById('submit-btn').style.display = 'none';
        }
    }
    
    // Event listeners for navigation
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion(currentQuestion);
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestion < mcqQuestions.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
        }
    });
    
    document.getElementById('submit-btn').addEventListener('click', () => {
        // Save answers to localStorage
        localStorage.setItem('mcqAnswers', JSON.stringify(answers));
        // Redirect to submission page
        window.location.href = 'submitted.html';
    });
    
    // Initialize timer
    let timeLeft = 30 * 60; // 30 minutes in seconds
    const timerElement = document.getElementById('timer');
    
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your answers will be submitted.');
            // Save answers and redirect
            localStorage.setItem('mcqAnswers', JSON.stringify(answers));
            window.location.href = 'submitted.html';
        }
        
        timeLeft--;
    }, 1000);
    
    // Load first question
    loadQuestion(currentQuestion);
}

// Initialization for Subjective exam page
function initSubjectiveExam() {
    let currentQuestion = 0;
    const answers = new Array(subjectiveQuestions.length).fill('');
    
    function loadQuestion(index) {
        const questionElement = document.getElementById('question-text');
        const answerTextarea = document.getElementById('answer-textarea');
        const questionCountElement = document.getElementById('question-count');
        
        // Update question text and count
        questionElement.textContent = subjectiveQuestions[index].question;
        questionCountElement.textContent = `Question ${index + 1} of ${subjectiveQuestions.length}`;
        
        // Load saved answer (if any)
        answerTextarea.value = answers[index];
        
        // Update navigation buttons
        document.getElementById('prev-btn').disabled = index === 0;
        
        if (index === subjectiveQuestions.length - 1) {
            document.getElementById('next-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'block';
        } else {
            document.getElementById('next-btn').style.display = 'block';
            document.getElementById('submit-btn').style.display = 'none';
        }
    }
    
    // Save current answer
    function saveCurrentAnswer() {
        const answerTextarea = document.getElementById('answer-textarea');
        answers[currentQuestion] = answerTextarea.value;
    }
    
    // Event listeners for navigation
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuestion > 0) {
            saveCurrentAnswer();
            currentQuestion--;
            loadQuestion(currentQuestion);
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestion < subjectiveQuestions.length - 1) {
            saveCurrentAnswer();
            currentQuestion++;
            loadQuestion(currentQuestion);
        }
    });
    
    document.getElementById('submit-btn').addEventListener('click', () => {
        // Save current answer
        saveCurrentAnswer();
        // Save all answers to localStorage
        localStorage.setItem('subjectiveAnswers', JSON.stringify(answers));
        // Redirect to submission page
        window.location.href = 'submitted.html';
    });
    
    // Initialize timer
    let timeLeft = 60 * 60; // 60 minutes in seconds
    const timerElement = document.getElementById('timer');
    
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your answers will be submitted.');
            // Save answers and redirect
            saveCurrentAnswer();
            localStorage.setItem('subjectiveAnswers', JSON.stringify(answers));
            window.location.href = 'submitted.html';
        }
        
        timeLeft--;
    }, 1000);
    
    // Load first question
    loadQuestion(currentQuestion);
}

// Initialization for Coding exam page
function initCodingExam() {
    let currentQuestion = 0;
    const answers = new Array(codingQuestions.length).fill('');
    
    function loadQuestion(index) {
        const questionElement = document.getElementById('question-text');
        const codeTextarea = document.getElementById('code-area');
        const questionCountElement = document.getElementById('question-count');
        
        // Update question text and count
        questionElement.textContent = codingQuestions[index].question;
        questionCountElement.textContent = `Question ${index + 1} of ${codingQuestions.length}`;
        
        // Load saved answer or starter code
        codeTextarea.value = answers[index] || codingQuestions[index].starterCode;
        
        // Update navigation buttons
        document.getElementById('prev-btn').disabled = index === 0;
        
        if (index === codingQuestions.length - 1) {
            document.getElementById('next-btn').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'block';
        } else {
            document.getElementById('next-btn').style.display = 'block';
            document.getElementById('submit-btn').style.display = 'none';
        }
    }
    
    // Save current answer
    function saveCurrentAnswer() {
        const codeTextarea = document.getElementById('code-area');
        answers[currentQuestion] = codeTextarea.value;
    }
    
    // Event listeners for navigation
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentQuestion > 0) {
            saveCurrentAnswer();
            currentQuestion--;
            loadQuestion(currentQuestion);
        }
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentQuestion < codingQuestions.length - 1) {
            saveCurrentAnswer();
            currentQuestion++;
            loadQuestion(currentQuestion);
        }
    });
    
    document.getElementById('submit-btn').addEventListener('click', () => {
        // Save current answer
        saveCurrentAnswer();
        // Save all answers to localStorage
        localStorage.setItem('codingAnswers', JSON.stringify(answers));
        // Redirect to submission page
        window.location.href = 'submitted.html';
    });
    
    // Initialize timer
    let timeLeft = 90 * 60; // 90 minutes in seconds
    const timerElement = document.getElementById('timer');
    
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your answers will be submitted.');
            // Save answers and redirect
            saveCurrentAnswer();
            localStorage.setItem('codingAnswers', JSON.stringify(answers));
            window.location.href = 'submitted.html';
        }
        
        timeLeft--;
    }, 1000);
    
    // Load first question
    loadQuestion(currentQuestion);
}

// Check for the current page and initialize accordingly
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('mcq.html')) {
        initMCQExam();
    } else if (currentPath.includes('subjective.html')) {
        initSubjectiveExam();
    } else if (currentPath.includes('coding.html')) {
        initCodingExam();
    }
});


// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1) Connect to Socket.IO for ban + examType logic
    window.socket = io("http://localhost:5000");
  
    // We'll store a userId in localStorage, or just a dummy
    const userId = localStorage.getItem("userId") || "dummyBrowserUserId";
    socket.emit("join", { userId, clientType: "browser" });
  
    // Listen for ban
    socket.on("banUser", data => {
      alert("You have been banned. Redirecting to home page...");
      stopMonitoring(() => {
        window.location.href = "mains.html";
      });
    });
  
    // If index.html, auto-handshake with Python
    if (isCurrentPage("mains.html") || window.location.pathname === "/") {
      startHandshake();
    }
  
    // If we're on an exam page, emit the exam type
    if (isCurrentPage("mcq.html")) {
      socket.emit("setExamType", { examType: "mcq" });
    } else if (isCurrentPage("subjective.html")) {
      socket.emit("setExamType", { examType: "subjective" });
    } else if (isCurrentPage("coding.html")) {
      socket.emit("setExamType", { examType: "coding" });
    }
  
    // If submitted.html, auto-redirect after 3s, stopping monitoring
    if (isCurrentPage("submitted.html")) {
      let countdown = 3;
      const cdEl = document.getElementById("countdown");
      const timer = setInterval(() => {
        countdown--;
        if (cdEl) cdEl.textContent = countdown;
        if (countdown <= 0) {
          clearInterval(timer);
          window.location.href = "mains.html";
        }
      }, 1000);
  
      stopMonitoring();
    }
  });
  
  // ============= HELPER FUNCTIONS =============
  
  function isCurrentPage(filename) {
    return window.location.pathname.endsWith(filename);
  }
  
  // Start handshake with Python
  function startHandshake() {
    fetch("http://localhost:4567/handshake", { mode: "cors" })
      .then(res => res.json())
      .then(data => {
        if (data.handshake === "ok") {
          console.log("✅ Handshake successful! Monitoring started.");
        } else {
          console.log("❌ Handshake failed or app not running.");
        }
      })
      .catch(err => {
        console.error("Handshake error:", err);
      });
  }
  
  // Stop monitoring by calling /stopMonitoring
  function stopMonitoring(cb) {
    fetch("http://localhost:4567/stopMonitoring")
      .then(() => {
        console.log("✅ Monitoring stopped (Python side).");
        if (cb) cb();
      })
      .catch(err => {
        console.error("Error stopping monitoring:", err);
        if (cb) cb();
      });
  }
  
  function redirectToExam(examType) {
    localStorage.setItem("currentExamType", examType);
    if (examType === 'mcq') {
      window.location.href = 'mcq.html';
    } else if (examType === 'subjective') {
      window.location.href = 'subjective.html';
    } else if (examType === 'coding') {
      window.location.href = 'coding.html';
    }
  }
  
  function submitExam() {
    // Some final logic for storing answers
    window.location.href = 'submitted.html';
  }
  