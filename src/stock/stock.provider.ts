import { Stock } from "./stock.entity";

export const stockProvider = [
    {
        provide : 'STOCK_REPOSITORY',
        useValue: Stock,
    }
]
