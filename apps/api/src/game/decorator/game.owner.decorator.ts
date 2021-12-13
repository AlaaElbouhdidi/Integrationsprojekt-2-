import { applyDecorators, UseGuards } from '@nestjs/common';
import { GameOwnerGuard } from '../guards/game.owner.guard';

export const GameOwner = () => applyDecorators(UseGuards(GameOwnerGuard));
