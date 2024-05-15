import React from 'react'
import style from "./Balance.module.css"

export const BalanceForm = ({
    setAdd , 
    handleAddBalance,
    balance,
    handleClose
}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAddBalance(e.target.elements["income"].value);
    }

    return (
        <div className={style.formCard}>
            <h1 className={style.title}>Add Balance</h1>
            <form 
                action="" 
                className={style.form}
                onSubmit = {handleSubmit}
            >
                <input 
                    type="text" 
                    placeholder='Income Amount' 
                    id='income'
                />
                <button type="submit">Add Balance</button>
                <button 
                    type="button"
                    onClick={handleClose}
                >
                    Cancel
                </button>
            </form>
            <br />
        </div>
    )
}
