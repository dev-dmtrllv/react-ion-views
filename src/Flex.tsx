import React, { createContext, forwardRef, useContext, useMemo } from "react";
import { HtmlProps, cn } from "./utils";
import { ViewDirection } from "./ViewDirection";
import { View, ViewPosition, ViewProps } from "./View";

import "../../styles/flex.scss";

const FlexContext = createContext<{ direction: ViewDirection | "none" }>({
	direction: "none"
});

const useParentDirection = () =>
{
	const ctx = useContext(FlexContext);
	if (ctx.direction === "none")
		throw new Error("No FlexBox parent found!");
	return ctx.direction;
};

export const FlexBox = forwardRef<HTMLElement, FlexBoxProps>(({ className, vertical, horizontal, children, ...rest }, ref) =>
{
	const dir = React.useMemo(() => !vertical ? "horizontal" : "vertical", [vertical, horizontal]);

	return (
		<View ref={ref} className={cn("flex-box", { className, [dir]: true })} {...rest}>
			<FlexContext.Provider value={{ direction: dir }}>
				{children}
			</FlexContext.Provider>
		</View>
	);
});

export type FlexBoxProps = HtmlProps<HTMLDivElement, ViewProps<"div"> & ({
	vertical: true;
	horizontal?: never;
} | {
	vertical?: never;
	horizontal: true;
})>;

export const FlexItem = forwardRef(({ className, children, base = "auto", grow, shrink, style = {}, ...rest }: FlexItemProps, ref: React.ForwardedRef<HTMLElement>) =>
{
	const parentDir = useParentDirection();

	const memoStyle = useMemo(() => 
	{
		let g = "0";
		let s = "0";
		let b = typeof base === "number" ? `${base}px` : base || "auto";

		if(grow === undefined && shrink !== undefined)
		{
			s = String(shrink === true ? 1 : shrink);
		}
		else if(shrink === undefined && grow !== undefined)
		{
			g = String(grow === true ? 1 : grow);
		}
		else
		{
			g = String((grow === undefined || grow === true) ? 1 : grow || 0);
			s = String((shrink === undefined || shrink === true) ? 1 : shrink || 0);
		}

		if (base !== "auto")
			return {
				...style,
				[parentDir === "horizontal" ? "width" : "height"]: base,
				flexBasis: b
			};

		return {
			...style,
			flex: `${g} ${s} ${b}`
		};
	}, [base, grow, shrink, style]);

	return (
		<View ref={ref} className={cn("flex-item", { className })} style={memoStyle} {...rest}>
			{children}
		</View>
	);
});

export type FlexItemProps = HtmlProps<HTMLDivElement, {
	position?: ViewPosition;
	base?: number | string;
	grow?: number | string | boolean;
	shrink?: number | string | boolean;
} & ViewPosition>;
