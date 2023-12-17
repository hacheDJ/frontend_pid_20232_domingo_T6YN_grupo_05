import { User } from "../models/user.model"

export class FindByIdRes{
    err?: boolean
    msg?: string
    user?: User
}