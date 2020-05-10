import BinarySearchTree from './BinarySearchTree';
import BinarySearchTreeNode from './BinarySearchTreeNode';

const createNode = (value, compareFunc) => new BinarySearchTreeNode(value, compareFunc);

test('Create search tree', () => {
  const func = () => {};
  const tree = new BinarySearchTree(func);
  expect(tree.root.nodeValueComparator.compare).toBe(func);
  expect(tree.nodeComparator.compare).toBe(func);
});


function testContains(tree, value, contains) {

  test(`tree.contains(${value}) returns ${contains}`, () => {
    expect(tree.contains(value)).toBe(contains)
  })
}

function createTestTree1() {
  //   1
  //  / \
  // 0   3
  //    /
  //   2

  const tree = new BinarySearchTree();
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

  const tree = new BinarySearchTree();
  tree.root.value = 1;

  const nodes = [0,1,2,3].map(i => i === 1 ? tree.root : createNode(i));

  const root = nodes[1];

  root.setLeft(nodes[0]);
  root.setRight(nodes[2]);

  nodes[2].setRight(nodes[3]);

  return { tree, nodes };
}

describe('Tree contains', () => {
  const { tree } = createTestTree1();
  testContains(tree, 2, true);
  testContains(tree, 5, false);
});

function expectLink(parent, edge, child) {
  expect(parent[edge]).toBe(child);
  if (!child) return;
  expect(child.parent).toBe(parent);
}

describe('Node removal', () => {

  test('Remove top node with left grandchild', () => {
    const { tree, nodes } = createTestTree1();
    tree.remove(1);
    expect(nodes[1].value).toBe(2);
    expect(nodes[3].left).toBeNull();
    expect(nodes[2].parent).toBeNull();
  });

  test('Remove top node with no left grand child', () => {
    const { tree, nodes }= createTestTree2();
    tree.remove(1);
    expect(nodes[1].value).toBe(2);
    expectLink(nodes[1], 'right', nodes[3]);
  });

  test('Remove node with only left child', () => {
    const { tree, nodes } = createTestTree1();
    tree.remove(3);
    expectLink(nodes[1], 'right', nodes[2]);
  });

  test('Remove node with only right child', () => {
    const { tree, nodes } = createTestTree1();
    tree.remove(2);
    expectLink(nodes[1], 'right', nodes[3]);
  });


  test('Remove top node which has only child', () => {
    const tree = new BinarySearchTree();
    const root = tree.root;
    tree.root.value = 0;
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
    const tree = new BinarySearchTree();
    tree.root.value = 1;
    const node = tree.root;
    node.remove(1);
    expect(node.value).toBeUndefined()
  })
});

describe('Node insert', () => {

  test('Insert value same as root value', () => {
    const { nodes, tree } = createTestTree1();
    tree.insert(1);
    expect(nodes[1].value).toBe(1);
  });

  test('Insert lowest value', () => {
    const { nodes, tree } = createTestTree2();
    tree.insert(-1);
    expect(nodes[0].left).not.toBeNull();
    expect(nodes[0].left.value).toBe(-1);
  });

  test('Insert lowest value', () => {
    const { nodes, tree } = createTestTree1();
    tree.insert(5);
    expect(nodes[3].right).not.toBeNull();
    expect(nodes[3].right.value).toBe(5);
  });
});


