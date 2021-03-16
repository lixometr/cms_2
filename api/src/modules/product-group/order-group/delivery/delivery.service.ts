import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ServiceBlueprint } from 'src/blueprints/service';
import { ObjectResponse } from 'src/helpers/response/object.response';
import { RequestPayload, ArrayResponse } from 'src/internal';
import { DeliveryName } from './delivery.constants';
import { DeliveryTypes, IAvailableDeliveries } from './delivery.types';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { DeliveryRepository } from './repositories/delivery.repository';
import { DeliveryContext } from './strategies/delivery-context';

@Injectable()
export class DeliveryService extends ServiceBlueprint<Delivery>{
    public name = DeliveryName
    constructor(private deliveryRepository: DeliveryRepository, private eventEmiter: EventEmitter2) { super(deliveryRepository, eventEmiter) }
    getContext({  delivery }: {  delivery: Delivery }, payload: RequestPayload) {
        return new DeliveryContext({ delivery })
    }
    async findAvailable({ }, payload: RequestPayload): Promise<ObjectResponse<IAvailableDeliveries>> {
        const itemsPagination = await this.deliveryRepository.findAvailable({}, payload)
        const items = itemsPagination.items
        const toSend = {
            [DeliveryTypes.pickup]: new ArrayResponse(items.filter(item => item.type === DeliveryTypes.pickup)),
            [DeliveryTypes.courier]: new ArrayResponse(items.filter(item => item.type === DeliveryTypes.courier)),
            [DeliveryTypes.integraiton]: {}
        }
        return new ObjectResponse<IAvailableDeliveries>(toSend)
    }
    async findByType({ type }, payload: RequestPayload) {
        return this.deliveryRepository.findByType({ type }, payload)
    }
}
