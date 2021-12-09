import { applyDecorators, UseGuards } from '@nestjs/common';
import { GroupOwnerGuard } from '../guards/group.owner.guard';

export const GroupOwner = () => applyDecorators(UseGuards(GroupOwnerGuard));
