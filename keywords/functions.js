// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function highlightKeyword(text, keyword) {
const regex = new RegExp(`(${keyword})`, 'gi'); // Case-insensitive regex
return text.replace(regex, '<span class="highlighted">$1</span>');
}
// Function to sort words and group by their first letter
function groupWordsByLetter(words) {
    const grouped = {};
    words.forEach(word => {
        const firstLetter = word.text.charAt(0).toUpperCase();
        if (!grouped[firstLetter]) {
            grouped[firstLetter] = [];
        }
        grouped[firstLetter].push(word);
    });
    return grouped;
}
function toWords(words) {
    wordsList = [];
    words.forEach(word => {
        wordsList.push(word.text)
    });
    return wordsList
}
// Function to render the grouped words in HTML
function renderWords(groupedWords) {
    const container = document.getElementById('word-container');
    count =0
    for (let letter in groupedWords) {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('column');
        const letterHeader = document.createElement('h2');
        letterHeader.textContent = letter;
        const wordList = document.createElement('ul');
        groupedWords[letter].forEach(word => {
            const listItem = document.createElement('li');
        //listItem.textContent = count+". "+word.text;
        count++;
        listItem.innerHTML = `<div>${count}. ${word.text}</div>
        <div class="phonetic">${word.phonetics}</div>`;
        const details = document.createElement('div');
        details.classList.add('details');
        details.innerHTML = `
        <div class="definition">${word.definition}</div>
        <div class="trans">(${word.translation})</div>
        <div class="context-info">
        <ol>
        <li>${highlightKeyword(word.sentence, word.text)}</li>
        <div class="translation"><i>${highlightKeyword(word.sentenceTranslation, word.text)}</i></div>
        </ol>
        </div>
        `;
        details.style.display = 'none';
        // Append the details to the list item
        listItem.appendChild(details);
    // Add click event to toggle the visibility of the details
    listItem.addEventListener('click', function() {
        if (details.style.display === 'none' || details.style.display === '') {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    });
    wordList.appendChild(listItem);
});
        columnDiv.appendChild(letterHeader);
        columnDiv.appendChild(wordList);
        container.appendChild(columnDiv);
    }
}
// Function to render the grouped words in HTML
function renderShuffleWords(shuffleWords) {
    topWords = shuffleWords.slice(0, 3)
    const keywordContainer = document.getElementById('word-container-shuffle');
    topWords.forEach(word => {
        const keywordBox = document.createElement('div');
        keywordBox.classList.add('keyword-box');
        keywordBox.innerHTML = `
        <div class="keyword-line">${word.text}</div>
        <div class="phonetic">${word.phonetics}</div>
        <div class="definition">${word.definition}</div>
        <div class="trans">(${word.translation})</div>
        <div class="context-info">
        <ol>
        <li>${highlightKeyword(word.sentence, word.text)}</li>
        <div class="translation"><i>${highlightKeyword(word.sentenceTranslation, word.text)}</i></div>
        </ol>
        </div>
        <div class="weight-info"></div>
        `;
        keywordBox.style.display = 'block';
        keywordContainer.appendChild(keywordBox);
    });
}
function renderCloudWords(finalWords){
    finalWords.forEach(word => {
        const span = document.createElement('span');
        span.className = `${word.category} ${word.size}`;
        span.textContent = word.text;
        span.dataset.category = word.category;
        span.dataset.definition = word.definition;
        span.dataset.translation = word.translation;
        span.dataset.sentence = word.sentence;
        span.dataset.sentenceTranslation = word.sentenceTranslation;
        span.dataset.phonetics = word.phonetics;
        wordCloud.appendChild(span);
        // Add click event to cross out the keyword
        span.addEventListener('click', () => {
            span.classList.toggle('crossed-out');
        });
        // Event handlers
        span.addEventListener('mouseover', function(e) {
            tooltip.innerHTML = `
            <div class="phonetic">${span.dataset.phonetics}</div>
            <div class="definition">${span.dataset.definition}</div>
            <div class="trans">(${span.dataset.translation})</div>
            <div class="context-info">
            <ol>
            <li>${highlightKeyword(span.dataset.sentence, span.textContent)}</li>
            <div class="translation"><i>${highlightKeyword(span.dataset.sentenceTranslation, span.textContent)}</i></div>
            </ol>
            </div>
            <div class="weight-info"></div>
            <!--<div class="translation">
            <i><strong>${span.dataset.translation}</strong></i>
            </div>-->
            `;
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.pageX + 30}px`;
            tooltip.style.top = `${e.pageY + 30}px`;
        });
    });
}
// Hide tooltip when clicking outside
document.addEventListener('mouseout', function(event) {
    tooltip.style.display = 'none';
});

function refreshPage() {
    location.reload();
  }