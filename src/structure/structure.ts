import Vue from 'vue';
import Rest from '@octokit/rest';

export interface PageComponent {
  name: string,
  componentPath: string;
}
const Hub = new Rest({});


export async function loadStructure(){
  const Repos = (await Hub.repos.listForUser({
    username: 'riih',
    per_page: 100,
    type: 'owner',
  })).data.filter((val: any) =>
  val.fork === false,
  );

  
}

const structure: PageComponent[] = [
  {
    name: 'head-page',
    componentPath: 'test.vue',
  },

  {
    name: 'foot-page',
    componentPath: 'footer.vue',
  }
];

structure.forEach(entry => {
  Vue.component(entry.name, () => import(entry.componentPath));
});

export default structure;
