import React from 'react'
import style from './Section.module.css'

export const Section = ({
    title , 
    children,
    IsSection
}) => {
    return (
        <section className={style.section}>
            <h1 className={style.title}>{title}</h1>
            <div className={IsSection == "1" ? style.container1 : style.container2}>
                {children}
            </div>
        </section>
    )
}
