import { HttpStatus } from '@nestjs/common';

export default {
  OK: {
    status: HttpStatus.OK,
    description: 'Ok',
  },
  CREATED: {
    status: HttpStatus.CREATED,
    description: 'Cadastrado com sucesso',
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  },
  CONFLICT: {
    status: HttpStatus.CONFLICT,
    description: 'Já existe um registro com estes dados',
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    description: 'Não encontrado',
  },
};
