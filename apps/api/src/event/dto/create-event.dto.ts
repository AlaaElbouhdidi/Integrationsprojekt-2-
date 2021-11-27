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
    @ApiProperty({ example: 'Weihnachtsmarkt' })
    name: string;
    /**
     * The description property of an event
     **/
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Weihnachtsmarkt in Gießen am Marktplatz' })
    description: string;
    /**
     * The date property of an event
     **/
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ example: '2021-11-29T12:00:00.666Z' })
    date: Date;
    /**
     * The participants property of an event
     **/
    @IsArray()
    @ApiProperty({ example: ['TX5RYf6QIcW0WC8urdf8XUyNKMi2'] })
    participants?: string[];
}
