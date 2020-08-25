import jwt from 'jsonwebtoken';
import { JwtAdapter } from './JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('any_token');
  },
}));

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret');
};

describe('Jwt Adapter', () => {
  it('should call sign with correct values', async () => {
    const sut = makeSut();

    const jwtSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt('any_id');

    expect(jwtSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  it('should return a token from sign with correct values', async () => {
    const sut = makeSut();

    const token = await sut.encrypt('any_id');

    expect(token).toBe('any_token');
  });

  it('should throw if sign throws', async () => {
    const sut = makeSut();

    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.encrypt('any_id')).rejects.toThrow();
  });
});