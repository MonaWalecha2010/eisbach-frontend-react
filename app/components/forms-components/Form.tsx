import React, { FC, KeyboardEvent, createElement } from "react"
import { ReactNode } from "react"
export type childrenType = ReactNode;
export interface FormProps {
    onSubmit?: any;    
    handleSubmit?: any; 
    onKeyPress?:Function; 
    register?: any;
    className?: any; 
    defaultValues?: any;
    children?: childrenType;
}
const Form: FC<FormProps> = ({
    defaultValues,    
    children,  
    onSubmit,
    handleSubmit, 
    onKeyPress, 
    register,
    className,
    ...rest
}) => {
    const handleKeyDown = (event: KeyboardEvent) =>{
        onKeyPress && onKeyPress(event);
    }
    return (
        <form className={`${className}`} onSubmit={handleSubmit(onSubmit)} {...rest} onKeyDown={(e:KeyboardEvent)=>handleKeyDown(e)}>     
            {Array.isArray(children)
            ? children.map((child) => {          
                return (child && child.props.name
                    ? createElement(child.type, {
                        ...{
                            ...child.props,
                            register,
                            key: child.props.name
                        }
                    })
                    : child);
                })
            : children
            }        
        </form>
    );
};

export default Form;