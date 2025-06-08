import { Dispatch, useReducer, createContext, ReactNode } from "react"
import { budgetReducer, BudgetState, initialState, BudgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode
} 
export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {
    const [state, dispatch] = useReducer(budgetReducer, initialState)



    return(
        <BudgetContext.Provider
            value = {{
                state,
                dispatch
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}