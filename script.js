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
      return false;
   }
   else if (dataNascimento[0] > dataFormatada[0] - 15){
      document.getElementById("erro").style.visibility = "visible";
      document.getElementById("erro").appendChild(document.createElement("p")).textContent = "O cadastro não é permitido para individuos com menos de 15 anos!"
      return false;
   }
   return true;

}

function verificaInteresse(){
   let interesse = document.getElementById("interesses").getElementsByTagName("input")
   let interessePreenchido = false;
   for(let i = 0; i < interesse.length; i++){
      if(interesse[i].checked){
         interessePreenchido = true;
         break;
      }
   }
   return interessePreenchido;
}

function verificaData(dNascimento){
   for(let i = 0; i < dNascimento.length; i++ ){
      if (dNascimento[i] === ''){
         return false;
      }
   }
   return true;
}

btnEnviar.addEventListener("click", (event)=>{

   let dataNascimento = document.getElementById("data").value
   let validou = true;

   dataNascimento = dataNascimento.split("-");

   console.log(dataNascimento)

   event.preventDefault();

   const erro = document.getElementById("erro");

   while (erro.firstChild) {
      erro.removeChild(erro.firstChild);
   }

   const dataAtual = new Date();
   const dataFormatada = [dataAtual.getFullYear(),dataAtual.getMonth() + 1,dataAtual.getDate()]


   if (!verificaData(dataNascimento)){
      document.getElementById("erro").style.visibility = "visible";
      document.getElementById("erro").appendChild(document.createElement("p")).textContent = "É necessário preencher todos os campos da data!"
      validou = false;
   }
   else if (!verificaAno(dataNascimento,dataFormatada,erro)){
    validou = false;
   };
   if (!verificaInteresse()){
      document.getElementById("erro").style.visibility = "visible";
      document.getElementById("erro").appendChild(document.createElement("p")).textContent = "É necessário preencher pelo menos um item da lista de interesses!"
      validou = false;
   }
   
   if (validou){
      document.getElementById("erro").style.visibility = "hidden";
      alert("Dados válidados com sucesso!")
   }
      
   

})


