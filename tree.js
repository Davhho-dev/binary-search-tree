import Node from "../binary-search-tree/node.js"

const Tree = (arr) => {
    let root = null
    let sortArr = removeDuplicates(arr)
    root =  buildTree(sortArr, 0, sortArr.length - 1)
    prettyPrint(root)
}


function compareNumbers(a, b) {
    return a - b
}

function removeDuplicates(arr) {
    let noDupArr = [];
    arr.forEach(value => {
        if(!noDupArr.includes(value)) noDupArr.push(value)
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