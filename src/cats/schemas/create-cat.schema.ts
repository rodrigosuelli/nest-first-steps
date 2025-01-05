import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

type RequiredCreateCatDto = {
  [K in keyof z.infer<typeof createCatSchema>]-?: z.infer<
    typeof createCatSchema
  >[K];
};

export type CreateCatDto = RequiredCreateCatDto;
// export type CreateCatDto = z.infer<typeof createCatSchema>;
