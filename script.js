let btnEnviar = document.getElementById("enviar")
const anoMinimo = 1900

function faixaValida (min, max, entrada){
   if (entrada < min || entrada > max ){
      return false;
   }
   else {
      return true;
   }
}

function verificaAno(dataNascimento,dataFormatada,erro){

   if (!faixaValida(anoMinimo,dataFormatada[0],dataNascimento[0])){
      document.getElementById("erro").style.visibility = "visible";
      document.getElementById("erro").appendChild(document.createElement("p")).textContent = "Ano fora de padrão! Insira um ano entre 1900 e " + dataFormatada[0]
   }
   else if (dataNascimento[0] > dataFormatada[0] - 15){
      document.getElementById("erro").style.visibility = "visible";
      document.getElementById("erro").appendChild(document.createElement("p")).textContent = "O cadastro não é permitido para individuos com menos de 15 anos!"
   }

}

function verificaInteresse(){
   let interesse = document.getElementById("interesses").getElementsByTagName("input")
   let interessePreenchido = false;
   for(let i = 0; i < interesse.length; i++){
      if(interesse[i].checked===true){
         interessePreenchido = true;
         break;
      }
   }
}


btnEnviar.addEventListener("click", (event)=>{

   event.preventDefault();



   const erro = document.getElementById("erro");

   while (erro.firstChild) {
      erro.removeChild(erro.firstChild);
   }

   let dataNascimento = document.getElementById("data").value
   dataNascimento = dataNascimento.split("-");

   const dataAtual = new Date();
   const dataFormatada = [dataAtual.getFullYear(),dataAtual.getMonth() + 1,dataAtual.getDate()]
   console.log(dataFormatada);

   verificaAno(dataNascimento,dataFormatada,erro);
   if (!verificaInteresse()){
      document.getElementById("erro").style.visibility = "visible";
      document.getElementById("erro").appendChild(document.createElement("p")).textContent = "É necessário preencher pelo menos um item da lista de interesses!"
   }

})


