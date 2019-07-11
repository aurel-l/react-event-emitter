import { createElement } from 'react';
import { render, cleanup } from '@testing-library/react';

import EventEmitter from '.';

afterEach(cleanup);

describe('<EventEmitter />', () => {
  test('should render and fire event', () => {
    const listener = jest.fn();
    document.body.addEventListener('load', listener);

    render(createElement(EventEmitter, { eventType: 'load', bubbles: true }));

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
