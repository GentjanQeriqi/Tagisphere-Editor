export interface Project {
    id:           number;
    name:         string;
    organization: number;
    type:         string;
    is_public:    boolean;
    is_active:    boolean;
    description:  string;
    members:      Member[];
    created_at:   Date;
    updated_at:   Date;
}

export interface Member {
    user:    string;
    role:    string;
    project: number;
}