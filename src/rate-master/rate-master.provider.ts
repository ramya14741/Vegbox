import { RateMaster } from "./rate-master.entity";

export const rateMasterProvider = [
    {
        provide : 'RATEMASTER_REPOSITORY',
        useValue: RateMaster
    }
]
