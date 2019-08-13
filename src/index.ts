import {
  createElement,
  useRef,
  useEffect,
  ReactNode,
  Props,
  ReactHTML,
  useState,
} from 'react';

interface EventEmitterProps {
  children?: ReactNode;
  eventType: string;
  detail?: any;
  waitUntil?: Promise<any>;
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  containerType?: keyof ReactHTML | string;
  containerProps?: Props<any>;
}

const EventEmitter = ({
  children = null,
  eventType,
  detail,
  waitUntil = Promise.resolve(),
  bubbles,
  cancelable,
  composed,
  containerType = 'div',
  containerProps = {},
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
  return createElement(
    containerType,
    { ...containerProps, ref: domRef },
    children,
  );
};

export default EventEmitter;
