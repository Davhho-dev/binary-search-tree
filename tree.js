import Node from "../binary-search-tree/node.js"

const Tree = (arr) => {
    let root = null
    let sortArr = removeDuplicates(arr)
    root =  buildTree(sortArr, 0, sortArr.length - 1)

    const insert = (value) => {
        if (sortArr.includes(value)) return
        const node = Node(value)
        let current = root
        let prevNode = null
        while(current) {
            if (value < current.data) {
                prevNode = current
                current = current.left
            }else {
                prevNode = current
                current = current.right
            }
        }
        if(value < prevNode.data) prevNode.left = node
        else prevNode.right = node
        sortArr.push(value)
        prettyPrint(root)
    }

    const remove = (value) => {
        if (!sortArr.includes(value)) return null
        let current = root
        let prevNode = null
        //determine which subsection of the tree to work on
        while(current) {
            if(value < current.data) {
                prevNode = current
                current = current.left
            }else if (value > current.data){
                prevNode = current
                current = current.right
            }else {
                break
            }
        }  
        //left side
        if(prevNode === null) current = minChildNode(current)
        else if (value < prevNode.data) {
            if (current.left === null && current.right === null) prevNode.left = null
            else if (current.left === null && current.right !== null) prevNode.left = minChildNode(current.right)
            else if (current.left !== null && current.right === null) prevNode.left = minChildNode(current.left)
            else if (current.left !== null && current.right !== null) prevNode.left = minChildNode(current)

        } //right side 
        else if (value > prevNode.data) {
            if (current.left === null & current.right === null) prevNode.right = null
            else if (current.left === null && current.right !== null) prevNode.right = minChildNode(current.right)
            else if (current.left !== null && current.right === null) prevNode.right = minChildNode(current.left)
            else if (current. left !== null && current.right !== null) prevNode.right = minChildNode(current)
        }           
        prettyPrint(root)
    }
    prettyPrint(root)
    return {
        insert,
        remove
    }
}

//helper function to determine if child node contains children
function minChildNode(node) {
    let current = node
    let left = null
    let newNode = node
    while(current) {
        if (current.left === null & current.right === null) {
            current = current.left
            newNode.right = left
            return newNode
        }else if (current.right !== null) {
            current = current.right
            left = current
            if (current.left === null) {
                newNode.data = current.data
                newNode.right = current.right
                return newNode
            }else {
                while(current.left !== null) {
                    left = current
                    current = current.left
                }
                left.left = null
                newNode.data = current.data
                return newNode
            }
        }
    }
}

function compareNumbers(a, b) {
    return a - b
}

function removeDuplicates(arr) {
    let noDupArr = [];
    arr.forEach(value => {
        if (!noDupArr.includes(value)) noDupArr.push(value)
    })
    return noDupArr.sort(compareNumbers)
}

function buildTree(arr, start, end) {
    if (start > end) return null
    const middle = Math.ceil((start + end) / 2)
    const node = Node(arr[middle])
    node.left = buildTree(arr, start, middle - 1)
    node.right = buildTree(arr, middle + 1, end)
    return node
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


export default Tree