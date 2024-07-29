import './style.css';
import Tree from './datastructures/Tree';
import Node from './datastructures/Node';

let arr = [1, 3, 4, 5, 6, 7]

let test = new Tree(arr)

test.insert(9)
test.insert(2)
test.insert(10)
test.insert(11)
test.deleteItem(5)

test.depth(test.root)

test.prettyPrint(test.root)

console.log(test.depth(test.root.right.right))

test.rebalance()
test.prettyPrint(test.root)


console.log("It works!")