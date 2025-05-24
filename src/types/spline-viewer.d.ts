declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': {
      url: string;
      style?: React.CSSProperties;
      onLoad?: (event: Event) => void;
      className?: string;
    };
  }
} 