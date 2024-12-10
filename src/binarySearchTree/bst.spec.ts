import BinarySearchTree from ".";

describe("BinarySearchTree", () => {
  const bst = new BinarySearchTree();
  [10, 15, 6, 3, 8, 20, 11, 0].forEach((value) => bst.addNode(value));
  it("correctly adds data", () => {
    expect(bst.root).not.toBeNull();
  });
  it("traverses the node breadth first", () => {
    expect(bst.breadthFirstTraversal()).toEqual([10, 6, 15, 3, 8, 11, 20, 0]);
  });
  it("traverses the node depth first preorder", () => {
    expect(bst.depthFirstTraversal("pre")).toEqual([
      10, 15, 20, 11, 6, 8, 3, 0,
    ]);
  });
  it("traverses the node depth first postorder", () => {
    expect(bst.depthFirstTraversal("post")).toEqual([
      10, 6, 3, 0, 8, 15, 11, 20,
    ]);
  });
  it("traverses the node depth first inorder", () => {
    expect(bst.depthFirstTraversal("in")).toEqual([0, 3, 6, 8, 10, 11, 15, 20]);
  });
});
