let minSyllable = ""
let maxSyllable = ""
let wordCount = ""
const minSyllableField = document.getElementById("min-syllable-count")
const maxSyllableField = document.getElementById("max-syllable-count")
const wordCountField = document.getElementById("word-count")
const vowels = ["a", "e", "i", "o", "u"]
const consonants = ["b", "d", "f", "g", "j", "k", "m", "n", "p", "r", "s", "t", "z", "ch", "sh", "ts"]
const soundsToExclude = ["da", "ru", "ra", "gu", "ma", "sa", "tu", "ti", "te", "rim", "bim", "mos", "res",
 "eru", "oru", "bam", "zu", "piu", "pie", "su", "du", "pam", "nue", "foru", "tum", "ne", "ni", "no", "nu",
"pa", "pi", "pe", "fa", "fi", "fe", "n"]
let newWord = ""
let newWords = []
let syllableCount = 0
const container = document.querySelector(".container")
let wordsTable = document.getElementById("words-table")
let soundsByLength = []
let possibleSyllables = []
let numberOfPossibilities = 0

consonants.forEach( consonant => {
    vowels.forEach( vowel => {
        const syllable = consonant.concat(vowel)
        possibleSyllables.push(syllable)
    })
})

/*
soundsToExclude.forEach( sound => {
    soundArrayed = sound.split("")
    soundLength = soundArrayed.length
    //If there's not already something at index of sound length we create an array for it
    //This will regroup all the sounds by their length
    if (!soundsByLength[soundLength]) {
        soundsByLength[soundLength] = []
    }
    soundsByLength[soundLength].push(sound)
})
*/
function validateWordStructure(word) {
    let isValid = false
    //THIS WILL ONLY WORK IF THE MAXIMUM SIZE IN CHARACTERS FOR A CONSONANT OR VOWEL IS 2 !!!
    const wordArrayed = word.split("")

    /*
    //We validate that the word follows the (V)CVCV... structure by removing
    for(i = soundsByLength.length -1; i > 0; i--) {
        soundsByLength[i].forEach( sound => {
            let wordArrayed = word.split("")

            //We split the words in chunks of letters by the length of the sound
            for (y = 0; y < wordArrayed.length; y++) {
                console.log(wordArrayed)
            }
    
        })
    }
  */
    return isValid
}


function generateWord(max, min, count) {  
    let stop = false

    while (!stop) {
        for (i = 0; i < count; i++) {
            //Randomize the number of syllables
            const syllableCount = Math.round(Math.random() * (max - min) + min)
            newWord = ""
            for (y = 0; y < syllableCount; y++) {

                //Decide if whether or not we should add an additional vowel
                let randomNumber = Math.random() * 4
            
                if (randomNumber <= 1 && y < syllableCount) {
                    //We generate a random number
                    randomNumber = Math.floor(Math.random() * vowels.length)
                    //If it's not the start of the word
                    if (newWord.length > 0) {
                        let vowelIsDifferent = false
                        newWordArrayed = newWord.split("")
                        //We check if the previous vowel is different 
                        //(since double letters are impossible in Lorinin)
                        while(!vowelIsDifferent) {
                            //If the vowel are different, we generate a new number
                            if (newWordArrayed[newWordArrayed.length - 1] === vowels[randomNumber]) {
                                randomNumber = Math.floor(Math.random() * vowels.length)                  
                            //Else we stop the loop
                            } else {
                                vowelIsDifferent = true
                            }
                            
                        }
                    }    
                    //We add the vowel to the word and increase 
                    newWord = newWord.concat(vowels[randomNumber])   
                    y ++
                } 
                
                //If it's not the last loop
                if (y < syllableCount) {
                    //Adds a random syllable
                    randomNumber = Math.floor(Math.random() * possibleSyllables.length)
                    newWord = newWord.concat(possibleSyllables[randomNumber])
                }              
            }  

            let wordIsValid = true

            soundsToExclude.forEach( sound => {
                if (newWord.endsWith(sound)) {
                    wordIsValid = false
                }
            })

            const structureIsValid = validateWordStructure(newWord)
            

            //If the new word has already been generated we generate a new one else we push the word
            //into the array
            if (!newWords.includes(newWord) && wordIsValid) {
                newWords.push(newWord)
            } else {
                i --
            }  

            //If we have a complete array, we stop looping
            if (newWords.length >= count) {
                stop = true  
            }
                
        }
       
    }
    
}

function calculatePossibilities(min, max) {  
    let possibilities = 0
    let vcvcvPossibilities = 1     
    let cvcvPossibilities = 1
    let vcvvvcvvvPossibilities = 1
    let cvvcvvPossibilities = 1

    for (let i = min; i <= max; i++) {
        //Check the VCVVCVV format
        //Check the VCVCV format 
        
        //Check the format CVCV      
        //Check the CVVCVV format
    }

}

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        //If the table is already filled, we empty it
        if (wordsTable.children.length !== 0) {
            //MAYBE WORK ON THIS EVENTUALLY
        }
        //Make sure that number entered are actual numbers, if not give a default value
        //(DOESNT SEEM TO WORK -_-)
        if (isNaN(minSyllableField.value || !minSyllableField.value)) {
            minSyllable = 1
        } else {
            minSyllable = parseInt(minSyllableField.value, 10)
        }

        if (isNaN(maxSyllableField.value || !maxSyllableField.value)) {
            maxSyllable = 1
        } else {
            maxSyllable = parseInt(maxSyllableField.value, 10)
        }

        if (isNaN(wordCountField.value || !wordCountField.value)) {
            wordCount = 1
        } else {
            wordCount = parseInt(wordCountField.value, 10)
        }
        //We generate the words
        generateWord(maxSyllable, minSyllable, wordCount)
        
        let counter = 0
        let newRow = document.createElement("tr")
        //We create the table
        newWords.forEach( word => {
            if (counter % 5 === 0) {
                wordsTable.appendChild(newRow)
                newRow = document.createElement("tr")
                counter = 0
            }     
            newTd = document.createElement("td") 
            newText = document.createTextNode(word)
            newTd.appendChild(newText)
            newRow.appendChild(newTd)

            counter ++
        })
        wordsTable.appendChild(newRow)
    }
})