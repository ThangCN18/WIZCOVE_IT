import slug from 'slugify';

export function generateSlug(name: string) {
  return slug(name, {
    replacement: '-',
    remove: undefined,
    lower: true,
    trim: true,
  });
}
