export function hexToRgba(hexa: string, alpha: string = '1') {
    const r = parseInt(hexa.slice(1, 3), 16);
    const g = parseInt(hexa.slice(3, 5), 16);
    const b = parseInt(hexa.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
