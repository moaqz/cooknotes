import {
  maxLength,
  minLength,
  number,
  object,
  pipe,
  string,
  trim,
  minValue,
  array,
  optional,
} from "valibot";

const StepsScheme = object({
  description: pipe(string(), trim())
});

const IngredientSection = object({
  section_name: pipe(string(), trim()),
  ingredients: array(pipe(string(), trim())),
});

export const RecipeScheme = object({
  data: object({
    name: pipe(string(), trim(), minLength(3), maxLength(60)),
    main_image: pipe(string(), trim()),
    cooking_time: pipe(number(), minValue(0)),
    steps: optional(array(StepsScheme)),
    ingredients: optional(array(IngredientSection))
  }),
  metadata: object({}),
});
