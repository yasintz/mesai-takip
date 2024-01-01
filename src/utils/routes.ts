const baseUrl = '/mesai-takip';

export const routePaths = {
  create: () => `${baseUrl}/create`,
  home: () => `${baseUrl || '/'}`,
  settings: () => `${baseUrl}/settings`,
  edit: (id: string) => `${baseUrl}/edit/${id}`,
};
