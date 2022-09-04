//Declarando as lets
let inputNome = document.querySelector(".nome") as HTMLInputElement;
let inputPacote = document.getElementsByName("pacote") as any;
let inputData = document.querySelector(".data") as HTMLInputElement;
let inputTexto = document.querySelector(".texto") as HTMLInputElement;
let novosCards: Array<Card> = []
let btnCadastrar = document.querySelector(".cadastrar") as HTMLInputElement;

//Declarando os tipos
class Card{
    private nome: string;
    private descricao: string;
    private data: string;
    private pacote: boolean;
    private id: string;

    public get Nome(): string{
        return this.nome;
    }
    public set Nome(value: string){
        this.nome = value;
    }

    public get Descricao(): string{
        return this.descricao;
    }
    public set Descricao(value: string){
        this.descricao = value;
    }

    public get Data(): string{
        return this.data;
    }
    public set Data(value: string){
        this.data = value;
    }

    public get Pacote(): boolean{
        return this.pacote;
    }
    public set Pacote(value: boolean){
        this.pacote = value;
    }

    public get Id(): string{
        return this.id;
    }
    public set Id(value: string){
        this.id = value;
    }

    constructor(_nome: string, _descricao: string, _data: string, _pacote:boolean, _id: string){
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.pacote = _pacote;
        this.id = _id;
    }
}

interface ApiTipagem{
    nome: string;
    descricao: string;
    data: string;
    pacote: boolean;
    id: string;
}

//Função para pegar os dados da API
function obterCardsApi():void{
    fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes')
    .then(resposta=>resposta.json())
    .then((dados: ApiTipagem[])=>{
        return dados.map(dadosCard=>{            
            return new Card(
                dadosCard.nome,
                dadosCard.descricao,
                dadosCard.data,
                dadosCard.pacote,
                dadosCard.id
            )
        })
    })
    .then(dadosNovosCards=>{
        injetarDados(dadosNovosCards)
        novosCards = dadosNovosCards;
        //console.log(novosCards);
    }) 
}

//Função para criar os cards
function criarCards(){
    inputNome.value;
    validacaoPacote (inputPacote);
    inputData.value;
    inputTexto.value;
    let novoCard = new Card(inputNome.value, inputTexto.value, inputData.value, validacaoPacote(inputPacote), criarId());
    novosCards.push(novoCard);
    //console.log(novosCards);
    injetarDados(novosCards)
}

//Função para criar os IDs
function criarId(){
    let maiorId: number = 0
    novosCards.map((dadoId, index)=>{
        if (Number(dadoId.Id) > maiorId){
            maiorId = Number(dadoId.Id)
        }
    })
    maiorId ++
    return maiorId.toString()
}

btnCadastrar.addEventListener('click', ()=>{
    criarCards()
})

//Função de validação do Pacote
function validacaoPacote(pacote: any){
    pacote = inputPacote;
    for (let i = 0; i < pacote.length; i++){
        if (pacote[i].checked){
            if (pacote[i].value == 'true'){
                pacote = true
            }
            else{
                pacote = false
            }
        }
    }
    return pacote
}

//Função para criar as datas
function dataTexto(data: string): string{
    let newDate = new Date(data)
    let dataString: string;
    dataString = (Number(newDate.getDate()).toString()+"/"+(newDate.getMonth()+1).toString()+"/"+newDate.getFullYear().toString())
    return dataString
}

//Função para injetar os dados
function injetarDados(arrayNovosCards: any){
    let cardNovo = document.querySelector('.conteudo-secundario') as HTMLElement
    cardNovo.innerHTML = ''

    for (let i = 0; i < arrayNovosCards.length; i++){
        cardNovo.innerHTML += `<div class="reservas">
        <h3 class="titulo-reserva">${arrayNovosCards[i].nome}</h3>
        <p class="text-descricao">${arrayNovosCards[i].descricao}</p>
        <p class="data-viagem">Data: ${dataTexto (arrayNovosCards[i].data)}</p>
        <button class="editar" type="button" id="editar${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="editar(${arrayNovosCards[i].id})">Editar</button>
        <button class="excluir" type="button" id="excluir${arrayNovosCards[i].id}" value="${arrayNovosCards[i].id}" onClick="excluir(${arrayNovosCards[i].id})">Excluir</button>
        </div>`

        //console.log(arrayNovosCards);
        
    }
    //console.log(dataTexto(arrayNovosCards[0].data));
}

//Função onde editamos um card
function editar(id: string){
    let indice: number
    indice = selecionarCardId(id)
    inputNome.value = novosCards[indice].Nome;
    inputData.value = inversaoData(novosCards[indice].Data);
    inputTexto.value = novosCards[indice].Descricao;
    //console.log(novosCards[indice].Pacote);

    inputPacote.value = novosCards[indice].Pacote;
    excluir(id)
    injetarDados(novosCards);
}

//Função para inversão da data nos cards
function inversaoData(data: string): string{
    let newDate = new Date(data)
    let dataString: string;
    dataString = (Number(newDate.getFullYear()).toString()+"-"+(newDate.getMonth()+1).toString()+"-"+newDate.getDate().toString())
    return dataString
}

//Função para excluir um card
function excluir(id: string){
    let indice: number
    indice = selecionarCardId(id)
    novosCards.splice(indice, 1)
    injetarDados(novosCards);
}

//Função para selecionar um card
function selecionarCardId(id: string): number{
    let indice: number = 0
    for(let i = 0; i < novosCards.length; i++){
        if(novosCards[i].Id == id){
            indice = i
        }
    }
    //console.log(indice);
    return indice
}

window.onload = () =>{
    obterCardsApi();
};

//arrayNovosCards.map((x: any) => console.log(x));