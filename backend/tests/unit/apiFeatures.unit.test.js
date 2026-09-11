const {
  parseFilter,
  parseSort,
  parsePagination,
  APIFeatures,
} = require('../../utils/apiFeatures');

describe('APIFeatures Unit Tests', () => {
  describe('Pagination Logic', () => {
    test('calculates correct skip and limit from page and limit query parameters', () => {
      const result = parsePagination('2', '5');
      expect(result.page).toBe(2);
      expect(result.limit).toBe(5);
      expect(result.skip).toBe(5);
    });

    test('calculates correct skip and limit for page 3 with limit 10', () => {
      const result = parsePagination(3, 10);
      expect(result.page).toBe(3);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(20);
    });

    test('uses default fallback values (page 1, limit 10, skip 0) when parameters are omitted', () => {
      const result = parsePagination(undefined, undefined);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(0);
    });

    test('handles invalid, non-numeric, or negative parameters gracefully with defaults', () => {
      const result = parsePagination('invalid', '-5');
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.skip).toBe(0);
    });
  });

  describe('Sorting Logic', () => {
    test('maps sortBy and ascending order to Mongoose sort object with value 1', () => {
      const sortObj = parseSort('title', 'asc');
      expect(sortObj).toEqual({ title: 1 });
    });

    test('maps sortBy and order "1" to Mongoose sort object with value 1', () => {
      const sortObj = parseSort('dueDate', '1');
      expect(sortObj).toEqual({ dueDate: 1 });
    });

    test('maps sortBy and descending order to Mongoose sort object with value -1', () => {
      const sortObj = parseSort('priority', 'desc');
      expect(sortObj).toEqual({ priority: -1 });
    });

    test('defaults to sorting by createdAt descending (-1) when parameters are omitted', () => {
      const sortObj = parseSort(undefined, undefined);
      expect(sortObj).toEqual({ createdAt: -1 });
    });
  });

  describe('Filtering Logic', () => {
    test('transforms query parameters like status and priority into filter criteria', () => {
      const query = { status: 'To do', priority: 'High' };
      const filter = parseFilter(query);
      expect(filter).toEqual({ status: 'To do', priority: 'High' });
    });

    test('ignores system / pagination / sorting reserved keys (page, limit, sortBy, order, fields)', () => {
      const query = {
        status: 'In Progress',
        page: '2',
        limit: '10',
        sortBy: 'dueDate',
        order: 'asc',
        fields: 'title,status',
      };
      const filter = parseFilter(query);
      expect(filter).toEqual({ status: 'In Progress' });
      expect(filter.page).toBeUndefined();
      expect(filter.limit).toBeUndefined();
      expect(filter.sortBy).toBeUndefined();
      expect(filter.order).toBeUndefined();
      expect(filter.fields).toBeUndefined();
    });

    test('transforms alias field assignedTo to assignee', () => {
      const query = { assignedTo: 'user123', status: 'Done' };
      const filter = parseFilter(query);
      expect(filter).toEqual({ assignee: 'user123', status: 'Done' });
    });

    test('filters out unallowed invalid keys when an allowedFields whitelist is provided', () => {
      const query = {
        status: 'Done',
        boardId: 'board123',
        unallowedKey: 'hackedValue',
        randomParam: '123',
      };
      const allowedFields = ['status', 'boardId'];
      const filter = parseFilter(query, allowedFields);
      expect(filter).toEqual({ status: 'Done', boardId: 'board123' });
      expect(filter.unallowedKey).toBeUndefined();
      expect(filter.randomParam).toBeUndefined();
    });
  });

  describe('APIFeatures Class Chainability', () => {
    test('chains filter, sort, and paginate methods on mock query object', () => {
      const mockQuery = {
        find: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };

      const queryString = {
        status: 'To do',
        sortBy: 'title',
        order: 'asc',
        page: '2',
        limit: '5',
      };

      const features = new APIFeatures(mockQuery, queryString).filter().sort().paginate();

      expect(mockQuery.find).toHaveBeenCalledWith({ status: 'To do' });
      expect(mockQuery.sort).toHaveBeenCalledWith({ title: 1 });
      expect(mockQuery.skip).toHaveBeenCalledWith(5);
      expect(mockQuery.limit).toHaveBeenCalledWith(5);
      expect(features).toBeInstanceOf(APIFeatures);
    });
  });
});
