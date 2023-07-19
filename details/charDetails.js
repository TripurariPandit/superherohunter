(function () {
    // Fetch the data as per the character 
    async function loadCharsOutput() {
        const queryString = window.location.search;

        // take the character id from the current Webpage URL
        const urlParams = new URLSearchParams(queryString); 
        const character = urlParams.get('character');
        const query = character;
        const URL = `https://gateway.marvel.com/v1/public/characters/${query}?ts=1&apikey=a7028dfc69a9931e6b65ae6621f69df9&hash=14062fa5cc78ceb14f55c242c3bf099b`;

        // Fetch the data from API
        const response = await fetch(`${URL}`);  
        const data = await response.json();

        // send the responce from data to display function
        displayCharDetailsUpdate(data.data.results)  
    }

    // function to display the character details 
    function displayCharDetailsUpdate(data) {
        const name = document.getElementById('name')
        const description = document.getElementById('description');
        name.innerHTML = data[0].name;
        description.innerHTML = data[0].description;

        // for the comics list
        const comicsList = document.getElementById('comics-list-ul');
        for (let i = 0; i < data[0].comics.items.length; i++) {
            const comicName = data[0].comics.items[i].name;
            const comicListElement = document.createElement('li');
            comicListElement.classList.add('mb-2');
            comicListElement.innerHTML = comicName;
            comicsList.append(comicListElement);
        }

        // for the series lists 
        const seriesList = document.getElementById('series-list-ul');
        for (let i = 0; i < data[0].series.items.length; i++) {
            const seriescName = data[0].series.items[i].name;
            const seriesListElement = document.createElement('li');
            seriesListElement.classList.add('mb-2');
            seriesListElement.innerHTML = seriescName;
            seriesList.append(seriesListElement);
        }

        // for the Stories list 
        const storiesList = document.getElementById('stories-list-ul');
        for (let i = 0; i < data[0].stories.items.length; i++) {
            const storiesName = data[0].stories.items[i].name;
            const storiesListElement = document.createElement('li');
            storiesListElement.classList.add('mb-2');
            storiesListElement.innerHTML = storiesName;
            storiesList.append(storiesListElement);
        }

        // on hero image add the image from the API 
        const heroImage = document.getElementById('image-wrapper');
        const image = document.createElement('img');
        image.src = data[0].thumbnail.path + "." + data[0].thumbnail.extension;
        heroImage.appendChild(image);
    }

    loadCharsOutput()
})();