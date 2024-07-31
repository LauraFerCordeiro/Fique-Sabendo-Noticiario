
function enviar(event) {
    event.preventDefault();
    let elem = event.target;
    let elem1 = elem.parentElement.parentElement;

    let ipt1 = document.getElementsByClassName("campo1")[0].value;
    let ipt2 = document.getElementsByClassName("campo2")[0].value;
    let ipt3 = document.getElementsByClassName("campo3")[0].value;
    let ipt4 = document.getElementsByClassName("campo4")[0].value;

    const index = listaCtg.indexOf(ipt1);
    if (index !== -1) {
        ipt1 = index + 1;
    }

    if (ipt1 != "" && ipt2 != "" && ipt2 != "" && ipt3 != "" && ipt4 != "") {
        let dados = {
            titulo: ipt2,
            subtitulo: ipt3,
            conteudo: ipt4,
            idCategoria: ipt1,
        }

        let params = new URLSearchParams();
        for (let chave in dados) {
            params.append(chave, dados[chave]);
        }
        let query = params.toString();
        let options = {
            method: "POST",
            body: query,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }
        fetch("https://ifsp.ddns.net/webservices/noticiario/noticias", options)
            .then(resposta => {
                if(!resposta.ok) {
                    throw new Error("Erro no cadastro");
                }
                return resposta.json();
            })
            .then((dados) => {
                ipt1 = document.getElementsByClassName("campo1")[0].value = "";
                ipt2 = document.getElementsByClassName("campo2")[0].value = "";
                ipt3 = document.getElementsByClassName("campo3")[0].value = "";
                ipt4 = document.getElementsByClassName("campo4")[0].value = "";

                //alert("Notícia cadastrada com sucesso!");
                toastr.success("Notícia cadastrada com sucesso!");
            })
            .catch((erro) => {
                toastr.error(erro);
            })
    }

    else {
        //alert("Preencha todos os campos!")
        toastr.warning("Preencha todos os campos!");
    }
}

function deletar(e, a) {
    let elem = e.target;
    console.log(e)
    let options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }
    fetch("https://ifsp.ddns.net/webservices/noticiario/noticias/" + a, options)
    .then(resposta => {
        if(!resposta.ok) {
            throw new Error("Erro ao carregar notícias!");
        }
        return resposta.json();
    })
    .then((dados) => {
        e.remove();
        //alert("Notícia deletada com sucesso!");
        toastr.success("Notícia deletada com sucesso!");
        veri = veri-1
        teste(veri);
    })
    .catch((erro) => {
        toastr.error(erro);
    })
   
}

function teste(v){
    let sec = document.querySelector("section")
    console.log(v)
    if (v < 1){
        div1.append(p);
        div.append(div1);
        sec.append(div);
        mensagem(div, div1, p, t2);
    }
}

function resetar(event) {
    let elem = event.target;
    let elem1 = elem.parentElement.parentElement;

    document.getElementsByClassName("campo1")[0].value = "";
    document.getElementsByClassName("campo2")[0].value = "";
    document.getElementsByClassName("campo3")[0].value = "";
    document.getElementsByClassName("campo4")[0].value = "";

    event.preventDefault();
}

function cadastrar(event) {
    let elem = event.target;

    let elemento = document.querySelector("section");
    elemento.innerHTML = "";

    if (elemento.children.length == 0) {
        let formulario = document.createElement("form");

        let p1 = document.createElement("p");
        p1.setAttribute("class", "legenda");
        let p2 = document.createElement("p");
        let p3 = document.createElement("p");
        p3.setAttribute("class", "legenda");
        let p4 = document.createElement("p");
        let p5 = document.createElement("p");
        p5.setAttribute("class", "legenda");
        let p6 = document.createElement("p");
        let p7 = document.createElement("p");
        p7.setAttribute("class", "legenda");
        let p8 = document.createElement("p");


        let t1 = document.createElement("h3");
        let novoT1 = t1.innerText = "Categoria";
        let texto1 = document.createElement("select");
        let navegador = document.querySelector("nav");

        for (let i = 1; i < navegador.children.length; i++) {
            let opcao = document.createElement("option");
            let botao = navegador.children[i].innerText;
            opcao.innerText = botao;
            texto1.append(opcao);
        }

        let t2 = document.createElement("h3");
        let novoT2 = t2.innerText = "Título";
        let texto2 = document.createElement("input");

        let t3 = document.createElement("h3");
        let novoT3 = t3.innerText = "Subtítulo";
        let texto3 = document.createElement("input");

        let t4 = document.createElement("h3");
        let novoT4 = t4.innerText = "Conteúdo";
        let texto4 = document.createElement("textarea");

        texto1.setAttribute("class", "input input2 campo1");
        texto2.setAttribute("class", "input campo2");
        texto3.setAttribute("class", "input campo3");
        texto4.setAttribute("class", "input input1 campo4");

        let div = document.createElement("div");

        let b_enviar = document.createElement("button");
        b_enviar.setAttribute("class", "outroBotao botaoEnviar");
        b_enviar.innerText = "Enviar";
        b_enviar.addEventListener('click', enviar);

        let b_resetar = document.createElement("button");
        b_resetar.setAttribute("class", "outroBotao botaoResetar");
        b_resetar.innerText = "Resetar";
        b_resetar.addEventListener('click', resetar);

        p1.append(novoT1);
        p2.append(texto1);
        p3.append(novoT2);
        p4.append(texto2);
        p5.append(novoT3);
        p6.append(texto3);
        p7.append(novoT4);
        p8.append(texto4);

        div.append(b_enviar, b_resetar);
        formulario.append(p1, p2, p3, p4, p5, p6, p7, p8, div);
        elemento.append(formulario);
    }
}

