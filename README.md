# Data Generator

Este projeto é um gerador de dados usando Node.js e a biblioteca Faker.js. Ele permite gerar dados falsos para múltiplas entidades (por exemplo, produtos, usuários) e selecionar qual entidade gerar via linha de comando (CLI).

## Pré-requisitos

- Node.js instalado
- npm instalado

## Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/seu-usuario/data-generator.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd data-generator
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

## Uso

Para gerar dados, execute o script `generate.js` com os seguintes argumentos:

- `--entity` ou `-e`: A entidade para a qual você deseja gerar dados (por exemplo, `produto`, `usuario`).
- `--count` ou `-c` (opcional): O número de itens a serem gerados (padrão é 10).

### Exemplos

Gerar 5 produtos:

```sh
node generate.js --entity produto --count 5
