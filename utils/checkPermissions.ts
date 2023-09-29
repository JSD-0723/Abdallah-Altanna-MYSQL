import CustomError from '../errors/CustomError';

const checkPermissions = (
  requestUserId: number | undefined,
  resourceUserId: number
) => {
  if (requestUserId === resourceUserId) return;
  throw new CustomError(401, 'Not authorized to access this route');
};

export default checkPermissions;
