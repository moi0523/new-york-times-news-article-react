import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  isPending: boolean;
  root?: Element | Document | null;
  target: HTMLElement;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
}

const useInfiniteScroll = ({
  isPending,
  root = null,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    if (isPending) {
      return;
    }

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    if (!target) {
      return;
    }

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [isPending, target, root, rootMargin, onIntersect, threshold]);
};

export type { UseInfiniteScrollProps };
export { useInfiniteScroll };
