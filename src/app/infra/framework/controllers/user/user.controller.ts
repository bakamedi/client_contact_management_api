import { CreateUserUseCase } from "@infra/uses_cases";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/app/core/base/shared/guards/jwt-auth.guard";
import { CreateUserDTO } from "./dto/create-user.dto";

@ApiTags('pets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) { }

    @Post()
    @ApiBody({ type: CreateUserDTO })
    async create(
        @Body() createUserDTO: CreateUserDTO,
    ) {
        return await this.createUserUseCase.execute(
            createUserDTO,
        );
    }
}