import { User } from "../models/user.model"

export class RequestLoanUpdateReq{
    id?: number
	state?: string
    idUserUpdate?: User | null
    days?: number
    dailyQuota?: number
}