// src/aws-polyfills.ts
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined }
};
global.Buffer = global.Buffer || require('buffer').Buffer;