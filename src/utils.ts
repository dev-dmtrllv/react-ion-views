import React from "react";

export const cn = <T extends { [key: string]: any }>(defaultClassName: string, { className = "", ...props }: T, ...classNames: string[]): string =>
{
	const classes = [defaultClassName, className, ...classNames].filter(s => !!s);

	for (const k in props)
	{
		if (props[k] === true)
			classes.push(k);
		else if (typeof props[k] === "string")
			classes.push(`${k}-${props[k]}`);
	}

	return classes.join(" ");
};

export const Null: React.FC = () => null;

export const match = <T extends string | number | symbol | undefined>(value: T, match: { [K in NonNullable<T>]: React.FC }) =>
{
	const Component = React.useMemo(() => 
	{
		if (value === undefined)
			return Null;

		const found = match[value];

		if (!found)
			return Null;
		return found;
	}, [value]);

	return React.createElement(Component);
};

export const preventDefault = <T extends React.UIEvent>(callback?: (e: T) => any) => (e: T) =>
{
	e.stopPropagation();
	e.preventDefault();
	callback && callback(e);
};

export type Immutable<T> =
	T extends Array<infer Item> ? ReadonlyArray<Item> :
	T extends {} ? { readonly [K in keyof T]: Immutable<T[K]> } :
	Readonly<T>;

export type HtmlProps<T extends HTMLElement, P extends {}> = Omit<React.HtmlHTMLAttributes<T> & P, `aria-${string}`>;

export type Split<T> = {
	[K in keyof T]:
	Pick<T, K> &
	Partial<
		Record<
			Exclude<keyof T, K>,
			never
		>
	>;
}[keyof T];


// export type Position = {
// 	x: number;
// 	y: number;
// };

// export type Size = {
// 	width: number;
// 	height: number;
// };

export type MakePartial<T, K extends keyof T> = Required<Omit<T, K>> & Partial<Pick<T, K>>;
