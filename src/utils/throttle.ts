export function throttle<T extends (...args: any[]) => void>(
  func: T,
  timeFrame: number
) {
  let lastTime = 0;
  const fn = function (...args: any) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };

  return fn as T;
}
