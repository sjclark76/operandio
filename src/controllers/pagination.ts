/**
 * Validates pagination parameters for page number and page size.
 *
 * This function ensures that the provided `page` and `size` values are positive integers.
 * If the values are invalid, it returns an error message. Otherwise, it returns the parsed
 * `pageNumber` and `pageSize`.
 *
 * @param {unknown} page - The page number provided in the query parameters.
 * @param {unknown} size - The page size provided in the query parameters.
 * @returns {{ pageNumber: number; pageSize: number } | { error: string }} - An object containing
 *          either the parsed pagination parameters or an error message.
 */
export function validatePaginationParams(
  page: unknown,
  size: unknown,
): { pageNumber: number; pageSize: number } | { error: string } {
  const pageNumber = parseInt((page as string) || '1', 10);
  const pageSize = parseInt((size as string) || '10', 10);

  if (pageNumber < 1 || pageSize < 1) {
    return { error: 'page and size must be positive integers' };
  }

  return { pageNumber, pageSize };
}

/**
 * Applies pagination to a database collection.
 *
 * This function retrieves a paginated subset of items from the provided database collection.
 * It calculates the offset based on the `pageNumber` and `pageSize`, sorts the collection by
 * the `name` field, and slices the data to return the requested page.
 *
 * @template TModel - The type of the items in the database collection.
 * @param {Collection<TModel>} dbCollection - The database collection to paginate.
 * @param {{ pageNumber: number; pageSize: number }} params - The pagination parameters, including
 *        the page number and page size.
 * @returns {TModel[]} - An array of items for the requested page.
 */
export function paginate<TModel extends { name: string }>(
  dbCollection: Collection<TModel>,
  {
    pageNumber,
    pageSize,
  }: {
    pageNumber: number;
    pageSize: number;
  },
) {
  // Calculate pagination offsets
  const offset = (pageNumber - 1) * pageSize;

  return dbCollection
    .chain()
    .find()
    .simplesort('name')
    .data()
    .slice(offset, offset + pageSize);
}
