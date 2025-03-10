import { Fragment, JSX, useCallback, useEffect, useRef, useState } from 'react';
import { PlanBlock, PlanExerciseBlockSet, PlanExerciseBlock } from '@/types/plan';
import { PlanExerciseBlockSetType } from '@/models/plan';
import { PropConst } from '@/lib/ui/prop-const';
import { TrkInput } from '@/lib/ui/input/input';
import { TrkSelect } from '@/lib/ui/select/select';
import { TrkButton } from '@/lib/ui/button/button';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { TrkTextarea } from '@/lib/ui/textarea/textarea';
import { TrkTitle } from '@/lib/ui/title/title';
import { TrkHr } from '@/lib/ui/hr/hr';

export type PlanBlockExerciseFormProps = {
    initBlock: Partial<PlanBlock>;
    onUpdate?: (block: Partial<PlanExerciseBlock>) => void;
};

export const PlanBlockExerciseForm: React.FC<PlanBlockExerciseFormProps> = ({ initBlock, onUpdate }): JSX.Element => {
    const [blockData, setBlockData] = useState<Partial<PlanExerciseBlock>>();

    const defaultBlock = useRef<Partial<PlanExerciseBlock>>({
        description: '',
        setType: PlanExerciseBlockSetType.Reps,
        sets: [
            {
                reps: 0,
                time: 0,
                rest: 0
            }
        ],
        ...initBlock
    });

    const addBlockSet = useCallback(() => {
        setBlockData((prev) => {
            const { reps, time, rest } = prev?.sets?.[prev?.sets?.length - 1] || { reps: 0, time: 0, rest: 0 };

            return {
                ...prev,
                sets: [
                    ...(prev?.sets || []),
                    {
                        reps,
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
                setType: value as PropConst<typeof PlanExerciseBlockSetType>
            }));
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
        (index: number, value: string | number, key: keyof PlanExerciseBlockSet) => {
            setBlockData((prev) => ({
                ...prev,
                sets: prev?.sets?.map((set, i) => (i === index ? { ...set, [key]: value } : set))
            }));
        },
        [setBlockData]
    );

    const updateNotes = useCallback(
        (value: string) => {
            setBlockData((prev) => ({
                ...prev,
                notes: value
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

    useEffect(() => {
        if (onUpdate && blockData) {
            onUpdate(blockData);
        }
    }, [blockData, onUpdate]);

    return (
        <>
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
                        {Object.entries(PlanExerciseBlockSetType).map(([key, value]) => (
                            <option key={key} value={value}>
                                {key}
                            </option>
                        ))}
                    </TrkSelect>
                </div>
                <div className="col-span-2">
                    <TrkHr />
                    <TrkTitle tag="h3" size="lg">
                        Sets
                    </TrkTitle>
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-3">
                        {blockData?.sets?.map((set: Partial<PlanExerciseBlockSet>, index: number) => (
                            <Fragment key={index}>
                                {blockData?.setType === PlanExerciseBlockSetType.Reps && (
                                    <div className="flex items-center">
                                        <TrkInput
                                            id={`block-form-reps-${index}`}
                                            label="Reps"
                                            labelPosition="inside"
                                            type="number"
                                            value={`${set.reps}`}
                                            onChange={(e) => updateBlockSet(index, e.target.value, 'reps')}
                                        ></TrkInput>
                                    </div>
                                )}
                                {blockData?.setType === PlanExerciseBlockSetType.Time && (
                                    <div className="flex items-center">
                                        <TrkInput
                                            id={`block-form-time-${index}`}
                                            label="Time"
                                            labelPosition="inside"
                                            type="number"
                                            value={`${set.time}`}
                                            onChange={(e) => updateBlockSet(index, e.target.value, 'time')}
                                        ></TrkInput>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <TrkInput
                                        id={`block-form-rest-${index}`}
                                        label="Rest"
                                        labelPosition="inside"
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
                <div className="col-span-2">
                    <TrkHr />
                    <TrkTitle tag="h3" size="lg">
                        Notes
                    </TrkTitle>
                </div>
                <div className="col-span-2">
                    <TrkTextarea
                        label="Notes"
                        labelPosition="inside"
                        value={blockData?.notes}
                        onChange={(value: string) => updateNotes(value)}
                    ></TrkTextarea>
                </div>
            </div>
        </>
    );
};
