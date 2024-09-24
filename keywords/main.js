        // Top 3 random keywords
        
        
        

        // Wordcloud
        const wordCloudTitle = document.getElementById('wordCloudTitle');
        const wordCloud = document.getElementById('wordCloud');
        wordCloud.style.display = 'block';
        const tooltip = document.getElementById('tooltip');
        wordCloudTitle.addEventListener('click', () => {
            if (wordCloud.style.display === 'block' || wordCloud.style.display === '') {
                wordCloud.style.display = 'none';
                wordCloudTitle.innerHTML = `<h3><i class="fa fa-plus-circle"></i> Keywords</h3>`
            } else {
                wordCloud.style.display = 'block';
                wordCloudTitle.innerHTML = `<h3><i class="fa fa-minus-circle"></i> Keywords</h3>`
            }
        });
        //const reverseWords = words.slice().reverse();
        renderCloudWords(words);

        // Top 3 random
        const wordCloudTitleRandom = document.getElementById('word-container-shuffle-title');
        const wordCloudRandom = document.getElementById('word-container-shuffle');
        wordCloudRandom.style.display = 'flex';
        wordCloudTitleRandom.addEventListener('click', () => {
            console.log("click")
            if (wordCloudRandom.style.display === 'flex' || wordCloudRandom.style.display === '') {
                wordCloudRandom.style.display = 'none';
                wordCloudTitleRandom.innerHTML = `<h3><i class="fa fa-plus-circle"></i> 3 random keywords</h3><button onclick="refreshPage()">Refresh</button>`
            } else {
                wordCloudRandom.style.display = 'flex';
                wordCloudTitleRandom.innerHTML = `<h3><i class="fa fa-minus-circle"></i> 3 random keywords</h3><button onclick="refreshPage()">Refresh</button>`
            }
        });
        const shuffledWords = shuffleArray(words);
        renderShuffleWords(shuffledWords);
        

        // Alphabetical order
        const tableTitle = document.getElementById('tableTitle');
        const tableWord = document.getElementById('word-container');
        tableWord.style.display = 'flex';
        tableTitle.addEventListener('click', () => {
            console.log("click")
            if (tableWord.style.display === 'flex' || tableWord.style.display === '') {
                tableWord.style.display = 'none';
                tableTitle.innerHTML = `<h3><i class="fa fa-plus-circle"></i> Table</h3>`
            } else {
                tableWord.style.display = 'flex';
                tableTitle.innerHTML = `<h3><i class="fa fa-minus-circle"></i> Table</h3>`
            }
        });
        const alphaWords = words.sort((a, b) => a.text.localeCompare(b.text));
        const groupedWords = groupWordsByLetter(alphaWords);
        renderWords(groupedWords);
