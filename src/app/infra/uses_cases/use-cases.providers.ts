import {
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    CreateUserUseCase,
} from "./index";


// Arreglo de casos de uso
export const useCasesProviders = [
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
    CreateUserUseCase,
];