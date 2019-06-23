export interface PageView {
  id: string;
}

export interface RepoView extends PageView {
  title: string;
  tags: Tag[];
  previews: string[];
}

export interface Tag {
  label: string;
  icon: string;
}