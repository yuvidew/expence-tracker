import React, { useEffect, useRef, useState } from 'react'
import style from "./Expense.module.css"

export const ExpenseForm = ({
    onAddExpense,
    handleClose,
    edit,
    expenseData
}) => {
    const inputDateRef = useRef(null)
    const [expense , setExpense] = useState({
        id : new Date().getTime(),
        title : "",
        price : "",
        category : "",
        date : ""
    })

    useEffect(() => {
        editExpense()
    } , [edit])

    const editExpense = () => {
        if(edit !== null && expenseData !== undefined){
            setExpense({
                id : expenseData[edit].id,
                title : expenseData[edit].title,
                price : expenseData[edit].price,
                category : expenseData[edit].category,
                date : expenseData[edit].data
            })

            inputDateRef.current.value = expenseData[edit].data
        }
    }


    const handleChange = (e) => {
        const {name , value} = e.target;
        setExpense({
            ...expense , 
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddExpense(expense , edit)
        handleClose()
    }

    return (
        <div className={style.formCard}>
            <h1 className={style.title}>Add Expense</h1>

            <form 
                action="" 
                className={style.form} 
                onSubmit = {handleSubmit}
            >
                <input 
                    name='title' 
                    type="text" 
                    placeholder='Title'  
                    value={expense.title}
                    onChange={handleChange}
                />
                <input 
                    name='price' 
                    type="number" 
                    placeholder='Price'  
                    value={expense.price}
                    onChange={handleChange}
                />
                <select name="category"
                    // value={formData.category}
                    className={style.select}
                    value={expense.category}
                    onChange={handleChange}
                    required
                >
                    <option name = "category" value=''>Select category</option>
                    <option name = "category" value='food'>Food</option>
                    <option name = "category" value="entertainment">Entertainment</option>
                    <option name = "category" value="travel">Travel</option>
                </select>
                <input 
                    name='date' 
                    type="date" 
                    value={expense.date}
                    onChange={handleChange}
                    ref={inputDateRef}
                />
                
                <button type='submit'>Add Expense</button>
                <button type='button' onClick={handleClose}>Cancel</button>
            </form>
        </div>
    )
}
