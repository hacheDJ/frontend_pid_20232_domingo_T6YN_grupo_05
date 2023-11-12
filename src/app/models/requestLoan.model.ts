import { User } from "../models/user.model"
import { LoanCategory } from "../models/loanCategory.model"

export class RequestLoan{
    id?: number
    detail?: string
    requestedAmount?:number
    loanStartDate?: Date | null
    loanEndDate?: Date | null
	state?: string
    registrationDate?: Date
    idBorrower?: User;
	idLoanCat?: LoanCategory
    idUserRegister?: User
	idUserUpdate?: User
}