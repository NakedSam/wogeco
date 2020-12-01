const wordToValidateField = document.getElementById("word-to-validate")
const resultDiv = document.querySelector(".result")
const soundsToExclude = ["da", "ru", "ra", "gu", "ma", "sa", "tu", "ti", "te", "rim", "bim", "mos", "res",
"eru", "oru", "bam", "zu", "piu", "pie", "su", "du", "pam", "nue", "tum", "ne", "ni", "no", "nu",
"pa", "pi", "pe", "fa", "fi", "fe", "b", "d", "f", "g", "sh", "ch", "j", "k", "p", "r", "t", "v", "z", "n", 
"sem"]
let wordToValidate = ""
const excludedLetters = ["c", "l", "q", "x", "y", "w"]
let file = ""
const vowels = ["a", "e", "i", "o", "u"]
const consonants = ["b", "d", "f", "g", "j", "k", "m", "n", "p", "r", "s", "t", "z", "ch", "sh", "ts"]
let newWords = []
const wordsTable = document.getElementById("words-table")
let linesArray = []
let definitionsFile = ""
let possibleSyllables = []
let longestSyllableBlockLength = 0

//We starts by adding every vowels to the array
vowels.forEach( vowel => {
    possibleSyllables.push(vowel)
})

//Then CV format
//B A E
consonants.forEach( consonant => {
    vowels.forEach( vowel => {
        let currentSyllable = consonant.concat(vowel)
        possibleSyllables.push(currentSyllable)
        //Then CVV Format
        //E
        vowels.forEach( vowelTwo => {
            const initialCurrentSyllable = currentSyllable
            //If the word doesnt end with the same vowel
            if (!initialCurrentSyllable.endsWith(vowelTwo)) {
                const syllableToAdd = initialCurrentSyllable.concat(vowelTwo)
                possibleSyllables.push(syllableToAdd)
                //Establish the longest block of letters' length
                if (syllableToAdd.length > longestSyllableBlockLength) {
                    longestSyllableBlockLength = syllableToAdd.length
                }
            }
        })
    })
})

function validateStructure(word) {
    let isValid = true
    let counter = 0
    let stop = false
    let isStartingWithVowel = false

    while(!stop) {
        //If the word starts with a vowel, we end the loop
        if (word.startsWith(vowels[counter])) {
            stop = true
            isStartingWithVowel = true
        }
        //If the loop has not been stopped, we check if it's the end of the loop     
        if (!stop) {
            //If it's the last loop, we end the loop
            if (counter === vowels.length - 1) {
                stop = true
            } else {
                counter ++ 
            }            
        }   
    }

    counter = 0
    wordArrayed = word.split("")
    let lastChar = ""
    stop = false
    //We test for no repeating letter
    while(!stop) {
        if (counter === 0) {
            lastChar = wordArrayed[0]
        //If it's not the end of the loop
        } else if (counter < wordArrayed.length) {
            //If two characters are the same in a row, we exit the word and invalidates it
            if (lastChar === wordArrayed[counter]) {
                stop = true
                isValid = false
            } else {
                lastChar = wordArrayed[counter]
            }       
        //Else (End of the loop), we stop the loop
        } else {
            stop = true
        }
       
        counter ++
    }

    counter = 0

    //If the word is still valid we keep going
    if (isValid) {
        //TODO REWRITE THIS VALIDATION
        //We validate the pattern by replacing matching sequences from a word by a star
        for (let i = longestSyllableBlockLength; i >= 0; i--) {
            possibleSyllables.forEach( syllable => {
                //So if the syllable has the same length as i (Loop goes from longest to shortest block)
                //and the word contains the syllable, we replace it by asterisks
                if (syllable.length === i && word.includes(syllable)) {
                    word = word.replace(syllable, "*")
                }
            })
        }     
        //We check if the word follow the (v)cv(v)cv(v) pattern
        //First if the word was starting with a vowel we remove the first character of the word
        /*
        if (isStartingWithVowel) {
            wordArrayed.shift()
        } else {
            //HARD CODED TO SUPPORT VOWELS OF 1 IN LENGTH AND CONSONANTS UP TO 3
            /*
            if (wordArrayed.length < 4) {
                const wordArrayedJoined = wordArrayed.join("")
                wordArrayed = []
                wordArrayed[0] = wordArrayedJoined
            }
            
        }
        */

        //We check if the wordArrayed is 1 of length (Meaning less than four characters) or not

    }

    return isValid
}

