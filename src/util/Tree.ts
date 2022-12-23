
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

export default class Tree<T>
{
	public readonly root: Node<T>;

	public constructor(rootVal: T)
	{
		this.root = new Node(rootVal);
	}

	public getAllNodes(): IEnumerable<Node<T>>
	{
		return Enumerable
			.from([this.root])
			.concat(this.root.getChildrenNodesRecursive());
	}

	public getAllValues(): IEnumerable<T>
	{
		return Enumerable
			.from([this.root.value])
			.concat(this.root.getChildrenValuesRecursive());
	}
}
