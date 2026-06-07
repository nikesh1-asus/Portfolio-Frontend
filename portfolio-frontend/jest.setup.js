import '@testing-library/jest-dom';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock scroll functions
window.scrollTo = jest.fn();

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  
  // Create a Proxy to dynamically handle any motion component (motion.div, motion.span, etc.)
  const motionProxy = new Proxy(
    {},
    {
      get: (target, key) => {
        // Return a component that renders the standard HTML tag
        const Component = React.forwardRef(({ children, transition, animate, initial, exit, whileHover, whileTap, whileInView, viewport, ...props }, ref) => {
          return React.createElement(key, { ...props, ref }, children);
        });
        Component.displayName = `motion.${key}`;
        return Component;
      },
    }
  );

  return {
    motion: motionProxy,
    AnimatePresence: ({ children }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: { onChange: () => {} } }),
    useTransform: () => {},
    useSpring: () => {},
  };
});

