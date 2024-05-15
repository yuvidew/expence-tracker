import React from 'react'

export const Button = ({
    children,
    classStyle,
    handleClick,
}) => {
    return (
        <button 
            onClick={handleClick}
            className={classStyle}
        >
            {children}
        </button>
    )
}
