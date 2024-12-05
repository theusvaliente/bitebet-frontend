const express = require('express');
const { createClient } = require('@turso/turso');
const fetch = require('node-fetch'); // Para fazer requisições externas

const app = express();
const port = 3000;

// Configuração da conexão com o Turso
const tursoUrl = 'https://url-do-seu-banco.turso.com';
const tursoToken = 'seu-token-de-acesso';
const client = createClient({ url: tursoUrl, token: tursoToken });

// Middleware para permitir JSON no corpo da requisição
app.use(express.json());

// Configuração da pasta pública para servir arquivos estáticos
app.use(express.static('public'));

// Rota de cadastro
app.post('/api/cadastro', async (req, res) => {
    const { nomeCompleto, cpf, telefone, dataNascimento, endereco, time, senha } = req.body;

    try {
        // Inserir os dados no Turso
        await client.query(`
            INSERT INTO usuarios (nome, cpf, telefone, data_nascimento, endereco, time, senha)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [nomeCompleto, cpf, telefone, dataNascimento, endereco, time, senha]);

        res.status(201).json({ message: 'Cadastro realizado com sucesso!', redirectUrl: '/perfil.html' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar cadastro' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// Rota para buscar notícias do time do coração
app.get('/api/noticias/:time', async (req, res) => {
    const time = req.params.time;
    try {
        // Exemplo de API de notícias esportivas (substitua pelo URL e parâmetros corretos da API real)
        const response = await fetch(`https://api-de-noticias.com.br/noticias?time=${time}`);
        const noticias = await response.json();
        res.json(noticias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar notícias' });
    }
});

// Rota para buscar jogos do dia/semana
app.get('/api/jogos', async (req, res) => {
    try {
        // Exemplo de API de futebol brasileiro (substitua pelo URL e parâmetros corretos da API real)
        const response = await fetch(`https://api-de-futebol.com.br/jogos?competicao=brasileirao`);
        const jogos = await response.json();
        res.json(jogos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar jogos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
