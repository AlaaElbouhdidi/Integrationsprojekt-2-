import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsDateString } from 'class-validator';
import { Event } from '@api-interfaces';
/**
 * The Data Transfer Object to create an event
 **/
export class CreateEventDto implements Event {
    /**
     * The name property of an event
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Weihnachtsmarkt',
        description: 'The name of the event'
    })
    name: string;
    /**
     * The description property of an event
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Weihnachtsmarkt in Gießen am Marktplatz',
        description: 'The description of the event'
    })
    description: string;
    /**
     * The date property of an event
     **/
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({
        example: '2021-11-29T12:00:00.666Z',
        description: 'The date of the event'
    })
    date: string;
    /**
     * The participants property of an event
     **/
    @IsArray()
    @ApiProperty({
        example: ['TX5RYf6QIcW0WC8urdf8XUyNKMi2'],
        description: 'The participants of an event'
    })
    participants?: string[];
}
