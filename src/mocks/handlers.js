import { http, HttpResponse } from 'msw';
import { INITIAL_TRANSACTIONS } from '../mockData';

export const handlers = [
  http.get('/api/transactions', () => {
    return HttpResponse.json({
      success: true,
      data: INITIAL_TRANSACTIONS,
      message: 'Transactions fetched successfully',
    });
  }),

  http.post('/api/transactions', async ({ request }) => {
    const body = await request.json();
    
    if (!body.description || !body.amount || !body.date) {
      return HttpResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newTransaction = {
      id: Math.random().toString(36).substring(2, 10),
      ...body,
    };

    return HttpResponse.json({
      success: true,
      data: newTransaction,
      message: 'Transaction created successfully',
    });
  }),

  http.put('/api/transactions/:id', async ({ request, params }) => {
    const body = await request.json();

    return HttpResponse.json({
      success: true,
      data: { id: params.id, ...body },
      message: 'Transaction updated successfully',
    });
  }),

  http.delete('/api/transactions/:id', ({ params }) => {
    return HttpResponse.json({
      success: true,
      message: `Transaction ${params.id} deleted successfully`,
    });
  }),
];
