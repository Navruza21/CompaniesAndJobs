export interface CompanyType {
  id: number;
  title: string;
  desc?: string;
  image?: string;
  website?: string;
}
export interface JobType {
  id: number;
  title: string;
  desc: string;
  technologies: string[]; //
  location?: string;
  salary: number;
  phone?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
  companyId?: number; //
}
