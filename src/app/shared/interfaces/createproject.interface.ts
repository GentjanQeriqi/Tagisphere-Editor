import { ProjectEnums } from '../../enums/ProjectEnums';

export interface CreateProjectInputs {
  name: string;
  organization: number;
  type: ProjectEnums;
  is_public: boolean;
  description: string;
}
