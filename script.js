const inputCep = document.getElementById('inputCep')
const tabela = document.getElementById('tabela')
const cep = document.getElementById('cep')
const logradouro = document.getElementById('logradouro')
const complemento = document.getElementById('complemento')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const ibge = document.getElementById('ibge')

let listaConsultas = []

function consultarCep() {

    let cepValue = inputCep.value.replace('-', '')

    if (cepValue == '') {
        return alert('Informe o CEP para consulta.')
    }

    if (cepValue.length < 8 || cepValue.length > 8) {
        return alert('Informe um CEP válido.')
    }

    url = `https://viacep.com.br/ws/${cepValue}/json/`

    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.erro) {
                return alert('CEP inválido.')
            } else {
                preencherCampos(json)
                inputCep.value = ''
            }
        })
        .catch(error => console.log(error))
}


function preencherCampos(json) {

    cep.value = json.cep
    logradouro.value = json.logradouro
    complemento.value = json.complemento
    bairro.value = json.bairro
    cidade.value = json.localidade
    uf.value = json.uf
    ibge.value = json.ibge
}

function limparCampos() {

    cep.value = ''
    logradouro.value = ''
    complemento.value = ''
    bairro.value = ''
    cidade.value = ''
    uf.value = ''
    ibge.value = ''
}


function salvarConsulta() {

    if (cep.value == '') {
        return alert('Para salvar, consulte o CEP.')
    }

    listaConsultas.push({
        cep: cep.value,
        logradouro: logradouro.value,
        complemento: complemento.value,
        bairro: bairro.value,
        cidade: cidade.value,
        uf: uf.value,
        ibge: ibge.value
    })

    mostrarConsultas()
}


function deletarConsulta(index) {
    listaConsultas.splice(index, 1)

    mostrarConsultas()
}


function mostrarConsultas() {

    while (tabela.firstChild) {

        numeroDeLinhas = tabela.getElementsByTagName('tr').length
        if (numeroDeLinhas == 1) {
            break
        }
        tabela.lastChild.remove()
    }

    listaConsultas.forEach((consulta, index) => {

        const novaLinha = document.createElement('tr')
        tabela.appendChild(novaLinha)

        const tdCep = document.createElement('td')
        tdCep.innerText = consulta.cep
        novaLinha.appendChild(tdCep)

        const tdLogradouro = document.createElement('td')
        tdLogradouro.innerText = consulta.logradouro
        novaLinha.appendChild(tdLogradouro)

        const tdComplemento = document.createElement('td')
        tdComplemento.innerText = consulta.complemento
        novaLinha.appendChild(tdComplemento)

        const tdBairro = document.createElement('td')
        tdBairro.innerText = consulta.bairro
        novaLinha.appendChild(tdBairro)

        const tdCidade = document.createElement('td')
        tdCidade.innerText = consulta.cidade
        novaLinha.appendChild(tdCidade)

        const tdUf = document.createElement('td')
        tdUf.innerText = consulta.uf
        novaLinha.appendChild(tdUf)

        const tdIbge = document.createElement('td')
        tdIbge.innerText = consulta.ibge
        novaLinha.appendChild(tdIbge)

        const tdBtnDeletar = document.createElement('td')
        novaLinha.appendChild(tdBtnDeletar)
        const btnDeletar = document.createElement('button')
        btnDeletar.innerText = 'Deletar'
        btnDeletar.setAttribute('onclick', `deletarConsulta(${index})`)
        btnDeletar.className = 'btnDeletar'
        tdBtnDeletar.appendChild(btnDeletar)
    })

    localStorage.setItem('consultas', JSON.stringify(listaConsultas))
    limparCampos()
}


function recarregarConsultas() {
    const consultasLocalStorage = localStorage.getItem('consultas')

    if (consultasLocalStorage) {
        listaConsultas = JSON.parse(consultasLocalStorage)
    }

    mostrarConsultas()
}


recarregarConsultas()