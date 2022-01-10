import { Member } from '@api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsString,
    ValidateNested
} from 'class-validator';
/**
 * The Data Transfer Object to create a team
 **/
export class CreateMemberDto implements Member {
    /**
     * The uid property for member
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'TX5RYf6QIcW0WC8urdf8XUyNKMi2',
        description: 'The uid of the team member'
    })
    uid: string;
    /**
     * The isAdmin property for member
     **/
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({
        example: false,
        description: 'Whether the team member is an admin'
    })
    isAdmin: boolean;
}
/**
 * The Data Transfer Object to create the member property of a team
 **/
export class CreateTeamDto {
    /**
     * The member property of a team
     **/
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => CreateMemberDto)
    @ApiProperty({
        description: 'The member of a team',
        type: [CreateMemberDto]
    })
    member: CreateMemberDto[];
    /**
     * The groupId property of a team
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Z47AQg1mEtZ0MEMxbV90',
        description: 'The id of the group in which the team is created'
    })
    groupId: string;
}
