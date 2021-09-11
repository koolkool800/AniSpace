import { FC, CSSProperties, useEffect, useRef } from "react";

interface PureTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

const PureText: FC<PureTextProps> = ({ text, className, style }) => {
  const elementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (elementRef.current !== null) {
      const div = document.createElement("div");
      div.innerHTML = text;
      elementRef.current.innerText = div.innerText;
    }
  }, [elementRef]);

  return <p ref={elementRef} className={className} style={style}></p>;
};

export default PureText;
