'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

type HexagonBackgroundProps = React.ComponentProps<'div'> & {
  hexagonProps?: React.ComponentProps<'div'>;
  hexagonSize?: number; // value greater than 50
  hexagonMargin?: number;
};

type CellOffset = { key: string; left: number; top: number; width: number; height: number };

function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 75,
  hexagonMargin = 3,
  ...props
}: HexagonBackgroundProps) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.1;
  const rowSpacing = hexagonSize * 0.8;
  const baseMarginTop = -36 - 0.275 * (hexagonSize - 100);
  const computedMarginTop = baseMarginTop + hexagonMargin;
  const oddRowMarginLeft = -(hexagonSize / 2);
  const evenRowMarginLeft = hexagonMargin / 2;

  const containerRef = React.useRef<HTMLDivElement>(null);
  // Each cell's position cached relative to the container's own top-left —
  // scroll-independent, so pointer hit-testing never needs a per-cell DOM
  // read on the hot path, just one fresh container rect per mousemove.
  const cellOffsetsRef = React.useRef<CellOffset[]>([]);
  const rafRef = React.useRef<number | null>(null);
  const [activeCell, setActiveCell] = React.useState<string | null>(null);

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const updateGridDimensions = React.useCallback(() => {
    const rows = Math.ceil(window.innerHeight / rowSpacing);
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 1;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [updateGridDimensions]);

  const measureCells = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const cells = container.querySelectorAll<HTMLElement>('[data-hex-cell]');
    cellOffsetsRef.current = Array.from(cells).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        key: el.dataset.hexCell as string,
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
      };
    });
  }, []);

  // Re-measure whenever the grid itself changes shape (resize).
  React.useLayoutEffect(() => {
    measureCells();
  }, [gridDimensions, measureCells]);

  // Track the pointer globally — not just over the hexagon layer — so a
  // hexagon still lights up even while the cursor is over text or other
  // content stacked above this decorative background.
  React.useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const x = event.clientX - containerRect.left;
        const y = event.clientY - containerRect.top;

        if (x < 0 || y < 0 || x > containerRect.width || y > containerRect.height) {
          setActiveCell((prev) => (prev === null ? prev : null));
          return;
        }

        const match = cellOffsetsRef.current.find(
          (cell) =>
            x >= cell.left &&
            x <= cell.left + cell.width &&
            y >= cell.top &&
            y <= cell.top + cell.height,
        );
        setActiveCell(match ? match.key : null);
      });
    }

    function handleMouseLeave() {
      setActiveCell(null);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-slot="hexagon-background"
      className={cn('relative size-full overflow-hidden bg-background', className)}
      {...props}
    >
      <style>{`:root { --hexagon-margin: ${hexagonMargin}px; }`}</style>
      <div className="absolute top-0 left-0 size-full overflow-hidden">
        {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            style={{
              marginTop: computedMarginTop,
              marginLeft:
                ((rowIndex + 1) % 2 === 0
                  ? evenRowMarginLeft
                  : oddRowMarginLeft) - 10,
            }}
            className="inline-flex"
          >
            {Array.from({ length: gridDimensions.columns }).map(
              (_, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isActive = activeCell === key;
                return (
                  <div
                    key={`hexagon-${key}`}
                    {...hexagonProps}
                    data-hex-cell={key}
                    style={{
                      width: hexagonWidth,
                      height: hexagonHeight,
                      marginLeft: hexagonMargin,
                      ...hexagonProps?.style,
                    }}
                    className={cn(
                      'relative',
                      '[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]',
                      "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-foreground/1 before:opacity-100 before:transition-all before:duration-1000",
                      "after:content-[''] after:absolute after:inset-(--hexagon-margin) after:bg-background",
                      'after:[clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]',
                      isActive &&
                        'before:bg-foreground/6 before:opacity-100 before:duration-0 after:bg-surface after:opacity-100 after:duration-0',
                      hexagonProps?.className,
                    )}
                  />
                );
              },
            )}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

export { HexagonBackground, type HexagonBackgroundProps };
