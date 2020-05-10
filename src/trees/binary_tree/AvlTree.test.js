import AvlTree from './AvlTree';
import BinarySearchTreeNode from './BinarySearchTreeNode';

const createNode = (value, compareFunc) => new BinarySearchTreeNode(value, compareFunc);

function createTestTree1() {
  //   1
  //  / \
  // 0   3
  //    /
  //   2

  const tree = new AvlTree();
  tree.root.value = 1;

  const nodes = [0,1,2,3].map(i => i === 1 ? tree.root : createNode(i));

  tree.root.setLeft(nodes[0]);
  tree.root.setRight(nodes[3]);

  nodes[3].setLeft(nodes[2]);

  return { tree, nodes };
}

function createTestTree2() {
    //   1
    //  / \
    // 0   2
    //      \
    //       3

    const tree = new AvlTree();
    tree.root.value = 1;

    const nodes = [0,1,2,3].map(i => i === 1 ? tree.root : createNode(i));

    const root = nodes[1];

    root.setLeft(nodes[0]);
    root.setRight(nodes[2]);

    nodes[2].setRight(nodes[3]);

    return { tree, nodes };
}

function createTestTree3() {
  //   1
  //  / \
  // 0   3
  //    / \
  //   2   4

  const tree = new AvlTree();
  tree.root.value = 1;

  const nodes = [0, 1, 2, 3, 4].map(i => i === 1 ? tree.root : createNode(i));

  const root = nodes[1];

  root.setLeft(nodes[0]);
  root.setRight(nodes[3]);

  nodes[3].setLeft(nodes[2]);
  nodes[3].setRight(nodes[4]);

  return { tree, nodes };
}

function createTestTree4() {
  //   1
  //  / \
  // 0   3
  //    / \
  //   2   5
  //      / \
  //     4   6

  const tree = new AvlTree();
  tree.root.value = 1;

  const nodes = [0,1,2,3,4,5,6].map(i => i === tree.root.value ? tree.root : createNode(i));

  tree.root.setLeft(nodes[0]);
  tree.root.setRight(nodes[3]);

  nodes[3].setLeft(nodes[2]);
  nodes[3].setRight(nodes[5]);

  nodes[5].setLeft(nodes[4]);
  nodes[5].setRight(nodes[5]);

  return { tree, nodes };
}

function createTestTree5() {
  //     3
  //    / \
  //   1   4
  //  / \
  // 0   2

  const tree = new AvlTree();
  tree.root.value = 3;

  const nodes = [0, 1, 2, 3, 4].map(i => i === tree.root.value ? tree.root : createNode(i));

  const root = nodes[3];

  root.setLeft(nodes[1]);
  root.setRight(nodes[4]);

  nodes[1].setLeft(nodes[0]);
  nodes[1].setRight(nodes[2]);

  return { tree, nodes };
}

function createTestTree6() {
  //        5
  //       / \
  //      3   6
  //     / \
  //    1   4
  //   / \
  //  0   2

  const tree = new AvlTree();
  tree.root.value = 5;

  const nodes = [0,1,2,3,4,5,6].map(i => i === tree.root.value ? tree.root : createNode(i));

  tree.root.setLeft(nodes[0]);
  tree.root.setRight(nodes[3]);

  nodes[3].setLeft(nodes[2]);
  nodes[3].setRight(nodes[5]);

  nodes[5].setLeft(nodes[4]);
  nodes[5].setRight(nodes[5]);

  return { tree, nodes };
}

function createTestTree7() {
  //    1
  //   / \
  //  0   5
  //     / \
  //    3   6
  //   / \
  //  2   4

  const tree = new AvlTree();
  tree.root.value = 1;

  const nodes = [0,1,2,3,4,5,6].map(i => i === tree.root.value ? tree.root : createNode(i));

  tree.root.setLeft(nodes[0]);
  tree.root.setRight(nodes[5]);

  nodes[5].setLeft(nodes[3]);
  nodes[5].setRight(nodes[6]);

  nodes[3].setLeft(nodes[2]);
  nodes[3].setRight(nodes[4]);

  return { tree, nodes };
}

