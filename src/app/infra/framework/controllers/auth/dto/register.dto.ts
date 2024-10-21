import {
  IsEmail,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/app/core/base/shared/interfaces/user_role';


export class RegisterDTO {
  @ApiProperty({ description: 'User email address', example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'User password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'User name', example: 'John Oliver' })
  @IsString()
  @IsNotEmpty()
  names: string;

  @ApiProperty({ description: 'User last name', example: 'Doe Anderson' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User role', enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ description: 'User phone number', example: '04-456-7890', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'User cell phone number', example: '123-456-7890', required: false })
  @IsOptional()
  @IsString()
  cellPhoneNumber?: string;

  @ApiProperty({ description: 'URL of the user profile image', required: false })
  @IsOptional()
  @IsString()
  profileImage?: string;

}
