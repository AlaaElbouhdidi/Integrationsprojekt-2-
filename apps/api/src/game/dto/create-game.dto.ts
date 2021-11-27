import { Activity, Game } from '@api-interfaces';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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
    @IsEnum(Activity)
    @ApiProperty({
        enum: Activity,
        description: 'The given activity',
        example: 'SOCCER_ACTIVITY',
    })
    activity: Activity;
    /**
     * The firstTeam property of a game
     **/
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateTeamDto)
    @ApiProperty({
        description: 'The first team of the game',
        type: CreateTeamDto,
    })
    firstTeam: CreateTeamDto;
    /**
     * The secondTeam property of a game
     **/
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateTeamDto)
    @ApiProperty({
        description: 'The second team of the game',
        type: CreateTeamDto,
    })
    secondTeam: CreateTeamDto;
    /**
     * The date property of a game
     **/
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({
        example: '2021-11-29T12:00:00.666Z',
        description: 'The date when the game will be played',
    })
    date: Date;
    /**
     * The firstTeamScore property of a game
     **/
    @IsNumber()
    @ApiPropertyOptional({
        example: 3,
        description: 'The first teams score after the game is played',
    })
    firstTeamScore?: number;
    /**
     * The secondTeamScore property of a game
     **/
    @IsNumber()
    @ApiPropertyOptional({
        example: 2,
        description: 'The second teams score after the game is played',
    })
    secondTeamScore?: number;
}
