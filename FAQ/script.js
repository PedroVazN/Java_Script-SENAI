// Esta função TrocaPergunta(id) é usada para mostrar ou esconder uma pergunta em uma página web.

function TrocaPergunta(id) {
    // Primeiro, pegamos uma referência para a pergunta usando o 'id' que passamos para a função.
    const trocar = document.getElementById(`trocar${id}`);
  
    // Agora, verificamos se a pergunta está atualmente visível (mostrada) ou não.
    // Se estiver visível, queremos escondê-la. Se estiver escondida, queremos mostrá-la.
    if (trocar.style.display === 'block') {
      // Se estiver visível, definimos para 'none' para esconder.
      trocar.style.display = 'none';
    } else {
      // Se estiver escondida (ou seja, não 'block'), definimos para 'block' para mostrar.
      trocar.style.display = 'block';
    }
  }