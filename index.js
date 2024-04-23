document.addEventListener('DOMContentLoaded', ()=>{
    const recognition = new webkitSpeechRecognition() || new SpeechRecognitionAlternative();
    const languageSelect = document.getElementById('language');
    const resultContainer = document.querySelector('.result p.resultText');
    const startLinseningBtn = document.querySelector('.btn.record');
    const recordButtonText = document.querySelector('btn.record p');
    const clearButton = document.querySelector('.btn.clear');
    const downloadButton = document.querySelector('.btn.download');


    let reconizing = false;
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language.code;
        option.text = language.name;
        languageSelect.add(option);
    });

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    languageSelect.addEventListener('change', ()=>{
        recognition.lang = languageSelect.value;
    });

    startLinseningBtn.addEventListener('click', toggleSpeechRecognition);
    clearButton.addEventListener('click', clearResults);
    downloadButton.disabled = true;

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        resultContainer.textContent = result;
        downloadButton.disabled = false;
    };

    recognition.onend = () => {
        reconizing = false;
        startLinseningBtn.classList.remove('recording');
        recordButtonText.textContent = 'Start Listening';
    };

    downloadButton.addEventListener('click', downloadResult);

    function toggleSpeechRecognition(){
        if (reconizing){
            recognition.stop();
        } else {
            recognition.start();
        }

        reconizing = !reconizing;
        startLinseningBtn.classList.toggle('recording', reconizing);
        recordButtonText.textContent = 'Stop Listening';
    }


    function clearResults(){
        resultContainer.textContent = '';
        downloadButton.disabled = true;
    }

    function downloadResult(){
        const resultText = resultContainer.textContent;
        const blob = new Blob([resultText], {type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const b = document.createElement('a');
        b.href = url;
        b.download = 'Your-text.txt';
        b.style.display = 'none';

        document.body.appendChild(b);
        b.click();
        document.body.removeChild(b);
        URL.revokeObjectURL(url);
    }


});