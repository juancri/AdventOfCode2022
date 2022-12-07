
import Enumerable, { IEnumerable } from 'linq';

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

	public getChildrenNodesRecursive(): IEnumerable<Node<T>>
	{
		return Enumerable.from(this.getChildrenNodesRecursiveInternal());
	}

	public getChildrenValuesRecursive(): IEnumerable<T>
	{
		return Enumerable.from(this.getChildrenValuesRecursiveInternal());
	}

	// Private methods

	private *getChildrenNodesRecursiveInternal(): Generator<Node<T>>
	{
		for (const child of this.children)
		{
			yield child;
			yield *child.getChildrenNodesRecursiveInternal();
		}
	}

	private *getChildrenValuesRecursiveInternal(): Generator<T>
	{
		for (const child of this.children)
		{
			yield child.value;
			yield *child.getChildrenValuesRecursiveInternal();
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

	public getAllNodes(): IEnumerable<Node<T>>
	{
		return Enumerable
			.from([this.rootNode])
			.concat(this.rootNode.getChildrenNodesRecursive());
	}

	public getAllValues(): IEnumerable<T>
	{
		return Enumerable
			.from([this.rootNode.value])
			.concat(this.rootNode.getChildrenValuesRecursive());
	}
}
