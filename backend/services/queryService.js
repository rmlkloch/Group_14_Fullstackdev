/**
 * Service to generate reusable Mongoose query parameters from an HTTP request query object.
 */

/**
 * Parses req.query to build a Mongoose filter, sort options, and pagination
 * @param {Object} queryParams - The req.query object from Express
 * @returns {Object} Object containing { filter, sortOptions, projection, page, limit, skip }
 */
exports.buildQueryOptions = (queryParams) => {
  const queryObj = { ...queryParams };
  
  // 1. Filtering
  // Fields to exclude from the standard Mongoose filter logic
  const excludedFields = ['page', 'limit', 'sortBy', 'order', 'sort', 'fields', 'assignedTo'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Handle custom backwards-compatible aliases
  if (queryParams.assignedTo && !queryObj.assignee) {
    queryObj.assignee = queryParams.assignedTo;
  }

  // Convert basic query string to support MongoDB operators (gte, gt, lte, lt, in, ne)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in|ne)\b/g, match => `$${match}`);
  const filter = JSON.parse(queryStr);

  // 2. Sorting
  let sortOptions = {};
  if (queryParams.sortBy) {
    sortOptions[queryParams.sortBy] = queryParams.order === 'asc' || queryParams.order === '1' ? 1 : -1;
  } else if (queryParams.sort) {
    // Handle comma-separated sort strings (e.g., sort=-createdAt,title)
    sortOptions = queryParams.sort.split(',').join(' ');
  } else {
    // Default sorting
    sortOptions['createdAt'] = -1;
  }

  // 3. Projection (Field limiting)
  let projection = null;
  if (queryParams.fields) {
    // E.g., fields=title,status -> 'title status'
    projection = queryParams.fields.split(',').join(' ');
  }

  // 4. Pagination
  const page = Math.max(1, parseInt(queryParams.page, 10) || 1);
  const limit = Math.max(1, parseInt(queryParams.limit, 10) || 10);
  const skip = (page - 1) * limit;

  return {
    filter,
    sortOptions,
    projection,
    page,
    limit,
    skip
  };
};
