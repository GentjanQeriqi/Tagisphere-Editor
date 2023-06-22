import { Member } from "./project.interface";

export interface Organization {
    id:                  number;
    name:                string;
    size:                string;
    location:            Location;
    business_type:       string;
    other_business_type: string;
    members:             Member[];
    pending_invitations: PendingInvitation[];
}

export interface Location {
    type:        string;
    coordinates: number[];
}

export interface PendingInvitation {
    email:             string;
    role:              string;
    organization_info: OrganizationInfo;
    invited_by:        string;
    is_accepted:       boolean;
}

export interface OrganizationInfo{
    id: number;
    name: string;
}
