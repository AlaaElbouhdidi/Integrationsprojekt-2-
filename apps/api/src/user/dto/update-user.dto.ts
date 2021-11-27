import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
/**
 * The Data Transfer Object to update a user
 **/
export class UpdateUserDto extends PartialType(CreateUserDto) {}
