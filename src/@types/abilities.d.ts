import { Ability, Subject, MongoQuery, SubjectRawRule } from '@casl/ability';

export type AbilitiesProps =
  | SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery<AnyObject>>[]
  | undefined;

export type CaslAbilitiesProps = {
  abilities: Ability;
  updateAbilities(rules: AbilitiesProps): void;
};
