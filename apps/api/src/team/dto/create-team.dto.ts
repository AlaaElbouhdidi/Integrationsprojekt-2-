import { Member, Team } from '@api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsString,
    ValidateNested,
} from 'class-validator';
/**
 * The Data Transfer Object to create a team
 **/

/**
 * The Data Transfer Object to create the member property of a team
 **/
export class CreateMemberDto implements Member {
    /**
     * The uid property for member
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '', description: 'The uid of the team member' })
    uid: string;
    /**
     * The isAdmin property for member
     **/
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: false,
        description: 'Whether the team member is an admin',
    })
    isAdmin: boolean;
    /**
     * The groupId property for member
     **/
}

export class CreateTeamDto implements Team {
    /**
     * The member property of a team
     **/
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => CreateMemberDto)
    @ApiProperty({
        description: 'The member of a team',
        type: [CreateMemberDto],
    })
    member: CreateMemberDto[];
    /**
     * The groupId property of a team
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: '',
        description: 'The id of the group in which the team is created',
    })
    groupId: string;
}
