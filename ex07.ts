export {};

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log(`SMS ignorado: mensagem longa`);
    return;
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach(dest => enviar(dest, mensagem));
}

notificarTodos(['ana@escola.com'], 'Reunião de pais sexta às 19h', porEmail);
notificarTodos(['joao.resp'], 'Reunião de pais sexta às 19h', porApp);
notificarTodos(['(69) 99999-0000'], 'a'.repeat(165), porSms);

// Erro provocado:
// function teste(): void { return 10; } // Type 'number' is not assignable to type 'void'.

/*
Reflexão:
Um notificador que retorna um número (ex: `const contar: Notificador = (d, m) => m.length;`) é aceito pelo TypeScript porque funções que retornam valores podem ser atribuídas onde se espera `void`, permitindo que callbacks utilitários tenham seu retorno descartado com segurança.
*/
