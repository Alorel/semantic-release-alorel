import {Conf} from '../Conf';
import {Context} from '../Context';
import {setReadmeVersions} from './setReadmeVersions';

/**
 * Preparation script
 * @param _cfg Configuration
 * @param ctx Runtime context
 */
export async function prepare(_cfg: Conf = {}, ctx: Context) {
  await setReadmeVersions(_cfg, ctx);
}
