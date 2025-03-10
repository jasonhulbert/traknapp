import React, { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';

export type DraggableProps = {
    children: React.ReactNode;
};

export const Draggable: FC<DraggableProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable'
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
          }
        : undefined;

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
};
