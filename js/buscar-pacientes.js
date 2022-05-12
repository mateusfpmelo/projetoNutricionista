var botaoAdicionar = document.querySelector("#buscar-pacientes");

botaoAdicionar.addEventListener("click", function(){
	console.log("Buscando pacientes!")

	var xhr = new XMLHttpRequest(); // Objeto que irá fazer requisições http

	xhr.open("GET", "http://api-pacientes.herokuapp.co22m/pacientes"); // quero fazer uma requisiçã odo tipo GET 

	xhr.addEventListener("load", function(){ // Quando tiver carregada executa uma função pra mim (load = carregada)
	
	var erroAjax = document.querySelector("#erro-ajax");
	
		if (xhr.status == 200){
			erroAjax.classList.add("invisivel");
			var resposta = xhr.responseText;
			var pacientes = JSON.parse(resposta); // transformar um json em um array (ele entende o que é já)
			
			pacientes.forEach(function(paciente){
				adicionaPacienteNaTabela(paciente);
			}); 
		}else{
			console.log(xhr.status);
			console.log(xhr.responseText);
		}
	});

	xhr.send();
})