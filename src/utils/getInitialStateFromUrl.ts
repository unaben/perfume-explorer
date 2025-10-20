/**
 * Parses the URL query string for the given parameter name.
 * Used for synchronous state initialization.
 */
const getInitialStateFromUrl = (paramName: string): string[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get(paramName);
    if (paramValue) {
        return paramValue.split(',')
            .map(v => decodeURIComponent(v.trim()))
            .filter(v => v.length > 0);
    }
    return [];
  };

  export default getInitialStateFromUrl