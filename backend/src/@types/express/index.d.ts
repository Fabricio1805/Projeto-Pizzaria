import { User } from '../../prisma/index';

declare global {
	namespace Express {
		export interface Request {
			user: Partial<User>
		}
	}
}
