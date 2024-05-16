import React, { useState } from 'react'
import style from "./Transition.module.css"
import { ArrowLeft, ArrowRight, CircleX, Edit, Gift, IndianRupee, LaughIcon, Luggage, Pizza } from 'lucide-react'
import { Button } from '../Button/Button'
import { ModalWrapper } from '../Modal/ModalWrapper'
import { ExpenseForm } from '../ExpenseForm/ExpenseForm'

export const TransitionList = () => {
    const [currentPage , setCurrentPage] = useState(1)
    const [listNum , setListNum] = useState(null)
    const [isDisplayEditor , setIsDisplayEditor] = useState(false)
    const expenseList = JSON.parse(localStorage.getItem("expenseList"))
    const expensePerPage = 3

    /**calculate total num of page */

    const totalPage = Math.ceil(expenseList.length / expensePerPage)

    /**get user for current page */
    const handleEdit = (data , index) => {
        expenseList.splice(index , 1 , data)
        localStorage.setItem("expenseList" , JSON.stringify(expenseList))
    }
    
    const handleDelete = (index) => {
        expenseList.splice(index , 1)
        localStorage.setItem("expenseList" , JSON.stringify(expenseList))
        window.location.reload()
    }

    const getPaginatedList = () => {
        const startIndex = (currentPage - 1) * expensePerPage;
        const endIndex = startIndex + expensePerPage

        return expenseList.slice(startIndex , endIndex)
    }



    return (
        <>
        <article className={style.article}>
            <h1 className={style.title}>Recent Transactions</h1>
            <div className={style.listContainer}>
                {expenseList && getPaginatedList().map((ele , index) => (
                    <div key={ele.id} className={style.item}>
                        <div className={style.firstBox}>
                            <div className={style.iconBox}>
                                {ele.category == "food" && <Pizza className={style.iconBtn}/>}
                                {ele.category == "entertainment" && <Gift className={style.iconBtn}/>}
                                {ele.category == "travel" && <Luggage className={style.iconBtn}/>}
                            </div>
                            <div className={style.info}>
                                <h5>{ele.title}</h5>
                                <p>{ele.date}</p>
                            </div>
                        </div>
                        <div className={style.secondBox}>
                            <h5><IndianRupee className={style.rupee} /> {ele.price}</h5>
                            <Button 
                                classStyle={style.deleteBtn}
                                handleClick={() => handleDelete(index)}
                            >
                                <CircleX height={"1.5rem"} width={"1.5rem"} />
                            </Button>
                            <Button 
                                classStyle={style.editBtn}
                                handleClick={() => {
                                    setListNum(index)
                                    setIsDisplayEditor(true)
                                }}
                            >
                                <Edit height={"1.5rem"} width={"1.5rem"} />
                            </Button>
                        </div>
                    </div>
                ))}
                {expenseList.length >= 3 && (
                    <div className={style.BtnBox}>
                        <button
                            onClick={() => {
                                if(currentPage > 1){
                                    setCurrentPage(currentPage - 1)
                                }
                            }}
                        >
                            <ArrowLeft height={"1rem"} width={"1rem"} />
                        </button>
                        <button className={style.centerBtn}>
                            {currentPage}
                        </button>
                        <button 
                            onClick={() => {
                                if(currentPage < totalPage){
                                    setCurrentPage(currentPage + 1)
                                }
                            }}
                        >
                            <ArrowRight height={"1rem"} width={"1rem"} />
                        </button>
                    </div>
                )}
            </div>
        </article>
        <ModalWrapper
            isOpen={isDisplayEditor}
            setIsOpen={setIsDisplayEditor}
        >
            <ExpenseForm 
                onAddExpense={handleEdit}
                handleClose={() => setIsDisplayEditor(false)} 
                edit={listNum}
                expenseData={expenseList}
            />
        </ModalWrapper>
        </>
    )
}
