// global.d.ts
declare global {
  interface Window {
    hint?: () => void;
  }
}
export {};