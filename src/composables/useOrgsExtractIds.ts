export const useOrgsExtractIds = (org: any) => {
  let ids: string[] = [];
  if (org?.id) ids.unshift(org.id);
  if (org?.parent) ids.unshift(...useOrgsExtractIds(org.parent));
  return ids;
};
