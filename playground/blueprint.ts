import estorage, { StringType } from 'estorage';
import { Model } from 'mongoose';

type BlueprintType =
| { [x: string]: BlueprintTypes }
| { [x: string]: { type: BlueprintTypes & StringType } };

type BlueprintTypes = estorage.AllType;

class Blueprint<
T extends Record<string, BlueprintTypes>,
TDefinition = estorage.EventsConfigToDiscriminatedUnion<T>,
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
T extends Record<string, estorage.AllType>,
TDefinition = estorage.EventsConfigToDiscriminatedUnion<T>,
>(blueprintName: string, blueprint: Blueprint<T, TDefinition>): Model<TDefinition> => {
  console.log(blueprintName, blueprint);
};
export default Blueprint;
export { implement };
