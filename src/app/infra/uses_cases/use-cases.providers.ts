import {
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetByIdUserUseCase,
    GetAllUserUseCase,
    DeleteByIdUserUseCase,
} from "./index";


// Arreglo de casos de uso
export const useCasesProviders = [
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    GetByIdUserUseCase,
    GetAllUserUseCase,
    DeleteByIdUserUseCase,
];