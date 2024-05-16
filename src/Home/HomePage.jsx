import React, { useEffect, useState } from 'react'
import "./HomePage.style.css"
import { Section } from '../component/Section/Section'
import { Card } from '../component/Card/Card'
import {Plus} from "lucide-react"
import { ModalWrapper } from '../component/Modal/ModalWrapper'
import { BalanceForm } from '../component/BalanseForm/BalanceForm'
import { ExpenseForm } from '../component/ExpenseForm/ExpenseForm'
import PieChart from '../component/PieChart/PieChart'
import { TransitionList } from '../component/TransitionList/TransitionList'
import BarChart from '../component/BarChart/BarChart'

export const HomePage = () => {

    const [balance , setBalance] = useState(5300)
    const [expense , setExpense]  = useState(0)
    const theExpenseList = []

    const [isOpenBalance , setIsOpenBalance] = useState(false)
    const [isOpenExpense , setIsOpenExpense] = useState(false)

    const [categorySpends , setCategorySpends] = useState({
        food: 0,
        entertainment: 0,
        travel: 0,
    })

    
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
    const handleAddExpense = (data ) => {
        const expenseList = JSON.parse(localStorage.getItem('expenseList'))
        expenseList.push(data)
        localStorage.setItem("expenseList" , JSON.stringify(expenseList))
    }
    
    useEffect(() => {
        let foodSpends = 0,
        entertainmentSpends = 0,
        travelSpends = 0;
        
        
        const expenseList = JSON.parse(localStorage.getItem('expenseList'))
        if(expenseList.length > 0){
            let total = expenseList.reduce(
                (accumulator , currentValue) =>
                    accumulator + Number(currentValue.price),
                0
            )
            setExpense(total)
            
            expenseList.forEach((ele) => {
                if(ele.category == "food"){
                    foodSpends += Number(ele.price)
                }else if(ele.category == "entertainment"){
                    entertainmentSpends += Number(ele.price)
                }else if(ele.category == "travel"){
                    travelSpends += Number(ele.price)
                }
            })
            
            setCategorySpends({
                food: foodSpends,
                travel: travelSpends,
                entertainment: entertainmentSpends,
            })
        }
    } , [localStorage.getItem('expenseList')])
    
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
                    balance={expense}
                    icon = {<Plus/>}
                    isGreen = {false}
                    handleClick={() => setIsOpenExpense(true)}
                />

                <PieChart
                
                    data={[
                        { name: "Food", value: categorySpends.food },
                        { name: "Entertainment", value: categorySpends.entertainment },
                        { name: "Travel", value: categorySpends.travel },
                    ].filter(ele => ele.value)}
                />
            </Section>

            <Section IsSection={"2"}>
                <TransitionList 
                    handleClick={() => setIsOpenExpense(true)}
                />
                <BarChart
                    data={[
                        { name: "Food", value: categorySpends.food },
                        { name: "Entertainment", value: categorySpends.entertainment },
                        { name: "Travel", value: categorySpends.travel },
                    ]}
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
