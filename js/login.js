document.addEventListener("DOMContentLoaded", function () {
    // Envio do formulário com validação e redirecionamento após o cadastro
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        try {
            const apiURL = "http://localhost:3333/login";

            const dados = {
                email: document.getElementById('email').value,
                cpf: document.getElementById('senha').value,
            }

            const response = await fetch(apiURL, {
                mode: 'cors',
                method:'post',
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                const dados = await response.json();

                sessionStorage.setItem('nome', dados.nomeCompleto);
                sessionStorage.setItem('email', dados.email);
                sessionStorage.setItem('idTime', dados.time);
                sessionStorage.setItem('nomeTime', dados.nomeTime);
                sessionStorage.setItem('imagemTime', dados.imagemTime);

                window.location.href = '/perfil.html'; // Redireciona para a página de perfil
            } else {
                alert('Erro: Usuário ou senha errados!');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao logar');
        }
    });
});
