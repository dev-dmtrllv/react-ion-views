import React from "react";
import { HtmlProps } from "../utils";

export const Form = (props: FormProps) => 
{
	return (
		<form {...props} />
	);
};

export type FormProps = HtmlProps<HTMLFormElement, {}>;

export const enum SendStatus
{
	Waiting,
	Sending,
	Sended
};

export type FormState = {
	sendStatus: SendStatus;
	error: null | Error;
};
