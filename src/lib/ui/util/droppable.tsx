import React, { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';

export type DroppableProps = {
    children: React.ReactNode;
};

export const Droppable: FC<DroppableProps> = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable'
    });
    const style = {
        color: isOver ? 'green' : undefined
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
};
