import Rest from '@octokit/rest';

const Hub = new Rest({});
const User = 'riih';

export async function getRepos() {
    const response = await Hub.repos.listForUser({
        username: User,
        type: 'owner',
        per_page: 100,
    });
    let repos: any[] = response.data;
    repos = repos.filter((val) =>
        val.fork === false,
    );
    // console.log(repos);
    return repos;
}



