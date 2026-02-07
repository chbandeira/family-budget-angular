export function transformMonthlyData(data: any[]): number[] {
  data.sort((a: any, b: any) => a._id - b._id);
  return Array.from({length: 12}, (_, i) => {
    const doc = data.find((d: any) => d._id === (i + 1));
    return doc ? parseInt(doc.total) : 0;
  });
}
