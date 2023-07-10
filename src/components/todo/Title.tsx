import { memo } from "react";

type TitleProps = {
    children: string;
};

const Title = ({ children }: TitleProps) => (
    <h1 className="text-8xl py-10 text-slate-800 ">{children}</h1>
);

export default memo(Title);
