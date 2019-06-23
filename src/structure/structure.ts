import Vue from 'vue';
import Rest from '@octokit/rest';

export enum Breaker{
  None,
  Before,
  After
}
export interface PageComponent {
  name: string;
  componentPath: string;
  data: any;
  breaker: Breaker;
}
const Hub = new Rest({});

async function loadRepos(){
  return (await Hub.repos.listForUser({
    username: 'riih',
    per_page: 100,
    type: 'owner',
  })).data.filter((val: any) =>
    val.fork === false,
  );
}
let instance: PageComponent[] | undefined;

export async function loadStructure() {
  if (instance !== undefined) { return instance; }
  const repoPages = (await loadRepos()).map((repo: any) => {
    return {
      name: 'repo',
      componentPath: 'repo.vue',
      data: repo,
    } as PageComponent;
  });
  const structure = [
    {
      name: 'head-page',
      componentPath: 'head.vue',
      breaker: Breaker.After,
    },
    ...repoPages,
    {
      name: 'foot-page',
      componentPath: 'footer.vue',
      breaker: Breaker.Before,
    },
  ];
  instance = structure;
  return structure;
}
