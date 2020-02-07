import React from 'react';
import solutions from './boggle_solver';
import jsonDictionary  from './full-wordlist.json';

var dict = Array.from(jsonDictionary.words);


export default function giveSolution(gridItems){
    var answer = solutions(gridItems, dict);
    return(answer);
}

