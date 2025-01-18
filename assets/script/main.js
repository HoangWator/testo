const input = document.getElementById('input-field')
const test = document.querySelector('.test')
const quitBtns = document.querySelectorAll('.js-quit-btn')
const testContent = document.querySelector('.test-content')
const questList = document.querySelector('.question-list')
const modalTest = document.querySelector('.js-modal-test')

function getContent(x) {
    for (let i = 0; i < x.length; i++) {
        if (!isNaN(x[i]) && x[i] != ' ') {
            var numInQuestion = x.slice(i, x.indexOf(':'))
            var num = parseInt(numInQuestion)
            break
        }
    }
    var content = x.slice(x.indexOf(':') + 1, x.indexOf('A.')).trim()

    var optionA = x.slice(x.indexOf('A.') + 2, x.indexOf('B.')).trim()
    var optionB = x.slice(x.indexOf('B.') + 2, x.indexOf('C.')).trim()
    var optionC = x.slice(x.indexOf('C.') + 2, x.indexOf('D.')).trim()
    var optionD = x.slice(x.indexOf('D.') + 2, x.length).trim()

    var contents = []

    contents.push(num)
    contents.push(content)
    contents.push('A. '.concat(optionA))
    contents.push('B. '.concat(optionB))
    contents.push('C. '.concat(optionC))
    contents.push('D. '.concat(optionD))

    for (let i = 2; i < 6; i++) {
        if (contents[i].indexOf('/') != -1) {
            contents.push(i - 1)
            contents[i] = contents[i].replace('/', '')
        }
    }

    return contents
}


function divide(str) {
    var indices = []
    var i = 0
    while (i < str.length) {
        var r = str.indexOf('Câu', i) 
        if (r != -1) {
            indices.push(r)
            i = r + 1
        }
        else {
            break
        }
    }

    var questions = []

    for (let j = 0; j < indices.length - 1; j++) {
        var question = str.slice(indices[j], indices[j + 1] - 1)
        questions.push(question)
    }
    questions.push(str.slice(indices[indices.length - 1]))

    return questions
} 

function generateQ(content) {
    var i = content[0]

    const newQ = document.createElement('div')
    newQ.classList.add('question')
    newQ.classList.add(`q${i}`)
    testContent.appendChild(newQ)

    const contentQ = document.createElement('p')
    newQ.appendChild(contentQ)

    const numQ = document.createElement('span')
    numQ.classList.add('question-num')
    numQ.classList.add(`q${i}`)
    numQ.innerHTML = i
    contentQ.appendChild(numQ)

    const textQ = document.createElement('span')
    textQ.classList.add('question-text')
    textQ.classList.add(`q${i}`)
    textQ.innerHTML = content[1]
    contentQ.appendChild(textQ)

    const optionList = document.createElement('form')
    optionList.classList.add('option-list')
    newQ.appendChild(optionList)


    for (let j = 1; j < 5; j++) {
        const inputQ = document.createElement('input')
        inputQ.setAttribute('type', 'radio')
        inputQ.setAttribute('name', 'option')
        inputQ.setAttribute('id', `q${i}-op${j}`)
        inputQ.setAttribute('value', `q${i}-${j}`)
        optionList.append(inputQ)

        const optionQ = document.createElement('label')
        optionQ.classList.add('op')
        optionQ.setAttribute('for', `q${i}-op${j}`)
        optionQ.innerHTML = content[j + 1]
        optionList.appendChild(optionQ)
    }

}

const submitBtn = document.querySelector('.submit-btn')

var keys;
function createTest() {
    if (input.value != "") {
        test.classList.add('show')
        
        var questionList = divide(input.value)

        keys = []
        
        for (let i = 0; i < questionList.length; i++) {
            var question = questionList[i]
            var partsQ = getContent(question)
            generateQ(partsQ)

            keys.push(`q${i + 1}-${partsQ[6]}`)

            const questSquare = document.createElement('div')
            questSquare.classList.add('quest-square')
            questSquare.classList.add(`q${i + 1}-square`)
            questSquare.innerHTML = `${i + 1}`
            questList.appendChild(questSquare)
        }

        for (let i = 0; i < questionList.length; i++) {
            const options = document.querySelectorAll(`.q${i + 1} input[name="option"]`)
            options.forEach(option => {
                option.addEventListener('change', () => {
                    const square = document.querySelector(`.q${i + 1}-square`)
                    square.classList.add('hover')
                })
            })
        }

        quitBtns.forEach(quitBtn => quitBtn.addEventListener('click', function() {
            test.classList.remove('show')
            input.value = ""
            const questions = document.querySelectorAll('.question')
            questions.forEach(question => {
                question.remove()
            })

            const squares = document.querySelectorAll('.quest-square')
            squares.forEach(square => {
                square.classList.remove('hover')
                square.remove()
            })

            modalTest.classList.remove('show')
        }))

    }
    else {
        alert('Please enter you text!')
    }

}

function checkAns() {
    var userAns = []
    var userOptions = document.querySelectorAll('input[name="option"]:checked')
    userOptions.forEach(userOption => {
        userAns.push(userOption.value)        
    })

    var questionNums = document.querySelectorAll('.question').length

    var point = 0
    for (let i = 0; i < questionNums; i++) {
        if (userAns[i] == keys[i]) {
            point += 1
        }
    }

    modalTest.classList.add('show')
    document.querySelector('.modal-test .modal-content p').innerHTML = `${point}/${questionNums}`

}

