export function getFocusableElements(container: HTMLElement | null): HTMLElement[] | null {
    if (!container) return null;

    const focusableSelectors = [
        'a[href]:not([tabindex="-1"])',
        'button:not([disabled]):not([tabindex="-1"])',
        'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
        'select:not([disabled]):not([tabindex="-1"])',
        'textarea:not([disabled]):not([tabindex="-1"])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
    ];

    const focusable = Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors.join(',')));

    return focusable.length ? focusable : null;
}
