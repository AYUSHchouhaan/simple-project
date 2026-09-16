// Frontend Development Kit (FDK) Utilities
// A collection of helper functions for common frontend tasks

/**
 * Format currency values for display
 * @param {number} value - The numeric value to format
 * @param {string} currency - The currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(value);
};

/**
 * Format date for display
 * @param {string|Date} date - The date to format
 * @param {string} format - The format style (default: 'short')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    datetime: { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  };
  
  return new Date(date).toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length of the text
 * @param {string} suffix - Suffix to append if truncated (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (text == null) return '';
  if (typeof maxLength !== 'number' || maxLength <= 0) return String(text);
  const str = String(text);
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + suffix;
};

/**
 * Generate random ID
 * @returns {string} Random ID string
 */
export const generateId = () => {
  // Use slice instead of deprecated substr and ensure consistent length
  return Math.random().toString(36).slice(2, 11);
};

/**
 * Debounce function to limit rate of execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert snake_case to camelCase
 * @param {string} str - String to convert
 * @returns {string} Converted string
 */
export const snakeToCamel = (str) => {
  return str.replace(/(_\w)/g, (m) => m[1].toUpperCase());
};

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  // Use first letter of up to two name parts (e.g., "John Doe" => "JD")
  const initials = parts.slice(0, 2).map(p => p[0]).join('');
  return initials.toUpperCase();
};

export default {
  formatCurrency,
  formatDate,
  truncateText,
  generateId,
  debounce,
  capitalize,
  snakeToCamel,
  getInitials
};