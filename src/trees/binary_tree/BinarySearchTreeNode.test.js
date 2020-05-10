import BinarySearchTreeNode from './BinarySearchTreeNode';

const createNode = value => new BinarySearchTreeNode(value);

function testHeight(node, height, leftHeight, rightHeight, balanceFactor) {
  test(`Node height should be ${height}`, () => {
    expect(node.height).toBe(height);
  });

  test(`Left child node height should be ${leftHeight}`, () => {
    expect(node.leftHeight).toBe(leftHeight);
  });

  test(`Right child node height should be ${rightHeight}`, () => {
    expect(node.rightHeight).toBe(rightHeight);
  });

  test(`Balance factor should be ${balanceFactor}`, () => {
    expect(node.balanceFactor).toBe(balanceFactor);
  });


}

function testSetNodeMethod(message, node, method, field) {
  test(message, () => {
    const newNode = createNode(7);
    const oldNode = node[field];

    node[method](newNode);
    expect(node[field]).toBe(newNode);
    expect(node[field].parent).toBe(node);

    if (oldNode) {
      expect(oldNode.parent).toBeNull();
    }
  });
}

function testUncle(node, uncle) {
  test('Test uncle', () => {
    expect(node.uncle).toBe(uncle)
  })
}

function testSetNode(node) {
  testSetNodeMethod('Left node is assigned', node, 'setLeft', 'left');
  testSetNodeMethod('Right node is assigned', node, 'setRight', 'right');
}

function testValue(node, value) {
  test(`Value should be ${value}`, () => {
    expect(node.value).toBe(value);
  });

  const newValue = 7;
  test(`Test setValue(${newValue})`, () => {
    node.setValue(newValue);
    expect(node.value).toBe(newValue);
  })
}

function testRemoveChild(node, nodeToRemove, removedSide=null) {
  const isRemoved = removedSide !== null;
  const leftNode = node.left;
  const rightNode = node.right;
  test(`removeChild(nodeToRemove) returns ${isRemoved}`, () => {
    expect(node.removeChild(nodeToRemove)).toBe(isRemoved);
  });
  if (removedSide) {
    test(`Node on the ${removedSide} was removed`, () => {
      expect(node[removedSide]).toBeNull()
    })
  } else {
    test("Nodes weren't removed", () => {
      expect(node.left).toBe(leftNode);
      expect(node.right).toBe(rightNode);
    })
  }
}

function testTraverseInOrder(node, expected) {
  test('traverseInOrder() returns correct array', () => {
    expect(node.traverseInOrder()).toEqual(
    expect.arrayContaining(expected)
    );
  })
}

function testToString(node, expected) {
  test(`toString() returns ${expected}`, () => {
    expect(node.toString()).toBe(expected);
  })
}




function testReplaceChild(node, nodeToReplace, replacementNode, replacedSide=null) {
  const isReplaced = replacedSide !== null;
  const leftNode = node.left;
  const rightNode = node.right;

  test('Node comparator', () => {
    expect(node[replacedSide]).toBe(nodeToReplace);
    expect(node.nodeComparator.equal(nodeToReplace, node[replacedSide])).toBeTruthy();
  });

  test(`replaceChild(nodeToReplace, replacementNode) returns ${isReplaced}`, () => {
    expect(node.replaceChild(nodeToReplace, replacementNode)).toBe(isReplaced);
  });
  if (replacedSide) {
    test(`Node on the ${replacedSide} was replaced`, () => {
      expect(node[replacedSide]).toBe(replacementNode);
    })
  } else {
    test("Nodes weren't replaced", () => {
      expect(node.left).toBe(leftNode);
      expect(node.right).toBe(rightNode);
    })
  }
}

const getNodeAlias = node => node ? `node#${node.value}` : null;

function testFind(node, value, expectedNode) {
  test(`${getNodeAlias(node)}.find(${value}) returns ${getNodeAlias(expectedNode)}`, () => {
    expect(node.find(value)).toBe(expectedNode);
  });

  const contains = expectedNode !== null;

  test(`${getNodeAlias(node)}.contains(${value}) returns ${contains}`, () => {
    expect(node.contains(value)).toBe(contains)
  })
}

test('replaceChild() with no arguments', () => {
  const node = createNode(1);
  node.setLeft(createNode(2));
  expect(node.replaceChild()).toBe(false);
  expect(node.replaceChild(node.left)).toBe(false);
});

test('copyNode(sourceNode, targetNode)', () => {
  const targetNode = {
    setValue: jest.fn(),
    setLeft: jest.fn(),
    setRight: jest.fn(),
  };
  const sourceNode = createNode(6);

  BinarySearchTreeNode.copyNode(sourceNode, targetNode);
  expect(targetNode.setLeft).toHaveBeenCalledWith(sourceNode.left);
  expect(targetNode.setRight).toHaveBeenCalledWith(sourceNode.right);
  expect(targetNode.setValue).toHaveBeenCalledWith(sourceNode.value);
});

describe('Isolated node', () => {
  const value = 5;
  const node = createNode(value);
  testTraverseInOrder(node, [value]);
  testValue(node, value);
  testHeight(node, 0, 0, 0, 0);
  testSetNode(node);
  testUncle(node, undefined);
});

describe('Node with left child', () => {
  const node = createNode(1);
  node.setLeft(createNode(2));
  testTraverseInOrder(node, [2,1]);
  testToString(node, '2,1');
  testHeight(node, 1, 1, 0, 1);
  testUncle(node, undefined);

  testReplaceChild(node, node.left, createNode(10), 'left');
});

