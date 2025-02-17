import { FC, Fragment, JSX, useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { PlanBlock, PlanBlockSet } from '@/types/plan';
import { PlanBlockSetType } from '@/models/plan';
import { Add01Icon, Remove01Icon } from 'hugeicons-react';
import { TrkInput } from '@/lib/ui/input/input';
import { TrkSelect } from '@/lib/ui/select/select';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkTitle } from '@/lib/ui/title/title';
import { PropConst } from '@/lib/ui/prop-const';

export type PlanBlockFormProps = {
    block?: Partial<PlanBlock> | null;
    onSubmit?: (block: Partial<PlanBlock>) => void;
};

export const PlanBlockForm: FC<PlanBlockFormProps> = ({ block, onSubmit }): JSX.Element => {
    const [blockData, setBlockData] = useState<Partial<PlanBlock>>();

    const defaultBlockId = useRef<string>(uuid());

    const defaultBlock = useRef<Partial<PlanBlock>>({
        id: defaultBlockId.current,
        description: '',
        setType: PlanBlockSetType.Rep,
        sets: [
            {
                count: 10,
                time: 0,
                rest: 30
            }
        ],
        ...block
    });

    const updateBlockSet = useCallback(
        (index: number, value: string, key: keyof PlanBlockSet) => {
            setBlockData((prev) => ({
                ...prev,
                sets: prev?.sets?.map((set, i) => (i === index ? { ...set, [key]: +value } : set))
            }));
        },
        [setBlockData]
    );

    const addBlockSet = useCallback(() => {
        setBlockData((prev) => ({
            ...prev,
            sets: [
                ...(prev?.sets || []),
                {
                    count: 0,
                    time: 0,
                    rest: 30
                }
            ]
        }));
    }, [setBlockData]);

    const removeBlockSet = useCallback((index: number) => {
        setBlockData((prev) => ({
            ...prev,
            sets: prev?.sets?.filter((_, i) => i !== index)
        }));
    }, []);

    const submit = useCallback(() => {
        if (!blockData) {
            return;
        }

        onSubmit?.(blockData);
    }, [blockData, onSubmit]);

    useEffect(() => {
        setBlockData(defaultBlock.current);
    }, [defaultBlock]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <TrkInput
                    label="Description"
                    value={`${blockData?.description}`}
                    placeholder="'Pull Up', 'Sprint', 'Superman Hold', ..."
                    onChange={(e) =>
                        setBlockData((prev) => ({
                            ...prev,
                            description: e.target.value
                        }))
                    }
                />
            </div>
            <div>
                <TrkSelect
                    label="Set Type"
                    value={`${blockData?.setType}`}
                    onChange={(e) => {
                        setBlockData((prev) => ({
                            ...prev,
                            setType: e.target.value as PropConst<typeof PlanBlockSetType>
                        }));

                        switch (e.target.value) {
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
                    }}
                >
                    {Object.entries(PlanBlockSetType).map(([key, value]) => (
                        <option key={key} value={value}>
                            {key}
                        </option>
                    ))}
                </TrkSelect>
            </div>
            <div>
                <div className="grid grid-cols-[1fr_1fr_1fr_auto] grid-rows-[auto_1fr] auto-rows-min gap-2">
                    <div>
                        <TrkTitle size="sm">Reps</TrkTitle>
                    </div>
                    <div>
                        <TrkTitle size="sm">Duration</TrkTitle>
                    </div>
                    <div>
                        <TrkTitle size="sm">Rest</TrkTitle>
                    </div>
                    <div>&nbsp;</div>
                    {blockData?.sets?.map((set: Partial<PlanBlockSet>, index: number) => (
                        <Fragment key={index}>
                            <div className="flex items-center">
                                <TrkInput
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
                                    label="Rest"
                                    labelPosition="none"
                                    type="number"
                                    value={`${set.rest}`}
                                    onChange={(e) => updateBlockSet(index, e.target.value, 'rest')}
                                ></TrkInput>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrkButton
                                    variant="ghost"
                                    size="sm"
                                    radiusSize="full"
                                    iconOnly={true}
                                    onClick={() => removeBlockSet(index)}
                                >
                                    <Remove01Icon width={24} height={24} />
                                </TrkButton>
                                {!blockData?.sets?.length ||
                                    (blockData?.sets?.length - 1 === index && (
                                        <TrkButton
                                            variant="ghost"
                                            size="sm"
                                            radiusSize="full"
                                            iconOnly={true}
                                            onClick={() => addBlockSet()}
                                        >
                                            <Add01Icon width={24} height={24} />
                                        </TrkButton>
                                    ))}
                            </div>
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-x-2 justify-stretch">
                <TrkButton theme="primary" onClick={() => submit()} classNames={{ button: 'flex-1' }}>
                    Save Block
                </TrkButton>
            </div>
        </div>
    );
};
