import React from "react";
import "./Card.css";

export default React.forwardRef(
  (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { children, className, ...rest } = props;
    return (
      <div className={`Card ${className}`} ref={ref} {...rest}>
        {props.children}
      </div>
    );
  }
);
