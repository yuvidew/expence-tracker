import React, { useEffect, useState } from 'react'
import "./HomePage.style.css"
import { Section } from '../component/Section/Section'
import { Card } from '../component/Card/Card'
import {Plus} from "lucide-react"
import { ModalWrapper } from '../component/Modal/ModalWrapper'
import { BalanceForm } from '../component/BalanseForm/BalanceForm'
import { ExpenseForm } from '../component/ExpenseForm/ExpenseForm'

export const HomePage = () => {

    const [balance , setBalance] = useState(5300)
    const expense  = 5600
    const theExpenseList = []

    const [isOpenBalance , setIsOpenBalance] = useState(false)
    const [isOpenExpense , setIsOpenExpense] = useState(false)

    if(!localStorage.getItem("wallet balance")){
        localStorage.setItem("wallet balance" , balance)
    }
    if(!localStorage.getItem("expenseList")){
        localStorage.setItem("expenseList" , JSON.stringify(theExpenseList))
    }
    if(!localStorage.getItem("expense")){
        localStorage.setItem("expense" , expense)
    }

    const handleAddBalance = (data) => {
        localStorage.setItem("wallet balance" , data)
        setIsOpenBalance(false)
    }
    const handleAddExpense = (data) => {
        const expenseList = JSON.parse(localStorage.getItem('expenseList'))
        expenseList.push(data)
        localStorage.setItem("expenseList" , JSON.stringify(expenseList))
    }

    

    return (
        <div>
            <Section title={"Expense Tracker"} IsSection={"1"} >
                <Card 
                    title={"Wallet Balance"}
                    btnText={` Add Income`}
                    balance={localStorage.getItem("wallet balance")}
                    icon = {<Plus/>}
                    isGreen = {true}
                    handleClick={() => setIsOpenBalance(true)}
                />
                <Card 
                    title={"Expense"}
                    btnText={` Add Expense`}
                    balance={localStorage.getItem("expense")}
                    icon = {<Plus/>}
                    isGreen = {false}
                    handleClick={() => setIsOpenExpense(true)}
                />
            </Section>

            <ModalWrapper 
                isOpen={isOpenBalance}
                setIsOpen={setIsOpenBalance}
            >
                <BalanceForm 
                    balance = {balance}
                    setAdd = {setBalance}
                    handleAddBalance = {handleAddBalance}
                    handleClose={() => setIsOpenBalance(false)}
                />
            </ModalWrapper>

            <ModalWrapper 
                isOpen={isOpenExpense}
                setIsOpen={setIsOpenExpense}
            >
                <ExpenseForm 
                    onAddExpense={handleAddExpense}
                    handleClose={() => setIsOpenExpense(false)}
                />
            </ModalWrapper>
        </div>
    )
}
