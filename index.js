const axios = require('axios');
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: { count: '5', wordLength: '5' },
        headers: {
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        },
    };

    app.get('/check', (req, res) => {
        const word = req.query.word;

        const options = {
            method: 'GET',
            url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
            params: { entry: word },
            headers: {
                'x-rapidapi-host':
                    'twinword-word-graph-dictionary.p.rapidapi.com',
                'x-rapidapi-key': process.env.RAPID_API_KEY,
            },
        };
        axios
            .request(options)
            .then((response) => {
                res.json(response.data.result_msg);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            res.json(response.data[0]);
        })
        .catch(function (error) {
            console.error(error);
        });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});
