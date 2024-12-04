const dadosAposta = {
    usuario1: '',
    usuario2: '',
    partida: '',
    comida: ''
};

async function fetchMatches() {
    const apiURL = "http://localhost:3333/partidas";

    try {
        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            }
        });

        const partidas = await response.json();

        const matchesList = document.getElementById("matches-list");

        partidas.forEach((partida) => {
            const idPartida = partida.idPartida;
            const dataPartida = partida.dataPartida;
            const timeCasa = partida.timeCasa;
            const timeFora = partida.timeFora;
            const imagemTimeCasa = partida.imagemTimeCasa;
            const imagemTimeFora = partida.imagemTimeFora;

            // Adicionar partidas à lista
            const li = document.createElement("li");

            li.className = "partida";
            li.id = idPartida;

            matchesList.appendChild(li);

            const tagImgTimeCasa = document.createElement("img");
            const tagImgTimeFora = document.createElement("img");

            tagImgTimeCasa.src = imagemTimeCasa;
            tagImgTimeFora.src = imagemTimeFora;
            tagImgTimeCasa.setAttribute('width', '50px');
            tagImgTimeFora.setAttribute('width', '50px');

            const tagParagrafo = document.createElement("p");
            tagParagrafo.innerHTML = `<b>${timeCasa}</b> vs <b>${timeFora}</b><br><center>${dataPartida}</center>`;

            li.appendChild(tagImgTimeCasa);
            li.appendChild(tagParagrafo);
            li.appendChild(tagImgTimeFora);
        });

        const tagsPartidas = document.querySelectorAll('.partida')

        tagsPartidas.forEach(partida => partida.addEventListener('click', e => {
            tagsPartidas.forEach(t => t.classList.remove("selected"));
            e.currentTarget.classList.toggle("selected");
            dadosAposta.partida = e.currentTarget.id;
        }));
    } catch (error) {
        console.error("Erro ao buscar partidas:", error);
    }
}

async function fetchFoods() {
    try {
        const apiURL = "http://localhost:3333/foods";

        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            }
        });

        const comidas = await response.json();

        const foodsList = document.getElementById("foods-list");

        comidas.forEach((comida) => {
            const idComida = comida.idComida;
            const nomeComida = comida.nomeComida;
            const imagemComida = comida.imagemComida;

            const li = document.createElement("li");

            li.className = "comida";
            li.id = idComida;
        
            foodsList.appendChild(li);

            const tagImgComida = document.createElement("img");

            tagImgComida.src = imagemComida;
            tagImgComida.setAttribute('width', '100px');

            const tagParagrafo = document.createElement("p");
            tagParagrafo.innerHTML = `<b>${nomeComida}</b>`;

            li.appendChild(tagImgComida);
            li.appendChild(tagParagrafo);
        });

        const tagsComidas = document.querySelectorAll('.comida')

        tagsComidas.forEach(comida => comida.addEventListener('click', e => {
            tagsComidas.forEach(t => t.classList.remove("selected"));
            e.currentTarget.classList.toggle("selected");
            dadosAposta.comida = e.currentTarget.id;
        }));
    } catch (error) {
        console.error("Erro ao buscar comidas:", error);
    }
}

async function fetchFriends() {
    try {
        const apiURL = "http://localhost:3333/users";

        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            }
        });

        const amigos = await response.json();

        const frinedsList = document.getElementById("friends-list");

        amigos.forEach((amigo) => {
            const idUser = amigo.idUser;
            const nomeCompleto = amigo.nomeCompleto;
            const imagemAmigo = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

            const li = document.createElement("li");

            li.className = "amigo";
            li.id = idUser;

            frinedsList.appendChild(li);

            const tagImgAmigo = document.createElement("img");

            tagImgAmigo.src = imagemAmigo;
            tagImgAmigo.setAttribute('width', '50px');

            const tagParagrafo = document.createElement("p");
            tagParagrafo.innerHTML = `<b>${nomeCompleto}</b>`;

            li.appendChild(tagImgAmigo);
            li.appendChild(tagParagrafo);
        });

        const tagsAmigos = document.querySelectorAll('.amigo')

        tagsAmigos.forEach(amigo => amigo.addEventListener('click', e => {
            tagsAmigos.forEach(t => t.classList.remove("selected"));
            e.currentTarget.classList.toggle("selected");
            dadosAposta.usuario2 = e.currentTarget.id;
        }));
    } catch (error) {
        console.error("Erro ao buscar amigos:", error);
    }
}

async function criarAposta() {
    try {
        console.log(dadosAposta);

        const apiURL = "http://localhost:3333/createBet";

        const response = await fetch(apiURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            },
            body: dadosAposta
        });

        const aposta = await response.json();
        console.log(aposta);
    } catch (error) {
        console.error("Erro ao criar aposta:", error);
    }
}

// Carregar partidas ao carregar a página
window.addEventListener("load", fetchMatches);
window.addEventListener("load", fetchFoods);
window.addEventListener("load", fetchFriends);