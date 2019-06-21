import Rest from '@octokit/rest';

const Hub = new Rest({})
const user = "riih"
export function init() {
    return new Promise((res, rej) => {
        Hub.users.getByUsername({
            username: user
        }).then(data => {
            hubUser = data.data;
            res(hubUser);
        })
            .catch(err => rej(err))
    })
}

export async function getRepos() {
    let response = await Hub.repos.listForUser({
        username: user,
        type: 'owner',
        per_page: 100,
    })
    let repos: Array<any> = response.data;
    repos = repos.filter((val) =>
        val.fork === false
    )
    console.log(repos);
    return repos;
}



