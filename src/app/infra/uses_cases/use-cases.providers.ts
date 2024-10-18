import {
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
} from "./index";


// Arreglo de casos de uso
export const useCasesProviders = [
    LoginUseCase,
    RegisterUseCase,
    RefreshTokenUseCase,
];