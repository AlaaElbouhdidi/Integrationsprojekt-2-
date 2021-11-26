import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '@api-interfaces';
import { CollectionReference, DocumentData } from 'firebase-admin/firestore';

@Injectable()
export class EventService {
    private readonly logger: Logger = new Logger('EventsService');
    private readonly events: Event[] = [];
    private readonly eventsRef: CollectionReference<DocumentData> =
        this.firebaseService.firestore().collection('events');

    constructor(private readonly firebaseService: FirebaseService) {}

    create(createEventDto: CreateEventDto) {
        return 'This action adds a new event';
    }

    async findAll(): Promise<Event[]> {
        const snapshot = await this.eventsRef.get();
        snapshot.forEach((event) => {
            this.events.push({
                name: event.get('name'),
                description: event.get('description'),
                participants: event.get('participants'),
                date: event.get('date'),
            });
        });
        return this.events;
    }

    findOne(id: number) {
        return `This action returns a #${id} event`;
    }

    update(id: number, updateEventDto: UpdateEventDto) {
        return `This action updates a #${id} event`;
    }

    remove(id: number) {
        return `This action removes a #${id} event`;
    }
}
