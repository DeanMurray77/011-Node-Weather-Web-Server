const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent ='Loading Results';
    messageTwo.textContent = '';
    
    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(!data.error) {
                messageOne.textContent = `The forecast for ${data.location}:`;
                messageTwo.textContent = `${data.forecast}`;
            } else {
                messageOne.textContent = data.error;
            }
        })
    })
})