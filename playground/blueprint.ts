import estorage, { AllTypes } from 'estorage';
import { Model } from 'mongoose';

// type BlueprintTypeOptions<T> = T extends { type: infer U } ? U : never;

// type BlueprintDefinition =
// | { [x: string]: AllTypes }
// | { [x: string]: { type: AllTypes } };

class Blueprint<
T extends Record<string, AllTypes>,
TDefinition = estorage.BlueprintToDiscriminatedUnion<T>,
> {
  constructor(private definition: TDefinition) {
    this.definition = definition;
  }

  add(definition: TDefinition): Blueprint<T, TDefinition> {
    const newDefinition = { ...this.definition, definition };
    return new Blueprint<T, TDefinition>(newDefinition);
  }
}

const implement = <
T extends Record<string, estorage.AllTypes>,
TDefinition = estorage.BlueprintToDiscriminatedUnion<T>,
>(blueprintName: string, blueprint: Blueprint<T, TDefinition>): Model<TDefinition> => {
  console.log(blueprintName, blueprint);
};
export default Blueprint;
export { implement };
