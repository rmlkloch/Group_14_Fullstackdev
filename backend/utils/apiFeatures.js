/**
 * Utility functions and class for handling API Filtering, Sorting, and Pagination.
 */

/**
 * Parses request query strings into a clean MongoDB filter criteria object.
 * Excludes reserved pagination and sorting keywords (page, limit, sortBy, order, fields).
 * Transforms aliases like assignedTo -> assignee.
 * Optionally enforces an allowedFields whitelist if provided.
 *
 * @param {Object} queryString - Express req.query object.
 * @param {Array<string>|null} allowedFields - Whitelist of allowed field names to filter on.
 * @returns {Object} Clean MongoDB filter criteria object.
 */
const parseFilter = (queryString = {}, allowedFields = null) => {
  const queryObj = { ...queryString };

  // 1. Exclude reserved system query parameters
  const excludedFields = ['page', 'limit', 'sortBy', 'order', 'fields'];
  excludedFields.forEach((param) => delete queryObj[param]);

  // 2. Handle alias field mappings (e.g. assignedTo -> assignee)
  if (queryObj.assignedTo && !queryObj.assignee) {
    queryObj.assignee = queryObj.assignedTo;
    delete queryObj.assignedTo;
  }

  // 3. Filter criteria by allowed fields if provided
  if (allowedFields && Array.isArray(allowedFields)) {
    const filteredQuery = {};
    Object.keys(queryObj).forEach((key) => {
      if (allowedFields.includes(key)) {
        filteredQuery[key] = queryObj[key];
      }
    });
    return filteredQuery;
  }

  return queryObj;
};

/**
 * Parses sortBy and order query parameters into a valid Mongoose sort object.
 *
 * @param {string} [sortBy='createdAt'] - Field name to sort by.
 * @param {string} [order='desc'] - Sort order: 'asc', '1' for ascending; anything else for descending.
 * @returns {Object} Mongoose sort object, e.g. { createdAt: -1 } or { title: 1 }.
 */
const parseSort = (sortBy = 'createdAt', order = 'desc') => {
  const sortField = sortBy || 'createdAt';
  const sortOrder = order === 'asc' || order === '1' ? 1 : -1;
  return { [sortField]: sortOrder };
};

/**
 * Validates whether explicit page or limit query parameters are valid positive integers.
 *
 * @param {string|number} param - Parameter to validate.
 * @returns {boolean} True if omitted, empty, or a valid positive integer.
 */
const isValidPaginationParam = (param) => {
  if (param === undefined || param === null || param === '') return true;
  const num = Number(param);
  return !isNaN(num) && Number.isInteger(num) && num > 0;
};

/**
 * Parses page and limit parameters into pagination values: page, limit, and skip.
 *
 * @param {string|number} pageParam - Page number.
 * @param {string|number} limitParam - Items per page.
 * @returns {{ page: number, limit: number, skip: number }} Calculated pagination values.
 */
const parsePagination = (pageParam, limitParam) => {
  const parsedPage = parseInt(pageParam, 10);
  const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedLimit = parseInt(limitParam, 10);
  const limit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};

/**
 * Class wrapper for chaining API features on Mongoose query objects.
 */
class APIFeatures {
  constructor(query, queryString, allowedFilterFields = null) {
    this.query = query;
    this.queryString = queryString || {};
    this.allowedFilterFields = allowedFilterFields;
    this.pagination = parsePagination(this.queryString.page, this.queryString.limit);
  }

  filter() {
    const filterCriteria = parseFilter(this.queryString, this.allowedFilterFields);
    if (this.query && typeof this.query.find === 'function') {
      this.query = this.query.find(filterCriteria);
    }
    this.filterCriteria = filterCriteria;
    return this;
  }

  sort() {
    const { sortBy, order } = this.queryString;
    const sortObj = parseSort(sortBy, order);
    if (this.query && typeof this.query.sort === 'function') {
      this.query = this.query.sort(sortObj);
    }
    this.sortObject = sortObj;
    return this;
  }

  paginate() {
    const { skip, limit } = this.pagination;
    if (this.query && typeof this.query.skip === 'function') {
      this.query = this.query.skip(skip);
    }
    if (this.query && typeof this.query.limit === 'function') {
      this.query = this.query.limit(limit);
    }
    return this;
  }
}

module.exports = {
  parseFilter,
  parseSort,
  parsePagination,
  isValidPaginationParam,
  APIFeatures,
};
