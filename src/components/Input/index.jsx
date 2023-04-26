import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  const style = {
    ...props.style,
    paddingLeft: props.prependIcon ? "50px" : "0.9rem",
    background: "white",
    border: "1px solid #D0D5DD",
    padding: "12px 15px" ,
    marginTop: "-.6rem",
    color: 'A3A9B5;',
    borderRadius: '10px',
    fontWeight: "300",
  };
  return (
    <div>
      <label
        className="d-block pb-2 text-dark"
        style={{color:'#344054', fontWeight:600}}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <div>
        <input
          {...props}
          ref={ref}
          disabled={props.disabled ?  true : false}
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