function createTestTree8() {
  //     5
  //    / \
  //   1   6
  //  / \
  // 0   3
  //    / \
  //   2   4

  const tree = new AvlTree();
  tree.root.value = 5;

  const nodes = [0,1,2,3,4,5,6].map(i => i === tree.root.value ? tree.root : createNode(i));

  tree.root.setLeft(nodes[1]);
  tree.root.setRight(nodes[6]);

  nodes[1].setLeft(nodes[0]);
  nodes[1].setRight(nodes[3]);

  nodes[3].setLeft(nodes[2]);
  nodes[3].setRight(nodes[4]);

  return { tree, nodes };
}


function testLink(parent, linkName, child) {
  expect(parent[linkName]).toBe(child);
  expect(child.parent).toBe(parent);
}

describe('Rotate left', () => {
  test('Root node', () => {
    const { tree, nodes } = createTestTree3();
    tree.rotateLeftLeft(nodes[1]);
    //    1           3
    //   / \         / \
    //  0   3   =>  1   4
    //     / \     / \
    //    2   4   0   2
    expect(tree.root).toBe(nodes[0]);
    testLink(nodes[1], 'right', nodes[2]);
    testLink(nodes[3], 'left', nodes[1]);
  });

  test('Not root node', () => {
    const { tree, nodes } = createTestTree4();
    tree.rotateLeftLeft(nodes[3]);
    //   1               1
    //  / \             / \
    // 0   3           0   5
    //    / \     =>      / \
    //   2   5           3   6
    //      / \         / \
    //     4   6       2   4
    testLink(nodes[5], 'left', nodes[3]);
    testLink(nodes[1], 'right', nodes[5]);
    testLink(nodes[3], 'right', nodes[4]);
  })
});

describe('Rotate right', () => {
  test('Root node', () => {
    const { tree, nodes } = createTestTree5();
    tree.rotateRightRight(nodes[1]);
    //     3            1
    //    / \          / \
    //   1   4   =>   0   3
    //  / \              / \
    // 0   2            2   4
    expect(tree.root).toBe(nodes[1]);
    testLink(nodes[1], 'right', nodes[3]);
    testLink(nodes[3], 'left', nodes[2]);
  });

  test('Not root node', () => {
    const { tree, nodes } = createTestTree6();
    tree.rotateRightRight(nodes[3]);
    //        5            5
    //       / \          / \
    //      3   6        1   6
    //     / \     =>   / \
    //    1   4        0   3
    //   / \              / \
    //  0   2            2   4
    testLink(nodes[5], 'left', nodes[1]);
    testLink(nodes[1], 'right', nodes[3]);
    testLink(nodes[3], 'left', nodes[2]);
  })
});

describe('Rotate left right', () => {
  test('Root node', () => {
    const { tree, nodes } = createTestTree7();
    tree.rotateLeftRight(tree.root);
    //    1               3
    //   / \             / \
    //  0   5           1   5
    //     / \    =>   /\   /\
    //    3   6       0  3 4  6
    //   / \
    //  2   4
    testLink(nodes[3], 'right', nodes[5]);
    testLink(nodes[5], 'left', nodes[4]);

    testLink(nodes[3], 'left', nodes[1]);
    testLink(nodes[1], 'right', nodes[3]);
  });
});

describe('Rotate right left', () => {
  test('Root node', () => {
    const { tree, nodes } = createTestTree8();
    tree.rotateRightLeft(tree.root);
    //     5               3
    //    / \             / \
    //   1   6           1   5
    //  / \        =>   /\   /\
    // 0   3           0  3 4  6
    //    / \
    //   2   4
    testLink(nodes[3], 'right', nodes[5]);
    testLink(nodes[5], 'left', nodes[4]);

    testLink(nodes[3], 'left', nodes[1]);
    testLink(nodes[1], 'right', nodes[3]);
  });
});

