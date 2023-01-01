import { ApiPerk } from "./api";

export const replacePerkDescriptionWithtunables = (
  description: string,
  tunables: ApiPerk[string]["tunables"]
) => {
  let newDescription = description;

  const tunablesOneDimensionalArray = tunables.map((tunable) =>
    tunable.join("/")
  );

  for (let index = 0; index < tunablesOneDimensionalArray.length; index++) {
    const tunable = tunablesOneDimensionalArray[index];
    newDescription = newDescription.replace(`{${index}}`, tunable);
  }

  return newDescription;
};
