import { Activity, Group } from '@api-interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsEnum,
} from 'class-validator';
import { CreateMemberDto } from '../../team/dto/create-team.dto';
/**
 * The Data Transfer Object to create a group
 **/
export class CreateGroupDto implements Group {
    /**
     * The name property of a group
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Fußballkönige',
        description: 'The name of the group',
    })
    name: string;
    /**
     * The description property of a group
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Immerhin besser als Bielefeld',
        description: 'The description of the group',
    })
    description: string;
    /**
     * The activity property of a group
     **/
    @IsNotEmpty()
    @IsEnum(Activity)
    @ApiProperty({
        enum: Activity,
        description: 'The given activity of the group',
        example: 'SOCCER_ACTIVITY',
    })
    activity: Activity;
    /**
     * The member property of a group
     **/
    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => CreateMemberDto)
    @ApiProperty({
        description: 'The member of a group',
        type: [CreateMemberDto],
    })
    member: CreateMemberDto[];
}
