import { ActivityEnum, Game } from '@api-interfaces';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsDateString,
    IsNotEmptyObject,
    ValidateNested,
    IsNumber,
    IsEnum,
} from 'class-validator';
import { CreateTeamDto } from '../../team/dto/create-team.dto';
/**
 * The Data Transfer Object to create a game
 **/
export class CreateGameDto implements Game {
    /**
     * The activity property of a game
     **/
    @IsNotEmpty()
    @IsString()
    @IsEnum(ActivityEnum)
    @ApiProperty({
        enum: ActivityEnum,
        description: 'The given activity',
        example: 'SOCCER_ACTIVITY',
    })
    activity: ActivityEnum;
    /**
     * The firstTeam property of a game
     **/
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateTeamDto)
    firstTeam: CreateTeamDto;
    /**
     * The secondTeam property of a game
     **/
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateTeamDto)
    secondTeam: CreateTeamDto;
    /**
     * The date property of a game
     **/
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ example: '2021-11-29T12:00:00.666Z' })
    date: Date;
    /**
     * The firstTeamScore property of a game
     **/
    @IsNumber()
    @ApiPropertyOptional({ example: 3 })
    firstTeamScore?: number;
    /**
     * The secondTeamScore property of a game
     **/
    @IsNumber()
    @ApiPropertyOptional({ example: 2 })
    secondTeamScore?: number;
}
