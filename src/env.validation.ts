import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ValidationError } from 'class-validator/types/validation/ValidationError';

export function validate<T>(
  config: Record<string, unknown>,
  schema: ClassConstructor<T>,
): T {
  const validatedConfig: T = plainToClass(schema, config, {
    enableImplicitConversion: true,
  });

  const errors: ValidationError[] = validateSync(
    validatedConfig as Record<string, unknown>,
    {
      skipMissingProperties: false,
    },
  );

  if (errors.length > 0) {
    const errMessage: string = errors
      .map((err) => err.toString(false))
      .toString();
    console.error('errMessage', errMessage);
  }
  return validatedConfig;
}
