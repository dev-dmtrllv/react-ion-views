import React, { forwardRef, useMemo } from "react";
import { ViewProps } from "../View";
import { HtmlProps, cn } from "../utils";

import "../../styles/input/buttons.scss";

export const Button = forwardRef(({ type = "button", fixed, absolute, relative, className, fill, centered, inline, float, ...props }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) =>
{
	const position = useMemo(() => 
	{
		const targets = { fixed, absolute };

		for (const k in targets)
			if ((targets as any)[k])
				return k;

		return "relative";
	}, [fixed, absolute, relative]);
	
	return (
		<button className={cn("btn view", { className, fill, centered, inline, float }, position)} type={type} {...props} ref={ref}/>
	);
});

type ButtonProps = ViewProps<"button"> & HtmlProps<HTMLButtonElement, {
	type?: "submit" | "button" | "reset";
}>;
