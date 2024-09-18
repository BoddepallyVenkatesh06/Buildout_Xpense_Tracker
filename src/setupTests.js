// Adds custom jest matchers for asserting on DOM nodes.
// Allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// Import other global configurations if needed
// For example, you might want to configure the test environment
// or mock certain browser APIs
// Mock window.confirm to always return true
global.confirm = jest.fn(() => true);