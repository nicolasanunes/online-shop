import { LoginPayloadDto } from 'src/auth/dto/login-payload.dto';

export const authorizationToLoginPayload = (
  authorization: string,
): LoginPayloadDto | undefined => {
  const authoriationSplited = authorization.split('.');

  if (authoriationSplited.length < 3 || !authoriationSplited[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authoriationSplited[1], 'base64').toString('ascii'),
  );
};
