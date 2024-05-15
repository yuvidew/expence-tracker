import React from 'react'
import style from "./Card.module.css"
import { IndianRupee } from 'lucide-react'
import { Button } from '../Button/Button'

export const Card = ({
    title , 
    btnText , 
    balance , 
    expenses,
    icon,
    isGreen,
    handleClick
}) => {
    return (
        <article className={`${style.card} ${style.flex}`}>
            <h1 className={`${style.walletTitle} ${style.flex}`}>
                {title} 
                : <span 
                    className={`${isGreen ? style.green : style.orange} ${style.flex}`}
                    ><IndianRupee /> {balance != undefined ? balance : expenses}
                </span>
            </h1>
            <Button 
                handleClick = {handleClick} 
                classStyle = {`${isGreen ? style.bgGreen : style.bgOrange} ${style.flex}`}
            >{icon} {btnText}</Button>
        </article>
    )
}
