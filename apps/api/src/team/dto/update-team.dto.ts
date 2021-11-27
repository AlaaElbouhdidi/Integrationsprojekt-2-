import { PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto';
/**
 * The Data Transfer Object to update a team
 **/
export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
