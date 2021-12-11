import { applyDecorators, UseGuards } from '@nestjs/common';
import { EventOwnerGuard } from '../guards/event.owner.guard';

export const EventOwner = () => applyDecorators(UseGuards(EventOwnerGuard));