function mensagem(div, div1, p,t) {
    div1.append(p);
    div.append(div1);
    div.setAttribute("class", "mensagem1");
    div1.setAttribute("class", "mensagem");
    p.innerText = "Nenhuma notícia cadastrada.";
    t.append(div)
}

function categorias(id, t, st, c, d, e, informacoes) {
    let dados1 = document.createElement("div")

    let ttl = document.createElement("p");
    ttl.setAttribute("class", "titulo");
    let ttl1 = document.createElement("h2");
    ttl1.innerText = t;
    ttl.append(ttl1);

    let sbttl = document.createElement("p");
    sbttl.setAttribute("class", "subtitulo");
    let sbttl1 = document.createElement("h3");
    sbttl1.innerText = st;
    sbttl.append(sbttl1);

    let ctd = document.createElement("div");
    ctd.setAttribute("class", "conteudo");
    let ctd1 = document.createElement("p");
    ctd1.innerText = c;
    ctd.append(ctd1);

    let edtv = e;

    let dt = document.createElement("p");
    dt.setAttribute("class", "data");
    let dt1 = document.createElement("p");
    dt1.innerText = d;
    dt.append(dt1);

    let botao = "";
    if (edtv == 1) {
        botao = document.createElement("p");
        botao.setAttribute("class", "botao2");
        let dlt = document.createElement("button");
        dlt.setAttribute("class", "edicao");
        dlt.innerText = "Deletar";
        dlt.addEventListener('click', function () {
            deletar(dados1, id)
        });

        botao.append(dlt);
    }
    dados1.append(ttl, sbttl, ctd, dt, botao);
    informacoes.append(dados1);
}


function conteudo(e) {
    veri = 0
    let elem = e.target;
    //console.log(elem);
    div.remove()
    let elemento = document.querySelector("section");
    elemento.innerHTML = ""
    informacoes.innerHTML = "";
    console.log(elemento)
    t2.innerText = elem.innerText;
    t2.setAttribute("class", "t");
    console.log(t)
    t.append(t2);
    elemento.append(t);

    const index = listaCtg.indexOf(elem.innerText);
    if (index !== -1) {
        ipt1 = index + 1;
    }

    fetch(bd)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Houve algum erro");
            }
            return resposta.json();
        })
        .then(dados => {
            let conteudo = document.querySelector("section");
            informacoes.innerHTML = "";
            for (a of dados) {

                if (a.idCategoria == ipt1) {
                    console.log(div)

                    let id = a.id;
                    let t = a.titulo;
                    let st = a.subtitulo;
                    let c = a.conteudo;
                    let d = a.data;
                    let e = a.editavel;

                    categorias(id, t, st, c, d, e, informacoes);
                    //console.log(informacoes);
                    conteudo.append(informacoes);
                    console.log(informacoes)
                    veri++
                }
            }
            if(veri < 1){
                informacoes.innerHTML = "";
                mensagem(div, div1, p,t);
            }else{
                div.remove()
            }
    
            
        })
        .catch(erro => {
            console.error("Erro encontrado: ", erro);
        });
        console.log(t)       
}


let bd = "https://ifsp.ddns.net/webservices/noticiario/noticias";
let listaCtg = [];
fetch("https://ifsp.ddns.net/webservices/noticiario/categorias")
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Houve algum erro");
        }
        return resposta.json();
    })
    .then(dados => {
        let nav = document.querySelector("nav");

        for (b of dados) {
            let cat = document.createElement("button");
            cat.setAttribute("class", "botao categoria");
            cat.innerHTML = b.nome;
            cat.addEventListener('click', conteudo);
            nav.append(cat);
            listaCtg.push(b.nome);
        }
    })
    .catch(erro => {
        console.error("Erro encontrado: ", erro);
    });

let envio = document.getElementsByClassName("botaoEnviar");
for (let env of envio) {
    env.addEventListener('click', enviar);
}

let div = document.createElement("div");
let div1 = document.createElement("div");
let p = document.createElement("p");
let t = document.createElement("div");
let t2 = document.createElement("p");
let veri = 0

let dlt = document.getElementsByClassName("deletar");
for (let d of dlt) {
    d.addEventListener('click', deletar);
}


let rest = document.getElementsByClassName("botaoResetar");
for (let rst of rest) {
    rst.addEventListener('click', resetar);
}


let cad = document.getElementsByClassName("cadastro");
for (let c of cad) {
    c.addEventListener('click', cadastrar);
}

let informacoes = document.createElement("div");
