
export default class Segment
{
	private min: number;
	private max: number;

	public constructor(min: number, max: number)
	{
		if (max < min)
			throw new Error(`Expected min < max, got min: ${min}, max: ${max}`);
		this.min = min;
		this.max = max;
	}

	public contains(s: Segment): boolean
	{
		return s.min >= this.min && s.max <= this.max;
	}

	public intersects(s: Segment, includeLimits = true): boolean
	{
		return Segment.intersect(this, s, includeLimits);
	}

	public static intersect(s1: Segment, s2: Segment, includeLimits = true): boolean
	{
		return includeLimits ?
			s1.min <= s2.max && s2.min <= s1.max :
			s1.min < s2.max && s2.min < s1.max;
	}

	public static fromNumbers(n: number[]): Segment
	{
		if (n.length !== 2)
			throw new Error(`Expected length of 2, got ${n.length}`);
		const min = n[0] || 0;
		const max = n[1] || 0;
		return new Segment(min, max);
	}
}
