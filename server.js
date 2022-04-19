import minimist from 'minimist';
import express from 'express';

import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs";

//const express = require('express');
const app = express();

const args = minimist(process.argv.slice(2))
args['port']
const port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

// coin code

function coinFlip() {
    var flip = Math.random();
    var result;
    if (flip < 0.5) {
        result = "heads"
    } else {
        result = "tails";
    }
    return result;
}

function coinFlips(flips) {
    var flipList = new Array();
    for (var i = 0; i < flips; i++) {
        flipList.push(coinFlip());
    }
    return flipList;
}

function countFlips(array) {
    var headCount = 0;
    var tailsCount = 0;
    var index = 0;
    while (index < array.length) {
        if (array[index] == "heads") {
            headCount = headCount + 1;
        } else {
            tailsCount = tailsCount + 1;
        }
        index++;

    }
    return { tails: tailsCount, heads: headCount }
}

export function flipACoin(call) {
    var flip = coinFlip();
    var result;
    if (flip == call) {
        result = "win";
    } else {
        result = "lose";
    }
    return { call: call, flip: flip, result: result }
}


app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/flip', (req, res) => {
    res.status(200);
    res.type('text/plain')
    res.json({ 'flip': coinFlip() })
});

app.get('/app/flips/:number/', (req, res) => {
    res.status(200);
    var flips = req.params.number;
    var results = coinFlips(flips)
    res.json({
        'raw': results,
        'summary': countFlips(results)
    })
});

app.get('/app/flip/call/heads/', (req, res) => {
    res.status(200);
    res.json(flipACoin('heads'));
});

app.get('/app/flip/call/tails/', (req, res) => {
    res.status(200);
    res.json(flipACoin('tails'));
});

app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
});