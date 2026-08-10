let pendingOffset = 0;

export function setPendingScrollOffset(offset: number) {
  pendingOffset = offset;
}

export function consumePendingScrollOffset() {
  const offset = pendingOffset;
  pendingOffset = 0;
  return offset;
}