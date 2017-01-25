(function(){

	//Cuando el formulario se envíe, haga las acciones de adentro
	$("#calculate").on("submit", function(e){
		//función para que no se resfresque la página cuando se recargue
		e.preventDefault();
		
		//declaracion de variables iniciales
		var formula 	= $("#formula").val();
		var molecula 	= formula.split("");
		var parentesis 	= [];
		var respuesta 	= [];
		var contador	= 0;
		var contar 		= molecula.length;
		var indicador	= 0;
		var next		= 0;
		var last		= 0;

		//se condiciona para que se recorra el arreglo dependiendo del numero de objetos que tenga
		while (contador < contar) {
				
				//se pregunta si el objeto del arreglo es un parentesis
				if (molecula[contador] == "(" || molecula[contador] == ")"  ) {
					
					if (molecula[contador] == "(") {
						indicador = 1;
						contador++
					}else{
						indicador = 0;
						next = contador+1;

						//se suman los valores del arreglo para los valores que estaban dentro del parentesis
						var sum = 0
						$.each(parentesis,function() {
						    sum += this;
						});
						
						//sum = parentesis suma;
						contador++
						sum = Number(molecula[next])*sum;
						respuesta.push(sum);
						
						contador++
					};
				}	//se pregunta si el objeto del arreglo es un numero
				else if (!isNaN(molecula[contador])) {
					
					num = molecula[contador];
					next = contador+1;
					
					//mientras que haya un elemento siguiente en el arreglo y este sea un numero, estos se van a juntar
					while (molecula[next] && !isNaN(molecula[next])) {
						num = num+Number(molecula[next])
						next++
						contador++
					}		
					num--;
					num = last * Number(num);
								
					//si el elemento este dentro de un parentesis, guarde en el arreglo parentesis el resultado, de lo contrario, guardelo en el arreglo del resultado final
					if (indicador == 1) {
						parentesis.push(num);
					}else{
						respuesta.push(num);
					};
					contador++;
				}else{
					
					element = molecula[contador];
					next = contador+1;
					
					//se pregunta si existe una letra minuscula en el objeto siguiente al arreglo para unirla a este objeto
					if (molecula[next] && molecula[next] === molecula[next].toLowerCase() && isNaN(molecula[next]) && molecula[next] != ")") {
						
						element = molecula[contador]+molecula[next];
						contador++;
					};			

					//se busca el elemento en los documentos de elementos
					var url = "elements/"+element+".json"
					var dataElement;
					$.ajax({
					  url: url,
					  async: false,
					  dataType: 'json',
					  success: function (data) {
					    dataElement = Number(data.peso);
					  }
					});

					//si el elemento este dentro de un parentesis, guarde en el arreglo parentesis el resultado, de lo contrario, guardelo en el arreglo del resultado final
					if (indicador == 1) {
							parentesis.push(dataElement);
					}else{
							respuesta.push(dataElement);
					};

					//se guarda el peso del elemento en caso de que se tenga que multiplicar despues
					last = dataElement;
					contador++
				};
				
		};

		//se suma el arreglo de resultados para obtener el resultado final
		var total = 0
		$.each(respuesta,function() {
		    total += this;
		});

		$("#message").removeClass("hide");
		$("#total").text(total);
		console.log("asd")
	})

})();