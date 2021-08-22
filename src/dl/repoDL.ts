import { Repo } from '@/types/module';
import axios from 'axios';

export default {
  async getRepos(): Promise<Array<Repo>> {
    const res = await axios.get('http://localhost:4567/repos');
    return res.data;
  },

  async changeStatus(repo: Repo): Promise<Repo> {
    const res = await axios.post('http://localhost:4567/visibility', {
      repo: {
        ...repo,
        protected: !repo.protected,
      },
    });
    return res.data;
  },
};
