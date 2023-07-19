(function () {
    const charSearchBox = document.getElementById('char-search-box');
    const searchList = document.getElementById('search-list');

    // load characters from API
    async function loadChars(query) {
        const URL = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=a7028dfc69a9931e6b65ae6621f69df9&hash=14062fa5cc78ceb14f55c242c3bf099b`
        const response = await fetch(`${URL}`);
        const data = await response.json();
        displayCharList(data.data.results);
    }

    // function to show and hide the search list if user types something
    function findChars() {
        let searchTerm = (charSearchBox.value).trim();
        if (searchTerm.length > 0) {
            searchList.classList.remove('hide-search-list');
            searchList.classList.add('search-list');

            // if user types something then search list will be displayed
            loadChars(searchTerm); 
        } else {
            searchList.classList.add('hide-search-list');
        }
    }

    // Function to display the list of Hero characters 
    function displayCharList(chars) {
        searchList.innerHTML = "";
        for (let i = 0; i < chars.length; i++) {
            let charListItem = document.createElement('div');
            charListItem.dataset.id = chars[i].id;
            charListItem.className = 'search-list-item';
            charListItem.innerHTML = `
            <div class="search-item-thumbnail">
                <img src="${chars[i].thumbnail.path + "." + chars[i].thumbnail.extension}">
            </div>
            <div class="search-item-info"> 
                <a href = ${"details/charDetails.html?character=" + chars[i].id}> <h3>${chars[i].name}</h3> </a>
                <button onClick="addtoFavs()"> Like </button>
            </div>`;
            searchList.append(charListItem);
        }
        loadCharDetails();
    }

    // To load the Char Details and add them to fav list
    function loadCharDetails() {
        const searchConstList = searchList.querySelectorAll('.search-list-item');
        searchConstList.forEach(character => {
            character.addEventListener('click', async () => {
                searchConstList.className = ('hide-search-list');
                charSearchBox.value = "";
                const result = await fetch(`https://gateway.marvel.com/v1/public/characters/${character.dataset.id}?ts=1&apikey=a7028dfc69a9931e6b65ae6621f69df9&hash=14062fa5cc78ceb14f55c242c3bf099b`)
                const charDetails = await result.json();
                addtoFavs(charDetails);
            });
        });
    }

    // to blur the homepage hero list if user is searching for the Heros
    let container = document.getElementById('home-list');
    window.addEventListener('click', (event) => {
        if (event.target.id === charSearchBox.id) {
            searchList.classList.remove('hide-search-list');
            container.classList.add('blur');
        } else {
            searchList.classList.add('hide-search-list');
            container.classList.remove('blur');
        }
    });

    // add a hero to favourites
    function addtoFavs(charDetails) {
        let id = charDetails.data.results[0].id;
        console.log(id);
        let favs = getFavs();
        if (!favs.includes(id)) {
            favs.push(id);
        }
        localStorage.setItem('favHeros', JSON.stringify(favs));
    }

    // retrieve a list of favourite hero id's from local storage
    function getFavs() {
        let favs;
        if (localStorage.getItem('favHeros') === null) {
            favs = [];
        }
        else {
            favs = JSON.parse(localStorage.getItem('favHeros'));
        }
        return favs;
    }

    // HomePage Hero Load 
    async function homeLoadHeros(query) {
        const URL = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=a7028dfc69a9931e6b65ae6621f69df9&hash=14062fa5cc78ceb14f55c242c3bf099b`;
        const response = await fetch(`${URL}`);
        const data = await response.json();
        displayLoadHeros(data.data.results);
    }

    // Display home page super hero
    let HomeListName = document.getElementById('home-list');
    function displayLoadHeros(data) {
        for (let i = 0; i < data.length; i++) {
            let charListItem = document.createElement('div');
            charListItem.classList.add('shadow', 'rounded');
            charListItem.innerHTML = `
            <div class="home-single-hero">
                <div class="home-hero-info">
                    <div class="home-top">
                        <img src="${data[i].thumbnail.path}.${data[i].thumbnail.extension}" />
                    </div>
                    <div class="bottom text-center m-3">
                        <a class="text-decoration-none" href=${"details/charDetails.html?character=" + data[i].id}> ${data[i].name}</a>
                    </div>
                </div>
            </div>`;
            HomeListName.appendChild(charListItem);
        }
    }

    charSearchBox.addEventListener('keyup', findChars);
    homeLoadHeros();
})();