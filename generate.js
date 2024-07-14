const faker = require('faker');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const axios = require('axios');

// Constante para a URL padrão da API
const DEFAULT_API_URL = 'http://localhost:5066/Produtos';

// Funções geradoras para diferentes entidades
const generateProduto = () => {
    return {
        nome: faker.commerce.productName(),
        descricao: faker.commerce.productDescription(),
        preco: parseFloat(faker.commerce.price()),
        imagemUrl: faker.image.imageUrl(),
        categoriaId: faker.datatype.number({ min: 1, max: 3 })
    };
};

const generateUsuario = () => {
    return {
        nome: faker.name.findName(),
        email: faker.internet.email(),
        senha: faker.internet.password()
    };
};

// Função principal para gerar dados
const generateData = (entity, count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        if (entity === 'produto') {
            data.push(generateProduto());
        } else if (entity === 'usuario') {
            data.push(generateUsuario());
        } else {
            console.error(`Entidade desconhecida: ${entity}`);
            return;
        }
    }
    return data;
};

// Função para enviar dados para a API REST de forma sequencial
const sendDataToApiSequentially = async (url, data) => {
    for (let item of data) {
        try {
            const response = await axios.post(url, item);
            console.log(`Dados enviados com sucesso: ${response.status}`);
        } catch (error) {
            console.error(`Erro ao enviar dados: ${error.message}`);
        }
    }
};

// Configurar o CLI
const argv = yargs(hideBin(process.argv))
    .option('entity', {
        alias: 'e',
        type: 'string',
        demandOption: true,
        description: 'A entidade para gerar dados (produto, usuario, etc.)'
    })
    .option('count', {
        alias: 'c',
        type: 'number',
        default: 10,
        description: 'O número de itens a serem gerados'
    })
    .option('url', {
        alias: 'u',
        type: 'string',
        description: 'A URL da API REST para enviar os dados'
    })
    .help()
    .argv;

// Determinar a URL a ser usada
const apiUrl = argv.url || DEFAULT_API_URL;

// Gerar dados e enviar para a API de forma sequencial
const data = generateData(argv.entity, argv.count);
sendDataToApiSequentially(apiUrl, data);
