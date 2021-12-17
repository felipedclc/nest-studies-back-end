import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

export class JogadoresValidacaoParametrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) { // metadata indica se é um body/query/param
    console.log('value', value, 'metadata', metadata.type);
    if (!value) { // se não tiver o param
      throw new BadRequestException(
        `O valor do parametro ${metadata.data} deve ser informado`,
      );
    }

    return value;
  }
}
