export function generateLeadId() {
  const chars = '0123456789ABCDEF';
  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    randomPart += chars[Math.floor(Math.random() * 16)];
  }
  return `ARKA-${randomPart}`;
}
