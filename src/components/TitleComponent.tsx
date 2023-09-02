import { pxToRem } from "../helpers/functions";

type Props = {
    text: string;
    type?: 1 | 2 | 3 | 4 | 5 | 6;
    color?: string;
    size?: number;
}

export const TitleComponent = ({ text, type = 1, color = 'white', size = 24 }: Props) => {
    const Tag = `h${type}` as keyof JSX.IntrinsicElements;

    return <Tag style={{ color: color, margin: 0, fontSize: `${pxToRem(size)}` }}>{text}</Tag>;
}