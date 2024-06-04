document.getElementById("form-box").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Button clicked");
    searchbox();
});

let cart = [];

const loadPlayer = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p')
        .then((res) => res.json())
        .then((data) => {
            console.log(data.player);
            showPlayer(data.player);
        });
};



const showPlayer = (players) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = '';
    players.slice(0, 10).forEach(player => {
        console.log(player);
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="product-item" data-id="${player.idPlayer}">
                <div class="player-img">
                    <img src="${player.strThumb || 'https://www.thesportsdb.com/images/media/player/thumb/c3g89l1706382159.jpg'}" alt="player">
                </div>
                <div class="player-name">
                    <h3>${player.strPlayer}</h3>
                    <p>Nationality: ${player.strNationality}</p>
                    <p>Gender: ${player.strGender}</p>
                    <p>ID: ${player.idPlayer}</p>
                    <div class="social-icons">
                        <a href="${player.strFacebook}" target="_blank"><i class="fab fa-facebook"></i></a>
                        <a href="${player.strInstagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    </div>
                    <button class="details-btn" onclick="showDetails('${player.idPlayer}')">Details</button>
                    <button class="cart-btn" onclick="addToCart('${player.idPlayer}', '${player.strPlayer}')">Add to Cart</button>
                </div>
            </div>`;
        productContainer.appendChild(div);
    });
};


loadPlayer();

const searchbox = () => {
    const inputItem = document.getElementById("Search-box").value.trim();
    console.log(inputItem);
    searchItem(inputItem);
};

const searchItem = (item) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${item}`)
        .then(res => res.json())
        .then((data) => {
            displayPlayers(data.player);
        })
        .catch(error => console.error('Error:', error));
};

const displayPlayers = (players) => {

    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = '';

    if (!players) {
        productContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    players.slice(0, 10).forEach(player => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `

            <div class="product-item" data-id="${player.idPlayer}">
                <div class="player-img">
                    <img src="${player.strThumb}" alt="player">
                </div>
                <div class="player-name">
                    <h3>${player.strPlayer}</h3>
                    <p>Nationality: ${player.strNationality}</p>
                    <p>Gender: ${player.strGender}</p>
                    <p>ID: ${player.idPlayer}</p>
                    <div class="social-icons">
                        ${player.strFacebook ? `<a href="${player.strFacebook}" target="_blank"><i class="fab fa-facebook"></i></a>` : ''}
                        ${player.strInstagram ? `<a href="${player.strInstagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : ''}
                    </div>
                    <button class="details-btn" onclick="showDetails('${player.idPlayer}')">Details</button>
                    <button class="cart-btn" onclick="addToCart('${player.idPlayer}', '${player.strPlayer}')">Add to Cart</button>
                </div>
            </div>`;
        productContainer.appendChild(div);
    });
};

const showDetails = (playerId) => {

    const modal = document.getElementById("player-modal");
    const modalBody = document.getElementById("modal-body");

    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then(response => response.json())
        .then(data => {
            const player = data.players[0];
            modalBody.innerHTML = `
                <div class="details-box">
                    <h2 class="player-title">${player.strPlayer}</h2>
                    <p class="player-category">Nationality: ${player.strNationality}</p>
                    <p class="player-category">Gender: ${player.strGender}</p>
                    <p class="player-id">ID: ${player.idPlayer}</p>
                    <p class="player-id">Date of Birth: ${player.dateBorn}</p>
                    <p class="player-id">Position: ${player.strPosition}</p>
                    <p class="player-description">${player.strDescriptionEN.slice(0, 250) || 'No description available.'}</p>
                <div/>
            `;
            modal.style.display = 'block';
        });
};



document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("player-modal").style.display = "none";
});

const addToCart = (playerId, playerName) => {
    if (cart.length >= 11) {
        alert("Limit 11 players only");
        return;
    }

    if (!cart.includes(playerId)) {
        cart.push(playerId);
        const cartItem = document.createElement("li");
        cartItem.textContent = playerName;
        
        document.getElementById("cart-items").appendChild(cartItem);
        document.getElementById("cart-count").textContent = `(${cart.length})`;
    }

    
};

