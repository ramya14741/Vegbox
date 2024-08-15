import { DeliveryPersonnel } from "./delivery-personnel.entity";

export const deliveryPersonnelsProvider = [
    {
        provide : 'DELIVERYPERSONNEL_REPOSITORY',
        useValue: DeliveryPersonnel
    }
]