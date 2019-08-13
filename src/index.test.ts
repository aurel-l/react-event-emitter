import { createElement } from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { sleep, frame } from 'timing-functions';

import EventEmitter from '.';

afterEach(cleanup);

describe('<EventEmitter />', () => {
  let listener;

  beforeEach(() => {
    listener = jest.fn();
    document.body.addEventListener('load', listener);
  });

  afterEach(() => {
    document.body.removeEventListener('load', listener);
  });

  test('should render and fire event', async () => {
    act(() => {
      render(
        createElement(EventEmitter, {
          eventType: 'load',
          bubbles: true,
        }),
      );
    });

    expect(listener).toHaveBeenCalledTimes(0);

    await act(() => frame());
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should render and not fire event until wait is over', async () => {
    const promise = sleep(100);

    act(() => {
      render(
        createElement(EventEmitter, {
          eventType: 'load',
          bubbles: true,
          waitUntil: promise,
        }),
      );
    });

    await act(() => frame());
    expect(listener).toHaveBeenCalledTimes(0);

    await act(() => promise);

    await act(() => frame());
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
