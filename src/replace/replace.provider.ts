import { Replace } from "./replace.entity";

export const replaceProvider = [
    {
        provide : 'REPLACE_REPOSITORY',
        useValue: Replace
    }
]
