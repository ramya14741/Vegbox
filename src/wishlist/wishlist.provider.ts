import { Wishlist } from "./wishlist.entity";

export const wishLIstProvider = [
    {
        provide : 'WISHLIST_REPOSITORY',
        useValue: Wishlist
    }
]
