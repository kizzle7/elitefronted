import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  const style = {
    ...props.style,
    paddingLeft: props.prependIcon ? "50px" : "0.9rem",
    background: "#F9FAFB",
    border: "1px solid #CACACA",
    padding: "12px 60px 12px 35px" ,
    marginTop: "-.6rem",
    color: '#ABB0B7',
    fontWeight: "300"
    
  };
  return (
    <div>
      <label
        className="d-block text-dark font-weight-normal"
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div>
        <input
          {...props}
          ref={ref}
          style={
            props.error
              ? {
                  ...style,
                  border: "1px solid #ff5b5b",
                  boxShadow: "none",
                  background: "#F7F9FC",
                }
              : {
                  ...style,
                }
          }
        />
      </div>
      {props.error && <p className="validate-error ">{props.error}</p>}
    </div>
  );
});
