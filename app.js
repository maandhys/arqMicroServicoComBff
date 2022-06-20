const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');

app.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startsWith('/identidade'))
        return 'http://localhost:4000/identidade/';
    else if (req.path.startsWith('/catalogo'))
        return 'http://localhost:4001/catalogo/'
    else if (req.path.startsWith('/carrinho_compras'))
        return 'http://localhost:4002/carrinho_compras/'
    else if (req.path.startsWith('/pedidos'))
        return 'http://localhost:4003/pedidos/'
}


app.use((req, res, next) => httpProxy(selectProxyHost(req))(req, res, next));

app.listen(10000, () => { console.log('Gateway de API rodando!'); });