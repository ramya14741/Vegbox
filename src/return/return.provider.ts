import { Return, ReturnReqItem } from "./return.entity";

export const returnProvider = [
    {
        provide : 'RETURN_REPOSITORY',
        useValue: Return
    }
]

export const returnReqItemProvider = [
    {
        provide : 'RETURNREQITEM_REPOSITORY',
        useValue: ReturnReqItem
    }
]

