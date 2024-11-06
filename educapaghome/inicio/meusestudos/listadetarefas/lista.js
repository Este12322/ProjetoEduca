const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

// Adicionar nova tarefa
function adicionarNovaTarefa() {
  if (input.value.trim() === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  minhaListaDeItens.push({
    tarefa: input.value.trim(),
    concluida: false,
  });

  input.value = '';
  mostrarTarefas();
}

// Mostrar tarefas
function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
        <img src="img/checked.png" alt="Concluir tarefa" onclick="concluirTarefa(${posicao})">
        <p>${item.tarefa}</p>
        <img src="img/trash.png" alt="Deletar tarefa" onclick="deletarItem(${posicao})">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// Concluir tarefa
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

// Deletar tarefa
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

// Recarregar tarefas do localStorage
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');
  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }
  mostrarTarefas();
}

// Eventos
recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);
