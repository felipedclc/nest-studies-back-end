import { SetMetadata } from "@nestjs/common";

export const Role = (role: string) => SetMetadata('role', role);
// SetMetadata armazena a informação na memória
// chamando os metadados de role
