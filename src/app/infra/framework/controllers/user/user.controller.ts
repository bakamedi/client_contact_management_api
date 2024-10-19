import { CreateUserUseCase, GetByIdUserUseCase, GetAllUserUseCase, UpdateUserUseCase } from "@infra/uses_cases";
import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/app/core/base/shared/guards/jwt-auth.guard";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly getByIdUserUseCase: GetByIdUserUseCase,
        private readonly getAllUserUseCase: GetAllUserUseCase,


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

    @Get()
    async findAll(
    ) {
        return await this.getAllUserUseCase.execute();
    }

    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
    async findOne(
        @Param('id') idUser: string,
    ) {
        return await this.getByIdUserUseCase.execute({
            idUser,
        });
    }

    @Put(':id')
    @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
    @ApiBody({ type: UpdateUserDTO })
    async update(
        @Param('id') idUser: string,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        return await this.updateUserUseCase.execute({
            idUser,
            updateUserDTO,
        });
    }

}