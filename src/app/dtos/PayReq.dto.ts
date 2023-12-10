import { RequestLoan } from "../models/requestLoan.model"
import { User } from "../models/user.model"

export class PayReq{
    id?: number
    fee?: number
    amount?: number
    arrear?: number
    dueDate?: Date
    state?: string
    idLoan?: RequestLoan
    remainingPartial?: number
    idUserUpdate?: User
    amountToPay?: number
}