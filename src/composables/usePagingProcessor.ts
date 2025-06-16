import { useChangeCase } from "@vueuse/integrations/useChangeCase";

export const usePagingProcessor = (data: {
  sortKey: string;
  sortOrder: string;
}) => {
  const _sortKey = data.sortKey
    ? useChangeCase(data.sortKey, "snakeCase").value
    : null;
  const _sortOrder = data.sortOrder
    ? useChangeCase(data.sortOrder, "snakeCase").value
    : null;
  return {
    ...data,
    sortKey: _sortKey,
    sortOrder: _sortOrder,
  };
};
