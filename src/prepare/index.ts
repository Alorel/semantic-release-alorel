import {Conf} from '../Conf';
import {Context} from '../Context';
import {setReadmeVersions} from './setReadmeVersions';

export async function prepare(_cfg: Conf = {}, ctx: Context) {
  await setReadmeVersions(_cfg, ctx);
}
