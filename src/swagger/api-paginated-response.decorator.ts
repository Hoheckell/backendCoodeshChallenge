import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginatedResponse = (options: object, model: any) => {
  options = {
    ...options,
    ...{
      schema: {
        properties: {
          count: {
            type: 'number',
          },
          results: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    },
  };
  return applyDecorators(ApiOkResponse(options));
};
