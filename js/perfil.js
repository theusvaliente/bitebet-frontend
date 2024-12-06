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
            const idTimeCasa = partida.idTimeCasa;
            const idTimeFora = partida.idTimeFora;
            const imagemTimeCasa = partida.imagemTimeCasa;
            const imagemTimeFora = partida.imagemTimeFora;

            const time = sessionStorage.getItem('idTime');

            if (time && idTimeCasa === time || idTimeFora === time) {
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
            }
        });
    } catch (error) {
        console.error("Erro ao buscar partidas:", error);
    }
}

async function fetchUser() {
    const userName = document.getElementById("userName");
    userName.textContent = sessionStorage.getItem('nome') || 'Usuário';

    sessionStorage.getItem('email');

    const teamName = document.getElementById("nameTeam");
    teamName.textContent = sessionStorage.getItem('nomeTime') || 'Time';

    const logoTeam = document.getElementById("logoTeam");
    logoTeam.src = sessionStorage.getItem('imagemTime');
}

window.addEventListener("load", fetchMatches);
window.addEventListener("load", fetchUser);