import { applyDecorators, UseGuards } from '@nestjs/common';
import { TeamOwnerGuard } from '../guards/team.owner.guard';

export const TeamOwner = () => applyDecorators(UseGuards(TeamOwnerGuard));
