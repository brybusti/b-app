/*
Written By: Bryan Bustillos
Date: 1/14/20
*/

//return(solutions(RandomGrid(), lex) === true);
// Fills in boolean visited array with false
function arrBool(rows, cols){
    let visited = new Array(rows).fill(false).map(row => Array(cols).fill(false));
    return(visited);
} // End of method

// TRIE (Dictionary)
class TrieNode{
    constructor(letter = ''){
        this.val = letter;              // Letter at node
        this.children = {};             // Children of node
        this.completeString = false;    // String completion boolean
    } // End of constructor
} // End of TrieNode

class Trie{
    constructor(){
        this.rootNode = new TrieNode(); // Holds root node
    } // End of constructor

    // Insert string into trie
    insert(word) {
        if(word === undefined)
            return;

        let node = this.rootNode

        for(let i = 0; i < word.length; i++){
            let curLetter = word[i]; 

            if(node.children[curLetter]){
                node = node.children[curLetter];
            } // End of if
            else{
                let newNode = new TrieNode(curLetter);
                node.children[curLetter] = newNode;
                node = newNode;
            } // End of else
        } // End of loop

        node.completeString = true;
    } // End of insert method

    // Find string in trie
    find(word){
        let node = this.rootNode;
        let cnt = 0; 

        for(let i = 0; i < word.length; i++){
            let curLetter = word[i]; 

            if(node.children[curLetter])
                node = node.children[curLetter];
            else
                return(false);

            cnt++;  // Keep track of word size
        } // End of for loop

        return (node.completeString && cnt > 2);
    } // End of find method
} // End of Trie class

// Checks if grid movement is possible
function check(i, j, visited){
    return(i >= 0 && i < visited.length && j >= 0 && j < visited.length && !visited[i][j]);
} // End of check method

// Traverses grid recursively
function gridSearch(i, j, visited, arr, str, myTrie, sol){

    // Pre-condition check that currently sent indexes are safe and have not been visited
    if(check(i, j, visited)){
        visited[i][j] = true; // Sets current position to visited

        // Run through the 8 possible moves from given node
        if(check(i + 1, j + 1, visited))
            gridSearch(i + 1, j + 1, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i, j + 1, visited))
            gridSearch(i, j + 1, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i - 1, j + 1, visited))
            gridSearch(i - 1, j + 1, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i + 1, j, visited))
            gridSearch(i + 1, j, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i + 1, j - 1, visited))
            gridSearch(i + 1, j - 1, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i, j - 1, visited))
            gridSearch(i, j - 1, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i - 1, j - 1, visited))
            gridSearch(i - 1, j - 1, visited, arr, str + arr[i][j], myTrie, sol);
        if(check(i - 1, j, visited))
            gridSearch(i - 1, j, visited, arr, str + arr[i][j], myTrie, sol);
        
        // Check if string is found in trie
        if(myTrie.find(str.toLowerCase()))
            sol.add(str.toLowerCase());    
    } // End of initital if
    // Reset visited array to false
    visited[i][j] = false;
} // End of gridSearch method

// Find and return the solutions to the given grid & dictionary
export default function solutions(arr, dict) {
    // Needed variables 
    var sol = new Set();                        // Stores found dictionary words 
    var myTrie = new Trie();                    // Create trie to hold dictionary words 
    var str = "";                               // String to hold characters from traversal
    var visited = arrBool(arr.length, arr.length);  // Creat new boolean array and fill elements with false

    
    // Insert dictionary words into trie
    for(let i = 0; i < dict.length; i++){
        myTrie.insert(dict[i].toLowerCase());
    }
        

    // Run through all possible root nodes in given grid
    for(let t = 0; t < arr.length; t++)
        for(let a = 0; a < arr.length; a++)
                gridSearch(t, a, visited, arr, str, myTrie, sol);
            
    // Create array to be returned from solution set
    //let sortSol = Array.from(sol);
    
    // Return solution set
    return(sol);
} // End of solutions function