import React from "react";
import { cn } from "./utils";
import { View, ViewProps } from "./View";
import { ViewDirection } from "./ViewDirection";

import "../../styles/scroll-view.scss";

export const ScrollView = ({ scroll, horizontal, vertical, ...rest }: ScrollViewProps) =>
{
	const dir = React.useMemo(() => scroll ? scroll : (!horizontal ? "vertical" : "horizontal"), [vertical, horizontal]);

	return (
		<View className={cn("scroll-view", { [dir]: true })} {...rest} />
	);
};

export type ScrollViewProps = ViewProps<"div"> & ({
	scroll: ViewDirection | "both";
	vertical?: never;
	horizontal?: never;
} | {
	scroll?: never;
	vertical: true;
	horizontal?: never;
} | {
	scroll?: never;
	vertical?: never;
	horizontal: true;
});
