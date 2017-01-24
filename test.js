
var what = function(email) {
  if (email[0] === '@' || email[email.length -1 ] === '@' || !email.includes('@')) {
    return false
  }

  return email.split('@').map(word => {
    console.log(word)
    return word;
  }).some(parts => {
    return /[A-Za-z0-9.]/.test(parts)
  })
}

var checkPhone = function(phone) {
  if (!/[0-9- ]/) {
    return false;
  }


  return phone.split('').map(val => {
    return parseInt(val)
  }).filter(num => {
    return !isNaN(num)
  }).length >= 6;
}
//         8
//     5       6
// 4     9   1    7
//   3


class BinaryTreeNode {
constructor(value) {
this.value = value;
this.left = null;
this.right = null;
}
}


const nBinaryTree = new BinaryTreeNode(1);
nBinaryTree.left = new BinaryTreeNode(2);
nBinaryTree.right = new BinaryTreeNode(3);
nBinaryTree.left.left = new BinaryTreeNode(4);
nBinaryTree.left.right = new BinaryTreeNode(5);
nBinaryTree.right.left = new BinaryTreeNode(6);
nBinaryTree.right.right = new BinaryTreeNode(7);
nBinaryTree.left.left.right = new BinaryTreeNode(8);


function serial(tree) {
//

var results = ''
function recurse(binary) {
if (!binary) {
  results += 'n'
  return;
}
results += binary.value;
recurse(binary.left);
recurse(binary.right);

}

recurse(tree)

return results;
}

// console.log('serial', serial(nBinaryTree));
//         1
//     2       3
// 4      5  6    7
//   8
function deserial(string) {
// var tree = new BinaryTreeNode(string.charAt(0));
var array = string.split('');
var index = 0;
function recurse(arr) {
if (index >= arr.length || arr[index] === 'n') {
  index++;
  return;
}

var tree = new BinaryTreeNode(arr[index]);
index++;
tree.left = recurse(arr);
tree.right = recurse(arr);
// console.log('tree', tree)
return tree;
}

return recurse(array)

// return tree;


// return tree
}

console.log(JSON.stringify(deserial(serial(nBinaryTree), null, 9)))
