"use strict";
//Declarando as lets
let inputNome = document.querySelector(".nome");
let inputPacote = document.getElementsByName("pacote");
let inputData = document.querySelector(".data");
let inputTexto = document.querySelector(".texto");
let novosCards = [];
let btnCadastrar = document.querySelector(".cadastrar");
//Declarando os tipos
class Card {
    constructor(_nome, _descricao, _data, _pacote, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.pacote = _pacote;
        this.id = _id;
    }
    get Nome() {
        return this.nome;
    }
    set Nome(value) {
        this.nome = value;
    }
    get Descricao() {
        return this.descricao;
    }
    set Descricao(value) {
        this.descricao = value;
    }
    get Data() {
        return this.data;
    }
    set Data(value) {
        this.data = value;
    }
    get Pacote() {
        return this.pacote;
    }
    set Pacote(value) {
        this.pacote = value;
    }
    get Id() {
        return this.id;
    }
    set Id(value) {
        this.id = value;
    }
}
//Função para pegar os dados da API
function obterCardsApi() {
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
        .then(resposta => resposta.json())
        .then((dados) => {
        return dados.map(dadosCard => {
            return new Card(dadosCard.nome, dadosCard.descricao, dadosCard.data, dadosCard.pacote, dadosCard.id);
        });
    })
        .then(dadosNovosCards => {
        injetarDados(dadosNovosCards);
        novosCards = dadosNovosCards;
        //console.log(novosCards);
    });
}
//Função para criar os cards
function criarCards() {
    inputNome.value;
    validacaoPacote(inputPacote);
    inputData.value;
    inputTexto.value;
    let novoCard = new Card(inputNome.value, inputTexto.value, inputData.value, validacaoPacote(inputPacote), criarId());
    novosCards.push(novoCard);
    //console.log(novosCards);
    injetarDados(novosCards);
}
//Função para criar os IDs
function criarId() {
    let maiorId = 0;
    novosCards.map((dadoId, index) => {
        if (Number(dadoId.Id) > maiorId) {
            maiorId = Number(dadoId.Id);
        }
    });
    maiorId++;
    return maiorId.toString();
}
btnCadastrar.addEventListener('click', () => {
    criarCards();
});
//Função de validação do Pacote
function validacaoPacote(pacote) {
    pacote = inputPacote;
    for (let i = 0; i < pacote.length; i++) {
        if (pacote[i].checked) {
            if (pacote[i].value == 'true') {
                pacote = true;
            }
            else {
                pacote = false;
            }
        }
    }
    return pacote;
}
//Função para criar as datas
function dataTexto(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getDate()).toString() + "/" + (newDate.getMonth() + 1).toString() + "/" + newDate.getFullYear().toString());
    return dataString;
}
//Função para injetar os dados
function injetarDados(arrayNovosCards) {
    let cardNovo = document.querySelector('.conteudo-secundario');
    cardNovo.innerHTML = '';
    for (let i = 0; i < arrayNovosCards.length; i++) {
        cardNovo.innerHTML += `<div class="reservas">
        <h3 class="titulo-reserva">${arrayNovosCards[i].nome}</h3>
        <p class="text-descricao">${arrayNovosCards[i].descricao}</p>
        <p class="data-viagem">Data: ${dataTexto(arrayNovosCards[i].data)}</p>
        <button class="editar" type="button" id="editar${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="editar(${arrayNovosCards[i].id})">Editar</button>
        <button class="excluir" type="button" id="excluir${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="excluir(${arrayNovosCards[i].id})">Excluir</button>
        </div>`;
        //console.log(arrayNovosCards);
    }
    //console.log(dataTexto(arrayNovosCards[0].data));
}
//Função onde editamos um card
function editar(id) {
    let indice;
    indice = selecionarCardId(id);
    inputNome.value = novosCards[indice].Nome;
    inputData.value = inversaoData(novosCards[indice].Data);
    inputTexto.value = novosCards[indice].Descricao;
    //console.log(novosCards[indice].Pacote);
    inputPacote.value = novosCards[indice].Pacote;
    excluir(id);
    injetarDados(novosCards);
}
//Função para inversão da data nos cards
function inversaoData(data) {
    let newDate = new Date(data);
    let dataString;
    dataString = (Number(newDate.getFullYear()).toString() + "-" + (newDate.getMonth() + 1).toString() + "-" + newDate.getDate().toString());
    return dataString;
}
//Função para excluir um card
function excluir(id) {
    let indice;
    indice = selecionarCardId(id);
    novosCards.splice(indice, 1);
    injetarDados(novosCards);
}
//Função para selecionar um card
function selecionarCardId(id) {
    let indice = 0;
    for (let i = 0; i < novosCards.length; i++) {
        if (novosCards[i].Id == id) {
            indice = i;
        }
    }
    //console.log(indice);
    return indice;
}
window.onload = () => {
    obterCardsApi();
};
//arrayNovosCards.map((x: any) => console.log(x));
