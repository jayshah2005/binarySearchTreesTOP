import './style.css';
import Tree from './datastructures/Tree';
import Node from './datastructures/Node';

let arr = generateRandomArray(5,1000);

function generateRandomArray(elems, ceiling){
    let arr = []
    for(let i = 0; i < elems; i++){
        arr.push(Math.floor(Math.random()*ceiling))
    }
    return arr;
}


function callback(elem){
    console.log(elem + " ")
    return elem;

}

let test = new Tree(arr)

generateRandomArray(5, 1000).forEach((elem) => test.insert(elem))

test.prettyPrint(test.root)

console.log(test.isBalance(test.root))

test.rebalance();

test.prettyPrint(test.root)

console.log(test.isBalance(test.root))

test.inOrder(callback)

test.postOrder(callback)


console.log("It works!")