function validateWord(word) { 
    let isInvalid = false
    let soundIsInvalid = false
    let isContainingExcludedLetter = false
    let isEndingWithVowel = false
    let structureIsValid = false

    soundsToExclude.forEach( sound => {
        if (word.endsWith(sound)) {
            soundIsInvalid = true
        }
    })

    excludedLetters.forEach( letter => {
        if (word.includes(letter)) {            
            isContainingExcludedLetter = true
        }
    })

    vowels.forEach( vowel => {
        if (word.endsWith(vowel)) {
            isEndingWithVowel = true
        }
    })

    structureIsValid = validateStructure(word)

    if (soundIsInvalid || 
    isContainingExcludedLetter || 
    !isEndingWithVowel || 
    !structureIsValid) {
        isInvalid = true
    }

    return isInvalid
}

function countSyllables(word) {
    let numberOfSyllables = 0
    let wordArrayed = word.split("")

    wordArrayed.forEach( char => {
        if (vowels.includes(char)) {
            numberOfSyllables ++
        }
    })

    return numberOfSyllables
}

function convertToIPA(word) {
    let ipa = ""
    const wordArrayed = word.split("")


    for (let i = 0; i < word.length; i++) {
        if (wordArrayed[i] === "a") {
            if (wordArrayed[i + 1] === "i") {
                ipa = ipa.concat("aj")
                i ++
            } else {
                ipa = ipa.concat("a")
            }
        } else if (wordArrayed[i] === "i") {
            if (wordArrayed[i + 1] === "a") {
                ipa = ipa.concat("ja")
                i ++
            } else if (wordArrayed[i + 1] === "e") {
                ipa = ipa.concat("je")
                i ++
            } else if (wordArrayed[i + 1] === "o") {
                ipa = ipa.concat("jo")
                i ++
            } else if (wordArrayed[i + 1] === "u") {
                ipa = ipa.concat("ju")
                i ++
            } else {
                ipa = ipa.concat("i")
            }
        } else if (wordArrayed[i] === "e") {
            if (wordArrayed[i + 1] === "i") {
                ipa = ipa.concat("ɛj")
                i ++
            } else {
                ipa = ipa.concat("e")
            }
        } else if (wordArrayed[i] === "o") {
            if (wordArrayed[i + 1] === "i") {
                ipa = ipa.concat("oj")
                i ++
            } else {
                ipa = ipa.concat("o")
            }
        } else if (wordArrayed[i] === "u") {
            if (wordArrayed[i + 1] === "a") {
                ipa = ipa.concat("wa")
                i ++
            } else if (wordArrayed[i + 1] === "e") {
                ipa = ipa.concat("wɛ")
                i ++
            } else if (wordArrayed[i + 1] === "i") {
                ipa = ipa.concat("wi")
                i ++
            } else if (wordArrayed[i + 1] === "u") {
                ipa = ipa.concat("wu")
                i ++
            } else {
                ipa = ipa.concat("u")
            }
        } else if (wordArrayed[i] === "j") {
            ipa.concat("dʒ")
        } else if (wordArrayed[i] === "s") {
            if (wordArrayed[i + 1] === "h") {
                ipa = ipa.concat("ʃ")
                i ++
            } else {
                ipa = ipa.concat("s")
            }
        } else if (wordArrayed[i] === "c") {
            if (wordArrayed[i + 1] === "h") {
                ipa = ipa.concat("tʃ")
                i ++
            }
        } else {
            ipa = ipa.concat(wordArrayed[i])
        }
    }

    return ipa
}

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault()

        let isInvalid = false

        wordToValidate = wordToValidateField.value
        isInvalid = validateWord(wordToValidate)
        const ipa = convertToIPA(wordToValidate)

        if (isInvalid) {
            resultDiv.classList.remove("valid")
            resultDiv.classList.add("invalid")
            resultDiv.innerText = "Invalide /" + ipa + "/"
        } else {
            resultDiv.classList.remove("invalid")
            resultDiv.classList.add("valid")
            resultDiv.innerText = "Valide /" + ipa + "/"
        }
    }
})
/*
loadFileButton.addEventListener("click", e => {
    fetch("old_words_list.txt")
    .then(response => {
        return response.text()
    })
    .then( myBlob => {
        file = myBlob
        fetch("definitions.txt")
        .then( response => {
            return response.text()
        })
        .then( myBlob => {
            definitionsFile = myBlob
            fileArrayed = file.split(/\r|\n/)
            definitionsFileArrayed = definitionsFile.split(/\r|\n/)
        
            let lineCounter = 0

            fileArrayed.forEach( line => {
                line = line.trim()
                const uploadedWordIsInvalid = validateWord(line)
                const noOfSyllables = countSyllables(line)
                linesArray[lineCounter] = line
                
        
                if (!uploadedWordIsInvalid) {
                    linesArray[lineCounter] = linesArray[lineCounter].concat("/" + definitionsFileArrayed[lineCounter])
                } else {
                    generateWord(noOfSyllables, noOfSyllables, 25)
        
                    let counter = 0
                    let newRow = document.createElement("tr")
                    let isHeaderWritten = false
                    //We create the table
                    newWords.forEach( word => {
                        if (counter % 5 === 0) {
                            wordsTable.appendChild(newRow)
                            newRow = document.createElement("tr")
                            counter = 0
                        }
                        
                        if (!isHeaderWritten) {
                            newTd = document.createElement("td")
                            newTd.colSpan = "5"
                            text = word + "/" + definitionsFileArrayed[lineCounter]
                            newText = document.createTextNode(text)
                            
                            newTd.appendChild(newText)
                            newRow.appendChild(newTd)
                            wordsTable.appendChild(newRow)
                            newTd = document.createElement("td") 
                            newText = document.createTextNode(word)
                            newTd.appendChild(newText)
                            newRow.appendChild(newTd)
                            isHeaderWritten = true
                        } else {
                            newTd = document.createElement("td") 
                            newText = document.createTextNode(word)
                            newTd.appendChild(newText)
                            newRow.appendChild(newTd)
                        }
        
                        counter ++
                    })
        
                    wordsTable.appendChild(newRow)
                    newWords = []
                    isHeaderWritten = false
                }
        
                
                lineCounter ++
            })
        })
    })
/*
    fetch("definitions.txt")
    .then( response => {
        return response.text()
    })
    .then( myBlob => {
        definitionsFile = myBlob
    })

    fileArrayed = file.split(/\r|\n/)
    definitionsFileArrayed = definitionsFile.split(/\r|\n/)

    let lineCounter = 0

    fileArrayed.forEach( line => {
        line = line.trim()
        const uploadedWordIsInvalid = validateWord(line)
        const noOfSyllables = countSyllables(line)
        linesArray[lineCounter] = line
        

        if (!uploadedWordIsInvalid) {
            linesArray[lineCounter] = linesArray[lineCounter].concat("/" + definitionsFileArrayed[lineCounter])
        } else {
            generateWord(noOfSyllables, noOfSyllables, 25)

            let counter = 0
            let newRow = document.createElement("tr")
            console.log(newRow)
            let isHeaderWritten = false
            //We create the table
            newWords.forEach( word => {
                if (counter % 5 === 0) {
                    wordsTable.appendChild(newRow)
                    newRow = document.createElement("tr")
                    counter = 0
                }
                
                if (!isHeaderWritten) {
                    newTd = document.createElement("td")
                    newTd.colSpan = "5"
                    text = word + "/" + definitionsFileArrayed[lineCounter]
                    newText = document.createTextNode(text)
                    
                    newTd.appendChild(newText)
                    newRow.appendChild(newTd)
                    wordsTable.appendChild(newRow)
                    newTd = document.createElement("td") 
                    newText = document.createTextNode(word)
                    newTd.appendChild(newText)
                    newRow.appendChild(newTd)
                    isHeaderWritten = true
                } else {
                    newTd = document.createElement("td") 
                    newText = document.createTextNode(word)
                    newTd.appendChild(newText)
                    newRow.appendChild(newTd)
                }

                counter ++
            })

            wordsTable.appendChild(newRow)
            newWords = []
            isHeaderWritten = false
        }

        
        lineCounter ++
    })
*/
/*
})
*/
