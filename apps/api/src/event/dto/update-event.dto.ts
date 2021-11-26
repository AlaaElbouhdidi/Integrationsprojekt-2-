import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

/**
 * The Data Transfer Object to update an event
 * */
export class UpdateEventDto extends PartialType(CreateEventDto) {}
