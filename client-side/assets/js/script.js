import chamarApi from "./modules/chamarApi.js";
import exibirProdutos from "./modules/catalogoHomePage/exibirProdutos.js";
import initCategorias from "./modules/catalogoHomePage/categorias.js";
import quantidadeProdutos from "./modules/catalogoHomePage/quantidadeProdutos.js";
import barraDeBusca from "./modules/catalogoHomePage/barraDeBusca.js";
import initModal from "./modules/modal/initModal.js";
import initCarrinho from "./modules/carrinhoHomePage/initCarrinho.js";
import initLogin from "./modules/login/initLogin.js";

const env = await chamarApi("http://localhost:3000/env");

const urlProdutos = env.GET_PRODUTOS;
const produtos = await chamarApi(urlProdutos);

const urlCategorias = env.GET_CATEGORIAS;
const categorias = await chamarApi(urlCategorias);

exibirProdutos(produtos);
initCategorias(produtos, categorias);
quantidadeProdutos(produtos.length);
barraDeBusca(produtos);
initModal(produtos);
initCarrinho();
initLogin();
