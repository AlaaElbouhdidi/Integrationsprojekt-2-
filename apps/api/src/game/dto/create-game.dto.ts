import { Activity, Game } from '@api-interfaces';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsDateString,
    IsNumber,
    IsEnum,
    IsFirebasePushId,
    IsOptional,
} from 'class-validator';
/**
 * The Data Transfer Object to create a game
 **/
export class CreateGameDto implements Game {
    /**
     * The groupId property of a game
     **/
    @IsNotEmpty()
    @IsFirebasePushId()
    @ApiProperty({
        description: 'The group in which the game is played',
        example: 'SOCCER_ACTIVITY',
    })
    groupId: string;
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
    @IsFirebasePushId()
    @ApiProperty({
        description: 'The first team of the game',
        example: '',
    })
    firstTeamId: string;
    /**
     * The secondTeam property of a game
     **/
    @IsFirebasePushId()
    @ApiProperty({
        description: 'The first team of the game',
        example: '',
    })
    secondTeamId: string;
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
    @IsOptional()
    @ApiPropertyOptional({
        example: 3,
        description: 'The first teams score after the game is played',
    })
    firstTeamScore?: number;
    /**
     * The secondTeamScore property of a game
     **/
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        example: 2,
        description: 'The second teams score after the game is played',
    })
    secondTeamScore?: number;
}
