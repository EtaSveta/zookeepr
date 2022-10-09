const { request } = require('express');
const express = require('express');

const app = express();

const { animals } = require('./data/animals.json')


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if(query.personalityTraits) {
        //save pers traits as a dedicated array
        //if personalityTraits  is a string, place it into a new array and save
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits]
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        // loop through each trait i the personalityTraits array:
        personalityTraitsArray.forEach(trait => { 
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });