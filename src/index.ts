import { createElement, useRef, useEffect, ReactNode, useState } from 'react';

interface EventEmitterProps {
  children?: ReactNode;
  eventType: string;
  detail?: any;
  waitUntil?: Promise<any>;
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

// just to make sure that the component we use doesn't have any effect on layout
const styleProps = { display: 'contents' };

const EventEmitter = ({
  children = null,
  eventType,
  detail,
  waitUntil = Promise.resolve(),
  bubbles,
  cancelable,
  composed,
}: EventEmitterProps) => {
  const domRef = useRef<HTMLDivElement>(null);

  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    waitUntil.then(() => setIsWaiting(false));
  }, [waitUntil]);

  // send or resend an event according to props
  useEffect(() => {
    if (!domRef.current || isWaiting) return;
    // send a DOM event
    domRef.current.dispatchEvent(
      new CustomEvent(eventType, { detail, bubbles, cancelable, composed }),
    );
  }, [isWaiting, eventType, detail, bubbles, cancelable, composed]);

  // render a container to dispatch the DOM event from
  return createElement('div', { style: styleProps, ref: domRef }, children);
};

export default EventEmitter;
