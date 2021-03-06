// se tiver "tarefa" na memória recebe a memória, se não começa como array vazio 
let tarefaLocal = localStorage.getItem("tarefa");
let tarefas = tarefaLocal ? JSON.parse(tarefaLocal) : [];

atualizar();

function adicionar(){
        // recebe o valor digitado
    let descTarefa = document.querySelector('#novaTarefa').value;
        // cria um objeto com gerador de id e o valor digitado
    if(descTarefa != ""){
        let tarefa = {
            id: gerarId(),
            descricao: descTarefa,
            check:""      
        };
            // coloca o objeto no array de objetos
        tarefas.push(tarefa);
            // grava o array no localStorage
        localStorage.setItem("tarefa", JSON.stringify (tarefas));
        
        atualizar();
    }
}

// atualiza a página criando as tags e o conteúdo de cada objeto do array
function atualizar(){
    let list = "";
    if(tarefas){
        tarefas.forEach(tarefa => {
            list += `<div class="custom-control custom-checkbox"> 
                <input type="checkbox" ${tarefa.check} class="custom-control-input" id="${tarefa.id}">`
            if(tarefa.check === "checked"){
                list += `<label style="text-decoration: line-through;" class="custom-control-label" for="${tarefa.id}"> - ${tarefa.descricao}</label> 
                </div><hr>` 
            } else{
                list += `<label class="custom-control-label" for="${tarefa.id}"> - ${tarefa.descricao}</label> 
                </div><hr>` 
            }                  
        });  
    }     
        // exibe no html, cada formação de uma nova tarefa e limpa a caixa
    document.querySelector('#lista').innerHTML = list;
    document.querySelector('#novaTarefa').value = "";       
}

//a cada marcação ou desmarcação de algum checkbox, é verificado quais checkbox estão marcados e altera "tarefas" depois salva em localSorage
let click = document.getElementById("lista");
click.addEventListener("input",checar);
function checar(){
    for(let i = 0; i < click.length; i++){
        if(click[i].checked === true){
            tarefas[i].check = "checked";
        } else{
            tarefas[i].check = ""; 
        }
    }
    localStorage.setItem("tarefa", JSON.stringify (tarefas));
    atualizar();
}

// limpar todas as tarefas "concluídas"
function limpar(){    
    for(let cont = tarefas.length-1; cont >= 0; cont--){
        if (tarefas[cont].check === "checked"){
            tarefas.splice(cont,1); 
        }      
    }
    localStorage.setItem("tarefa", JSON.stringify (tarefas));
    atualizar();
}

// limpa o localStorage
function limparTudo(){ 
    if(confirm("Deseja excluir todas as tarefas?")){
        localStorage.clear();
        window.location.reload();
    }   
}

//gerador de id
function gerarId(){
    let time = new Date();
    let id = 
        time.getHours().toString() +
        time.getMinutes().toString() +
        time.getSeconds().toString() +
        time.getMilliseconds().toString();   
    return id;             
}

