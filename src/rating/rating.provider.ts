import { Rating } from "./rating.entity";

export const ratingProvider = [
    {
        provide : 'RATING_REPOSITORY',
        useValue: Rating
    }
]
