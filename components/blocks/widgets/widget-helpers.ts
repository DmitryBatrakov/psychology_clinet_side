import React from 'react';

function hasMarker(children: React.ReactNode, type: string) {
  const stack = React.Children.toArray(children);

  while (stack.length) {
    const node = stack.pop();

    if (!React.isValidElement(node)) continue;

    if ((node.type as any).__TYPE === type) return true;

    if ((node.props as any)?.children) {
      stack.push(...React.Children.toArray((node.props as any).children));
    }
  }

  return false;
}

export { hasMarker };
