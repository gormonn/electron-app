export const formatDate = (date: Date) => date.toISOString();
export const parseDate = (isoString: string) => {
  const dateObject = new Date(isoString);
  return dateObject.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
};
