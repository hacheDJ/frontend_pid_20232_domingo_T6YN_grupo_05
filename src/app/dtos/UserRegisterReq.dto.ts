import { DocumentType } from "../models/documentType.model";
import { Group } from "../models/group.model";
import { PortfolioClient } from "../models/portfolioClient";

export class UserRegisterReq {
    id?: number;
    namesUser?: string;
    lastnameP?: string;
    lastnameM?: string;;
    registrationDate?: Date;
    address?: string;
    cellphone?: string;
    email?: string;
    userLogin?: string;
    passwordLogin?: string;
    confirmPasswordLogin?: string;
    dateBirth?: Date | null;
    numberDoc?: string;
    idDocType?: DocumentType;
    updateDate?: Date;
    idGroup?: Group;
    idPortfolio?: PortfolioClient;
    role?: String;
}