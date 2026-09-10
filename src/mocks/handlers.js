import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({
        user: { id: 1, email: 'test@example.com', role: 'member' }
      });
    }
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }),
  
  http.get('*/api/boards', () => {
    return HttpResponse.json([
      { id: 1, title: 'Board 1' }
    ]);
  })
];
