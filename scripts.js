const key = "36843e4fb23b5f9b756fdef3180ea71d";

function colocarDadosNaTela(dados) {
    // Verifica se os elementos existem antes de atualizá-los
    const cidadeElement = document.querySelector(".cidade");
    const tempElement = document.querySelector(".temp");
    const textoPrevisaoElement = document.querySelector(".texto-previsao");
    const umidadeElement = document.querySelector(".umidade");
    const imgPrevisaoElement = document.querySelector(".img-previsao");

    if (cidadeElement && tempElement && textoPrevisaoElement && umidadeElement && imgPrevisaoElement) {
        cidadeElement.innerHTML = "Tempo em " + dados.name;
        tempElement.innerHTML = Math.floor(dados.main.temp) + "°C";
        textoPrevisaoElement.innerHTML = dados.weather[0].description;
        umidadeElement.innerHTML = "Umidade: " + dados.main.humidity + "%";
        imgPrevisaoElement.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    } else {
        console.error("Um ou mais elementos não foram encontrados no DOM.");
    }
}

async function BuscarCidade(cidade) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }
        const dados = await resposta.json();
        console.log(dados); // Verifique os dados no console
        colocarDadosNaTela(dados);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Cidade não encontrada. Verifique o nome e tente novamente.");
    }
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    BuscarCidade(cidade);
}