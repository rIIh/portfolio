import Mongo from 'mongoose';

import {Document, Schema, Model, model} from 'mongoose';

import Rest from '@octokit/rest';
// const Hub = new Rest({});

interface IProject extends Document {
  name: string;
  gh_id: string;
  stargazers_count: number;
  previews: string[];
}

const ProjectSchema: Schema = new Schema({
  name: String,
  gh_id: String,
  previews: [String],
});
import { getRepos } from "../api/gh";

ProjectSchema.post('find', async function(doc: IProject, next) {
  // doc.stargazers_count = await Hub.repos.get({repo: doc.gh_id, owner: 'riih'});
  next()
})
export const User: Model<IProject> = model<IProject>('project', ProjectSchema);