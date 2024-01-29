import {EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent} from 'typeorm';
import {Auditable} from "./auditable.entity";

@EventSubscriber()
export class AuditingSubscriber implements EntitySubscriberInterface<Auditable> {

    listenTo() {
        return Auditable;
    }

    beforeInsert(event: InsertEvent<Auditable>) {
        // Set created_at, updated_at, created_by, updated_by values for new entity
        event.entity.createdAt = new Date();
        event.entity.updatedAt = new Date();
        // You might want to set created_by based on the current user or some other logic
        event.entity.createdBy = 'someUser';
        event.entity.updatedBy = 'someUser';
    }

    beforeUpdate(event: UpdateEvent<Auditable>) {
        // Set updated_at and updated_by values for updated entity
        event.entity.updated_at = new Date();
        // You might want to set updated_by based on the current user or some other logic
        event.entity.updated_by = 'someUser';
    }
}