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

    const styles = {
      ...style,
      opacity: isMounted ? 1 : 0
    };

    return (
      <div className={`Card ${className}`} ref={ref} style={styles} {...rest}>
        {props.children}
      </div>
    );
  }
);
