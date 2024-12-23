import { tokenTypeEnum } from '../database/schema/tokens';

type TokenType = (typeof tokenTypeEnum)['enumValues'][number];
export default TokenType;
