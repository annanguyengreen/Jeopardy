const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const jeopardyCategories = [
    {
        genre: "Fruits/Vegetables",
        questions: [
            {
                question: 'Which fruit is the only one to have seeds on the outside?',
                answers: ['Strawberry', 'Pineapple'],
                correct: 'Strawberry',
                level: 'easy',
            },
            {
                question: 'Potatoes,onions, and carrots are all considered what types of vegetables?',
                answers:['Root Vegetables', 'Avoid sunlight vegetables'],
                correct:'Root Vegetables',
                level:'medium',
            },
            {
                question: 'What is the worlds sweetest fruit?',
                answers:['Mango', 'lychee'],
                correct:'Mango',
                level:'hard',
            },
        ],
    },
    {
        genre: 'Fast Food',
        questions: [
            {
                question: 'What fast food sells Big Mac?',
                answers: ['Burger King', 'Mcdonalds'],
                correct: 'Mcdonalds',
                level: 'easy',
            },
            {
                question: 'KFCs famous slogan',
                answers:['Finger Lickin Good', 'I am lovin it'],
                correct:'Finger Lickin Good',
                level:'medium',
            },
            {
                question: 'Which fast food restaurant is the home of the square hamburger?',
                answers:['Wendys', 'Burger King'],
                correct:'Wendys',
                level:'hard',
            },
        ],
    }, 
    {
        genre: 'Fast Food 2',
        questions: [
            {
                question: 'What fast food sells whopper?',
                answers: ['Burger King', 'Mcdonalds'],
                correct: 'Burger King',
                level: 'easy',
            },
            {
                question: 'Mcdonald famous slogan',
                answers:['Finger Lickin Good', 'I am lovin it'],
                correct:'I am lovin it',
                level:'medium',
            },
            {
                question: 'Which fast food is the most healthiest?',
                answers:['Chopt', 'Chipotle'],
                correct:'Chopt',
                level:'hard',
            },
        ],
    },
    {
        genre: 'Japanese Food',
        questions: [
            {
                question: 'Put raw fish on the white rice',
                answers: ['Ramen', 'Sushi'],
                correct: 'Sushi',
                level: 'easy',
            },
            {
                question: 'Sticky beans will be served with soy sauce, raw eggs and rice',
                answers:['Edameme(green beans)', 'Natto'],
                correct:'Natto',
                level:'medium',
            },
            {
                question: 'A hot soup that represents Japan and sometimes with tofu and kelp',
                answers:['hot and sour soup', 'Miso soup'],
                correct:'Miso soup',
                level:'hard',
            },
        ],
    },
    {
        genre: 'Taiwan Food',
        questions: [
            {
                question: 'Although there is a strong smell, it is one of the unique snacks in Taiwan',
                answers: ['Durian', 'Stinky tofu'],
                correct: 'Stinky tofu',
                level: 'easy',
            },
            {
                question: 'Taiwans most traditional pastry',
                answers:['Pineapple cake', 'Mooncakes'],
                correct:'Pineapple cake',
                level:'medium',
            },
            {
                question: 'What type of tea is use in milk tea?',
                answers:['Oolong tea', 'black tea'],
                correct:'black tea',
                level:'hard',
            },
        ],
    }, 
]

let score = 0

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre;

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (question.level === 'easy') {
            card.innerHTML = 100
        }
        if (question.level === 'medium') {
            card.innerHTML = 200
        }
        if (question.level === 'hard') {
            card.innerHTML = 300
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.getInnerHTML())

        card.addEventListener('click', flipCard)
    })
}
jeopardyCategories.forEach(category => addCategory(category))


function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "12px"
    this.style.lineHeight = "30px"
    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')
    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')
    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))
}

function getResult() {
    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))
    
    const cardOfButton = this.parentElement

    if(cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score = score + parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.LastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
            
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }
    cardOfButton.removeEventListener('click', flipCard)
}

   