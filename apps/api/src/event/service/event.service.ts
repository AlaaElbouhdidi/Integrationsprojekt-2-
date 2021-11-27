import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/service/firebase.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '@api-interfaces';
import * as admin from 'firebase-admin';
/**
 * The EventService
 * */
@Injectable()
export class EventService {
    /**
     * The constructor of the EventService
     * @param {FirebaseService} firebaseService The injected FirebaseService to use in the EventsService
     * */
    constructor(private readonly firebaseService: FirebaseService) {}
    /**
     * The EventService Logger
     * */
    private readonly logger: Logger = new Logger('EventService');
    /**
     * The reference to the events collection in firestore
     * */
    private readonly eventsRef = this.firebaseService
        .getFirestore()
        .collection('events');
    /**
     * The method to create an event
     * @param {admin.auth.DecodedIdToken} user The logged in user
     * @param {CreateEventDto} createEventDto The DTO to create an event
     * @returns {Promise<Event>} The inserted event document from firestore
     * */
    async create(
        user: admin.auth.DecodedIdToken,
        createEventDto: CreateEventDto
    ): Promise<Event> {
        try {
            const { uid } = user;
            const { name, description, date, participants } = createEventDto;
            const data = {
                name,
                description,
                date,
                participants: [uid, ...participants],
            };
            const res = await this.eventsRef.add(data);
            this.logger.log(`Successfully created event with id ${res.id}`);
            const event = await res.get();
            const eventData: Event = {
                name: event.get('name'),
                description: event.get('description'),
                participants: event.get('participants'),
                date: event.get('date'),
            };
            this.logger.log(eventData);
            return eventData;
        } catch (e) {
            this.logger.error(`Failed creating event`);
            throw new InternalServerErrorException(
                `Failed to create event, check the DTO that was sent over the network.`
            );
        }
    }
    /**
     * The method that finds all events
     * @returns {Promise<Event[]>} The events of firestore
     * */
    async findAll(): Promise<Event[]> {
        try {
            const events: Event[] = [];
            const snapshot = await this.eventsRef.get();
            snapshot.forEach((event) => {
                const eventData: Event = {
                    name: event.get('name'),
                    description: event.get('description'),
                    participants: event.get('participants'),
                    date: event.get('date'),
                };
                this.logger.log(`Successfully fetched event`);
                this.logger.log(eventData);
                events.push(eventData);
            });
            return events;
        } catch (e) {
            this.logger.error(`Failed to fetch all events`);
            throw new InternalServerErrorException(
                `Failed to fetch all events`
            );
        }
    }
    /**
     * Method that finds an event by id
     * @param {string} id The id of the event
     * @returns {Promise<Event>} Returns the event
     * */
    async findOne(id: string): Promise<Event> {
        try {
            const event = await this.eventsRef.doc(id).get();
            const eventData: Event = {
                name: event.get('name'),
                description: event.get('description'),
                participants: event.get('participants'),
                date: event.get('date'),
            };
            this.logger.log(`Successfully fetched event with id ${id}`);
            this.logger.log(eventData);
            return eventData;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to fetch event #${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to fetch event #${id}`
            );
        }
    }
    /**
     * The method to update an event
     * @param {string} id The id of the event to update
     * @param {UpdateEventDto} UpdateEventDto The DTO to update an event
     * @returns {Promise<Event>} The updated event document from firestore
     * */
    async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
        try {
            const { name, description, date, participants } = updateEventDto;
            await this.eventsRef.doc(id).update({
                name: name,
                description: description,
                date: date,
                participants: participants,
            });
            const event = await this.eventsRef.doc(id).get();
            const eventData: Event = {
                name: event.get('name'),
                description: event.get('description'),
                participants: event.get('participants'),
                date: event.get('date'),
            };
            this.logger.debug(eventData);
            this.logger.log(`Successfully updated event with id ${id}`);
            this.logger.log(eventData);
            return eventData;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to update event #${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to update event #${id}`
            );
        }
    }
    /**
     * The method to delete an event
     * @param {string} id The id of the event to delete
     * @returns {Promise<Event>} The deleted event document from firestore
     * */
    async remove(id: string): Promise<Event> {
        try {
            const event = await this.eventsRef.doc(id).get();
            const eventData: Event = {
                name: event.get('name'),
                description: event.get('description'),
                participants: event.get('participants'),
                date: event.get('date'),
            };
            await this.eventsRef.doc(id).delete();
            this.logger.log(`Successfully deleted event with id ${id}`);
            this.logger.log(eventData);
            return eventData;
        } catch (e) {
            this.logger.error(
                `Unexpected server error. Failed to delete event #${id}`
            );
            throw new InternalServerErrorException(
                `Unexpected server error. Failed to delete event #${id}`
            );
        }
    }
}
