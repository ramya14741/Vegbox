import { ProductImages } from "./productimages.entity";

export const productImagesProvider = [
    {
        provide : 'PRODUCTIMAGES_REPOSITORY',
        useValue: ProductImages
    }
]