describe('Node with right child', () => {
  const node = createNode(1);
  node.setRight(createNode(2));
  testTraverseInOrder(node, [1,2]);
  testToString(node, '1,2');
  testHeight(node, 1, 0, 1, -1);
  testUncle(node, undefined);

  testReplaceChild(node, node.right, createNode(10), 'right');
});

describe('Node removal', () => {
  const node = createNode(2);
  node.setRight(createNode(3));
  node.setLeft(createNode(1));

  testRemoveChild(node, createNode(9));
  testRemoveChild(node, node.right, 'right');
  testRemoveChild(node, node.left, 'left');
});

describe('Root node\'s left and only child', () => {
  const node = createNode(1);
  createNode(2).setLeft(node);
  testTraverseInOrder(node, [1]);
  testToString(node, '1');
  testHeight(node, 0, 0, 0, 0);
  testUncle(node, undefined);
});

describe('Root node\'s right and only child', () => {
  const node = createNode(1);
  createNode(2).setRight(node);
  testTraverseInOrder(node, [1]);
  testToString(node, '1');
  testHeight(node, 0, 0, 0, 0);
  testUncle(node, undefined);
});

describe('Root node\'s left child', () => {
  const node = createNode(1);
  const root = createNode(1);
  root.setLeft(node);
  root.setRight(createNode(3));

  testTraverseInOrder(node, [1]);
  testToString(node, '1');
  testHeight(node, 0, 0, 0, 0);
  testUncle(node, undefined);
});

describe('2nd level child with alternative branch', () => {
  const node = createNode(1);
  const parent = createNode(2);
  parent.setLeft(node);

  const root = createNode(3);
  root.setLeft(parent);

  const uncle = createNode(4);
  root.setRight(uncle);

  root.setLeft(parent);

  parent.setLeft(node);
  root.setRight(uncle);
  testTraverseInOrder(node, [1]);
  testToString(node, '1');
  testHeight(root, 2, 2, 1, 1);
  testUncle(node, uncle);
});

function createTestTree1() {
  //   1
  //  / \
  // 0   3
  //    /
  //   2

  const nodes = [0,1,2,3].map(i => createNode(i));

  const root = nodes[1];

  root.setLeft(nodes[0]);
  root.setRight(nodes[3]);

  nodes[3].setLeft(nodes[2]);

  return nodes;
}

function createTestTree2() {
  //   1
  //  / \
  // 0   2
  //      \
  //       3

  const nodes = [0,1,2,3].map(i => createNode(i));

  const root = nodes[1];

  root.setLeft(nodes[0]);
  root.setRight(nodes[2]);

  nodes[2].setRight(nodes[3]);

  return nodes;
}

describe('Node search', () => {
  const nodes = createTestTree1();
  const root = nodes[1];

  testFind(root, 1, root);
  testFind(nodes[0], 2, null);
  testFind(root, 0, nodes[0]);
  testFind(root, 3, nodes[3]);
  testFind(root, 2, nodes[2]);
});

function expectLink(parent, edge, child) {
  expect(parent[edge]).toBe(child);
  if (!child) return;
  expect(child.parent).toBe(parent);
}

describe('findMin', () => {
  const nodes = createTestTree2();
  test('has left node', () => {
    expect(nodes[1].findMin()).toBe(nodes[0])
  });
  test('has no left nodes', () => {
    expect(nodes[2].findMin()).toBe(nodes[2])
  });

});

describe('Node removal', () => {

  test('Remove top node with left grandchild', () => {
    const nodes = createTestTree1();
    nodes[1].remove(1);
    expect(nodes[1].value).toBe(2);
    expect(nodes[3].left).toBeNull();
    expect(nodes[2].parent).toBeNull();
  });

  test('Remove top node with no left grand child', () => {
    const nodes = createTestTree2();
    nodes[1].remove(1);
    expect(nodes[1].value).toBe(2);
    expectLink(nodes[1], 'right', nodes[3]);
  });

  test('Remove node with only left child', () => {
    const nodes = createTestTree1();
    nodes[1].remove(3);
    expectLink(nodes[1], 'right', nodes[2]);
  });

  test('Remove node with only right child', () => {
    const nodes = createTestTree2();
    nodes[1].remove(2);
    expectLink(nodes[1], 'right', nodes[3]);
  });


  test('Remove top node which has only child', () => {
    const root = createNode(0);
    const right = createNode(2);
    right.setLeft(createNode(1));
    right.setRight(createNode(3));
    root.setRight(right);

    root.remove(0);
    expect(root.value).toBe(right.value);
    expect(root.left).toBe(right.left);
    expect(root.right).toBe(right.right);
    expect(root.parent).toBeNull();
  });


  test('1 node tree node removal', () => {
    const node = createNode(1);
    node.remove(1);
    expect(node.value).toBeUndefined()
  })
});

describe('Node insert', () => {

  test('Insert value same as root value', () => {
    const nodes = createTestTree1();
    nodes[1].insert(1);
    expect(nodes[1].value).toBe(1);
  });

  test('Insert lowest value', () => {
    const nodes = createTestTree2();
    nodes[1].insert(-1);
    expect(nodes[0].left).not.toBeNull();
    expect(nodes[0].left.value).toBe(-1);
  });

  test('Insert lowest value', () => {
    const nodes = createTestTree1();
    nodes[1].insert(5);
    expect(nodes[3].right).not.toBeNull();
    expect(nodes[3].right.value).toBe(5);
  });
});

