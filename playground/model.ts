import estorage, { BlueprintTypeOptions } from 'estorage';

// Model class will recieve a Blueprint class,
// and can save things into the localStorage with basic CRUD functions (similar to mongoose)
class Model<
T = Record<string, BlueprintTypeOptions>
TDefinition = estorage.BlueprintToDiscriminatedUnion<T>,
> {

}
