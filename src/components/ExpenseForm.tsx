import { categories } from "../data/categories";
import type { DraftExpense, Value } from "../types";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0 ,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const {dispatch} = useBudget()

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date:value
        })
    }

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        const {name, value} = e.target
        const isAmoutField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmoutField ? +value : value
        })
    } 

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //validar
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        //Agregar nuevo gasto
        dispatch({type: 'add-expense', payload: {expense}})

        //reiniciar el state
        setExpense({
            amount: 0 ,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo gasto
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}


            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">Nuevo Gasto</label>
                <input 
                    type="text" 
                    id="expenseName" 
                    placeholder="Añade el nombre del gasto" 
                    className="bg-slate-100 p-2" 
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">Cantidad</label>
                <input 
                    type="number" 
                    id="amount" 
                    placeholder="Añade la cantidad del gasto: ej. 300" 
                    className="bg-slate-100 p-2"
                    name="amount"
                    onChange={handleChange}
                    value={expense.amount}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">Categoria</label>
                <select 
                    name="category" 
                    id="category"
                    className="bg-slate-100 p-2"
                    onChange={handleChange}
                    value={expense.category}

                >
                    <option value="">--Seleccione--</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="text-xl">Fecha del gasto:</label>
                <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}/>
            </div>

            <input type="submit" value={"Registrar gasto"} className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"/>
        </form>
    )
}
