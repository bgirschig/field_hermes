import settings from '@/settings';

export const background = settings.background || '#f1653b';
export const foreground = settings.foreground || '#ffffff';
export const mask = settings.mask || '#000000';

document.body.style.setProperty('--background_color', background);
document.body.style.setProperty('--foreground_color', foreground);
document.body.style.setProperty('--mask_color', mask);
