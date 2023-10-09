export interface RequestParams {
  id: string;
}

export interface UserBody {
  avatar: string;
  name: string;
  email: string;
  password: string;
}

export interface CVBody {
  name: string;
  email: string;
  job: string;
  phone: string;
  linkedin: string;
  github: string;
  resume: string;
  experiences: ProfExp[];
  competencies: Competency[];
  certifications: Certification[];
  user: User;
}

export interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  cvs: CV[];
}

export interface CV {
  id: string;
  name: string;
  email: string;
  job: string;
  phone: string;
  linkedin: string;
  github: string;
  resume: string;
  experiences: ProfExp[];
  competencies: Competency[];
  certifications: Certification[];
  userId: string;
  createdAt: string;
}

export interface ProfExp {
  id: number;
  title: string;
  city: string;
  state: string;
  start: string;
  end: string;
  description: string;
  cv?: CV;
  cVId?: string;
}

export interface Competency {
  id: number;
  title: string;
  cv?: CV;
  cVId?: string;
}

export interface Certification {
  id: number;
  title: string;
  year: number;
  cv?: CV;
  cVId?: string;
}
