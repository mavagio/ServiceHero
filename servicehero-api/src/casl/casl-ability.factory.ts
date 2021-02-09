import { Listing } from '../listing/listing.schema';
import { Action } from './types';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserType } from '../user/types';
import { ValidatedUser } from '../auth/types';
import { Project, Review } from '../project/project.schema';
import { ClientStatus, ProjectStatus, SpecialistStatus, Status } from '../project/types';

type Subjects = InferSubjects<
  | typeof ValidatedUser
  | typeof Listing
  | typeof Project
  | typeof Review
  | typeof Status,
  true
>;
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: ValidatedUser) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    cannot(Action.Manage, Listing.modelName);
    cannot(Action.Manage, Project.modelName);
    cannot(Action.Manage, Review.modelName);
    cannot(Action.Manage, Status.modelName);

    if (user.type === UserType.Specialist) {
      can(Action.Create, Listing.modelName);
      can(Action.Update, Listing.modelName,  { specialist: user.id });

      can([Action.Update], Project.modelName, { specialist: user.id });
      can([Action.Delete], Listing.modelName, { specialist: user.id });

      can([Action.Update], Status.modelName, { status: {$in: Object.keys(SpecialistStatus)}});
    } else if (user.type === UserType.Client) {
      can(Action.Create, Project.modelName);
      can([Action.Update], Project.modelName, { client: user.id });

      can([Action.Update], Review.modelName, { client: user.id, status: ProjectStatus.Completed });
      can([Action.Update], Review.modelName, { client: user.id, status: ProjectStatus.CompleteRejected });

      can([Action.Update], Status.modelName, { status: {$in: Object.keys(ClientStatus)}});
    }
    can(Action.Read, Listing.modelName);
    can(Action.Read, Project.modelName);
    return build();
  }
}
