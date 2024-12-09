async function fetchMatches() {
    const apiURL = "http://localhost:3333/partidas";

    try {
        const matchesList = document.getElementById("matches-list");
        const liSemPartida = document.createElement("li");

        liSemPartida.className = "li-sem";
        liSemPartida.textContent = "Nenhum"

        matchesList.appendChild(liSemPartida);

        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json'
            }
        });

        const partidas = await response.json();

        if (partidas && partidas.length) {
            liSemPartida.remove();
        }

        const time = sessionStorage.getItem('idTime');

        partidas.forEach((partida) => {
            const idPartida = partida.idPartida;
            const dataPartida = partida.dataPartida;
            const timeCasa = partida.timeCasa;
            const timeFora = partida.timeFora;
            const idTimeCasa = partida.idTimeCasa;
            const idTimeFora = partida.idTimeFora;
            const imagemTimeCasa = partida.imagemTimeCasa;
            const imagemTimeFora = partida.imagemTimeFora;

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
                tagParagrafo.innerHTML = `<b>${timeCasa}</b> x <b>${timeFora}<center>${dataPartida}</center>`;

                li.appendChild(tagImgTimeCasa);
                li.appendChild(tagParagrafo);
                li.appendChild(tagImgTimeFora);
            }
        });
    } catch (error) {
        console.error("Erro ao buscar partidas:", error);
    }
}

async function fetchBets() {
    const apiURL = "http://localhost:3333/bets";

    try {
        const betsList = document.getElementById("bets-list");
        const betsOld = document.getElementById("bets-old");

        const liSemBets = document.createElement("li");

        liSemBets.className = "li-sem";
        liSemBets.textContent = "Nenhum"

        const liSemBetsAntigo = document.createElement("li");

        liSemBetsAntigo.className = "li-sem";
        liSemBetsAntigo.textContent = "Nenhum"

        betsList.appendChild(liSemBets);
        betsOld.appendChild(liSemBetsAntigo);

        const response = await fetch(apiURL, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*',
              'accept': 'application/json',
              'usuario': sessionStorage.getItem('idUser')
            }
        });

        const bets = await response.json();

        if (bets && bets.length) {
            liSemBets.remove();

            if (bets.length > 1) {
                liSemBetsAntigo.remove();
            }

            bets.forEach((bet, i) => {
                const first = i === 0;

                const idBet = bet.idBet;
                const nomeUsuario1 = bet.nomeUsuario1;
                const nomeUsuario2 = bet.nomeUsuario2;
                const time1 = bet.time1;
                const time2 = bet.time2;
                const imgTime1 = bet.imgTime1;
                const imgTime2 = bet.imgTime2;
                const golsTime1 = bet.golsTime1;
                const golsTime2 = bet.golsTime2;
                const vencedor = bet.vencedor;
                const comida = bet.comida;
                const imgComida = bet.imgComida;

                const li = document.createElement("li");

                li.className = "bet";
                li.id = idBet;

                if (first) {
                    betsList.appendChild(li);
                } else {
                    betsOld.appendChild(li);
                }

                const tagImgTimeCasa = document.createElement("img");
                const tagImgTimeFora = document.createElement("img");

                tagImgTimeCasa.src = imgTime1;
                tagImgTimeFora.src = imgTime2;
                tagImgTimeCasa.setAttribute('width', '50px');
                tagImgTimeFora.setAttribute('width', '50px');

                const tagParagrafo = document.createElement("p");

                const contra = sessionStorage.getItem('nome') === nomeUsuario1 ? nomeUsuario2 : nomeUsuario1;

                const classVencedor = vencedor === sessionStorage.getItem('nome') ? 'vencedor' : 'perdedor';

                tagParagrafo.innerHTML = `<center>Contra: ${contra}</center><b>${time1}</b> ${!first ? golsTime1 : ''} x ${!first ? golsTime2 : ''} <b>${time2}`;
                tagParagrafo.innerHTML += !first ? `<center class="${classVencedor}">O vencedor: <b>${vencedor}</b></center>` : '';
                tagParagrafo.innerHTML += !first ? `<center id="comida">Ganhou: <b>${comida}</b></center><center><img width="150" src="${imgComida}"></img></center>` : '';

                li.appendChild(tagImgTimeCasa);
                li.appendChild(tagParagrafo);
                li.appendChild(tagImgTimeFora);
            });
        }
    } catch (error) {
        console.error("Erro ao buscar bets:", error);
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
window.addEventListener("load", fetchBets);