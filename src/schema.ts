export interface fileStrSchema {
  id: number;
  name: string;
  isFolder: boolean;
  children?: fileStrSchema[];
}
