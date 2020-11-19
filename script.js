let minSyllable = ""
let maxSyllable = ""
let wordCount = ""
const minSyllableField = document.getElementById("min-syllable-count")
const maxSyllableField = document.getElementById("max-syllable-count")
const wordCountField = document.getElementById("word-count")
const vowels = ["a", "e", "i", "o", "u"]
const consonants = ["b", "d", "f", "g", "j", "k", "m", "n", "p", "r", "s", "t", "v", "z", "ch", "sh", "ts"]
const soundsToExclude = ["da", "ru", "ra", "gu", "ma", "sa", "tu", "ti", "te", "rim", "bim", "mos", "res",
 "eru", "oru", "bam", "zu", "piu", "pie", "su", "du", "pam", "nue", "foru", "tum", "ne", "ni", "no", "nu",
"pa", "pi", "pe", "fa", "fi", "fe", "n"]
let newWord = ""
let newWords = []
let syllableCount = 0
const container = document.querySelector(".container")
let wordsTable = document.getElementById("words-table")

function generateWord(max, min, count) {  
    let stop = false

    while (!stop) {
        for (i = 0; i < count; i++) {
            //Randomize the number of syllables
            const syllableCount = Math.round(Math.random() * (max - min) + min)
            newWord = ""
            for (y = 0; y < syllableCount; y++) {
                //Decide if whether or not we should start with a vowel or not
                let randomNumber = Math.random() * 2

                if (randomNumber >= 1 && i === 0) {
                    randomNumber = Math.floor(Math.random() * vowels.length)
                    newWord = newWord.concat(vowels[randomNumber])
                    y ++
                } 
                //If it's not the last loop
                if (y < syllableCount && y < syllableCount) {
                    //Add a random consonant to the word then a random vowel
                    randomNumber = Math.floor(Math.random() * consonants.length)
                    newWord = newWord.concat(consonants[randomNumber])
                    randomNumber = Math.floor(Math.random() * vowels.length)
                    newWord = newWord.concat(vowels[randomNumber])
                }              
            }  

            let wordIsValid = true

            soundsToExclude.forEach( sound => {
                if (newWord.endsWith(sound)) {
                    wordIsValid = false
                }
            })

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

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        //If the table is already filled, we empty it
        if (wordsTable.children.length !== 0) {

        }
        //Make sure that number entered are actual numbers, if not give a default value
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