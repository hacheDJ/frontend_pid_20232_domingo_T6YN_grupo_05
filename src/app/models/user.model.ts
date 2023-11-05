import { DocumentType } from "./documentType.model";
import { Role } from "./role.model";

export class User{
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
    dateBirth?: Date | null;
    numberDoc?: string;
    idDocType?: DocumentType;
    idRole?: Role;
}