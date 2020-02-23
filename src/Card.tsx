import React, { useState, useEffect } from "react";
import "./Card.css";

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 50);
  }, []);
  return isMounted;
}

export default React.forwardRef(
  (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { children, className, style, ...rest } = props;

    const isMounted = useIsMounted();

    return (
      <div
        className={`Card ${className}`}
        ref={ref}
        style={{
          ...style,
          opacity: isMounted ? 1 : 0,
          transform: (style?.transform || "") + ` scale(${isMounted ? 1 : 0.3})`
        }}
        {...rest}
      >
        {props.children}
      </div>
    );
  }
);
