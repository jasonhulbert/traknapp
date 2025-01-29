import { PlanBlock, PlanBlockSet } from '@/types/plan';
import { PlanBlockSetTypes } from '@/models/plan';
import { FC, Fragment, JSX, useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TrkInput } from '../common/input/input';
import { TrkSelect } from '../common/select/select';
import { TrkButton } from '../common/button/button';
import { Add01Icon, Remove01Icon } from 'hugeicons-react';
import { TrkTitle } from '../common/title/title';
import { PropConst } from '@/types/prop-const';

export type PlanBlockFormProps = {
    initBlock?: Partial<PlanBlock>;
    onSubmit: (block: Partial<PlanBlock>) => void;
};

export const PlanBlockForm: FC<PlanBlockFormProps> = ({ initBlock, onSubmit }): JSX.Element => {
    const [blockData, setBlockData] = useState<Partial<PlanBlock>>();

    const defaultBlockId = useRef<string>(uuid());

    const defaultBlock = useRef<Partial<PlanBlock>>({
        id: defaultBlockId.current,
        description: '',
        setType: 'rep',
        sets: [
            {
                count: 10,
                time: 0,
                rest: 30
            }
        ],
        ...initBlock
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

        onSubmit(blockData);
    }, [blockData, onSubmit]);

    useEffect(() => {
        setBlockData(defaultBlock.current);
    }, [defaultBlock]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
                <TrkInput
                    label="Description"
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
                    onChange={(e) => {
                        setBlockData((prev) => ({
                            ...prev,
                            setType: e.target.value as PropConst<typeof PlanBlockSetTypes>
                        }));

                        switch (e.target.value) {
                            case PlanBlockSetTypes.Time:
                                setBlockData((prev) => ({
                                    ...prev,
                                    sets: prev?.sets?.map((set) => ({ ...set, count: 0 }))
                                }));
                                break;
                            case PlanBlockSetTypes.Rep:
                                setBlockData((prev) => ({
                                    ...prev,
                                    sets: prev?.sets?.map((set) => ({ ...set, time: 0 }))
                                }));
                                break;
                            default:
                        }
                    }}
                >
                    {Object.entries(PlanBlockSetTypes).map(([key, value]) => (
                        <option key={key} value={value}>
                            {key}
                        </option>
                    ))}
                </TrkSelect>
            </div>
            <div>
                <div className="grid grid-cols-[1fr_1fr_1fr_auto] grid-rows-[auto_1fr] auto-rows-fr gap-4">
                    <div>
                        <TrkTitle size="xs" variant="subtle">
                            Reps
                        </TrkTitle>
                    </div>
                    <div>
                        <TrkTitle size="xs" variant="subtle">
                            Duration
                        </TrkTitle>
                    </div>
                    <div>
                        <TrkTitle size="xs" variant="subtle">
                            Rest
                        </TrkTitle>
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
                                    disabled={blockData?.setType === PlanBlockSetTypes.Time}
                                    onChange={(e) => updateBlockSet(index, e.target.value, 'count')}
                                ></TrkInput>
                            </div>
                            <div className="flex items-center">
                                <TrkInput
                                    label="Duration"
                                    labelPosition="none"
                                    type="number"
                                    value={`${set.time}`}
                                    disabled={blockData?.setType === PlanBlockSetTypes.Rep}
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
                <TrkButton theme="primary" onClick={submit} classNames={{ button: 'flex-1' }}>
                    Save & Add
                </TrkButton>
            </div>
        </div>
    );
};
