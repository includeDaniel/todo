import { memo } from "react";

type TitleProps = {
    children: string;
};

const Title = ({ children }: TitleProps) => (
    <h1 className="desktop:text-8xl tablet:text-7xl cellphone:text-5xl py-10 text-slate-800 ">
        {children}
    </h1>
);

export default memo(Title);
