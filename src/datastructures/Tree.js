import Node from './Node'

// This is a binary tree
// Methods:
// Build tree
// Insert(value)
// deleteItem(value)

export default class Tree{

    root

    constructor(arr){
        this.root = this.buildTree(arr)
    }

    isBalance(root){

        if(root == null) return 0

        let rh = this.isBalance(root.right)
        if(rh == -1) return -1

        let lh = this.isBalance(root.left)
        if(lh == -1) return -1

        if(Math.abs(lh - rh) > 1) return -1
        else return 1 + Math.max(rh, lh)

    }

    rebalance(){
        let arr = this.traversal().sort((a, b) => a > b ? 1 : -1)
        console.log(arr);
        this.root = this.buildTree(arr)
    }

    traversal(){
        let que = []
        let arr = []
        let curr;
        que.push(this.root)

        while(que.length != 0){
            curr = que.pop();

            if(curr.left != null) que.push(curr.left)
            if(curr.right != null) que.push(curr.right)

            arr.push(curr.value)
        }

        return arr;
    }

    depth(node){

        if(node == null) return Error("Node is null")

        function findRoot(root, node){

            if(root === node) return 0;

            if(root.right != null && root.value < node.value) return 1 + findRoot(root.right, node)
    
            if(root.left != null && root.value > node.value) return 1 + findRoot(root.left, node)
        
        }
        return findRoot(this.root, node) || Error("Node does not exist")

    }


    height(node){

        if(node != null) {
            return 1 + 
            (this.height(node.right) > this.height(node.left) ? 
            this.height(node.right) :
            this.height(node.left))
        } else return 0;

    }
    postOrder(callback){
        
        function postOrderTraversal(root, callback){

            if(root == null) return

            root.value = callback(root.value)

            if(root.right != null) postOrderTraversal(root.right, callback)
    
            if(root.left != null) postOrderTraversal(root.left, callback)


        }
        postOrderTraversal(this.root, callback)
    }

    inOrder(callback){
        
        function inOrderTraversal(root, callback){

            if(root == null) return

            root.value = callback(root.value)

            if(root.right != null) inOrderTraversal(root.right, callback)
    
            if(root.left != null) inOrderTraversal(root.left, callback)


        }
        inOrderTraversal(this.root, callback)
    }

    preOrder(callback){
        
        function preOrderTraversal(root, callback){

            if(root == null) return

            if(root.right != null) preOrderTraversal(root.right, callback)
            
            root.value = callback(root.value)

            if(root.left != null) preOrderTraversal(root.left, callback)


        }
        preOrderTraversal(this.root, callback)
    }

    levelOrder(callback){
        let que = []
        let curr;
        que.push(this.root)

        while(que.length != 0){
            curr = que.pop();

            if(curr.left != null) que.push(curr.left)
            if(curr.right != null) que.push(curr.right)

            curr.value = callback(curr.value)
        }
        
    }

    find(value){
        let que = []
        let curr;
        que.push(this.root)

        while(que.length != 0){
            curr = que.pop();

            if(curr.left != null) que.push(curr.left)
            if(curr.right != null) que.push(curr.right)

            if(curr.value === value) return value
        }

        return null
    }

    deleteItem(value){

        function deleteNode(root, key) {
            if(root === null) return root;

            if(root.value > key) {
                root.left = deleteNode(root.left, key)
                return root;
            }
            else if(root.value < key) {
                root.right = deleteNode(root.right, key)
                return root;
            }
            else{
                if(root.right === null && root.left === null) return null;

                if(root.right != null && root.left != null){
                    // Node with two children: 
                    //Get the inorder successor (smallest in the right subtree)
                    
                    root.value = minValue(root.right);

                    root.right = deleteNode(root.right, root.value)
                }

                if(root.right != null){
                    root = root.right
                } else{
                    root = root.left
                }

                return root;
            }
        }

        function minValue(node) {
            let minv = node.value;
            while (node.left !== null) {
                minv = node.left.value;
                node = node.left;
            }
            return minv;
        }

        deleteNode(this.root, value)
    }

    insert(value){
        let p = this.root

        while(true){
            if(p.value < value){
                if(p.right == null) {
                    p.right = new Node(value)
                    return
                }
                p = p.right
            }else if(p.value > value){
                if(p.left == null) {
                    p.left = new Node(value)
                    return
                }
                p = p.left
            }else{
                throw Error("The value already exists.")
            }
        }
    }

    buildTree(arr){
        let mid = Math.floor(arr.length/2)

        if(arr.length == 0) return null

    
        let temp = new Node(arr[mid])
        temp.left = this.buildTree(arr.slice(0, mid))
        temp.right = this.buildTree(arr.slice(mid + 1, arr.length))
    
    
        return temp;
    }

    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };

}