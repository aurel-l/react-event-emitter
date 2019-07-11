import {
  createElement,
  useRef,
  useEffect,
  ReactNode,
  Props,
  ReactHTML,
} from 'react';

interface EventEmitterProps {
  children?: ReactNode;
  eventType: string;
  detail?: any;
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
  bubbles,
  cancelable,
  composed,
  containerType = 'div',
  containerProps = {},
}: EventEmitterProps) => {
  const domRef = useRef<HTMLDivElement>(null);

  // send or resend an event according to props
  useEffect(() => {
    if (!domRef.current) return;
    // send a DOM event
    domRef.current.dispatchEvent(
      new CustomEvent(eventType, { detail, bubbles, cancelable, composed }),
    );
  }, [eventType, detail, bubbles, cancelable, composed]);

  // render a container to dispatch the DOM event from
  return createElement(
    containerType,
    { ...containerProps, ref: domRef },
    children,
  );
};

export default EventEmitter;
