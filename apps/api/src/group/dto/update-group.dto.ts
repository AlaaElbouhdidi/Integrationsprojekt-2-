import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
/**
 * The Data Transfer Object to update a group
 **/
export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
