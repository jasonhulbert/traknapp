/**
 * Joins class names as a string
 * The provided class names can be either a string or an object with key-value pairs.
 * The key-value pairs are used to conditionally include the class name.
 */
export const joinClassNames = (classNames: Array<Record<string, boolean> | string | undefined | null>) => {
    return classNames
        .map((className) => {
            if (!className) {
                return '';
            }

            if (typeof className === 'string') {
                return className;
            }

            return Object.entries(className)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join(' ');
        })
        .join(' ')
        .trim();
};

export const resolveFinalClassNames = <TClassNames extends Record<string, string>>(
    baseClassNames: TClassNames,
    modClassNames?: { [Key in keyof Partial<TClassNames>]?: Record<string, boolean> },
    customClassNames?: Partial<TClassNames>
): TClassNames => {
    return Object.keys(baseClassNames).reduce((acc: TClassNames, curr: string) => {
        const key = curr as keyof TClassNames;

        return {
            ...acc,
            [key]: joinClassNames([baseClassNames[key], modClassNames?.[key], customClassNames?.[key]])
        };
    }, {} as TClassNames);
};
