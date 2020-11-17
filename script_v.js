const wordToValidateField = document.getElementById("word-to-validate")
const resultDiv = document.querySelector(".result")
const soundsToExclude = ["da", "ru", "ra", "gu", "ma", "sa", "tu", "ti", "te", "rim", "bim", "mos", "res",
"eru", "oru", "bam", "zu", "piu", "pie", "su", "du", "pam", "nue", "foru", "tum", "ne", "ni", "no", "nu",
"pa", "pi", "pe", "fa", "fi", "fe", "b", "d", "f", "g", "sh", "ch", "j", "k", "p", "r", "t", "v", "z"]
let wordToValidate = ""

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault()
        let isInvalid = false

        wordToValidate = wordToValidateField.value
        soundsToExclude.forEach( sound => {
            if (wordToValidate.endsWith(sound)) {
                isInvalid = true
            }
        })

        if (isInvalid) {
            resultDiv.classList.remove("valid")
            resultDiv.classList.add("invalid")
            resultDiv.innerText = "Invalide"
        } else {
            resultDiv.classList.remove("invalid")
            resultDiv.classList.add("valid")
            resultDiv.innerText = "Valide"
        }
    }
})
