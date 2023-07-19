(function () {
    const favHeros = getFavs();
    const favListName = document.getElementById('fav-list');
    const heading = document.getElementById('heading');

    // if list is empty then show the empty list message
    if (favHeros.length == 0) { 
        let EmptyListMessage = document.createElement('div');
        EmptyListMessage.className = 'empty-list';
        EmptyListMessage.innerHTML = "Your favourate list is Empty";
        heading.appendChild(EmptyListMessage);
    }

    // if not when show the fav-char list
    function showFavList() {
        for (let i = 0; i < favHeros.length; i++) {
            showDetails(favHeros[i]);
            async function showDetails(query) {
                const URL = `https://gateway.marvel.com/v1/public/characters/${query}?ts=1&apikey=a7028dfc69a9931e6b65ae6621f69df9&hash=14062fa5cc78ceb14f55c242c3bf099b`
                const response = await fetch(`${URL}`);
                const data = await response.json();
                displayCharDetailsUpdate(data.data.results)
            }

            // Display favourite superhero list
            function displayCharDetailsUpdate(data) {
                let charListItem = document.createElement('div');
                charListItem.dataset.id = data[0].id;
                charListItem.classList.add('shadow', 'rounded', 'text-center');
                charListItem.innerHTML =
                `<div class="single-hero">
                    <div class="hero-info">
                        <div class="top mb-2">
                            <img src="${data[0].thumbnail.path + "." + data[0].thumbnail.extension}"></img>
                        </div>
                        <div class="bottom">
                            <a class="text-decoration-none " href=${"../details/charDetails.html?character=" + data[0].id}> ${data[0].name}</a>
                        </div>
                    </div>
                </div>`

                // Botton to remove from favourite list
                let removeButton = document.createElement("button");
                removeButton.id = data[0].id;
                removeButton.addEventListener('click', removeFromFavourites);
                removeButton.innerHTML = "Remove";
                charListItem.appendChild(removeButton);
                favListName.appendChild(charListItem);
            }
        }
    }

    // Check if the localStorage have the users 
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

    // function to remove the char from list 
    async function removeFromFavourites(e) {
        let id = e.target.id;
        let favs = getFavs();
        let updatedFavs = favs.filter(function (val) {
            return val != id;
        });
        localStorage.setItem('favHeros', JSON.stringify(updatedFavs));

        // Reload to show the updated list to user 
        location.reload(); 
    }

    showFavList();
})();