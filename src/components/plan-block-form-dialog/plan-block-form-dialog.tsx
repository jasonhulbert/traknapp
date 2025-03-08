import { FC, Fragment, JSX, useCallback, useEffect, useRef, useState } from 'react';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkDialog } from '@/lib/ui/dialog';
import { PlanBlock, PlanBlockSet } from '@/types/plan';
import { TrkInput } from '@/lib/ui/input/input';
import { TrkSelect } from '@/lib/ui/select/select';
import { TrkLabel } from '@/lib/ui/label/label';
import { PropConst } from '@/lib/ui/prop-const';
import { PlanBlockSetType } from '@/models/plan';

export type PlanBlockFormDialogProps = {
    dialogId: string;
    block?: Partial<PlanBlock>;
    onSubmit?: (block: Partial<PlanBlock> | undefined) => void;
    onCancel?: () => void;
};

export const PlanBlockFormDialog: FC<PlanBlockFormDialogProps> = ({
    dialogId,
    block,
    onSubmit,
    onCancel
}): JSX.Element => {
    const [blockData, setBlockData] = useState<Partial<PlanBlock>>();

    const defaultBlock = useRef<Partial<PlanBlock>>({
        description: '',
        setType: PlanBlockSetType.Rep,
        sets: [
            {
                count: 0,
                time: 0,
                rest: 0
            }
        ],
        ...block
    });

    const addBlockSet = useCallback(() => {
        setBlockData((prev) => {
            const { count, time, rest } = prev?.sets?.[prev?.sets?.length - 1] || { count: 0, time: 0, rest: 0 };

            return {
                ...prev,
                sets: [
                    ...(prev?.sets || []),
                    {
                        count,
                        time,
                        rest
                    }
                ]
            };
        });
    }, [setBlockData]);

    const removeBlockSet = useCallback((index: number) => {
        setBlockData((prev) => ({
            ...prev,
            sets: prev?.sets?.filter((_, i) => i !== index)
        }));
    }, []);

    const updateSetType = useCallback(
        (value: string) => {
            setBlockData((prev) => ({
                ...prev,
                setType: value as PropConst<typeof PlanBlockSetType>
            }));

            switch (value) {
                case PlanBlockSetType.Time:
                    setBlockData((prev) => ({
                        ...prev,
                        sets: prev?.sets?.map((set) => ({ ...set, count: 0 }))
                    }));
                    break;
                case PlanBlockSetType.Rep:
                    setBlockData((prev) => ({
                        ...prev,
                        sets: prev?.sets?.map((set) => ({ ...set, time: 0 }))
                    }));
                    break;
                default:
            }
        },
        [setBlockData]
    );

    const updateDescription = useCallback(
        (value: string) => {
            setBlockData((prev) => ({
                ...prev,
                description: value
            }));
        },
        [setBlockData]
    );

    const updateBlockSet = useCallback(
        (index: number, value: string | number, key: keyof PlanBlockSet) => {
            setBlockData((prev) => ({
                ...prev,
                sets: prev?.sets?.map((set, i) => (i === index ? { ...set, [key]: value } : set))
            }));
        },
        [setBlockData]
    );

    useEffect(() => {
        setBlockData(defaultBlock.current);

        return () => {
            setBlockData(undefined);
        };
    }, [defaultBlock]);

    return (
        <TrkDialog
            id={dialogId}
            title={blockData?.id ? 'Edit Block' : 'Add Block'}
            size="default"
            slots={{
                footer: (
                    <div className="flex items-center gap-3">
                        <TrkButton
                            classNames={{ button: 'flex-1' }}
                            theme="primary"
                            onClick={() => onSubmit?.(blockData)}
                        >
                            Save
                        </TrkButton>
                        <TrkButton
                            classNames={{ button: 'flex-1' }}
                            theme="default"
                            variant="flat"
                            onClick={() => onCancel?.()}
                        >
                            Cancel
                        </TrkButton>
                    </div>
                )
            }}
            onClose={() => onCancel?.()}
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <TrkInput
                        label="Description"
                        value={`${blockData?.description}`}
                        placeholder="'Pull Up', 'Sprint', 'Superman Hold', ..."
                        onChange={(e) => updateDescription(e.target.value)}
                    />
                </div>
                <div className="col-span-1">
                    <TrkSelect
                        label="Set Type"
                        value={`${blockData?.setType}`}
                        onChange={(e) => updateSetType(e.target.value)}
                    >
                        {Object.entries(PlanBlockSetType).map(([key, value]) => (
                            <option key={key} value={value}>
                                {key}
                            </option>
                        ))}
                    </TrkSelect>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-[1fr_1fr_1fr_auto] grid-rows-[auto_1fr] auto-rows-min gap-3">
                        <div className="border-b-2 border-neutral-100">
                            <TrkLabel htmlFor="block-form-reps-0">Reps</TrkLabel>
                        </div>
                        <div className="border-b-2 border-neutral-100">
                            <TrkLabel htmlFor="block-form-time-0">Duration</TrkLabel>
                        </div>
                        <div className="border-b-2 border-neutral-100">
                            <TrkLabel htmlFor="block-form-rest-0">Rest</TrkLabel>
                        </div>
                        <div>&nbsp;</div>
                        {blockData?.sets?.map((set: Partial<PlanBlockSet>, index: number) => (
                            <Fragment key={index}>
                                <div className="flex items-center">
                                    <TrkInput
                                        id={`block-form-reps-${index}`}
                                        label="Reps"
                                        labelPosition="none"
                                        type="number"
                                        value={`${set.count}`}
                                        disabled={blockData?.setType === PlanBlockSetType.Time}
                                        onChange={(e) => updateBlockSet(index, e.target.value, 'count')}
                                    ></TrkInput>
                                </div>
                                <div className="flex items-center">
                                    <TrkInput
                                        id={`block-form-time-${index}`}
                                        label="Duration"
                                        labelPosition="none"
                                        type="number"
                                        value={`${set.time}`}
                                        disabled={blockData?.setType === PlanBlockSetType.Rep}
                                        onChange={(e) => updateBlockSet(index, e.target.value, 'time')}
                                    ></TrkInput>
                                </div>
                                <div className="flex items-center">
                                    <TrkInput
                                        id={`block-form-rest-${index}`}
                                        label="Rest"
                                        labelPosition="none"
                                        type="number"
                                        value={`${set.rest}`}
                                        onChange={(e) => updateBlockSet(index, e.target.value, 'rest')}
                                    ></TrkInput>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TrkButton
                                        theme="danger"
                                        variant="ghost"
                                        size="sm"
                                        radiusSize="full"
                                        iconOnly={true}
                                        onClick={() => removeBlockSet(index)}
                                    >
                                        <CircleMinus size={32} />
                                    </TrkButton>
                                    {!blockData?.sets?.length ||
                                        (blockData?.sets?.length - 1 === index && (
                                            <TrkButton
                                                theme="success"
                                                variant="ghost"
                                                size="sm"
                                                radiusSize="full"
                                                iconOnly={true}
                                                onClick={() => addBlockSet()}
                                            >
                                                <CirclePlus size={32} />
                                            </TrkButton>
                                        ))}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </TrkDialog>
    );
};
