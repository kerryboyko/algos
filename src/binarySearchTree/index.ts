type TraversalOrder = "pre" | "post" | "in";

class TreeNode {
  public left: TreeNode | null = null;
  public right: TreeNode | null = null;
  constructor(public value: number) {}
}

export default class BinarySearchTree {
  constructor(public root: TreeNode | null = null) {}
  public addNode(value: number): boolean | never {
    const node = new TreeNode(value);
    if (this.root === null) {
      this.root = new TreeNode(value);
      return true;
    }
    let traversing = true;
    let currentNode = this.root;
    while (traversing) {
      if (node.value === currentNode.value) {
        traversing = false;
        return false; // duplicates are not accepted.
      }
      if (node.value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = node;
          traversing = false;
          return true;
        } else {
          currentNode = currentNode.left;
        }
      }
      if (node.value > currentNode.value) {
        if (!currentNode.right) {
          currentNode.right = node;
          traversing = false;
          return true;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    throw new Error(`Traversal is false but node not added`);
  }
  public breadthFirstTraversal(): number[] {
    if (this.root === null) {
      throw new TypeError("Cannot traverse an empty tree");
    }
    const queue: TreeNode[] = [this.root];
    const visited: number[] = [];
    let currentNode: TreeNode;
    while (queue.length > 0) {
      currentNode = queue.shift() as TreeNode;
      visited.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return visited;
  }
  public depthFirstTraversal(order: TraversalOrder = "pre"): number[] {
    if (order === "in") {
      return this.depthFirstTraversalInOrder();
    }
    const [first, second]: [keyof TreeNode, keyof TreeNode] =
      order === "pre" ? ["right", "left"] : ["left", "right"];
    if (this.root === null) {
      throw new TypeError("Cannot traverse an empty tree");
    }
    let visited: number[] = [];
    let currentNode = this.root;
    function traverse(node: TreeNode): void {
      // we ARE using a stack here, but it's the call stack!
      visited.push(node.value);
      if (node[first]) {
        traverse(node[first] as TreeNode);
      }
      if (node[second]) {
        traverse(node[second] as TreeNode);
      }
    }
    traverse(currentNode);
    return visited;
  }
  public depthFirstTraversalInOrder(): number[] {
    if (this.root === null) {
      throw new TypeError("Cannot traverse an empty tree");
    }
    let visited: number[] = [];
    let currentNode = this.root;
    function traverse(node: TreeNode): void {
      // we ARE using a stack here, but it's the call stack!
      if (node.left) {
        traverse(node.left as TreeNode);
      }
      visited.push(node.value);
      if (node.right) {
        traverse(node.right as TreeNode);
      }
    }
    traverse(currentNode);
    return visited;
  }
}
