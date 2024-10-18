import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/app/core/base/shared/interfaces/user_role";

export class CreateUserDTO {
    @ApiProperty({ description: 'User name', example: 'John Oliver' })
    @IsString()
    @IsNotEmpty()
    names: string;

    @ApiProperty({ description: 'User last name', example: 'Doe Anderson' })
    @IsString()
    @IsNotEmpty()
    @Expose({ name: 'last_name' })
    lastName: string;

    @ApiProperty({ description: 'User role', enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole;

    @ApiProperty({ description: 'User phone number', example: '04-456-7890' })
    @IsString()
    @Expose({ name: 'phone_number' })
    phoneNumber?: string;

    @ApiProperty({ description: 'User cell phone number', example: '123-456-7890' })
    @IsString()
    @Expose({ name: 'cell_phone_number' })
    cellPhoneNumber?: string;

    @ApiProperty({ description: 'URL of the user profile image', required: false })
    @IsOptional()
    @IsString()
    @Expose({ name: 'profile_image' })
    profileImage?: string;
}
