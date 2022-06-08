import type { Fn } from '@/types';

export function useEventListener<EventType = Event>(
  target: EventTarget,
  event: string,
  listener: (event: EventType) => void,
  options?: boolean | AddEventListenerOptions
): Fn;
export function useEventListener(...args: any[]): Fn {
  const [target, type, listener, options] = args;
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
