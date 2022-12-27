import React from 'react';

//Changed a little bit how it worked, only thing it does iss getting localStorage if it exists, otherwise it returns the default value
function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? stickyValue
        : defaultValue;
    });
    return [value, setValue];
  }

export default useStickyState;