

export class Node<T>
{
	public readonly children: Node<T>[];
	public readonly value: T;

	public constructor(value: T)
	{
		this.children = [];
		this.value = value;
	}

	public addChildValue(value: T): Node<T>
	{
		const node = new Node(value);
		this.children.push(node);
		return node;
	}

	public *getChildrenNodesRecursive(): Generator<Node<T>>
	{
		for (const child of this.children)
		{
			yield child;
			yield *child.getChildrenNodesRecursive();
		}
	}

	public *getChildrenValuesRecursive(): Generator<T>
	{
		for (const child of this.children)
		{
			yield child.value;
			yield *child.getChildrenValuesRecursive();
		}
	}
}

export default class Graph<T>
{
	public readonly rootNode: Node<T>;

	public constructor(rootVale: T)
	{
		this.rootNode = new Node(rootVale);
	}

	public *getChildrenNodesRecursive(): Generator<Node<T>>
	{
		yield this.rootNode;
		yield *this.rootNode.getChildrenNodesRecursive();
	}

	public *getChildrenValuesRecursive(): Generator<T>
	{
		yield this.rootNode.value;
		yield *this.rootNode.getChildrenValuesRecursive();
	}
}
