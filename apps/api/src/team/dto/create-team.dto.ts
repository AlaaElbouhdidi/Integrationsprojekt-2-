import { Member, Team } from '@api-interfaces';
/**
 * The Data Transfer Object to create a team
 **/
export class CreateTeamDto implements Team {
    member: Member[];
    groupId: string;
}
