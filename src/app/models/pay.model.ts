import { RequestLoan } from "./requestLoan.model"
import { User } from "./user.model"

export class Pay{
    id?: number
    fee?: number
    amount?: number
    arrear?: number
    dueDate?: Date
    state?: string
    idLoan?: RequestLoan
    remainingPartial?: number
    idUserUpdate?: User
}