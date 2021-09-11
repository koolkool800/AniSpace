import { CSSProperties, FC } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

const Skeleton: FC<SkeletonProps> = ({ className, style }) => {
  return <div className={`${className} bg-gray-500 animate-pulse`} style={style}></div>;
};

export default Skeleton;
