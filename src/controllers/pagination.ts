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
