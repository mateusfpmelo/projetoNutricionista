var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
	event.preventDefault();

	var form = document.querySelector("#form-adiciona");
	// Extraindo informacoes do paciente do form
	var paciente = obtemPacienteDoFormulario(form);

	

	var erros = validaPaciente(paciente);

	if(erros.length > 0){
		exibeMensagensDeErro(erros);
		var mensagemErro = document.querySelector("#mensagem-erro");
		
		return;
	}
	
	adicionaPacienteNaTabela(paciente);

	form.reset() // limpa os campos
	var mansagensErro = document.querySelector("#mensagens-erro");
	mansagensErro.innerHTML = "";

});

function adicionaPacienteNaTabela(paciente){
	var pacienteTr = montaTr(paciente);
	var tabela = document.querySelector("#tabela-pacientes");
	tabela.appendChild(pacienteTr);
}

function exibeMensagensDeErro(erros){
	var ul = document.querySelector("#mensagens-erro");
	ul.innerHTML = ""; // Controlar o html dentro da tag - Neste caso é para limpar os erros ja exibidos na página
	erros.forEach(function(erro){ // Para cada item do meu array fará:
		var li = document.createElement("li");
		li.textContent = erro;
		ul.appendChild(li);
	})
}

function obtemPacienteDoFormulario(form){
	var paciente = {
		nome: form.nome.value,
		peso: form.peso.value,
		altura: form.altura.value,
		gordura: form.gordura.value,
		imc: calculaImc(form.peso.value, form.altura.value)
	}
	return paciente;
}

function montaTr(paciente){
	var pacienteTr = document.createElement("tr"); //nome da tag entre parenteses
	pacienteTr.classList.add("paciente");

	var nomeTd = document.createElement("td");
	nomeTd.classList.add("info-nome");
	nomeTd.textContent = paciente.nome;

	pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
	pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
	pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
	pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
	pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

	return pacienteTr;
}

function montaTd(dado, classe){
	var td = document.createElement("td");
	td.textContent = dado;
	td.classList.add(classe);

	return td;
}// Cria a tr e td do paciente

function validaPaciente(paciente){

	var erros = []; // criando um array com os erros

	if(paciente.nome.length == 0 ) erros.push("Nome não pode ser em branco");
	if(!validaPeso(paciente.peso)) erros.push("Peso inválido"); // posso reclarar desta maneira o if, caso não tenha um else
	if(!validaAltura(paciente.altura)) erros.push("Altura inválida");
	if(paciente.gordura.length == 0 ) erros.push("Gordura não pode ser em branco");
	if(paciente.peso.length ==0) erros.push("Peso não pode ser em branco");
	if(paciente.altura.length == 0) erros.push("Altura não pode ser em branco");
	return erros;
}